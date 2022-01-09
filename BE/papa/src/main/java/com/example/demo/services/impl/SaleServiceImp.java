package com.example.demo.services.impl;

import com.example.demo.entity.Partner;
import com.example.demo.entity.Products;
import com.example.demo.entity.Sale;
import com.example.demo.repository.DashBoardRepository;
import com.example.demo.repository.SaleRepository;
import com.example.demo.response.ListSaleNoUse;
import com.example.demo.services.PartnerService;
import com.example.demo.services.SaleService;

import org.apache.commons.collections4.IterableUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class SaleServiceImp implements SaleService {

    SaleRepository saleRepository;
    @Autowired
    DashBoardRepository dashBoardRepository;
    @Autowired
    PartnerService partnerService;

    public SaleServiceImp(SaleRepository saleRepository) {
        this.saleRepository = saleRepository;
    }

    @Override
    public void save(Sale sale) {
        saleRepository.save(sale);
    }

    @Override
    public Sale findById(Integer saleId) {
        Optional<Sale> saleOptional = saleRepository.findById(saleId);
        if (saleOptional.isPresent()) {
            return saleOptional.get();
        }
        return null;
    }

    @Override
    public ListSaleNoUse getListSaleNoUse(Integer partnerId, Integer conditions) {
        ListSaleNoUse listSaleNoUse = new ListSaleNoUse();
        List<Sale> listSaleCondition = new ArrayList<>();
        List<Sale> listSaleNoCondition = new ArrayList<>();
        Partner partner = partnerService.findById(partnerId);
        if (partner != null) {
            List<Sale> getListSaleIdUsed = dashBoardRepository.getOrderSaleByPartnerUsed(partnerId);

            Iterable<Sale> listSale = saleRepository.findAll();
            if (listSale != null) {
                List<Sale> listSale1 = IterableUtils.toList(listSale);
                if (getListSaleIdUsed != null) {
                    for (Sale o : getListSaleIdUsed) {
                        listSale1.remove(o.getId() - 1);
                    }
                }
                for (Sale s : listSale1) {
                    if (s.getConditions() <= conditions) {
                        listSaleCondition.add(s);
                    } else {
                        listSaleNoCondition.add(s);
                    }
                }
                listSaleNoUse.setListSaleCondition(listSaleCondition);
                listSaleNoUse.setListSaleNoCondition(listSaleNoCondition);
                return listSaleNoUse;
            }
            return null;
        } else {
            return null;
        }
    }
    @Override
    public List<Sale> fillAll() {
     Iterable<Sale> listSale =  saleRepository.findAll();
     if(listSale!=null){
         List<Sale> list = IterableUtils.toList(listSale);
         return list;
     }
     return null;
    }

}
