package com.obligatorio.obligatorio2dda.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

@Entity
@Table(name = "compras")
@IdClass(Compra.class)
public class Compra implements Serializable{
    @Id
    @Column(length = 8)
    private Long ci;

    @Id
    @Column(name = "id", length = 20)
    private int id;
}
