package com.example.pilotlogbook.entity;

import com.example.pilotlogbook.enums.KategoriaOperacji;
import com.example.pilotlogbook.enums.PoraOperacji;
import com.example.pilotlogbook.enums.TypLotu;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Lot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate dataLotu;

    private Double czasBlock;

    private Double czasAirborne;

    @Column(name = "czas_pic")
    private Double czasPIC;

    @Column(name = "czas_sic")
    private Double czasSIC;

    @Enumerated(EnumType.STRING)
    private KategoriaOperacji kategoriaOperacji;

    @Enumerated(EnumType.STRING)
    private PoraOperacji poraOperacji;

    @Enumerated(EnumType.STRING)
    private TypLotu typLotu;

    private String numerLotu;

    private String uwagi;

    @ManyToOne
    @JoinColumn(name = "pilot_id")
    private Pilot pilot;

    @ManyToOne
    @JoinColumn(name = "statek_powietrzny_id")
    private StatekPowietrzny statekPowietrzny;

    @ManyToOne
    @JoinColumn(name = "lotnisko_start_id")
    private Lotnisko lotniskoStart;

    @ManyToOne
    @JoinColumn(name = "lotnisko_ladowanie_id")
    private Lotnisko lotniskoLadowanie;

    @ManyToOne
    @JoinColumn(name = "rodzaj_zadania_id")
    private RodzajZadania rodzajZadania;
}