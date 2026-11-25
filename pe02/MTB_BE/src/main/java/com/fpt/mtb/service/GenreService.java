package com.fpt.mtb.service;

import com.fpt.mtb.dto.GenreResponse;
import com.fpt.mtb.repository.GenreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GenreService {

    private final GenreRepository genreRepository;

    @Transactional(readOnly = true)
    public List<GenreResponse> getAll() {
        return genreRepository.findAllByOrderByIdAsc().stream().map(GenreResponse::from).toList();
    }
}
