package com.example.demo.repository;

import com.example.demo.entity.PartnerToSale;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PartnerToSaleRepository extends CrudRepository<PartnerToSale,Integer> {

}
