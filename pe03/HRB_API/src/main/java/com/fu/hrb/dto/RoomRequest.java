package com.fu.hrb.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fu.hrb.entity.BedType;
import com.fu.hrb.entity.RoomType;
import jakarta.validation.constraints.*;

import java.time.LocalDate;

/**
 * Body of POST /api/rooms. Status is not sent: a new room is always Available.
 * Messages follow the exam's Message List (MS01, MS02, MS03, MS07).
 */
public class RoomRequest {

    @NotBlank(message = "Room Number is required.")
    @Size(max = 10, message = "Room Number must be at most 10 characters.")
    @Pattern(regexp = "^\\s*R\\d{3,4}\\s*$", message = "The input value has an invalid format.")
    private String roomNumber;

    @NotNull(message = "Room Type is required.")
    private RoomType type;

    @NotNull(message = "Floor is required.")
    @Min(value = 1, message = "Floor must be between 1 and 50.")
    @Max(value = 50, message = "Floor must be between 1 and 50.")
    private Integer floor;

    @NotNull(message = "Capacity is required.")
    @Min(value = 1, message = "Capacity must be between 1 and 6.")
    @Max(value = 6, message = "Capacity must be between 1 and 6.")
    private Integer capacity;

    @NotNull(message = "Price per Night is required.")
    @Min(value = 300_000, message = "Price per Night must be between 300,000 and 20,000,000.")
    @Max(value = 20_000_000, message = "Price per Night must be between 300,000 and 20,000,000.")
    private Long pricePerNight;

    @NotNull(message = "Bed Type is required.")
    private BedType bedType;

    @Size(max = 50, message = "View must be at most 50 characters.")
    private String view;

    @NotNull(message = "Available From is required.")
    @FutureOrPresent(message = "Available From must not be in the past.")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate availableFrom;

    @Size(max = 255, message = "Description must be at most 255 characters.")
    private String description;

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
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
