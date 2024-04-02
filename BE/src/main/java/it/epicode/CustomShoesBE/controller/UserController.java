package it.epicode.CustomShoesBE.controller;

import it.epicode.CustomShoesBE.enums.UserType;
import it.epicode.CustomShoesBE.exception.AlreadyAdminException;
import it.epicode.CustomShoesBE.exception.BadRequestExceptionHandler;
import it.epicode.CustomShoesBE.exception.NotFoundException;
import it.epicode.CustomShoesBE.model.Address;
import it.epicode.CustomShoesBE.model.Product;
import it.epicode.CustomShoesBE.model.User;
import it.epicode.CustomShoesBE.request.PasswordRequest;
import it.epicode.CustomShoesBE.request.UserRequest;
import it.epicode.CustomShoesBE.services.UserService;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
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

    @Autowired
    private PasswordEncoder encoder;

    @GetMapping("all")
    public ResponseEntity<DefaultResponse> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return DefaultResponse.noMessage(users, HttpStatus.OK);
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

    @GetMapping("/{userId}/shippingAddress")
    public ResponseEntity<DefaultResponse> getShippingAddress(@PathVariable("userId") Long userId) throws NotFoundException {
        Address shippingAddress = userService.getShippingAddress(userId);
        return DefaultResponse.noMessage(shippingAddress, HttpStatus.OK);
    }

    @GetMapping("/{userId}/registeredOfficeAddress")
    public ResponseEntity<DefaultResponse> getRegisteredOfficeAddress(@PathVariable("userId") Long userId) throws NotFoundException {
        Address registeredOfficeAddress = userService.getRegisteredOfficeAddress(userId);
        return DefaultResponse.noMessage(registeredOfficeAddress, HttpStatus.OK);
    }

    @GetMapping("/{userId}/operationalHeadquartersAddress")
    public ResponseEntity<DefaultResponse> getOperationalHeadquartersAddress(@PathVariable("userId") Long userId) throws NotFoundException {
        Address operationalHeadquartersAddress = userService.getOperationalHeadquartersAddress(userId);
        return DefaultResponse.noMessage(operationalHeadquartersAddress, HttpStatus.OK);
    }

    @PatchMapping("/{id}/password")
    public ResponseEntity<DefaultResponse> updatePassword(@PathVariable("id") Long id, @RequestBody @Validated PasswordRequest passwordRequest, BindingResult bindingResult) throws BadRequestExceptionHandler, NotFoundException {
        if (bindingResult.hasErrors()) throw new BadRequestExceptionHandler(bindingResult.getAllErrors().stream().map(DefaultMessageSourceResolvable::getDefaultMessage).toList().toString());
        User u = userService.getById(id);
        if (!encoder.matches(passwordRequest.getOldPassword(), u.getPassword())){
            throw new BadRequestExceptionHandler("Passwords do not match");
        }
        return DefaultResponse.noMessage(userService.updatePassword(id, passwordRequest.getNewPassword()), HttpStatus.OK);
    }

    @GetMapping("/{userId}/wishlist")
    public ResponseEntity<DefaultResponse> getWishlist(@PathVariable("userId") Long userId) throws NotFoundException {
        User user = userService.getById(userId);
        List<Product> wishlist = user.getWishlist();
        return DefaultResponse.noMessage(wishlist, HttpStatus.OK);
    }

    @PostMapping("/{userId}/wishlist/add/{productId}")
    public ResponseEntity<DefaultResponse> addToWishlist(@PathVariable("userId") Long userId, @PathVariable("productId") Long productId) throws NotFoundException {
        userService.addProductToWishlist(userId, productId);
        return DefaultResponse.noObject("Product successfully added to wishlist.", HttpStatus.OK);
    }

    @DeleteMapping("/{userId}/wishlist/remove/{productId}")
    public ResponseEntity<DefaultResponse> removeFromWishlist(@PathVariable("userId") Long userId, @PathVariable("productId") Long productId) throws NotFoundException {
        userService.removeProductFromWishlist(userId, productId);
        return DefaultResponse.noObject("Product successfully removed from wishlist.", HttpStatus.OK);
    }





}
