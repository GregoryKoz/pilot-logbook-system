package com.example.pilotlogbook.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class PilotDto {
    private Long id;
    private String imie;
    private String nazwisko;
    private String numerLicencji;
    private LocalDate dataUrodzenia;
    private String narodowosc;
}
