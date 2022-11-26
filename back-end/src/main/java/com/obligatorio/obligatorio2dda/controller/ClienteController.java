package com.obligatorio.obligatorio2dda.controller;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.StreamingHttpOutputMessage.Body;

import com.obligatorio.obligatorio2dda.entity.Cliente;
import com.obligatorio.obligatorio2dda.entity.Tipo;
import com.obligatorio.obligatorio2dda.service.ClienteService;

import java.util.HashMap;
import java.util.List;

import javax.websocket.server.PathParam;

@RestController
@RequestMapping("/clients")
public class ClienteController {
    @Autowired
    private ClienteService clienteService;

    private boolean validateFields(Cliente unCliente){
        String stringCi = unCliente.getCi().toString();
        
        if((stringCi.length()>8 || stringCi.toString().length()<7)){
            
            return false;
        }
        else if(unCliente.getName().length()>30){
            
            return false;
        }
        else if(unCliente.getLastName().length()>30){
            
            return false;
        }
        else if(unCliente.getEmail().length()>30){
            
            return false;
        }
        
        return true;
    }
    
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping
    ResponseEntity listarClientes() {
        try{
                return ResponseEntity.status(HttpStatus.OK).body(clienteService.findAll());

        }
        catch(Exception e){
            
            HashMap<String, String> error = new HashMap<>();
            error.put("errorMsg", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/{ci}")
    ResponseEntity buscarCliente(@PathVariable int ci) {
        try{
                return ResponseEntity.status(HttpStatus.OK).body(clienteService.findById(Long.valueOf(ci)));

        }
        catch(Exception e){
            
            HashMap<String, String> error = new HashMap<>();
            error.put("errorMsg", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/checkRepeated")
    ResponseEntity checkRepeated(@RequestParam int ci){
        try{
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(clienteService.checkRepeated(ci));
        }
        catch(Exception e){
            HashMap<String, String> error = new HashMap<>();
            error.put("errorMsg", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
    
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/add")
    ResponseEntity createCliente(@RequestBody Cliente cliente) {
        try{

            if(validateFields(cliente)){

                cliente.setTipo(Tipo.STANDARD);
                return ResponseEntity.status(HttpStatus.OK).body(clienteService.save(cliente));
            }
            else{
                throw new Exception("No se pudo crear el cliente por problemas con los campos");
            }
        }
        catch(Exception e){
            
            HashMap<String, String> error = new HashMap<>();
            error.put("errorMsg", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/delete")
    ResponseEntity deleteCliente(@RequestParam int ci) {
        
        try{
            clienteService.deleteById(ci);
            return ResponseEntity.status(HttpStatus.OK).body(true);
            
        }
        catch(Exception e){
            
            HashMap<String, String> error = new HashMap<>();
            error.put("errorMsg", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/modify")
    ResponseEntity modify(@RequestBody Cliente cliente) {
        try{
            System.out.println(cliente.getName());
            if(validateFields(cliente) && (Tipo.PREMIUM.equals(cliente.getTipo()) || Tipo.STANDARD.equals(cliente.getTipo()))){
                System.out.println("paso tipos");
                return ResponseEntity.status(HttpStatus.OK).body(clienteService.save(cliente));
            }
            else{
                throw new Exception("No se pudo modificar el cliente por problemas con los campos");
            }
        }
        catch(Exception e){
            
            HashMap<String, String> error = new HashMap<>();
            error.put("errorMsg", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
}
