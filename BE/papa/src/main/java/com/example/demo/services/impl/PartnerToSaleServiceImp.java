package com.example.demo.services.impl;

import com.example.demo.entity.PartnerToSale;
import com.example.demo.repository.PartnerToSaleRepository;
import com.example.demo.services.PartnerToSaleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PartnerToSaleServiceImp implements PartnerToSaleService {
    @Autowired
    PartnerToSaleRepository partnerToSaleRepository;
    @Override
    public void save(PartnerToSale partnerToSale) {
        partnerToSaleRepository.save(partnerToSale);
    }
}
