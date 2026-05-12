package com.example.pilotlogbook.controller;

import com.example.pilotlogbook.dto.PilotUprawnienieDto;
import com.example.pilotlogbook.service.PilotUprawnienieService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pilot-uprawnienia")
@RequiredArgsConstructor
public class PilotUprawnienieController {

    private final PilotUprawnienieService service;

    @GetMapping
    public List<PilotUprawnienieDto> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public PilotUprawnienieDto getById(@PathVariable Long id) {
        return service.findById(id);
    }

    @GetMapping("/pilot/{pilotId}")
    public List<PilotUprawnienieDto> getByPilot(@PathVariable Long pilotId) {
        return service.findByPilotId(pilotId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PilotUprawnienieDto create(@RequestBody PilotUprawnienieDto dto) {
        return service.create(dto);
    }

    @PutMapping("/{id}")
    public PilotUprawnienieDto update(@PathVariable Long id, @RequestBody PilotUprawnienieDto dto) {
        return service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
