

package com.obligatorio.obligatorio2dda.controller;

import java.util.HashMap;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.obligatorio.obligatorio2dda.entity.Cliente;
import com.obligatorio.obligatorio2dda.entity.Compra;
import com.obligatorio.obligatorio2dda.entity.Tipo;
import com.obligatorio.obligatorio2dda.service.ClienteService;
import com.obligatorio.obligatorio2dda.service.CompraService;

import net.bytebuddy.implementation.bytecode.Throw;

@RestController
@RequestMapping("/compras")
public class CompraController {
    
    @Autowired
    private CompraService compraService;

  
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/add")
    ResponseEntity createCliente(@RequestBody Compra compra) {
        try{

            return ResponseEntity.status(HttpStatus.OK).body(compraService.save(compra));
            
            
        }
        catch(Exception e){
            
            HashMap<String, String> error = new HashMap<>();
            error.put("errorMsg", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/")
    ResponseEntity conseguirCompras() {
        try{

            return ResponseEntity.status(HttpStatus.OK).body(compraService.findAll());
            
            
        }
        catch(Exception e){
            
            HashMap<String, String> error = new HashMap<>();
            error.put("errorMsg", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/getCountForci")
    ResponseEntity countForci(@RequestParam Long ci) {
        try{

            return ResponseEntity.status(HttpStatus.OK).body(compraService.getCountForci(ci));
            
        }
        catch(Exception e){
            
            HashMap<String, String> error = new HashMap<>();
            error.put("errorMsg", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

}