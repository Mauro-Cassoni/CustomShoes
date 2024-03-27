package it.epicode.CustomShoesBE.controller;

import com.cloudinary.Cloudinary;
import it.epicode.CustomShoesBE.exception.BadRequestExceptionHandler;
import it.epicode.CustomShoesBE.exception.NotFoundException;
import it.epicode.CustomShoesBE.model.Product;
import it.epicode.CustomShoesBE.request.ProductRequest;
import it.epicode.CustomShoesBE.responses.DefaultResponse;
import it.epicode.CustomShoesBE.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;

@RestController
@RequestMapping("/products")
public class ProductController {


    @Autowired
    private ProductService productService;

    @Autowired
    private Cloudinary cloudinary;

    @PatchMapping("/upload/{id}")
    public ResponseEntity<DefaultResponse> uploadImg(@PathVariable long id, @RequestParam("upload") MultipartFile file) throws IOException, NotFoundException, NotFoundException {
        Product x = productService.uploadImg(id, (String)cloudinary.uploader().upload(file.getBytes(), new HashMap()).get("url"));
        return DefaultResponse.full("Image was uploaded successfully", x , HttpStatus.OK);
    }

    @GetMapping("/no-auth")
    public ResponseEntity<DefaultResponse> getAll(Pageable pageable){
        return DefaultResponse.noMessage(productService.getAll(pageable), HttpStatus.OK);
    }

    @GetMapping("/no-auth/{id}")
    public ResponseEntity<DefaultResponse> getById(@PathVariable Long id)throws NotFoundException {
        return DefaultResponse.noMessage(productService.getById(id), HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<DefaultResponse> create(@RequestBody @Validated ProductRequest productRequest, BindingResult bindingResult) throws NotFoundException, BadRequestExceptionHandler {
        if (bindingResult.hasErrors()) {
            throw new BadRequestExceptionHandler(bindingResult.getAllErrors().stream().map(DefaultMessageSourceResolvable::getDefaultMessage).toList().toString());
        }
        Product createdProduct = productService.save(productRequest);
        return DefaultResponse.noMessage(createdProduct, HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<DefaultResponse> update(@PathVariable long id, @RequestBody ProductRequest productRequest, BindingResult bindingResult) throws NotFoundException, BadRequestExceptionHandler {
        if (bindingResult.hasErrors()) throw new  BadRequestExceptionHandler(bindingResult.getAllErrors().stream().map(DefaultMessageSourceResolvable::getDefaultMessage).toList().toString());
        return DefaultResponse.noMessage(productService.update(id, productRequest), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<DefaultResponse> delete(@PathVariable Long id)throws NotFoundException{
        productService.delete(id);
        return DefaultResponse.noObject("Product with id " + id + " has been deleted", HttpStatus.OK);
    }


}
