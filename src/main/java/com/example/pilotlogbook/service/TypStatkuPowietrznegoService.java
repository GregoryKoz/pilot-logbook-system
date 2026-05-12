package com.example.pilotlogbook.service;

import com.example.pilotlogbook.dto.TypStatkuPowietrznegoDto;
import com.example.pilotlogbook.entity.TypStatkuPowietrznego;
import com.example.pilotlogbook.exception.ResourceNotFoundException;
import com.example.pilotlogbook.repository.TypStatkuPowietrznegoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TypStatkuPowietrznegoService {

    private final TypStatkuPowietrznegoRepository repository;

    public List<TypStatkuPowietrznegoDto> findAll() {
        return repository.findAll().stream().map(this::toDto).toList();
    }

    public TypStatkuPowietrznegoDto findById(Long id) {
        return toDto(repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("TypStatkuPowietrznego not found: " + id)));
    }

    public TypStatkuPowietrznegoDto create(TypStatkuPowietrznegoDto dto) {
        TypStatkuPowietrznego t = new TypStatkuPowietrznego();
        applyDto(dto, t);
        return toDto(repository.save(t));
    }

    public TypStatkuPowietrznegoDto update(Long id, TypStatkuPowietrznegoDto dto) {
        TypStatkuPowietrznego t = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("TypStatkuPowietrznego not found: " + id));
        applyDto(dto, t);
        return toDto(repository.save(t));
    }

    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("TypStatkuPowietrznego not found: " + id);
        }
        repository.deleteById(id);
    }

    private void applyDto(TypStatkuPowietrznegoDto dto, TypStatkuPowietrznego t) {
        t.setProducent(dto.getProducent());
        t.setModel(dto.getModel());
        t.setKategoria(dto.getKategoria());
    }

    public TypStatkuPowietrznegoDto toDto(TypStatkuPowietrznego t) {
        TypStatkuPowietrznegoDto dto = new TypStatkuPowietrznegoDto();
        dto.setId(t.getId());
        dto.setProducent(t.getProducent());
        dto.setModel(t.getModel());
        dto.setKategoria(t.getKategoria());
        return dto;
    }
}
