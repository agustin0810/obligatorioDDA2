package com.obligatorio.obligatorio2dda.controller;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.Optional;

import javax.net.ssl.HttpsURLConnection;
import javax.servlet.http.HttpServletResponse;

import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.Base64Utils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.obligatorio.obligatorio2dda.entity.Image;
import com.obligatorio.obligatorio2dda.entity.PlanesViaje;
import com.obligatorio.obligatorio2dda.service.ImageService;
import com.obligatorio.obligatorio2dda.service.PlanesViajeService;

@RestController
@RequestMapping("/images")
public class ImageController {
    @Autowired
    private ImageService imageService;
    private PlanesViajeService planesViajeService;

    @CrossOrigin(origins="http://localhost:3000")
    @PostMapping("/add")
    ResponseEntity agregarImagen(@RequestBody String image, @RequestParam Long planId){
        try{
            return ResponseEntity.status(HttpStatus.OK).body(imageService.uploadImage(image, planId));
        }
        catch(Exception e){
            
            HashMap<String, String> error = new HashMap<>();
            error.put("errorMsg", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
    @CrossOrigin(origins="http://localhost:3000")
    @GetMapping("/get")
    ResponseEntity conseguirImagen(@RequestParam Long id){
        try{
            System.out.println(id);
            return ResponseEntity.status(HttpStatus.OK).body(imageService.downloadImages(id));
            //System.out.println("ss");
            //System.out.println(Base64Utils.encodeToString(imageService.downloadImage(id)));
            //return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.valueOf("image/png")).body(imageService.downloadImage(id));
        }
        catch(Exception e){
            
            HashMap<String, String> error = new HashMap<>();
            error.put("errorMsg", e.getMessage());
            return null;
        }
    }
    
}
