package it.epicode.CustomShoesBE.repository;

import it.epicode.CustomShoesBE.model.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long>, PagingAndSortingRepository<Address, Long> {

}
