package com.example.pilotlogbook.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class PilotUprawnienieDto {
    private Long id;
    private LocalDate dataWydania;
    private LocalDate dataWaznosci;
    private Long pilotId;
    private String pilotImie;
    private String pilotNazwisko;
    private Long uprawnienieId;
    private String uprawnienieNazwa;
    private boolean wygasajace;
}
