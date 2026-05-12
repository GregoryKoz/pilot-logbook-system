package com.example.pilotlogbook.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class PilotUprawnienie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate dataWydania;

    private LocalDate dataWaznosci;

    @ManyToOne
    @JoinColumn(name = "pilot_id")
    private Pilot pilot;

    @ManyToOne
    @JoinColumn(name = "uprawnienie_id")
    private Uprawnienie uprawnienie;
}