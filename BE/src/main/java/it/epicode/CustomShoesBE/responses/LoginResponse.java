package it.epicode.CustomShoesBE.responses;

import it.epicode.CustomShoesBE.model.User;
import lombok.Data;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;

@Data
public class LoginResponse {
    private LocalDateTime loginDate;
    private String token;
    private User user;

    public LoginResponse(String token, User user) {
        this.token = token;
        this.user = user;
        loginDate=LocalDateTime.now();
    }
    public static ResponseEntity<LoginResponse> login(String token,User user,HttpStatus httpStatus){
        LoginResponse loginResponse=new LoginResponse(token,user);
        return new ResponseEntity<>(loginResponse, httpStatus);
    }
}
