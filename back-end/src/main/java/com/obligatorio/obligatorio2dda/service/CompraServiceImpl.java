package com.obligatorio.obligatorio2dda.service;

import java.util.List;
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

    public int getCountForci(Long ci){
        List<Compra> compras = compraRepository.findAll();
        int cont =0;
        for(int i =0; i<compras.size(); i++){
            if(compras.get(i).getCi().equals(ci)){
                cont++;
            }
        }
        return cont;
    }

}
