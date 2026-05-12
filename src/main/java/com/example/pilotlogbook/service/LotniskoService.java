package com.example.pilotlogbook.service;

import com.example.pilotlogbook.dto.LotniskoDto;
import com.example.pilotlogbook.entity.Lotnisko;
import com.example.pilotlogbook.exception.ResourceNotFoundException;
import com.example.pilotlogbook.repository.LotniskoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LotniskoService {

    private final LotniskoRepository lotniskoRepository;

    public List<LotniskoDto> findAll() {
        return lotniskoRepository.findAll().stream().map(this::toDto).toList();
    }

    public LotniskoDto findById(Long id) {
        return toDto(lotniskoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lotnisko not found: " + id)));
    }

    public LotniskoDto create(LotniskoDto dto) {
        Lotnisko l = new Lotnisko();
        applyDto(dto, l);
        return toDto(lotniskoRepository.save(l));
    }

    public LotniskoDto update(Long id, LotniskoDto dto) {
        Lotnisko l = lotniskoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lotnisko not found: " + id));
        applyDto(dto, l);
        return toDto(lotniskoRepository.save(l));
    }

    public void delete(Long id) {
        if (!lotniskoRepository.existsById(id)) {
            throw new ResourceNotFoundException("Lotnisko not found: " + id);
        }
        lotniskoRepository.deleteById(id);
    }

    private void applyDto(LotniskoDto dto, Lotnisko l) {
        l.setKodIcao(dto.getKodIcao());
        l.setNazwa(dto.getNazwa());
        l.setMiasto(dto.getMiasto());
        l.setKraj(dto.getKraj());
    }

    public LotniskoDto toDto(Lotnisko l) {
        LotniskoDto dto = new LotniskoDto();
        dto.setId(l.getId());
        dto.setKodIcao(l.getKodIcao());
        dto.setNazwa(l.getNazwa());
        dto.setMiasto(l.getMiasto());
        dto.setKraj(l.getKraj());
        return dto;
    }
}
