package it.epicode.CustomShoesBE.request;

import it.epicode.CustomShoesBE.enums.Role;
import it.epicode.CustomShoesBE.enums.UserType;
import it.epicode.CustomShoesBE.model.Address;
import it.epicode.CustomShoesBE.model.Invoice;
import it.epicode.CustomShoesBE.model.Product;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class LoginRequest {

    @NotBlank
    private String email;

    @NotBlank
    private String password;

}
