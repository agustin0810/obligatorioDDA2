package com.obligatorio.obligatorio2dda.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.obligatorio.obligatorio2dda.entity.PlanesViaje;

@Service
public interface PlanesViajeService {
    public Iterable<PlanesViaje> findAll();
    public Optional<PlanesViaje> findById(Long Id);
    public PlanesViaje save(PlanesViaje save);
    public void deleteById(Long Id);
}