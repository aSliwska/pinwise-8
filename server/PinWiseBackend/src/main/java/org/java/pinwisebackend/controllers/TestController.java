package org.java.pinwisebackend.controllers;

import org.java.pinwisebackend.entities.User;
import org.java.pinwisebackend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping("/api")
@CrossOrigin
public class TestController {

    @Autowired
    private UserRepository repository;



    @PostMapping("/add")
    ResponseEntity<User> addUser(@RequestBody User user){
        User savedUser = repository.save(user);
        return new ResponseEntity<>(savedUser, HttpStatus.OK);
    }

    @GetMapping("/get")
    List<User> get(){
        return repository.findAll();
    }
}
