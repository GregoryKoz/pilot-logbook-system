package com.example.pilotlogbook.repository;

import com.example.pilotlogbook.entity.Lot;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LotRepository extends JpaRepository<Lot, Long> {
}