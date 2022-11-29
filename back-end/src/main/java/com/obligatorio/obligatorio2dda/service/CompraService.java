package com.obligatorio.obligatorio2dda.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.obligatorio.obligatorio2dda.entity.Compra;

@Service
public interface CompraService {
    public Iterable<Compra> findAll();
    public Optional<Compra> findByIds(int Id, int CI);
    public Compra save(Compra save);
    public void deleteByIds(int id, int ci);
    public int getCountForci(Long ci);
}