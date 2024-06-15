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
    ResponseEntity<List<Pin>> getHeatMap(@RequestBody Map<String, Object> obj){
        List<Pin> response = pinRepository.findAll().stream()
                .filter(pin -> pin.getSerwis().compareTo(((Number)(obj.get("serwis_id"))).longValue()) == 0)
                .filter(pin -> pin.getType().getId().compareTo(((Number)(obj.get("type_id"))).longValue()) == 0)
                .filter(pin -> {
                    if(obj.get("company_name") == null){
                        return obj.get("company_name") == pin.getCompanyName();
                    }
                    return pin.getCompanyName().compareTo((String) (obj.get("company_name"))) == 0;
                }).toList();

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/services")
    ResponseEntity<List<Service>> getServices(){
        List<Service> services = serviceRepository.findAll();
        return new ResponseEntity<>(services,HttpStatus.OK);
    }

}
