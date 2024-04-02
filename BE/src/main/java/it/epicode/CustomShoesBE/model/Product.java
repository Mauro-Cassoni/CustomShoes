package it.epicode.CustomShoesBE.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import it.epicode.CustomShoesBE.enums.Category;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String img;

    private String name;

    private String brand;

    private String category;

    private String description;

    private String size;

    private String color;

    private double price;

    @Column(name = "on_sale")
    private boolean onSale;


    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "invoice_id")
    private Invoice invoice;

}
