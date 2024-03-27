package it.epicode.CustomShoesBE.responses;

import lombok.Data;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;

@Data
public class DefaultResponse {
    private String message;
    private Object obj;
    private LocalDateTime date;

    public DefaultResponse(String message, Object obj) {
        this.message = message;
        this.obj = obj;
        date=LocalDateTime.now();
    }

    public DefaultResponse(String message) {
        this.message = message;
        date=LocalDateTime.now();
    }

    public static ResponseEntity<DefaultResponse> full(String message, Object obj, HttpStatus httpStatus){
        DefaultResponse defaultResponse=new DefaultResponse(message,obj);
        return new ResponseEntity<>(defaultResponse,httpStatus);
    }
    public static ResponseEntity<DefaultResponse> noMessage(Object obj, HttpStatus httpStatus){
        DefaultResponse defaultResponse=new DefaultResponse(httpStatus.toString(),obj);
        return new ResponseEntity<>(defaultResponse,httpStatus);
    }
    public static ResponseEntity<DefaultResponse> noObject(String message, HttpStatus httpStatus){
        DefaultResponse defaultResponse=new DefaultResponse(message);
        return new ResponseEntity<>(defaultResponse,httpStatus);
    }
}
