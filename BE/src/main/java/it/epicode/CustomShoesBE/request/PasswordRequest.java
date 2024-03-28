package it.epicode.CustomShoesBE.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class PasswordRequest {


    @NotBlank
    private String oldPassword;

    @NotBlank
    private String newPassword;


}
