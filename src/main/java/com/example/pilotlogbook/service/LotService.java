package com.example.pilotlogbook.service;

import com.example.pilotlogbook.dto.LotDto;
import com.example.pilotlogbook.dto.NalotSumarycznyDto;
import com.example.pilotlogbook.entity.*;
import com.example.pilotlogbook.exception.ResourceNotFoundException;
import com.example.pilotlogbook.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LotService {

    private final LotRepository lotRepository;
    private final PilotRepository pilotRepository;
    private final StatekPowietrznyRepository statekRepository;
    private final LotniskoRepository lotniskoRepository;
    private final RodzajZadaniaRepository rodzajZadaniaRepository;

    public List<LotDto> findAll() {
        return lotRepository.findAll().stream().map(this::toDto).toList();
    }

    public List<LotDto> findByPilotId(Long pilotId) {
        return lotRepository.findByPilotId(pilotId).stream().map(this::toDto).toList();
    }

    public LotDto findById(Long id) {
        return toDto(lotRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lot not found: " + id)));
    }

    public LotDto create(LotDto dto) {
        Lot l = new Lot();
        applyDto(dto, l);
        return toDto(lotRepository.save(l));
    }

    public LotDto update(Long id, LotDto dto) {
        Lot l = lotRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lot not found: " + id));
        applyDto(dto, l);
        return toDto(lotRepository.save(l));
    }

    public void delete(Long id) {
        if (!lotRepository.existsById(id)) {
            throw new ResourceNotFoundException("Lot not found: " + id);
        }
        lotRepository.deleteById(id);
    }

    public List<NalotSumarycznyDto> getNalotSumaryczny() {
        List<Lot> loty = lotRepository.findAll();
        Map<Long, List<Lot>> byPilot = loty.stream()
                .filter(l -> l.getPilot() != null)
                .collect(Collectors.groupingBy(l -> l.getPilot().getId()));

        return byPilot.entrySet().stream().map(entry -> {
            Long pilotId = entry.getKey();
            List<Lot> pilotLoty = entry.getValue();
            Pilot p = pilotLoty.get(0).getPilot();
            return new NalotSumarycznyDto(
                    pilotId,
                    p.getImie(),
                    p.getNazwisko(),
                    sum(pilotLoty, Lot::getCzasBlock),
                    sum(pilotLoty, Lot::getCzasAirborne),
                    sum(pilotLoty, Lot::getCzasPIC),
                    sum(pilotLoty, Lot::getCzasSIC),
                    (long) pilotLoty.size()
            );
        }).toList();
    }

    private double sum(List<Lot> loty, java.util.function.Function<Lot, Double> getter) {
        return loty.stream()
                .map(getter)
                .filter(v -> v != null)
                .mapToDouble(Double::doubleValue)
                .sum();
    }

    private void applyDto(LotDto dto, Lot l) {
        l.setDataLotu(dto.getDataLotu());
        l.setCzasBlock(dto.getCzasBlock());
        l.setCzasAirborne(dto.getCzasAirborne());
        l.setCzasPIC(dto.getCzasPIC());
        l.setCzasSIC(dto.getCzasSIC());
        l.setKategoriaOperacji(dto.getKategoriaOperacji());
        l.setPoraOperacji(dto.getPoraOperacji());
        l.setTypLotu(dto.getTypLotu());
        l.setNumerLotu(dto.getNumerLotu());
        l.setUwagi(dto.getUwagi());

        if (dto.getPilotId() != null) {
            l.setPilot(pilotRepository.findById(dto.getPilotId())
                    .orElseThrow(() -> new ResourceNotFoundException("Pilot not found: " + dto.getPilotId())));
        }
        if (dto.getStatekPowietrznyId() != null) {
            l.setStatekPowietrzny(statekRepository.findById(dto.getStatekPowietrznyId())
                    .orElseThrow(() -> new ResourceNotFoundException("StatekPowietrzny not found: " + dto.getStatekPowietrznyId())));
        }
        if (dto.getLotniskoStartId() != null) {
            l.setLotniskoStart(lotniskoRepository.findById(dto.getLotniskoStartId())
                    .orElseThrow(() -> new ResourceNotFoundException("Lotnisko not found: " + dto.getLotniskoStartId())));
        }
        if (dto.getLotniskoLadowanieId() != null) {
            l.setLotniskoLadowanie(lotniskoRepository.findById(dto.getLotniskoLadowanieId())
                    .orElseThrow(() -> new ResourceNotFoundException("Lotnisko not found: " + dto.getLotniskoLadowanieId())));
        }
        if (dto.getRodzajZadaniaId() != null) {
            l.setRodzajZadania(rodzajZadaniaRepository.findById(dto.getRodzajZadaniaId())
                    .orElseThrow(() -> new ResourceNotFoundException("RodzajZadania not found: " + dto.getRodzajZadaniaId())));
        }
    }

    public LotDto toDto(Lot l) {
        LotDto dto = new LotDto();
        dto.setId(l.getId());
        dto.setDataLotu(l.getDataLotu());
        dto.setCzasBlock(l.getCzasBlock());
        dto.setCzasAirborne(l.getCzasAirborne());
        dto.setCzasPIC(l.getCzasPIC());
        dto.setCzasSIC(l.getCzasSIC());
        dto.setKategoriaOperacji(l.getKategoriaOperacji());
        dto.setPoraOperacji(l.getPoraOperacji());
        dto.setTypLotu(l.getTypLotu());
        dto.setNumerLotu(l.getNumerLotu());
        dto.setUwagi(l.getUwagi());
        if (l.getPilot() != null) {
            dto.setPilotId(l.getPilot().getId());
            dto.setPilotImie(l.getPilot().getImie());
            dto.setPilotNazwisko(l.getPilot().getNazwisko());
        }
        if (l.getStatekPowietrzny() != null) {
            dto.setStatekPowietrznyId(l.getStatekPowietrzny().getId());
            dto.setStatekPowietrznyRejestracja(l.getStatekPowietrzny().getRejestracja());
        }
        if (l.getLotniskoStart() != null) {
            dto.setLotniskoStartId(l.getLotniskoStart().getId());
            dto.setLotniskoStartKodIcao(l.getLotniskoStart().getKodIcao());
        }
        if (l.getLotniskoLadowanie() != null) {
            dto.setLotniskoLadowanieId(l.getLotniskoLadowanie().getId());
            dto.setLotniskoLadowanieKodIcao(l.getLotniskoLadowanie().getKodIcao());
        }
        if (l.getRodzajZadania() != null) {
            dto.setRodzajZadaniaId(l.getRodzajZadania().getId());
            dto.setRodzajZadaniaNazwa(l.getRodzajZadania().getNazwa());
        }
        return dto;
    }
}
