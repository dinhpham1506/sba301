package com.fu.hrb.service;

import com.fu.hrb.dto.PageResponse;
import com.fu.hrb.dto.RoomRequest;
import com.fu.hrb.entity.Room;
import com.fu.hrb.entity.RoomStatus;
import com.fu.hrb.entity.RoomType;
import com.fu.hrb.exception.BusinessConflictException;
import com.fu.hrb.exception.DuplicateResourceException;
import com.fu.hrb.exception.ResourceNotFoundException;
import com.fu.hrb.repository.RoomRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RoomService {

    private final RoomRepository roomRepository;

    public RoomService(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    @Transactional(readOnly = true)
    public PageResponse<Room> search(String roomNumber, RoomType type, RoomStatus status, int page, int size) {
        int safePage = Math.max(page, 0);
        int safeSize = Math.min(Math.max(size, 1), 100);

        Specification<Room> spec = Specification.where(null);
        if (roomNumber != null && !roomNumber.trim().isEmpty()) {
            String keyword = "%" + roomNumber.trim().toLowerCase() + "%";
            spec = spec.and((root, q, cb) -> cb.like(cb.lower(root.get("roomNumber")), keyword));
        }
        if (type != null) {
            spec = spec.and((root, q, cb) -> cb.equal(root.get("type"), type));
        }
        if (status != null) {
            spec = spec.and((root, q, cb) -> cb.equal(root.get("status"), status));
        }

        Sort sort = Sort.by(Sort.Order.asc("pricePerNight"), Sort.Order.asc("roomNumber"));
        return PageResponse.of(roomRepository.findAll(spec, PageRequest.of(safePage, safeSize, sort)));
    }

    @Transactional(readOnly = true)
    public Room getById(Long id) {
        return roomRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found: " + id));
    }

    @Transactional
    public Room create(RoomRequest req) {
        String roomNumber = req.getRoomNumber().trim().toUpperCase();
        if (roomRepository.existsByRoomNumberIgnoreCase(roomNumber)) {
            throw new DuplicateResourceException("roomNumber", "Room Number already exists: " + roomNumber);
        }
        Room room = new Room(roomNumber, req.getType(), req.getFloor(), req.getCapacity(),
                req.getPricePerNight(), req.getBedType(), trimToNull(req.getView()),
                req.getAvailableFrom(), RoomStatus.Available, trimToNull(req.getDescription()));
        return roomRepository.save(room);
    }

    @Transactional
    public void delete(Long id) {
        Room room = getById(id);
        if (room.getStatus() == RoomStatus.Occupied) {
            throw new BusinessConflictException("Cannot delete a room that is currently occupied.");
        }
        roomRepository.delete(room);
    }

    private static String trimToNull(String s) {
        if (s == null) return null;
        String t = s.trim();
        return t.isEmpty() ? null : t;
    }
}
