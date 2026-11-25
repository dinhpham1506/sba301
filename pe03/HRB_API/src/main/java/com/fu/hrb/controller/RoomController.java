package com.fu.hrb.controller;

import com.fu.hrb.dto.PageResponse;
import com.fu.hrb.dto.RoomRequest;
import com.fu.hrb.entity.Room;
import com.fu.hrb.entity.RoomStatus;
import com.fu.hrb.entity.RoomType;
import com.fu.hrb.service.RoomService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {

    private final RoomService roomService;

    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    /** GET /api/rooms?roomNumber=&type=&status=&page=0&size=6 */
    @GetMapping
    public PageResponse<Room> getRooms(@RequestParam(required = false) String roomNumber,
                                       @RequestParam(required = false) RoomType type,
                                       @RequestParam(required = false) RoomStatus status,
                                       @RequestParam(defaultValue = "0") int page,
                                       @RequestParam(defaultValue = "6") int size) {
        return roomService.search(roomNumber, type, status, page, size);
    }

    @GetMapping("/{id}")
    public Room getRoom(@PathVariable Long id) {
        return roomService.getById(id);
    }

    @PostMapping
    public ResponseEntity<Room> createRoom(@Valid @RequestBody RoomRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(roomService.create(request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRoom(@PathVariable Long id) {
        roomService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
