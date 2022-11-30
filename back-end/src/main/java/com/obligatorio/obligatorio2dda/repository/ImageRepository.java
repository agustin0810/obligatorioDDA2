package com.obligatorio.obligatorio2dda.repository;

import java.util.Optional;

import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.obligatorio.obligatorio2dda.entity.Image;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {
    
    /*@Query(value = "select image_data from images where id=:id", nativeQuery = true )
    byte[] findByIdent(@Param("id") Long id);
    */
    @Query(value = "select image_data from images where plan_id=:id", nativeQuery = true )
    Iterable<Image> findByPlanId(@Param("id") Long id);
    

}
