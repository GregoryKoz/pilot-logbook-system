package com.example.pilotlogbook.service;

import com.example.pilotlogbook.dto.PilotDto;
import com.example.pilotlogbook.entity.Pilot;
import com.example.pilotlogbook.exception.ResourceNotFoundException;
import com.example.pilotlogbook.repository.PilotRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PilotService {

    private final PilotRepository pilotRepository;

    public List<PilotDto> findAll() {
        return pilotRepository.findAll().stream().map(this::toDto).toList();
    }

    public PilotDto findById(Long id) {
        return toDto(pilotRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Pilot not found: " + id)));
    }

    public PilotDto create(PilotDto dto) {
        Pilot p = new Pilot();
        applyDto(dto, p);
        return toDto(pilotRepository.save(p));
    }

    public PilotDto update(Long id, PilotDto dto) {
        Pilot p = pilotRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Pilot not found: " + id));
        applyDto(dto, p);
        return toDto(pilotRepository.save(p));
    }

    public void delete(Long id) {
        if (!pilotRepository.existsById(id)) {
            throw new ResourceNotFoundException("Pilot not found: " + id);
        }
        pilotRepository.deleteById(id);
    }

    private void applyDto(PilotDto dto, Pilot p) {
        p.setImie(dto.getImie());
        p.setNazwisko(dto.getNazwisko());
        p.setNumerLicencji(dto.getNumerLicencji());
        p.setDataUrodzenia(dto.getDataUrodzenia());
        p.setNarodowosc(dto.getNarodowosc());
    }

    public PilotDto toDto(Pilot p) {
        PilotDto dto = new PilotDto();
        dto.setId(p.getId());
        dto.setImie(p.getImie());
        dto.setNazwisko(p.getNazwisko());
        dto.setNumerLicencji(p.getNumerLicencji());
        dto.setDataUrodzenia(p.getDataUrodzenia());
        dto.setNarodowosc(p.getNarodowosc());
        return dto;
    }
}
