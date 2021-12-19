package com.example.demo.services;

import com.example.demo.entity.Order;

import java.util.List;

public interface OrderService {
    Order save(Order o);
    Order findById(Integer id);
    Order findByCode(String code);
    void delete(Order o);
    Integer getMaxLength();
    List<Order> getListOrderByStatus(Integer status);
    List<Order> getListOrderByStatusOfPartner(Integer status,Integer partnerId);
    List<Order> getListOrderOfPartner(Integer partnerId);
}
