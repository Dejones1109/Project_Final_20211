package com.example.demo.services.impl;

import com.example.demo.entity.Products;
import com.example.demo.repository.ProductRepository;
import com.example.demo.services.ProductsService;
import org.apache.commons.collections4.IterableUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.Console;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductsServiceImp implements ProductsService {
    @Autowired
    ProductRepository productRepository;
    @Override
    public List<Products> getAll(){
        List<Products> products = productRepository.getListProductAsc();

        return products;
    }

    @Override
    public Products getById(Integer id) {
        Optional<Products> productOptional = productRepository.findById(id);
        if(productOptional.isPresent()){
            return  productOptional.get();
        }
        return null;
    }

    @Override
    public Products findProductByProductCode(String productCode) {
        Products product = productRepository.findByProductCode(productCode);
        if(product!=null){
            return product;
        }

        return null;
    }

    @Override
    public void save(Products products) {

        productRepository.save(products);
    }

    @Override
    public void delete(Products products) {
         productRepository.delete(products);
    }

    @Override
    public Integer getMaxLength() {
        return productRepository.getMaxLength();
    }

    @Override
    public List<Products> listProductsByType(String type) {
        List<Products> productOptional = productRepository.getListProductsByType(type);
        if(productOptional!=null){
            return  productOptional;
        }
        return null;
    }

    @Override
    public List<Products> getProductByView() {
        return productRepository.getProductByView();
    }

    @Override
    public List<Products> searchProductByKey(String keyString) {
        List<Products> products = productRepository.searchProductByKey(keyString);
        if(products!=null){
            return products;
        }
        return null;
    }

    @Override
    public List<Products> searchProductByProductName(String keyString) {
        return productRepository.searchProductByProductName(keyString);
    }
}
