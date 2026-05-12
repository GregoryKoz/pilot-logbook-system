package com.example.pilotlogbook.service;

import com.example.pilotlogbook.dto.RodzajZadaniaDto;
import com.example.pilotlogbook.entity.RodzajZadania;
import com.example.pilotlogbook.exception.ResourceNotFoundException;
import com.example.pilotlogbook.repository.RodzajZadaniaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RodzajZadaniaService {

    private final RodzajZadaniaRepository repository;

    public List<RodzajZadaniaDto> findAll() {
        return repository.findAll().stream().map(this::toDto).toList();
    }

    public RodzajZadaniaDto findById(Long id) {
        return toDto(repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("RodzajZadania not found: " + id)));
    }

    public RodzajZadaniaDto create(RodzajZadaniaDto dto) {
        RodzajZadania r = new RodzajZadania();
        applyDto(dto, r);
        return toDto(repository.save(r));
    }

    public RodzajZadaniaDto update(Long id, RodzajZadaniaDto dto) {
        RodzajZadania r = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("RodzajZadania not found: " + id));
        applyDto(dto, r);
        return toDto(repository.save(r));
    }

    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("RodzajZadania not found: " + id);
        }
        repository.deleteById(id);
    }

    private void applyDto(RodzajZadaniaDto dto, RodzajZadania r) {
        r.setNazwa(dto.getNazwa());
        r.setOpis(dto.getOpis());
    }

    public RodzajZadaniaDto toDto(RodzajZadania r) {
        RodzajZadaniaDto dto = new RodzajZadaniaDto();
        dto.setId(r.getId());
        dto.setNazwa(r.getNazwa());
        dto.setOpis(r.getOpis());
        return dto;
    }
}
