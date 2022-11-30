package com.obligatorio.obligatorio2dda.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.obligatorio.obligatorio2dda.entity.Compra;

@Service
public interface CompraService {
    public Iterable<Compra> findAll();
    public Compra save(Compra save);
    public void deleteById(Long compraId);
    public int getCountForci(Long ci);
    public Iterable<Integer> getComprasForci(Long ci);
    public Iterable<Compra> getComprasCI(Long ci);
}