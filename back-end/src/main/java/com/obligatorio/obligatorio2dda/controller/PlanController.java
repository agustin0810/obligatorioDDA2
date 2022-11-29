package com.obligatorio.obligatorio2dda.controller;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.obligatorio.obligatorio2dda.service.PlanesViajeService;
import com.obligatorio.obligatorio2dda.entity.ModalityType;
import com.obligatorio.obligatorio2dda.entity.PlanesViaje;

@RestController
@RequestMapping("/plans")

public class PlanController {
    
    @Autowired
    private PlanesViajeService planesViajeService;

    private boolean validateFields(PlanesViaje plan){
        if(plan.getDestiny()==null || plan.getDate()==null || plan.getModality()==null || plan.getCost()==null){

            return false;
        }
        return true;
        
    }
    @CrossOrigin(origins="http://localhost:3000")
    @PostMapping("/add")
    ResponseEntity agregarPlanDeViaje(@RequestBody PlanesViaje planViaje){
        try{
            
            if(validateFields(planViaje)){

                return ResponseEntity.status(HttpStatus.OK).body(planesViajeService.save(planViaje));
            }
            else{
                throw new Exception("No se pudo modificar el plan por problemas con los campos");
            }
        }
        catch(Exception e){
            HashMap<String, String> error = new HashMap<>();
            error.put("errorMsg", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
    
    @CrossOrigin(origins="http://localhost:3000")
    @GetMapping
    ResponseEntity listarPlanes(){
        try{
            return ResponseEntity.status(HttpStatus.OK).body(planesViajeService.findAll());
        }
        catch(Exception e){
            HashMap<String, String> error = new HashMap<>();
            error.put("errorMsg", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/delete")
    ResponseEntity deletePlan(@RequestParam int id) {
        
        try{
            System.out.println(id);
            planesViajeService.deleteById(id);
            
            return ResponseEntity.status(HttpStatus.OK).body(true);
            
        }
        catch(Exception e){
            
            HashMap<String, String> error = new HashMap<>();
            error.put("errorMsg", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @CrossOrigin(origins="http://localhost:3000")
    @GetMapping("{id}")
    ResponseEntity conseguirPlan(@PathVariable int id){
        try{
            return ResponseEntity.status(HttpStatus.OK).body(planesViajeService.findById(id));
        }
        catch(Exception e){
            HashMap<String, String> error = new HashMap<>();
            error.put("errorMsg", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/modify")
    ResponseEntity modify(@RequestBody PlanesViaje plan) {
        try{
            if(validateFields(plan) && (ModalityType.AEREA.equals(plan.getModality()) || ModalityType.MARITIMA.equals(plan.getModality()) || ModalityType.TERRESTRE.equals(plan.getModality()))){
                System.out.println("paso tipos");
                return ResponseEntity.status(HttpStatus.OK).body(planesViajeService.save(plan));
            }
            else{
                throw new Exception("No se pudo modificar el plan por problemas con los campos");
            }
        }
        catch(Exception e){
            
            HashMap<String, String> error = new HashMap<>();
            error.put("errorMsg", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
}
