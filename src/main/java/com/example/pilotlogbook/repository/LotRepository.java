package com.example.pilotlogbook.repository;

import com.example.pilotlogbook.entity.Lot;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LotRepository extends JpaRepository<Lot, Long> {
    List<Lot> findByPilotId(Long pilotId);
}
