package it.epicode.CustomShoesBE.request;

import it.epicode.CustomShoesBE.model.Product;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class InvoiceRequest {

    private LocalDate date;

    @NotBlank(message = "amount request")
    private double amount;


    private List<Product> products;
}
