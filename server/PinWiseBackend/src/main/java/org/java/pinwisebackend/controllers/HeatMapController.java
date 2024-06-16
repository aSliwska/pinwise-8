package org.java.pinwisebackend.controllers;

import org.java.pinwisebackend.entities.Pin;
import org.java.pinwisebackend.entities.Service;
import org.java.pinwisebackend.repositories.PinRepository;
import org.java.pinwisebackend.repositories.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController()
@RequestMapping("/unauthorized")
@CrossOrigin
public class HeatMapController {

    @Autowired
    private PinRepository pinRepository;

    @Autowired
    private ServiceRepository serviceRepository;

    @GetMapping("/getHeatMap")
    ResponseEntity<List<Pin>> getHeatMap(@RequestParam("serwis_id") Long serwisId, @RequestParam("type_id") Long typeId, @RequestParam("company_name") String companyName){
        List<Pin> response = pinRepository.findAll().stream()
                .filter(pin -> pin.getService().getId().compareTo(serwisId) == 0)
                .filter(pin -> pin.getType().getId().compareTo(typeId) == 0)
                .filter(pin -> {
                    if(companyName == null){
                        return companyName == pin.getCompanyName();
                    }
                    return pin.getCompanyName().compareTo(companyName) == 0;
                }).toList();

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/services")
    ResponseEntity<List<Service>> getServices(){
        List<Service> services = serviceRepository.findAll();
        return new ResponseEntity<>(services,HttpStatus.OK);
    }

}
