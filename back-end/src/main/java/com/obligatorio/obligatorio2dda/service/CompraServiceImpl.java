package com.obligatorio.obligatorio2dda.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.obligatorio.obligatorio2dda.entity.Compra;
import com.obligatorio.obligatorio2dda.repository.CompraRepository;

@Service
public class CompraServiceImpl implements CompraService{

    @Autowired
    private CompraRepository compraRepository;
    
    @Override
    @Transactional(readOnly=true)
    public Iterable<Compra> findAll() {
        return compraRepository.findAll();
    }

    @Override
    @Transactional(readOnly=true)
    public Optional<Compra> findByIds(int id, int ci) {
        // TODO Auto-generated method stub
        return compraRepository.findByIds(id, ci);
    }

    @Override
    @Transactional
    public Compra save(Compra save) {
        // TODO Auto-generated method stub
        return compraRepository.save(save);
    }

    @Override
    @Transactional
    public void deleteByIds(int id, int ci) {
        compraRepository.deleteByIds(id, ci);
        
    }
    
}
