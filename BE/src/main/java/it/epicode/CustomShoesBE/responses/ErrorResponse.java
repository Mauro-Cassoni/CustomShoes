package it.epicode.CustomShoesBE.responses;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ErrorResponse {
    private String ErrorMessage;
    private LocalDateTime ErrorDate;

    public ErrorResponse(String message){
        ErrorMessage=message;
        ErrorDate=LocalDateTime.now();
    }
}
