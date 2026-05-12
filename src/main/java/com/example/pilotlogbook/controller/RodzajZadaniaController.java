package com.example.pilotlogbook.controller;

import com.example.pilotlogbook.dto.RodzajZadaniaDto;
import com.example.pilotlogbook.service.RodzajZadaniaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rodzaje-zadan")
@RequiredArgsConstructor
public class RodzajZadaniaController {

    private final RodzajZadaniaService service;

    @GetMapping
    public List<RodzajZadaniaDto> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public RodzajZadaniaDto getById(@PathVariable Long id) {
        return service.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public RodzajZadaniaDto create(@RequestBody RodzajZadaniaDto dto) {
        return service.create(dto);
    }

    @PutMapping("/{id}")
    public RodzajZadaniaDto update(@PathVariable Long id, @RequestBody RodzajZadaniaDto dto) {
        return service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
