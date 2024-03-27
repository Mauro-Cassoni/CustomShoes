package it.epicode.CustomShoesBE.controller;

import it.epicode.CustomShoesBE.enums.UserType;
import it.epicode.CustomShoesBE.exception.AlreadyAdminException;
import it.epicode.CustomShoesBE.exception.BadRequestExceptionHandler;
import it.epicode.CustomShoesBE.exception.NotFoundException;
import it.epicode.CustomShoesBE.model.Address;
import it.epicode.CustomShoesBE.model.User;
import it.epicode.CustomShoesBE.request.UserRequest;
import it.epicode.CustomShoesBE.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import it.epicode.CustomShoesBE.responses.DefaultResponse;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("")
    public ResponseEntity<DefaultResponse> getAll(Pageable pageable){
        return DefaultResponse.noMessage(userService.getAll(pageable), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DefaultResponse> getById(@PathVariable Long id)throws NotFoundException {
        return DefaultResponse.noMessage(userService.getById(id), HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<DefaultResponse> create(@RequestBody @Validated UserRequest userRequest, BindingResult bindingResult) throws NotFoundException, BadRequestExceptionHandler {
        if (bindingResult.hasErrors()) throw  new BadRequestExceptionHandler(bindingResult.getAllErrors().stream().map(DefaultMessageSourceResolvable::getDefaultMessage).toList().toString());
        return DefaultResponse.noMessage(userService.save(userRequest), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DefaultResponse> update(@PathVariable long id, @RequestBody UserRequest userRequest, BindingResult bindingResult) throws NotFoundException, BadRequestExceptionHandler {
        if (bindingResult.hasErrors()) throw new  BadRequestExceptionHandler(bindingResult.getAllErrors().stream().map(DefaultMessageSourceResolvable::getDefaultMessage).toList().toString());
        return DefaultResponse.noMessage(userService.update(id, userRequest), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<DefaultResponse> delete(@PathVariable Long id)throws NotFoundException{
        userService.delete(id);
        return DefaultResponse.noObject("Users with id " + id + " has been deleted", HttpStatus.OK);
    }

    @PutMapping("/{userId}/promoteToAdmin")
    public ResponseEntity<DefaultResponse> promoteUserToAdmin(@PathVariable("userId") Long userId) throws NotFoundException, AlreadyAdminException {
        userService.updateUserToAdmin(userId);
        return DefaultResponse.noObject("User successfully promoted to admin role.", HttpStatus.OK);
    }

    @GetMapping("/{userId}/addresses")
    public ResponseEntity<DefaultResponse> getUserAddresses(@PathVariable("userId") Long userId) throws NotFoundException {
        User user = userService.getById(userId);
        List<Address> addresses = userService.getUserAddresses(user);
        return DefaultResponse.noMessage(addresses, HttpStatus.OK);
    }



}
