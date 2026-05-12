package com.example.pilotlogbook.dto;

import com.example.pilotlogbook.enums.KategoriaOperacji;
import com.example.pilotlogbook.enums.PoraOperacji;
import com.example.pilotlogbook.enums.TypLotu;
import lombok.Data;
import java.time.LocalDate;

@Data
public class LotDto {
    private Long id;
    private LocalDate dataLotu;
    private Double czasBlock;
    private Double czasAirborne;
    private Double czasPIC;
    private Double czasSIC;
    private KategoriaOperacji kategoriaOperacji;
    private PoraOperacji poraOperacji;
    private TypLotu typLotu;
    private String numerLotu;
    private String uwagi;

    private Long pilotId;
    private String pilotImie;
    private String pilotNazwisko;

    private Long statekPowietrznyId;
    private String statekPowietrznyRejestracja;

    private Long lotniskoStartId;
    private String lotniskoStartKodIcao;

    private Long lotniskoLadowanieId;
    private String lotniskoLadowanieKodIcao;

    private Long rodzajZadaniaId;
    private String rodzajZadaniaNazwa;
}
