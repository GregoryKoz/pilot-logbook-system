package com.example.pilotlogbook.controller;

import com.example.pilotlogbook.entity.Pilot;
import com.example.pilotlogbook.repository.PilotRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pilots")
public class PilotController {

    private final PilotRepository pilotRepository;

    public PilotController(PilotRepository pilotRepository) {
        this.pilotRepository = pilotRepository;
    }

    @GetMapping
    public List<Pilot> getAllPilots() {
        return pilotRepository.findAll();
    }

    @PostMapping
    public Pilot createPilot(@RequestBody Pilot pilot) {
        return pilotRepository.save(pilot);
    }
}