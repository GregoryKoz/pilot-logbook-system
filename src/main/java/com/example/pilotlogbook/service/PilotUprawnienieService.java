package com.example.pilotlogbook.service;

import com.example.pilotlogbook.dto.PilotUprawnienieDto;
import com.example.pilotlogbook.entity.Pilot;
import com.example.pilotlogbook.entity.PilotUprawnienie;
import com.example.pilotlogbook.entity.Uprawnienie;
import com.example.pilotlogbook.exception.ResourceNotFoundException;
import com.example.pilotlogbook.repository.PilotRepository;
import com.example.pilotlogbook.repository.PilotUprawnienieRepository;
import com.example.pilotlogbook.repository.UprawnienieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PilotUprawnienieService {

    private final PilotUprawnienieRepository repository;
    private final PilotRepository pilotRepository;
    private final UprawnienieRepository uprawnienieRepository;

    public List<PilotUprawnienieDto> findAll() {
        return repository.findAll().stream().map(this::toDto).toList();
    }

    public List<PilotUprawnienieDto> findByPilotId(Long pilotId) {
        return repository.findByPilotId(pilotId).stream().map(this::toDto).toList();
    }

    public PilotUprawnienieDto findById(Long id) {
        return toDto(repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("PilotUprawnienie not found: " + id)));
    }

    public PilotUprawnienieDto create(PilotUprawnienieDto dto) {
        PilotUprawnienie pu = new PilotUprawnienie();
        applyDto(dto, pu);
        return toDto(repository.save(pu));
    }

    public PilotUprawnienieDto update(Long id, PilotUprawnienieDto dto) {
        PilotUprawnienie pu = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("PilotUprawnienie not found: " + id));
        applyDto(dto, pu);
        return toDto(repository.save(pu));
    }

    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("PilotUprawnienie not found: " + id);
        }
        repository.deleteById(id);
    }

    private void applyDto(PilotUprawnienieDto dto, PilotUprawnienie pu) {
        pu.setDataWydania(dto.getDataWydania());
        pu.setDataWaznosci(dto.getDataWaznosci());
        Pilot pilot = pilotRepository.findById(dto.getPilotId())
                .orElseThrow(() -> new ResourceNotFoundException("Pilot not found: " + dto.getPilotId()));
        pu.setPilot(pilot);
        Uprawnienie uprawnienie = uprawnienieRepository.findById(dto.getUprawnienieId())
                .orElseThrow(() -> new ResourceNotFoundException("Uprawnienie not found: " + dto.getUprawnienieId()));
        pu.setUprawnienie(uprawnienie);
    }

    public PilotUprawnienieDto toDto(PilotUprawnienie pu) {
        PilotUprawnienieDto dto = new PilotUprawnienieDto();
        dto.setId(pu.getId());
        dto.setDataWydania(pu.getDataWydania());
        dto.setDataWaznosci(pu.getDataWaznosci());
        dto.setPilotId(pu.getPilot().getId());
        dto.setPilotImie(pu.getPilot().getImie());
        dto.setPilotNazwisko(pu.getPilot().getNazwisko());
        dto.setUprawnienieId(pu.getUprawnienie().getId());
        dto.setUprawnienieNazwa(pu.getUprawnienie().getNazwa());
        // wygasające = ważność za mniej niż 30 dni
        dto.setWygasajace(pu.getDataWaznosci() != null &&
                pu.getDataWaznosci().isBefore(LocalDate.now().plusDays(30)));
        return dto;
    }
}
