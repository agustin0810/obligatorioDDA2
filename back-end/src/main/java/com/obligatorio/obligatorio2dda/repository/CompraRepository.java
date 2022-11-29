package com.obligatorio.obligatorio2dda.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.obligatorio.obligatorio2dda.entity.Compra;

@Repository
public interface CompraRepository extends JpaRepository<Compra, Long>{

    @Query(value = "select * from compras where id=:id and ci=:ci", nativeQuery = true )
    Optional<Compra> findByIds(@Param("id") int id, @Param("ci") int ci);

    @Query(value="delete from compras where id=:id and ci=:ci", nativeQuery = true )
    void deleteByIds(@Param("id") int id, @Param("ci") int ci);

    @Query(value="select count(*) from compras where ci=:ci", nativeQuery = true )
    int getCantCompras(@Param("ci") Long ci);

    int findCountByci(Long ci);
}
