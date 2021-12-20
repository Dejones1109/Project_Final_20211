package com.example.demo.repository;

import com.example.demo.entity.Cart;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepository extends CrudRepository<Cart,Integer> {
    @Query("select c from Cart  c  where c.product.id =:productId and c.partner.id=:partnerId and c.status = 101")
    Cart getCartExist(Integer partnerId,Integer productId);
    @Query("select count(c) from Cart c ")
    Integer getMaxLength();
    @Query("select c from Cart c where c.partner.id=:partnerId and c.status=101")
    List<Cart> getListToCart(Integer partnerId);
    @Query("select c from Cart c where c.order.id=:orderId")
    List<Cart> getListToCartNoStatus(Integer orderId);
    @Query("select c.product.productName,c.partner,c.quantity from Cart c where c.partner.id=:partnerId and c.status=103")
    List<Object> getListCartToPartnerId(Integer partnerId);


}
