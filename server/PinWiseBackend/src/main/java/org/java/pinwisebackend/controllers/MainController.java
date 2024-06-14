package org.java.pinwisebackend.controllers;

import com.fasterxml.jackson.databind.node.ObjectNode;
import jakarta.transaction.Transactional;
import org.java.pinwisebackend.entities.Pin;
import org.java.pinwisebackend.entities.PinType;
import org.java.pinwisebackend.entities.Service;
import org.java.pinwisebackend.entities.User;
import org.java.pinwisebackend.repositories.PinRepository;
import org.java.pinwisebackend.repositories.PinTypeRepository;
import org.java.pinwisebackend.repositories.ServiceRepository;
import org.java.pinwisebackend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController()
@RequestMapping("/app")
@CrossOrigin
public class MainController {

    @Autowired
    private UserRepository repository;

    @Autowired
    private ServiceRepository serviceRepository;

    @Autowired
    private PinRepository pinRepository;

    @Autowired
    private PinTypeRepository pinTypeRepository;


    @PostMapping("/add")
    ResponseEntity<User> addUser(@RequestBody User user){
        User savedUser = repository.save(user);
        return new ResponseEntity<>(savedUser, HttpStatus.OK);
    }

    @GetMapping("/users")
    ResponseEntity<List<User>> get(){
        List<User> users = repository.findAll();
        return new ResponseEntity<>(users,HttpStatus.OK);
    }

    @GetMapping("/users/{id}")
    ResponseEntity<User> getUser(@PathVariable long id){
        User user = repository.findUserById(id);
        if(user == null)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(user,HttpStatus.OK);
    }

    @PutMapping("/users/{id}")
    ResponseEntity<User> updateUser(@PathVariable long id, @RequestBody User user){
        //TODO
        return null;
    }

    @Transactional
    @DeleteMapping("/users/{id}")
    ResponseEntity<User> deleteUser(@PathVariable long id){
        if(repository.findUserById(id) == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        repository.deleteUserById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/change-email")
    ResponseEntity<String> changeEmail(@RequestBody ObjectNode json){
        User user = repository.findUserByEmail(json.get("old_email").asText());
        if(user == null)
            return new ResponseEntity<>("Podano zły adres email",HttpStatus.BAD_REQUEST);

        if(!user.getPassword().equals(json.get("password").asText()))
            return new ResponseEntity<>("Podano złe hasło",HttpStatus.BAD_REQUEST);

        user.setEmail(json.get("new_email").asText());
        repository.save(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @PostMapping("/userPins")
    ResponseEntity<List<Pin>> getUserPins(@RequestBody Map<String,String> obj){
        User user = repository.findByEmail(obj.get("email"));
        if(user == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(user.getPin(),HttpStatus.OK);
    }

    @PostMapping("/matchUserPins")
    ResponseEntity<List<Pin>> getMatchingUserPins(@RequestBody Map<String,Object> obj){
        List<Pin> allPins = repository.findByEmail((String)obj.get("email")).getPin();
        if(allPins == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        List<Pin> filtered = allPins.stream()
                .filter(pin -> pin.getSerwis().compareTo(((Number)(obj.get("serwis_id"))).longValue()) == 0)
                .filter(pin -> pin.getType().getId().compareTo(((Number)(obj.get("type_id"))).longValue()) == 0)
                .filter(pin -> {
                    if(obj.get("company_name") == null){
                        return obj.get("company_name") == pin.getCompanyName();
                    }
                    return pin.getCompanyName().compareTo((String) (obj.get("company_name"))) == 0;
                }).toList();
        return new ResponseEntity<>(filtered,HttpStatus.OK);
    }

    @Transactional
    @PostMapping("/updatePin")
    ResponseEntity<Pin> updatePinCoords(@RequestBody Map<String,Object> obj){
        User user = repository.findByEmail((String)obj.get("email"));
        Long pinId = ((Number)(obj.get("id"))).longValue();
        Pin foundPin = user.getPin().stream()
                        .filter(pin -> pin.getId().equals(pinId))
                                .findFirst().get();

        foundPin.setCoordinateX(((Number) (obj.get("x_coord"))).doubleValue());
        foundPin.setCoordinateY(((Number) (obj.get("y_coord"))).doubleValue());
        pinRepository.save(foundPin);

        return new ResponseEntity<>(pinRepository.findById(((Number)(obj.get("id"))).longValue()).get(),HttpStatus.OK);
    }

    @Transactional
    @DeleteMapping("/deletePin")
    ResponseEntity<Long> deletePin(@RequestParam("email") String email,@RequestParam("id") Long id){
        User user = repository.findByEmail(email);
        if(user == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        pinRepository.deleteByIdAndUserId(id,user);

        return new ResponseEntity<>(HttpStatus.OK);
    }


    @Transactional
    @PostMapping("/createPin")
    ResponseEntity<Long> createPin(@RequestBody Map<String, Object> obj){
        Pin newPin = new Pin();
        User user = repository.findByEmail((String)obj.get("email"));
        PinType pinType = pinTypeRepository.findById(((Number)(obj.get("type_id"))).longValue()).get();
        Service service = serviceRepository.findById(((Number)(obj.get("id_serwis"))).longValue()).get();

        newPin.setService(service);
        newPin.setType(pinType);
        newPin.setUser(user);
        newPin.setCoordinateX(((Number)(obj.get("x_coord"))).doubleValue());
        newPin.setCoordinateY(((Number)(obj.get("y_coord"))).doubleValue());
        newPin.setCompanyName((String)obj.get("company_name"));
        newPin.setAdres((String) obj.get("adres"));
        newPin.setSerwis(((Number)(obj.get("id_serwis"))).longValue());
        newPin.setModificationDate(LocalDateTime.now());

        pinRepository.save(newPin);

        return new ResponseEntity<>(newPin.getId(),HttpStatus.OK);
    }



}
