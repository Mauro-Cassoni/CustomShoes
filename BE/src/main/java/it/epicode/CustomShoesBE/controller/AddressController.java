package it.epicode.CustomShoesBE.controller;

import it.epicode.CustomShoesBE.exception.BadRequestExceptionHandler;
import it.epicode.CustomShoesBE.exception.NotFoundException;
import it.epicode.CustomShoesBE.request.AddressRequest;
import it.epicode.CustomShoesBE.responses.DefaultResponse;
import it.epicode.CustomShoesBE.services.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/addresses")
public class AddressController {
    @Autowired
    private AddressService addressService;

    @GetMapping("all")
    public ResponseEntity<DefaultResponse> getAll(Pageable pageable) {
        return DefaultResponse.noMessage(addressService.getAll(pageable), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or @addressSecurity.checkUserId(authentication, #id)")
    public ResponseEntity<DefaultResponse> getById(@PathVariable Long id) throws NotFoundException {
        return DefaultResponse.noMessage(addressService.getById(id),HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<DefaultResponse> create(@RequestBody @Validated AddressRequest addressRequest, BindingResult bindingResult) throws NotFoundException, BadRequestExceptionHandler {
        if(bindingResult.hasErrors())
            throw new BadRequestExceptionHandler(bindingResult.getAllErrors().stream().map(DefaultMessageSourceResolvable::getDefaultMessage).toList().toString());
        return DefaultResponse.noMessage(addressService.save(addressRequest), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DefaultResponse> update(@PathVariable Long id, @RequestBody @Validated AddressRequest addressRequest,BindingResult bindingResult) throws NotFoundException, BadRequestExceptionHandler {
        if(bindingResult.hasErrors())
            throw new BadRequestExceptionHandler(bindingResult.getAllErrors().stream().map(DefaultMessageSourceResolvable::getDefaultMessage).toList().toString());
        return DefaultResponse.noMessage(addressService.update(id, addressRequest), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<DefaultResponse> delete(@PathVariable Long id) throws NotFoundException {
        addressService.delete(id);
        String message = "Address with ID" + id + " has been deleted";
        return DefaultResponse.noObject(message, HttpStatus.OK);
    }
}
