package it.epicode.CustomShoesBE.controller;

import it.epicode.CustomShoesBE.exception.BadRequestExceptionHandler;
import it.epicode.CustomShoesBE.exception.NotFoundException;
import it.epicode.CustomShoesBE.model.User;
import it.epicode.CustomShoesBE.request.LoginRequest;
import it.epicode.CustomShoesBE.request.UserRequest;
import it.epicode.CustomShoesBE.responses.DefaultResponse;
import it.epicode.CustomShoesBE.responses.LoginResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import it.epicode.CustomShoesBE.services.UserService;
import it.epicode.CustomShoesBE.security.JwtTools;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    JavaMailSender javaMailSender;
    @Autowired
    private UserService userService;
    @Autowired
    private JwtTools jwtTools;
    @Autowired
    private PasswordEncoder encoder;

    public void sendEmail(String email){
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(email);
        mail.setSubject("Thank you for signing up");
        mail.setText("Thank you for subscribing to CustomShoes, I invite you to visit our catalogue.");
        javaMailSender.send(mail);
    }

    @PostMapping("/register")
    public ResponseEntity<DefaultResponse> registerUser(@RequestBody @Validated UserRequest userRequest, BindingResult bindingResult) throws BadRequestExceptionHandler {
        if(bindingResult.hasErrors()){
            throw new BadRequestExceptionHandler(bindingResult.getAllErrors().stream().map(DefaultMessageSourceResolvable::getDefaultMessage).toList().toString());
        }
        sendEmail(userRequest.getEmail());
        return DefaultResponse.noMessage(userService.save(userRequest), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> loginUser(@RequestBody @Validated LoginRequest userRequest, BindingResult bindingResult) throws BadRequestExceptionHandler, NotFoundException, NotFoundException {
        if(bindingResult.hasErrors())
            throw new BadRequestExceptionHandler(bindingResult.getAllErrors().stream().map(DefaultMessageSourceResolvable::getDefaultMessage).toList().toString());
        User user=userService.findByEmail(userRequest.getEmail());
        if(!encoder.matches(userRequest.getPassword(), user.getPassword())) throw new BadRequestExceptionHandler("Incorrect email or password");
        String token= jwtTools.createToken(user);
        return LoginResponse.login(token,user,HttpStatus.OK);
    }


}
