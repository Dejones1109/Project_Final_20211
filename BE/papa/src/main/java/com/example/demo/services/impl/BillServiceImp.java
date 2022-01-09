package com.example.demo.services.impl;

import com.example.demo.entity.Cart;
import com.example.demo.repository.BillRepository;
import com.example.demo.entity.Bill;
import com.example.demo.services.BillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BillServiceImp implements BillService {
    @Autowired
    BillRepository billRepository;

    @Override
    public Bill save(Bill bill) {

        return  billRepository.save(bill);
    }

    @Override
    public Bill findBillByPartnerId(Integer id) {
       Bill bill = billRepository.getCartByPartnerId(id);
        return bill;
    }

    @Override
    public Integer getMaxLength() {
        return billRepository.getMaxLength();
    }
}
