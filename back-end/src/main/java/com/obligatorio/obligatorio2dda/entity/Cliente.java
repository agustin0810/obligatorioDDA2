package com.obligatorio.obligatorio2dda.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Id;
import javax.persistence.Enumerated;
import javax.persistence.Table;

@Entity
@Table(name = "clientes")
public class Cliente implements Serializable{
    
    @Id
    @Column(length = 8)
    private Long ci;

    @Column(name = "name", length =30)
    private String name;

    @Column(name = "lastname", length =30)
    private String lastname;

    @Column(name = "email", length =30)
    private String email;

    @Enumerated(value = EnumType.STRING)
    private Tipo tipo;

    public Cliente(){
        
    }
    public Cliente(Long ci, String name, String lastname, String email, Tipo tipo) {
        this.ci = ci;
        this.name = name;
        this.lastname = lastname;
        this.email = email;
        this.tipo = tipo;
    }

    public Long getCi() {
        return ci;
    }

    public void setCi(Long ci) {
        this.ci = ci;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastName() {
        return lastname;
    }

    public void setLastName(String lastname) {
        this.lastname = lastname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Tipo getTipo() {
        return tipo;
    }

    public void setTipo(Tipo tipo) {
        this.tipo = tipo;
    }
}
