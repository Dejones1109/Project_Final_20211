package com.example.demo.repository;

import com.example.demo.entity.Products;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.lang.annotation.Native;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Products,String> {
    @Query("select count(p) from Products p ")
    Integer getMaxLength();
    @Query("select p from Products  p where p.type=:type")
    List<Products> getListProductsByType(String type);
}
