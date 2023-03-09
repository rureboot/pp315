package ru.kata.spring.boot_security.bootstrap.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.bootstrap.model.User;
import ru.kata.spring.boot_security.bootstrap.util.DeleteResponse;
import ru.kata.spring.boot_security.bootstrap.util.UserDTO;
import ru.kata.spring.boot_security.bootstrap.services.UserService;

@RestController
@RequestMapping("/api")
public class ApiController {

    private final UserService userService;

    @Autowired
    public ApiController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/users")
    public ResponseEntity<UserDTO> postUser(@RequestBody User user) {

        userService.save(user);
        UserDTO userDTO = UserDTO.buildUserDTO(user);
        return new ResponseEntity<>(userDTO, HttpStatus.OK);
    }

    @PutMapping("/users")
    public ResponseEntity<UserDTO> putUser(@RequestBody User user) {

        userService.save(user);
        UserDTO userDTO = UserDTO.buildUserDTO(user);
        return new ResponseEntity<>(userDTO, HttpStatus.OK);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<DeleteResponse> deleteUser(@PathVariable Long id) {
        userService.deleteById(id);

        ResponseEntity<DeleteResponse> deleteResponseResponseEntity = new ResponseEntity<>(

                new DeleteResponse(String.format("User with id=%s was deleted", id)), HttpStatus.OK);
        return deleteResponseResponseEntity;
    }

}
