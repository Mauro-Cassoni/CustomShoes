package it.epicode.CustomShoesBE.services;

import it.epicode.CustomShoesBE.exception.NotFoundException;
import it.epicode.CustomShoesBE.model.Address;
import it.epicode.CustomShoesBE.repository.AddressRepository;
import it.epicode.CustomShoesBE.request.AddressRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class AddressService {

    @Autowired
    private AddressRepository addressRepository;

    public Page<Address> getAll(Pageable pageable) {
        return addressRepository.findAll(pageable);
    }

    public Address getById(long id) throws NotFoundException {
        return addressRepository.findById(id).orElseThrow(()-> new NotFoundException("User with id= " + id + " was not found"));
    }

    public Address save(AddressRequest addressRequest) {
        Address x = new Address();
        x.setName(addressRequest.getName());
        x.setSurname(addressRequest.getSurname());
        x.setStreet(addressRequest.getStreet());
        x.setStreetNumber(addressRequest.getStreetNumber());
        x.setCity(addressRequest.getCity());
        x.setPostalCode(addressRequest.getPostalCode());
        x.setCountry(addressRequest.getCountry());
        x.setProvince(addressRequest.getProvince());
        x.setPhoneNumber(addressRequest.getPhoneNumber());

        return addressRepository.save(x);
    }

    public Address update(Long id, AddressRequest addressRequest) throws NotFoundException {
        Address x = getById(id);
        x.setName(addressRequest.getName());
        x.setSurname(addressRequest.getSurname());
        x.setStreet(addressRequest.getStreet());
        x.setStreetNumber(addressRequest.getStreetNumber());
        x.setCity(addressRequest.getCity());
        x.setPostalCode(addressRequest.getPostalCode());
        x.setCountry(addressRequest.getCountry());
        x.setProvince(addressRequest.getProvince());
        x.setPhoneNumber(addressRequest.getPhoneNumber());

        return addressRepository.save(x);
    }

    public void delete(Long id) throws NotFoundException {
        Address x = getById(id);
        addressRepository.delete(x);
    }


}
