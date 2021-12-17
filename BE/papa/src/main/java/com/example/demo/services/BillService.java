package com.example.demo.services;
import com.example.demo.entity.Bill;
public interface BillService {
  Bill save(Bill bill);
  Bill findBillByPartnerId(Integer id);
}
