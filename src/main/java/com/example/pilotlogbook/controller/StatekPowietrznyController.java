package com.example.pilotlogbook.controller;

import com.example.pilotlogbook.dto.StatekPowietrznyDto;
import com.example.pilotlogbook.service.StatekPowietrznyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/statki-powietrzne")
@RequiredArgsConstructor
public class StatekPowietrznyController {

    private final StatekPowietrznyService service;

    @GetMapping
    public List<StatekPowietrznyDto> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public StatekPowietrznyDto getById(@PathVariable Long id) {
        return service.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public StatekPowietrznyDto create(@RequestBody StatekPowietrznyDto dto) {
        return service.create(dto);
    }

    @PutMapping("/{id}")
    public StatekPowietrznyDto update(@PathVariable Long id, @RequestBody StatekPowietrznyDto dto) {
        return service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
