package com.obligatorio.obligatorio2dda.service;

import java.util.ArrayList;
import java.util.Optional;

import javax.imageio.ImageReadParam;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Base64Utils;
import org.springframework.web.multipart.MultipartFile;

import com.obligatorio.obligatorio2dda.entity.Image;
import com.obligatorio.obligatorio2dda.repository.ImageRepository;
import com.obligatorio.obligatorio2dda.repository.PlanesViajeRepository;
import com.obligatorio.obligatorio2dda.util.ImageUtils;

@Service
public class ImageServiceImpl implements ImageService{
    
    @Autowired
    private ImageRepository imageRepository;

    public String uploadImage(String image, Long planId){
        try{
        imageRepository.save(new Image(null, "image", Base64Utils.encode(image.getBytes()), planId));
        System.out.println(Base64Utils.encode(image.getBytes()));
        return "imagen agregada";
        }
        catch(Exception e){
            return null;
        }
    }
    public ArrayList<String> downloadImages(Long id){
        try{
            Iterable<Image> imgArrayList = imageRepository.findByPlanId(id);
            ArrayList<String> finalStrArrayList = new ArrayList<String>();
            for (Image image : imgArrayList) {
                finalStrArrayList.add(new String(Base64Utils.decode(image.getImageData())));
            }
        return finalStrArrayList;
            //return new String(Base64Utils.decode(imageRepository.findByPlanId(id).get().getImageData()));
        }
        catch(Exception e){
            return null;
        }
    }
    @Override
    public Optional<Image> findById(Long Id) {
        // TODO Auto-generated method stub
        return imageRepository.findById(Id);
    }
}
