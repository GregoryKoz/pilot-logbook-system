package com.example.pilotlogbook.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class StatekPowietrzny {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String rejestracja;

    @ManyToOne
    @JoinColumn(name = "typ_statku_powietrznego_id")
    private TypStatkuPowietrznego typStatkuPowietrznego;
}