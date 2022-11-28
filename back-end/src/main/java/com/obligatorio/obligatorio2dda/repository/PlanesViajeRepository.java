package com.obligatorio.obligatorio2dda.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.obligatorio.obligatorio2dda.entity.PlanesViaje;

@Repository
public interface PlanesViajeRepository extends JpaRepository<PlanesViaje, Integer>{
    
}
