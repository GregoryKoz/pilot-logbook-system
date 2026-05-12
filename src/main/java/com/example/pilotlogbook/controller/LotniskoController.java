package com.example.pilotlogbook.controller;

import com.example.pilotlogbook.dto.LotniskoDto;
import com.example.pilotlogbook.service.LotniskoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lotniska")
@RequiredArgsConstructor
public class LotniskoController {

    private final LotniskoService lotniskoService;

    @GetMapping
    public List<LotniskoDto> getAll() {
        return lotniskoService.findAll();
    }

    @GetMapping("/{id}")
    public LotniskoDto getById(@PathVariable Long id) {
        return lotniskoService.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public LotniskoDto create(@RequestBody LotniskoDto dto) {
        return lotniskoService.create(dto);
    }

    @PutMapping("/{id}")
    public LotniskoDto update(@PathVariable Long id, @RequestBody LotniskoDto dto) {
        return lotniskoService.update(id, dto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        lotniskoService.delete(id);
    }
}
