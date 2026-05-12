package com.example.pilotlogbook.repository;

import com.example.pilotlogbook.entity.Lotnisko;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LotniskoRepository extends JpaRepository<Lotnisko, Long> {
}