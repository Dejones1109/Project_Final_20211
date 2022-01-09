package com.example.demo.repository;

import com.example.demo.entity.Sale;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SaleRepository extends CrudRepository<Sale,Integer> {
    @Query("select s.id from Sale s inner join PartnerToSale pt on s.id=pt.sale.id where pt.order.partner.id=:partnerId")
    List<Object> getOrderSaleByPartnerUsed(Integer partnerId);
}
