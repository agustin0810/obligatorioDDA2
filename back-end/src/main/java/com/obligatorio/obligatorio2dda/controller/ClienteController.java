package com.obligatorio.obligatorio2dda.controller;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jackson.JsonObjectDeserializer;
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
import com.obligatorio.obligatorio2dda.entity.Compra;
import com.obligatorio.obligatorio2dda.entity.PlanesViaje;
import com.obligatorio.obligatorio2dda.entity.Tipo;
import com.obligatorio.obligatorio2dda.repository.PlanesViajeRepository;
import com.obligatorio.obligatorio2dda.service.ClienteService;
import com.obligatorio.obligatorio2dda.service.CompraService;
import com.obligatorio.obligatorio2dda.service.PlanesViajeService;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import javax.websocket.server.PathParam;

@RestController
@RequestMapping("/clients")
public class ClienteController {
    @Autowired
    private ClienteService clienteService;
    private CompraService compraService;


    private Tipo updateClientType(Long ci){
        
        System.out.println("aa");
        System.out.println(compraService.findAll());
        ArrayList<Compra> compras = (ArrayList<Compra>) compraService.findAll();
        int cantCompras =0;
        for(int i =0; i<compras.size(); i++){
            if(compras.get(i).getCi()==ci){
                cantCompras++;
            }
        }
        System.out.println(cantCompras);
        if(cantCompras>3){
            Optional<Cliente> unCliente = clienteService.findById(ci);
            unCliente.get().setTipo(Tipo.PREMIUM);
            return Tipo.PREMIUM;
        }
        return Tipo.STANDARD;
        
    }
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
    @CrossOrigin(origins="http://localhost:3000")
    @GetMapping("/getFinalCost")
    ResponseEntity conseguirCostoFinal(@RequestParam Long ci, @RequestParam double costoActual){
        try{
            Optional<Cliente> unCli = clienteService.findById(ci);
            Tipo tipoClient = unCli.get().getTipo();
            if(tipoClient==Tipo.PREMIUM){
                return ResponseEntity.status(HttpStatus.OK).body(costoActual - (costoActual * 0.2));
            }
            else{
                System.out.println(costoActual);

                return ResponseEntity.status(HttpStatus.OK).body(costoActual);
            }
        }
        catch(Exception e){
            HashMap<String, String> error = new HashMap<>();
            error.put("errorMsg", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
    
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/actualizarCliente")
    ResponseEntity actualizarCliente(@RequestParam Long ci, @RequestParam int cantCompras) {
        try{
            Optional<Cliente> unCli = clienteService.findById(ci);
            cantCompras = cantCompras + 1;
            System.out.println(cantCompras);
            if(cantCompras>=3){
                Cliente temp = new Cliente(unCli.get().getCi(), unCli.get().getName(), unCli.get().getLastName(), unCli.get().getEmail(), Tipo.PREMIUM);
                clienteService.save(temp);
            }
            
            return ResponseEntity.status(HttpStatus.OK).body(unCli);
            
            
        }
        catch(Exception e){
            HashMap<String, String> error = new HashMap<>();
            error.put("errorMsg", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
        
    
}
