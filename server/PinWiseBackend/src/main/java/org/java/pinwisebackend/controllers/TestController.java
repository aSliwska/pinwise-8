package org.java.pinwisebackend.controllers;

import com.fasterxml.jackson.databind.node.ObjectNode;
import jakarta.transaction.Transactional;
import org.java.pinwisebackend.entities.User;
import org.java.pinwisebackend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping("/app")
@CrossOrigin
public class TestController {

    @Autowired
    private UserRepository repository;



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

}
