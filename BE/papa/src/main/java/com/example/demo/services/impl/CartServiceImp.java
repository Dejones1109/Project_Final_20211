package com.example.demo.services.impl;

import com.example.demo.entity.Cart;
import com.example.demo.entity.Partner;
import com.example.demo.repository.CartRepository;
import com.example.demo.services.CartService;
import lombok.extern.log4j.Log4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Log4j
public class CartServiceImp implements CartService {
    @Autowired
    CartRepository cartRepository;


    @Override
    public Cart save(Cart c) {
         return cartRepository.save(c);
    }

    @Override
    public Cart findById(Integer id) {
        Optional<Cart> cartOptional = cartRepository.findById(id);
        if (cartOptional.isPresent()) {
            return cartOptional.get();
        }
        return null;
    }



    @Override
    public void delete(Cart c) {
        cartRepository.delete(c);
    }

    @Override
    public Integer getMaxLength() {
        return cartRepository.getMaxLength();
    }

    @Override
    public Cart getCartExist(Integer partnerId, Integer productId) {
        return cartRepository.getCartExist(partnerId, productId);
    }

    @Override
    public List<Cart> getListToCart(Integer partnerId) {
        return cartRepository.getListToCart(partnerId);
    }

    @Override
    public List<Cart> getListToCartNoStatus(Integer orderId) {
        return cartRepository.getListToCartNoStatus(orderId);
    }
}
