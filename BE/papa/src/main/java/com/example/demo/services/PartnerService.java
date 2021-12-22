package com.example.demo.services;

import com.example.demo.entity.Partner;
import com.example.demo.response.OrderQuantityByStatus;


import java.util.List;

public interface PartnerService {
    List<Partner> findAll();
    Partner findById(Integer id);
    Partner findByPartnerCode(String code);
    Partner save(Partner partner);
    List<Partner> getListPartnerByType(Integer status);
    Integer getMaxLength();
    OrderQuantityByStatus orderQuantityByStatusOfPartner(Integer partnerId);
 //   public UserDetails loadUserByUsername(String username);
}
