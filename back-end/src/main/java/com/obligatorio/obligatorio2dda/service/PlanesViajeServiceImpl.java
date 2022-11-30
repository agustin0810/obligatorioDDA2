package com.obligatorio.obligatorio2dda.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.obligatorio.obligatorio2dda.entity.PlanesViaje;
import com.obligatorio.obligatorio2dda.repository.PlanesViajeRepository;

@Service
public class PlanesViajeServiceImpl implements PlanesViajeService{

    @Autowired
    private PlanesViajeRepository planesViajeRepository;
    
    @Override
    @Transactional(readOnly=true)
    public Iterable<PlanesViaje> findAll() {
        return planesViajeRepository.findAll();
    }

    @Override
    @Transactional(readOnly=true)
    public Optional<PlanesViaje> findById(int Id) {
        // TODO Auto-generated method stub
        return planesViajeRepository.findById(Id);
    }

    @Override
    @Transactional
    public PlanesViaje save(PlanesViaje save) {
        // TODO Auto-generated method stub
        return planesViajeRepository.save(save);
    }

    @Override
    @Transactional
    public void deleteById(int Id) {
        planesViajeRepository.deleteById(Id);
        
    }
    
}
