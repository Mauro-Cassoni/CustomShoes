package it.epicode.CustomShoesBE.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@Table(name = "invoices")
public class Invoice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long number;

    private LocalDate date;

    private double amount;

    @OneToMany(mappedBy = "invoice", cascade = CascadeType.REMOVE)
    private List<Product> products;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
