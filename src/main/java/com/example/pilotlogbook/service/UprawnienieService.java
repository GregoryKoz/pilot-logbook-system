package com.example.pilotlogbook.service;

import com.example.pilotlogbook.dto.UprawnienieDto;
import com.example.pilotlogbook.entity.Uprawnienie;
import com.example.pilotlogbook.exception.ResourceNotFoundException;
import com.example.pilotlogbook.repository.UprawnienieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UprawnienieService {

    private final UprawnienieRepository repository;

    public List<UprawnienieDto> findAll() {
        return repository.findAll().stream().map(this::toDto).toList();
    }

    public UprawnienieDto findById(Long id) {
        return toDto(repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Uprawnienie not found: " + id)));
    }

    public UprawnienieDto create(UprawnienieDto dto) {
        Uprawnienie u = new Uprawnienie();
        applyDto(dto, u);
        return toDto(repository.save(u));
    }

    public UprawnienieDto update(Long id, UprawnienieDto dto) {
        Uprawnienie u = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Uprawnienie not found: " + id));
        applyDto(dto, u);
        return toDto(repository.save(u));
    }

    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Uprawnienie not found: " + id);
        }
        repository.deleteById(id);
    }

    private void applyDto(UprawnienieDto dto, Uprawnienie u) {
        u.setNazwa(dto.getNazwa());
        u.setOpis(dto.getOpis());
    }

    public UprawnienieDto toDto(Uprawnienie u) {
        UprawnienieDto dto = new UprawnienieDto();
        dto.setId(u.getId());
        dto.setNazwa(u.getNazwa());
        dto.setOpis(u.getOpis());
        return dto;
    }
}
