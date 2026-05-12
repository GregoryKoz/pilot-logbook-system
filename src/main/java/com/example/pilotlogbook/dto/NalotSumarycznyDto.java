package com.example.pilotlogbook.dto;

import lombok.Data;
import lombok.AllArgsConstructor;

@Data
@AllArgsConstructor
public class NalotSumarycznyDto {
    private Long pilotId;
    private String pilotImie;
    private String pilotNazwisko;
    private Double sumaBlock;
    private Double sumaAirborne;
    private Double sumaPIC;
    private Double sumaSIC;
    private Long liczbaLotow;
}
