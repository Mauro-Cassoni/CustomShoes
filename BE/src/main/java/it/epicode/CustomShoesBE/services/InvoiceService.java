package it.epicode.CustomShoesBE.services;

import it.epicode.CustomShoesBE.exception.NotFoundException;
import it.epicode.CustomShoesBE.model.Invoice;
import it.epicode.CustomShoesBE.repository.InvoiceRepository;
import it.epicode.CustomShoesBE.request.InvoiceRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class InvoiceService {

    @Autowired
    private InvoiceRepository invoiceRepository;

    public Page<Invoice> getAll(Pageable pageable) {
        return invoiceRepository.findAll(pageable);
    }

    public Invoice getById(long id) throws NotFoundException {
        return invoiceRepository.findById(id).orElseThrow(()-> new NotFoundException("User with id= " + id + " was not found"));
    }

    public Invoice save(InvoiceRequest invoiceRequest) {
        Invoice x = new Invoice();
        x.setDate(LocalDate.now());
        x.setAmount(invoiceRequest.getAmount());
        x.setProducts(invoiceRequest.getProducts());

        return invoiceRepository.save(x);
    }

    public Invoice update(Long id, InvoiceRequest invoiceRequest) throws NotFoundException {
        Invoice x = getById(id);
        x.setDate(LocalDate.now());
        x.setAmount(invoiceRequest.getAmount());
        x.setProducts(invoiceRequest.getProducts());

        return invoiceRepository.save(x);
    }
    public void delete(Long id) throws NotFoundException {
        Invoice x = getById(id);
        invoiceRepository.delete(x);
    }

}
