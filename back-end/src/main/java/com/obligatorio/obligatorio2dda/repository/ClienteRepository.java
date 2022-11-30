package com.obligatorio.obligatorio2dda.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.obligatorio.obligatorio2dda.entity.Cliente;
import com.obligatorio.obligatorio2dda.entity.PlanesViaje;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long>{

    @Query(value = "select count(ci) from clientes where ci=:ci", nativeQuery = true )
    int selectCIsCount(@Param("ci") int ci);

    @Query(value = "select cost from planes_viaje where id=:id", nativeQuery = true )
    double findByIdNoOpt(@Param("id") Long id);
}
