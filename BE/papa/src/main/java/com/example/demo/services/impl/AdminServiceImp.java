package com.example.demo.services.impl;

import com.example.demo.entity.Admin;
import com.example.demo.entity.Cart;
import com.example.demo.entity.Order;
import com.example.demo.repository.AdminRepository;
import com.example.demo.repository.OrderRepository;
import com.example.demo.response.admin.GetPartnerByQuantity;
import com.example.demo.services.AdminService;
import lombok.extern.log4j.Log4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Log4j
public class AdminServiceImp implements AdminService {
    @Autowired
    AdminRepository adminRepository;
    @Autowired
    OrderRepository orderRepository;

    @Override
    public Admin findById(Integer id) {
        Optional<Admin> admin = adminRepository.findById(id);
        if (admin.isPresent()) {
            return admin.get();
        }
        return null;
    }

    @Override
    public List<Order> getListAllOrderByDay(String date) {
        return orderRepository.getListAllOrderByDay(date);
    }

    @Override
    public List<Order> getListOrderStatusByDay(Integer status,String date) {
        return orderRepository.getListOrderStatusByDay(status, date);
    }

    @Override
    public List<Object> getPartnerByQuantity() {
        return orderRepository.getPartnerByQuantity();
    }
}
