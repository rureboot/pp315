package ru.kata.spring.boot_security.bootstrap.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.bootstrap.model.User;
import ru.kata.spring.boot_security.bootstrap.util.JsonResponse;
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
    public UserDTO postUser(@RequestBody User user) {

        userService.save(user);

        return UserDTO.buildUserDTO(user);
    }

    @PutMapping("/users")
    public UserDTO putUser(@RequestBody User user) {

        userService.save(user);
        return UserDTO.buildUserDTO(user);
    }

    @DeleteMapping("/users/{id}")
    public JsonResponse deleteUser(@PathVariable Long id) {
        userService.deleteById(id);
        JsonResponse jsonResponse = new JsonResponse();
        jsonResponse.setMsg(String.format("User with id=%s was deleted", id));
        jsonResponse.setOk(true);
        return jsonResponse;
    }

}
