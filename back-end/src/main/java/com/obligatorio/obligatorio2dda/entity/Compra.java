package com.obligatorio.obligatorio2dda.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@Entity
@Table(name = "compras")
@NamedQuery(name = "Compra.findByci", query = "select count(*) from Compra where ci = ?1")
public class Compra implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCompra;
    
    public Long getIdCompra() {
        return idCompra;
    }

    public void setIdCompra(Long idCompra) {
        this.idCompra = idCompra;
    }

    @Column(length = 8)
    private Long ci;

    @Column(name = "id", length = 20)
    private int id;

    private double precioTotal;

    public Compra() {
    }

    public Compra(Long ci, int id, double precioTotal) {
        this.ci = ci;
        this.id = id;
        this.precioTotal = precioTotal;
    }

    public Long getCi() {
        return ci;
    }

    public void setCi(Long ci) {
        this.ci = ci;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public double getPrecioTotal() {
        return precioTotal;
    }

    public void setPrecioTotal(double precioTotal) {
        this.precioTotal = precioTotal;
    }
}
