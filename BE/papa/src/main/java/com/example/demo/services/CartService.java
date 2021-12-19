package com.example.demo.services;

import com.example.demo.entity.Cart;

import java.util.List;

public interface CartService {
    Cart save(Cart c);
    Cart findById(Integer id);
    void delete(Cart c);
    Integer getMaxLength();
    Cart getCartExist(Integer partnerId,Integer productId);
    List<Cart> getListToCart(Integer partnerId);
    List<Cart> getListToCartNoStatus(Integer orderId);
}
