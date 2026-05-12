package com.example.pilotlogbook.dto;

import lombok.Data;

@Data
public class LotniskoDto {
    private Long id;
    private String kodIcao;
    private String nazwa;
    private String miasto;
    private String kraj;
}
