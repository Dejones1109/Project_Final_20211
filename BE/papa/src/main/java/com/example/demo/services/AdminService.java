package com.example.demo.services;

import com.example.demo.entity.Admin;
import com.example.demo.entity.Order;
import com.example.demo.response.admin.GetPartnerByQuantity;

import java.util.List;

public interface AdminService {
    Admin findById(Integer id);
    List<Order> getListAllOrderByDay(String date);
    List<Order> getListOrderStatusByDay(Integer status,String date);
    List<Object> getPartnerByQuantity();
}
