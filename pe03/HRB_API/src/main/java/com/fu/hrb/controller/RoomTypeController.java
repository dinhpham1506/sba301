package com.fu.hrb.controller;

import com.fu.hrb.entity.RoomType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/room-types")
public class RoomTypeController {

    /** GET /api/room-types -> ["Single","Double","Twin","Suite","Deluxe"] */
    @GetMapping
    public List<String> getRoomTypes() {
        return Arrays.stream(RoomType.values()).map(Enum::name).toList();
    }
}
