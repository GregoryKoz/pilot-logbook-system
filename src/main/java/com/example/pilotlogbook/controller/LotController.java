package com.example.pilotlogbook.controller;

import com.example.pilotlogbook.dto.LotDto;
import com.example.pilotlogbook.dto.NalotSumarycznyDto;
import com.example.pilotlogbook.service.LotService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/loty")
@RequiredArgsConstructor
public class LotController {

    private final LotService lotService;

    @GetMapping
    public List<LotDto> getAll() {
        return lotService.findAll();
    }

    @GetMapping("/{id}")
    public LotDto getById(@PathVariable Long id) {
        return lotService.findById(id);
    }

    @GetMapping("/pilot/{pilotId}")
    public List<LotDto> getByPilot(@PathVariable Long pilotId) {
        return lotService.findByPilotId(pilotId);
    }

    @GetMapping("/nalot-sumaryczny")
    public List<NalotSumarycznyDto> getNalotSumaryczny() {
        return lotService.getNalotSumaryczny();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public LotDto create(@RequestBody LotDto dto) {
        return lotService.create(dto);
    }

    @PutMapping("/{id}")
    public LotDto update(@PathVariable Long id, @RequestBody LotDto dto) {
        return lotService.update(id, dto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        lotService.delete(id);
    }
}
