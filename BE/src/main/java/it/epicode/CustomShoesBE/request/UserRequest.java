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
public class UserRequest {

    @NotBlank(message = "email request")
    @Email
    private String email;

    @NotBlank(message = "password request")
    @Pattern(regexp ="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#&()–[{}]:;',?/*~$^+=<>.]).{8,}$",
            message = "Password must contain: 1 letter uppercase, 1 letter lowercase, 1 number, 1 special character, Min 8 char")
    private String password;

    @NotBlank(message = "firstname request")
    private String name;

    @NotBlank(message = "lastname request")
    private String surname;


    private String phoneNumber;

    private List<Product> wishlist;

    private Role role;

    private Address shippingAddress;

    @NotNull
    private UserType userType;


    //Business

    private String businessName;
    private String vatNumber;
    private LocalDate insertionDate;
    private String pec;
    private String sdi;
    private Address  registeredOfficeAddress;
    private Address  operationalHeadquartersAddress;
    private List<Invoice> invoices;

}
