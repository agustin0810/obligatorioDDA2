package com.obligatorio.obligatorio2dda.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
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
    @Transactional
    public Compra save(Compra save) {
        // TODO Auto-generated method stub
        return compraRepository.save(save);
    }

    @Override
    @Transactional
    public void deleteById(Long compraId) {
        compraRepository.deleteById(compraId);
        
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

    public Iterable<Integer> getComprasForci(Long ci){
        List<Compra> compras = compraRepository.findAll();
        ArrayList<Integer> comprasFiltradas = new ArrayList<Integer>();

        for(int i =0; i<compras.size(); i++){
            if(compras.get(i).getCi().equals(ci)){
                comprasFiltradas.add(compras.get(i).getId());
            }
        }
        return comprasFiltradas;
    }
    public Iterable<Compra> getComprasCI(Long ci){
        List<Compra> compras = compraRepository.findAll();
        
        ArrayList<Compra> comprasFiltradas = new ArrayList<Compra>();
        
        for(int i =0; i<compras.size();i++){
            if(Objects.equals(compras.get(i).getCi(), ci)){

                comprasFiltradas.add(compras.get(i));
            }
        }
        return comprasFiltradas;
    }


}
