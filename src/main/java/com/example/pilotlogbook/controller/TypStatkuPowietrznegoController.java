package com.example.pilotlogbook.controller;

import com.example.pilotlogbook.dto.TypStatkuPowietrznegoDto;
import com.example.pilotlogbook.service.TypStatkuPowietrznegoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/typy-statku-powietrznego")
@RequiredArgsConstructor
public class TypStatkuPowietrznegoController {

    private final TypStatkuPowietrznegoService service;

    @GetMapping
    public List<TypStatkuPowietrznegoDto> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public TypStatkuPowietrznegoDto getById(@PathVariable Long id) {
        return service.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TypStatkuPowietrznegoDto create(@RequestBody TypStatkuPowietrznegoDto dto) {
        return service.create(dto);
    }

    @PutMapping("/{id}")
    public TypStatkuPowietrznegoDto update(@PathVariable Long id, @RequestBody TypStatkuPowietrznegoDto dto) {
        return service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
