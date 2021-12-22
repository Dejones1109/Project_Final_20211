package com.example.demo.services.impl;

import com.example.demo.entity.Partner;
import com.example.demo.entity.Products;
import com.example.demo.repository.DashBoardRepository;
import com.example.demo.repository.PartnerRepository;
import com.example.demo.response.OrderQuantityByStatus;
import com.example.demo.services.PartnerService;
import org.apache.commons.collections4.IterableUtils;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PartnerServiceImp implements PartnerService {
    @Autowired
    PartnerRepository partnerRepository;
    @Autowired
    DashBoardRepository dashBoardRepository;

    @Override
    public List<Partner> findAll() {
        Iterable<Partner> partners = partnerRepository.findAll();
        if (partners != null) {
            List<Partner> partnersList = IterableUtils.toList(partners);
            return partnersList;
        }
        return new ArrayList<>();
    }

    @Override
    public Partner findById(Integer id) {
        Optional<Partner> partnerOptional = partnerRepository.findById(id);
        if (partnerOptional.isPresent()) {
            return partnerOptional.get();
        }
        return null;
    }

    @Override
    public Partner findByPartnerCode(String code) {
        return partnerRepository.findByPartnerCode(code);
    }

    @Override
    public Partner save(Partner partner) {

        return partnerRepository.save(partner);
    }

    @Override
    public List<Partner> getListPartnerByType(Integer status) {
        return partnerRepository.getListPartnerByType(status);
    }
    @Override
    public Integer getMaxLength() {
        return partnerRepository.getMaxLength();
    }

    @Override
    public OrderQuantityByStatus orderQuantityByStatusOfPartner(Integer partnerId) {
        return dashBoardRepository.orderQuantityByStatusOfPartner(partnerId);
    }

//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        if("papadashi@2021".equals(username)){
//            return new User("papadashi@2021", "$2a$10$nb/w3qSy.qjF.iYxkOAhOeCo9q2VVwa3APPdWCBsaBowWCpeltxsO",
//                    new ArrayList<>());
//        } else {
//            throw new UsernameNotFoundException("User not found with username: " + username);
//        }
//    }
}
