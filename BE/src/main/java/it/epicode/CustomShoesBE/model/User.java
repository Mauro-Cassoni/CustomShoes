package it.epicode.CustomShoesBE.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import it.epicode.CustomShoesBE.enums.Role;
import it.epicode.CustomShoesBE.enums.UserType;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Data
@Table(name = "users")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String email;

    @JsonIgnore
    private String password;

    private String name;

    private String surname;

    @Column(name = "phone_number", unique = true)
    private String phoneNumber;

    @JsonIgnore
    @ManyToMany
    @JoinTable(
            name = "User_Product",
            joinColumns = {@JoinColumn(name = "user_id")},
            inverseJoinColumns = {@JoinColumn(name = "product_id")}
    )
    private List<Product> wishlist;

    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToOne
    @JoinColumn(name = "shipping_address")
    private Address  shippingAddress;

    @Enumerated(EnumType.STRING)
    @Column(name = "user_type")
    private UserType userType;

    //Business

    @Column(name = "business_name", unique = true)
    private String businessName;

    @Column(name = "vat_number", unique = true)
    private String vatNumber;

    @Column(name = "insertion_date")
    private LocalDate insertionDate;

    @Column(unique = true)
    @Email
    private String pec;

    private String sdi;

    @OneToOne
    @JoinColumn(name = "registered_office_address_id")
    private Address  registeredOfficeAddress;

    @OneToOne
    @JoinColumn(name = "operational_headquarters_address_id")
    private Address  operationalHeadquartersAddress;

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "user")
    private List<Invoice> invoices;



    @JsonIgnore
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isEnabled() {
        return true;
    }

    @JsonIgnore
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @JsonIgnore
    @Override
    public String getUsername() {
        return email;
    }


}


