package com.obligatorio.obligatorio2dda.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.PropertyMapper.SourceOperator;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.obligatorio.obligatorio2dda.entity.PlanesViaje;
import com.obligatorio.obligatorio2dda.repository.PlanesViajeRepository;

@Service
public class PlanesViajeServiceImpl2 implements PlanesViajeService{
    @Autowired
    private PlanesViajeRepository planesViajeRepository;
    
    @Override
    @Transactional(readOnly=true)
    public Iterable<PlanesViaje> findAll() {
        return planesViajeRepository.findAll();
    }

    @Override
    @Transactional(readOnly=true)
    public Optional<PlanesViaje> findById(int id) {
        // TODO Auto-generated method stub
        try{
        return planesViajeRepository.findById(id);
        }
        catch(Exception e){
            System.out.println(e.getMessage());
            return null;
        }
    }


    @Override
    @Transactional
    public PlanesViaje save(PlanesViaje save) {
        // TODO Auto-generated method stub
        return planesViajeRepository.save(save);
    }

    @Override
    @Transactional
    public void deleteById(int Id) {
        planesViajeRepository.deleteById(Id);
        
    }

    @Override
    public Iterable<PlanesViaje> getPlansListing(ArrayList<Integer> ids, String fecha) {
        // TODO Auto-generated method stub
        try{
            
        List<PlanesViaje> all = planesViajeRepository.findAll();
        ArrayList<PlanesViaje> listFiltered = new ArrayList<PlanesViaje>();
        if(!"null".equals(fecha)){

            ArrayList<PlanesViaje> listFilteredWDate = new ArrayList<PlanesViaje>();
            for(int i =0; i<all.size(); i++){
                Date date = new Date(fecha);
                if(all.get(i).getDate().after(date) && ids.contains(all.get(i).getId())){
                    listFilteredWDate.add(all.get(i));
                }
            }
            ArrayList<PlanesViaje> listFirstFilteredWDate = new ArrayList<PlanesViaje>();

            for(int i =0; i<listFilteredWDate.size(); i++){
                Date fechaMin = listFilteredWDate.get(0).getDate();
                if(listFilteredWDate.get(i).getDate().before(fechaMin) || listFilteredWDate.get(i).getDate().equals(fechaMin)){
                    fechaMin = listFilteredWDate.get(i).getDate();
                    listFirstFilteredWDate.clear();
                    listFirstFilteredWDate.add(listFilteredWDate.get(i));
                }
            }
            return listFirstFilteredWDate;
        }
        for(int i =0; i<all.size(); i++){
            if(ids.contains(all.get(i).getId())){
                listFiltered.add(all.get(i));
            }
        }
        return listFiltered;
        
        }
        catch(Exception e){
            return null;
        }
    }
}
