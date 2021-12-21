package com.example.demo.services.impl;

import com.example.demo.entity.Order;
import com.example.demo.entity.Partner;
import com.example.demo.repository.OrderRepository;
import com.example.demo.services.OrderService;
import lombok.extern.log4j.Log4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Log4j
public class OrderServiceImp implements OrderService {
    @Autowired
    OrderRepository orderRepository;

    @Override
    public Order save(Order o) {
       return orderRepository.save(o);
    }

    @Override
    public Order findById(Integer id) {
        Optional<Order> orderOptional = orderRepository.findById(id);
        if (orderOptional.isPresent()) {
            return orderOptional.get();
        }
        return null;
    }

    @Override
    public Order findByCode(String code) {
        return orderRepository.findByCode(code);
    }

    @Override
    public void delete(Order o) {
       orderRepository.delete(o);
    }

    @Override
    public Integer getMaxLength() {
        return orderRepository.getMaxLength();
    }

    @Override
    public List<Order> getListOrderByStatus(Integer status) {
        return orderRepository.getListOrderByStatus(status);
    }

    @Override
    public List<Order> getListOrderByStatusOfPartner(Integer status, Integer partnerId) {
        return orderRepository.getListOrderByStatusOfPartner(status,partnerId);
    }

    @Override
    public List<Order> getListOrderOfPartner(Integer partnerId) {
        return orderRepository.getListOrderOfPartner(partnerId);
    }
}
