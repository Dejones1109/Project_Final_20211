package com.example.demo.services;

import com.example.demo.entity.Partner;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

public interface PartnerService {
    List<Partner> findAll();
    Partner findById(Integer id);
    Partner findByPartnerCode(String code);
    Partner save(Partner partner);
    List<Partner> getListPartnerByType(Integer status);
    Integer getMaxLength();
    public UserDetails loadUserByUsername(String username);
}
