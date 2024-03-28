package it.epicode.CustomShoesBE.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AddressRequest {

    private String name;

    private String surname;

    private String street;

    private String streetNumber;

    private String city;

    private Integer postalCode;

    private String country;

    private String province;

    private String phoneNumber;

}
