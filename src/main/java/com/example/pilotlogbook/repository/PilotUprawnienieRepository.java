package com.example.pilotlogbook.repository;

import com.example.pilotlogbook.entity.PilotUprawnienie;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PilotUprawnienieRepository extends JpaRepository<PilotUprawnienie, Long> {
    List<PilotUprawnienie> findByPilotId(Long pilotId);
}
