package com.example.pilotlogbook.repository;

import com.example.pilotlogbook.entity.Pilot;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PilotRepository extends JpaRepository<Pilot, Long> {
}