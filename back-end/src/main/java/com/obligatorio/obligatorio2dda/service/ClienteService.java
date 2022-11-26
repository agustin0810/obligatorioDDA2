package com.obligatorio.obligatorio2dda.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.obligatorio.obligatorio2dda.entity.Cliente;

@Service
public interface ClienteService {
    public Iterable<Cliente> findAll();
    public Optional<Cliente> findById(Long Id);
    public Cliente save(Cliente save);
    public void deleteById(int Ci);
    public String checkRepeated(int ci);

}