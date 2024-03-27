package it.epicode.CustomShoesBE.exception;

public class BadRequestExceptionHandler extends Exception{
    public BadRequestExceptionHandler(String message) {
        super(message);
    }
}
