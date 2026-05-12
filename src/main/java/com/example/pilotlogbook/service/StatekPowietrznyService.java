package com.example.pilotlogbook.service;

import com.example.pilotlogbook.dto.StatekPowietrznyDto;
import com.example.pilotlogbook.entity.StatekPowietrzny;
import com.example.pilotlogbook.entity.TypStatkuPowietrznego;
import com.example.pilotlogbook.exception.ResourceNotFoundException;
import com.example.pilotlogbook.repository.StatekPowietrznyRepository;
import com.example.pilotlogbook.repository.TypStatkuPowietrznegoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StatekPowietrznyService {

    private final StatekPowietrznyRepository repository;
    private final TypStatkuPowietrznegoRepository typRepository;

    public List<StatekPowietrznyDto> findAll() {
        return repository.findAll().stream().map(this::toDto).toList();
    }

    public StatekPowietrznyDto findById(Long id) {
        return toDto(repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("StatekPowietrzny not found: " + id)));
    }

    public StatekPowietrznyDto create(StatekPowietrznyDto dto) {
        StatekPowietrzny s = new StatekPowietrzny();
        applyDto(dto, s);
        return toDto(repository.save(s));
    }

    public StatekPowietrznyDto update(Long id, StatekPowietrznyDto dto) {
        StatekPowietrzny s = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("StatekPowietrzny not found: " + id));
        applyDto(dto, s);
        return toDto(repository.save(s));
    }

    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("StatekPowietrzny not found: " + id);
        }
        repository.deleteById(id);
    }

    private void applyDto(StatekPowietrznyDto dto, StatekPowietrzny s) {
        s.setRejestracja(dto.getRejestracja());
        if (dto.getTypStatkuPowietrznegoId() != null) {
            TypStatkuPowietrznego typ = typRepository.findById(dto.getTypStatkuPowietrznegoId())
                    .orElseThrow(() -> new ResourceNotFoundException("TypStatkuPowietrznego not found: " + dto.getTypStatkuPowietrznegoId()));
            s.setTypStatkuPowietrznego(typ);
        }
    }

    public StatekPowietrznyDto toDto(StatekPowietrzny s) {
        StatekPowietrznyDto dto = new StatekPowietrznyDto();
        dto.setId(s.getId());
        dto.setRejestracja(s.getRejestracja());
        if (s.getTypStatkuPowietrznego() != null) {
            dto.setTypStatkuPowietrznegoId(s.getTypStatkuPowietrznego().getId());
            dto.setTypStatkuPowietrznegoModel(s.getTypStatkuPowietrznego().getModel());
            dto.setTypStatkuPowietrznegoProducent(s.getTypStatkuPowietrznego().getProducent());
        }
        return dto;
    }
}
