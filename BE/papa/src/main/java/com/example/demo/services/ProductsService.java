package com.example.demo.services;

import com.example.demo.entity.Products;

import java.util.List;

public interface ProductsService {
    List<Products> getAll();
    Products getById(Integer id);
    void save(Products products);
    void delete(Products products);
    Integer getMaxLength();
    List<Products> listProductsByType(String type);
}
