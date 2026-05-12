package com.example.pilotlogbook.controller;

import com.example.pilotlogbook.dto.PilotDto;
import com.example.pilotlogbook.service.PilotService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pilots")
@RequiredArgsConstructor
public class PilotController {

    private final PilotService pilotService;

    @GetMapping
    public List<PilotDto> getAll() {
        return pilotService.findAll();
    }

    @GetMapping("/{id}")
    public PilotDto getById(@PathVariable Long id) {
        return pilotService.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PilotDto create(@RequestBody PilotDto dto) {
        return pilotService.create(dto);
    }

    @PutMapping("/{id}")
    public PilotDto update(@PathVariable Long id, @RequestBody PilotDto dto) {
        return pilotService.update(id, dto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        pilotService.delete(id);
    }
}
