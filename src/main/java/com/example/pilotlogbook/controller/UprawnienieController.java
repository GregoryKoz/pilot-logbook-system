package com.example.pilotlogbook.controller;

import com.example.pilotlogbook.dto.UprawnienieDto;
import com.example.pilotlogbook.service.UprawnienieService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/uprawnienia")
@RequiredArgsConstructor
public class UprawnienieController {

    private final UprawnienieService service;

    @GetMapping
    public List<UprawnienieDto> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public UprawnienieDto getById(@PathVariable Long id) {
        return service.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UprawnienieDto create(@RequestBody UprawnienieDto dto) {
        return service.create(dto);
    }

    @PutMapping("/{id}")
    public UprawnienieDto update(@PathVariable Long id, @RequestBody UprawnienieDto dto) {
        return service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
