package com.example.pilotlogbook.dto;

import lombok.Data;

@Data
public class StatekPowietrznyDto {
    private Long id;
    private String rejestracja;
    private Long typStatkuPowietrznegoId;
    private String typStatkuPowietrznegoModel;
    private String typStatkuPowietrznegoProducent;
}
