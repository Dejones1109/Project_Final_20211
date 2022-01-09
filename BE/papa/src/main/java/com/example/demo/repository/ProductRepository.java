package com.example.demo.repository;

import com.example.demo.entity.Products;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.lang.annotation.Native;
import java.util.List;

@Repository
public interface ProductRepository extends CrudRepository<Products,Integer> {
    @Query("select count(p) from Products p ")
    Integer getMaxLength();
    @Query("select p from Products  p where p.type=:type")
    List<Products> getListProductsByType(String type);
    @Query("select p from Products p where p.productCode=:productCode")
    Products findByProductCode(String productCode);
    @Query("select p from Products p order by p.view")
    List<Products> getProductByView();
    @Query("select p from Products p where p.productName like concat('%',:keyString,'%') or p.type like concat('%',:keyString,'%')")
    List<Products> searchProductByKey(String keyString);
    @Query("select p from Products p where p.productName like concat('%',:keyString,'%') ")
    List<Products> searchProductByProductName(String keyString);
    @Query("select distinct p.type from Products p")
    String[] getListProductType();
    @Query("select p from Products p order by p.status asc")
    List<Products> getListProductAsc();
}
