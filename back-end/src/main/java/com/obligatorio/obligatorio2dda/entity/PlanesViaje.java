package com.obligatorio.obligatorio2dda.entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "planesViaje")
public class PlanesViaje implements Serializable{
    
    @Id
    @Column(name = "id", length = 20)
    private int id;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Column(name = "destiny", length = 20)
    private String destiny;

    @Column(name = "date", length = 20)
    private Date date;

    @Enumerated(value = EnumType.STRING)
    private ModalityType modality;

    @Column(name = "cost", length = 20)
    private Double cost;

    @Column(name = "pictures", length = 20)
    private ArrayList pictures;

    public String getDestiny() {
        return destiny;
    }

    public void setDestiny(String destiny) {
        this.destiny = destiny;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public ModalityType getModality() {
        return modality;
    }

    public void setModality(ModalityType modality) {
        this.modality = modality;
    }

    public Double getCost() {
        return cost;
    }

    public void setCost(Double cost) {
        this.cost = cost;
    }

    public ArrayList getPictures() {
        return pictures;
    }

    public void setPictures(ArrayList pictures) {
        this.pictures = pictures;
    }

    public PlanesViaje() {
    }

    public PlanesViaje(int id, String destiny, Date date, ModalityType modality, Double cost, ArrayList pictures) {
        this.id = id;
        this.destiny = destiny;
        this.date = date;
        this.modality = modality;
        this.cost = cost;
        this.pictures = pictures;
    }


}
