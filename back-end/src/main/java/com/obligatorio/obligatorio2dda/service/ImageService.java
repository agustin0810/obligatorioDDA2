package com.obligatorio.obligatorio2dda.service;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.obligatorio.obligatorio2dda.entity.Image;
import com.obligatorio.obligatorio2dda.repository.ImageRepository;

@Service
public interface ImageService {
    
    public String uploadImage(String base64Image, Long planId);
    public ArrayList<String> downloadImages(Long id);
    public Optional<Image> findById(Long Id);

}
