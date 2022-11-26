package com.obligatorio.obligatorio2dda.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.obligatorio.obligatorio2dda.entity.Cliente;
import com.obligatorio.obligatorio2dda.repository.ClienteRepository;

@Service
public class ClienteServiceImpl implements ClienteService{

    @Autowired
    private ClienteRepository clienteRepository;
    
    @Override
    @Transactional(readOnly=true)
    public Iterable<Cliente> findAll() {
        return clienteRepository.findAll();
    }

    @Override
    @Transactional(readOnly=true)
    public Optional<Cliente> findById(Long Id) {
        // TODO Auto-generated method stub
        return clienteRepository.findById(Id);
    }

    @Override
    @Transactional
    public Cliente save(Cliente save) {
        // TODO Auto-generated method stub
        return clienteRepository.save(save);
    }

    @Override
    @Transactional
    public void deleteById(int ci) {
        clienteRepository.deleteById(Long.valueOf(ci));  
    }
    @Override
    @Transactional
    public String checkRepeated(int ci) {
        int selectedCIs = clienteRepository.selectCIsCount(ci);
        if(selectedCIs==0){
            return "false";
        }
        else{
            return "true";
        }
        
    }
    
}
