package com.example.demo.repository;

import com.example.demo.entity.Products;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.lang.annotation.Native;
import java.util.List;


public interface ProductRepository extends CrudRepository<Products,String> {
    @Query("select count(p) from Products p ")
    Integer getMaxLength();
    @Query("select p from Products  p where p.type=:type")
    List<Products> getListProductsByType(String type);
}
