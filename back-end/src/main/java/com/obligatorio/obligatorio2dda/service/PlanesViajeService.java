package com.obligatorio.obligatorio2dda.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.obligatorio.obligatorio2dda.entity.PlanesViaje;

@Service
public interface PlanesViajeService {
    public Iterable<PlanesViaje> findAll();
    public Optional<PlanesViaje> findById(Long id);
    public PlanesViaje save(PlanesViaje save);
    public void deleteById(Long Id);
    public Iterable<PlanesViaje> getPlansListing(ArrayList<Integer> ids, String fecha);
}