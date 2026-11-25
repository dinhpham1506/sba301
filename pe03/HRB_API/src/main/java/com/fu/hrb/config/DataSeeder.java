package com.fu.hrb.config;

import com.fu.hrb.entity.BedType;
import com.fu.hrb.entity.Room;
import com.fu.hrb.entity.RoomStatus;
import com.fu.hrb.entity.RoomType;
import com.fu.hrb.repository.RoomRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

/** Inserts 16 sample rooms when the table is empty (16 rooms = 3 pages of 6). */
@Component
public class DataSeeder implements CommandLineRunner {

    private final RoomRepository roomRepository;

    public DataSeeder(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    @Override
    public void run(String... args) {
        if (roomRepository.count() > 0) return;
        LocalDate d = LocalDate.now();
        List<Room> rooms = List.of(
                new Room("R101", RoomType.Single, 1, 1, 450_000L, BedType.Single, "Garden", d, RoomStatus.Available, "Cozy single room near the lobby."),
                new Room("R102", RoomType.Single, 1, 1, 450_000L, BedType.Single, "City", d.plusDays(2), RoomStatus.Occupied, "Quiet single room."),
                new Room("R103", RoomType.Twin, 1, 2, 750_000L, BedType.Twin, "Garden", d, RoomStatus.Available, "Two single beds, good for friends."),
                new Room("R201", RoomType.Double, 2, 2, 900_000L, BedType.Queen, "City", d.plusDays(1), RoomStatus.Available, "Queen bed with work desk."),
                new Room("R202", RoomType.Double, 2, 2, 950_000L, BedType.Queen, "Sea", d.plusDays(3), RoomStatus.Maintenance, "Bathroom under renovation."),
                new Room("R203", RoomType.Twin, 2, 2, 800_000L, BedType.Twin, "City", d, RoomStatus.Occupied, null),
                new Room("R301", RoomType.Double, 3, 3, 1_250_000L, BedType.King, "Sea", d.plusDays(5), RoomStatus.Available, "King bed and balcony facing the sea."),
                new Room("R302", RoomType.Deluxe, 3, 3, 1_800_000L, BedType.King, "Sea", d.plusDays(7), RoomStatus.Available, "Deluxe room with bathtub."),
                new Room("R303", RoomType.Deluxe, 3, 2, 1_650_000L, BedType.Queen, "City", d, RoomStatus.Occupied, "Corner room, floor-to-ceiling windows."),
                new Room("R501", RoomType.Suite, 5, 4, 3_500_000L, BedType.King, "Sea", d.plusDays(10), RoomStatus.Available, "Suite with living room and kitchenette."),
                new Room("R502", RoomType.Suite, 5, 4, 3_200_000L, BedType.King, "City", d.plusDays(4), RoomStatus.Maintenance, "Air conditioner being replaced."),
                new Room("R801", RoomType.Deluxe, 8, 3, 2_100_000L, BedType.King, "Sea", d.plusDays(2), RoomStatus.Available, null),
                new Room("R1001", RoomType.Suite, 10, 6, 6_800_000L, BedType.King, "Sea", d.plusDays(14), RoomStatus.Available, "Family suite, two bedrooms."),
                new Room("R1002", RoomType.Single, 10, 1, 600_000L, BedType.Single, "City", d, RoomStatus.Available, "High-floor single room."),
                new Room("R1205", RoomType.Double, 12, 2, 1_100_000L, BedType.Queen, "Garden", d.plusDays(6), RoomStatus.Available, null),
                new Room("R1501", RoomType.Suite, 15, 4, 12_500_000L, BedType.King, "Sea", d.plusDays(30), RoomStatus.Available, "Presidential suite.")
        );
        roomRepository.saveAll(rooms);
    }
}
