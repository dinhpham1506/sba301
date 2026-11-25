package com.fu.hrb.entity;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "Rooms")
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 10)
    private String roomNumber;

    @Enumerated(EnumType.STRING)
    @Column(name = "room_type", nullable = false, length = 20)
    private RoomType type;

    @Column(name = "floor_number", nullable = false)
    private Integer floor;

    @Column(nullable = false)
    private Integer capacity;

    @Column(nullable = false)
    private Long pricePerNight;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private BedType bedType;

    // "VIEW" is a reserved word in SQL Server -> different column name, JSON field stays "view"
    @Column(name = "room_view", length = 50)
    private String view;

    @Column(nullable = false)
    private LocalDate availableFrom;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private RoomStatus status;

    @Column(length = 255)
    private String description;

    public Room() {
    }

    public Room(String roomNumber, RoomType type, Integer floor, Integer capacity, Long pricePerNight,
                BedType bedType, String view, LocalDate availableFrom, RoomStatus status, String description) {
        this.roomNumber = roomNumber;
        this.type = type;
        this.floor = floor;
        this.capacity = capacity;
        this.pricePerNight = pricePerNight;
        this.bedType = bedType;
        this.view = view;
        this.availableFrom = availableFrom;
        this.status = status;
        this.description = description;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getRoomNumber() { return roomNumber; }
    public void setRoomNumber(String roomNumber) { this.roomNumber = roomNumber; }
    public RoomType getType() { return type; }
    public void setType(RoomType type) { this.type = type; }
    public Integer getFloor() { return floor; }
    public void setFloor(Integer floor) { this.floor = floor; }
    public Integer getCapacity() { return capacity; }
    public void setCapacity(Integer capacity) { this.capacity = capacity; }
    public Long getPricePerNight() { return pricePerNight; }
    public void setPricePerNight(Long pricePerNight) { this.pricePerNight = pricePerNight; }
    public BedType getBedType() { return bedType; }
    public void setBedType(BedType bedType) { this.bedType = bedType; }
    public String getView() { return view; }
    public void setView(String view) { this.view = view; }
    public LocalDate getAvailableFrom() { return availableFrom; }
    public void setAvailableFrom(LocalDate availableFrom) { this.availableFrom = availableFrom; }
    public RoomStatus getStatus() { return status; }
    public void setStatus(RoomStatus status) { this.status = status; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
