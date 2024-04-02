package it.epicode.CustomShoesBE.services;

import it.epicode.CustomShoesBE.model.Product;
import it.epicode.CustomShoesBE.model.User;
import it.epicode.CustomShoesBE.repository.ProductRepository;
import it.epicode.CustomShoesBE.repository.UserRepository;
import it.epicode.CustomShoesBE.exception.NotFoundException;
import it.epicode.CustomShoesBE.request.ProductRequest;
import it.epicode.CustomShoesBE.request.UserRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public Page<Product> getAll(Pageable pageable) {
        return productRepository.findAll(pageable);
    }

    public Product getById(long id) throws NotFoundException {
        return productRepository.findById(id).orElseThrow(()-> new NotFoundException("User with id= " + id + " was not found"));
    }

    public Product save(ProductRequest productRequest) {
        Product x = new Product();
        x.setName(productRequest.getName());
        x.setBrand(productRequest.getBrand());
        x.setCategory(productRequest.getCategory());
        x.setDescription(productRequest.getDescription());
        x.setSize(productRequest.getSize());
        x.setColor(productRequest.getColor());
        x.setPrice(productRequest.getPrice());
        x.setOnSale(false);

        return productRepository.save(x);
    }

    public Product update(Long id, ProductRequest productRequest) throws NotFoundException {
        Product x = getById(id);

        x.setName(productRequest.getName());
        x.setBrand(productRequest.getBrand());
        x.setCategory(productRequest.getCategory());
        x.setDescription(productRequest.getDescription());
        x.setSize(productRequest.getSize());
        x.setColor(productRequest.getColor());
        x.setPrice(productRequest.getPrice());
        x.setOnSale(productRequest.getOnSale());

        if(x.getImg() == null){
            x.setOnSale(false);
        }

        return productRepository.save(x);
    }

    public void delete(Long id) throws NotFoundException {
        Product x = getById(id);
        productRepository.delete(x);
    }

    public Product uploadImg(long id, String url) throws NotFoundException{
        Product x = getById(id);
        x.setImg(url);
        return productRepository.save(x);
    }

    public Page<Product> searchByName(String query, Pageable pageable) {
        return productRepository.findByNameContaining(query, pageable);
    }

}
