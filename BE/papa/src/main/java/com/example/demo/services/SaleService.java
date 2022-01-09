package com.example.demo.services;

import com.example.demo.entity.Sale;
import com.example.demo.response.ListSaleNoUse;

import java.util.List;

public interface SaleService {
    void save(Sale sale);
    Sale findById(Integer saleId);
    ListSaleNoUse getListSaleNoUse(Integer partnerId, Integer conditions);
    List<Sale> fillAll();
}
