package it.epicode.CustomShoesBE.services;

import it.epicode.CustomShoesBE.enums.Role;
import it.epicode.CustomShoesBE.exception.NotFoundException;
import it.epicode.CustomShoesBE.model.Address;
import it.epicode.CustomShoesBE.model.Invoice;
import it.epicode.CustomShoesBE.model.Product;
import it.epicode.CustomShoesBE.model.User;
import it.epicode.CustomShoesBE.repository.UserRepository;
import it.epicode.CustomShoesBE.request.UserRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProductService productService;
    @Autowired
    private AddressService addressService;
    @Autowired
    private InvoiceService invoiceService;
    @Autowired
    private PasswordEncoder encoder;

    public User findByEmail(String email) throws NotFoundException {
        Optional<User> optionalUser=userRepository.findByEmail(email);
        if(optionalUser.isEmpty())throw new NotFoundException("User not found");
        return optionalUser.get();
    }

    public Page<User> getAll(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

    public User getById(long id) throws NotFoundException {
        return userRepository.findById(id).orElseThrow(()-> new NotFoundException("User with id= " + id + " was not found"));
    }

    public User save(UserRequest userRequest) {
        User x = new User();
        x.setEmail(userRequest.getEmail());
        x.setPassword(encoder.encode(userRequest.getPassword()));
        x.setName(userRequest.getName());
        x.setSurname(userRequest.getSurname());
        x.setPhoneNumber(userRequest.getPhoneNumber());
        x.setRole(Role.USER);
        x.setUserType(userRequest.getUserType());

        x.setBusinessName(userRequest.getBusinessName());
        x.setVatNumber(userRequest.getVatNumber());
        x.setInsertionDate(LocalDate.now());
        x.setPec(userRequest.getPec());
        x.setSdi(userRequest.getSdi());
        return userRepository.save(x);
    }

    public User update(long id, UserRequest userRequest) throws NotFoundException {
        User x = getById(id);
        x.setEmail(userRequest.getEmail());
        x.setName(userRequest.getName());
        x.setSurname(userRequest.getSurname());
        x.setPhoneNumber(userRequest.getPhoneNumber());
//        x.setRole(userRequest.getRole());
        if (userRequest.getRole() != null) {
            x.setRole(userRequest.getRole());
        }
        x.setUserType(userRequest.getUserType());

        x.setBusinessName(userRequest.getBusinessName());
        x.setVatNumber(userRequest.getVatNumber());
        x.setInsertionDate(LocalDate.now());
        x.setPec(userRequest.getPec());
        x.setSdi(userRequest.getSdi());
        return userRepository.save(x);
    }

    public void delete(Long id) throws NotFoundException {
        User x = getById(id);
        userRepository.delete(x);
    }
    public void updateUserToAdmin(long id) throws NotFoundException{
        User x = getById(id);
        x.setRole(Role.ADMIN);
        userRepository.save(x);
    }

    public void addWishlist(long id, long product_id) throws NotFoundException{
        User user = getById(id);
        Product product = productService.getById(product_id);
        user.getWishlist().add(product);
        userRepository.save(user);
    }

    public void setShippingAddress(long id, long address_id) throws NotFoundException{
        User user = getById(id);
        Address address = addressService.getById(address_id);
        user.setShippingAddress(address);
        userRepository.save(user);
    }

    public void setRegisteredOfficeAddress(long id, long address_id) throws NotFoundException{
        User user = getById(id);
        Address address = addressService.getById(address_id);
        user.setRegisteredOfficeAddress(address);
        userRepository.save(user);
    }

    public void setOperationalHeadquartersAddress(long id, long address_id) throws NotFoundException{
        User user = getById(id);
        Address address = addressService.getById(address_id);
        user.setOperationalHeadquartersAddress(address);
        userRepository.save(user);
    }

    public void addInvoice(long id, long invoice_id) throws NotFoundException{
        User user = getById(id);
        Invoice invoice = invoiceService.getById(invoice_id);
        user.getInvoices().add(invoice);
        userRepository.save(user);
    }

}
