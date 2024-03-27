package it.epicode.CustomShoesBE.request;

import it.epicode.CustomShoesBE.enums.Category;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.hibernate.validator.constraints.URL;

@Data
public class ProductRequest {

    @URL
    private String img;

    @NotBlank(message = "name request")
    private String name;

    private String brand;

    @NotBlank(message = "category request")
    private String category;

    @NotBlank(message = "description request")
    private String description;

    private double size;

    private String color;

    @NotNull(message = "price request")
    private double price;

    private boolean onSale;

    public boolean getOnSale() {
        return onSale;
    }


}
