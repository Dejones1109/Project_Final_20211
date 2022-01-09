package com.example.demo.repository;

import com.example.demo.entity.Partner;
import com.example.demo.entity.Products;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PartnerRepository extends CrudRepository<Partner,Integer > {
    @Query("select p from Partner p where p.partCode =:partnerCode")
    Partner findByPartnerCode(String partnerCode);
    @Query("select p from Partner  p where p.status=:status")
    List<Partner> getListPartnerByType(Integer status);
    @Query("select count(p) from Partner p ")
    Integer getMaxLength();
    @Query("select p from Partner p where p.phone=:phone")
    Partner isCheckPhone(String phone);
    @Query("select p from Partner p where p.phone=:phone and p.password=:password")
    Partner login(String phone,String password);
    @Query("select p from Partner p order by p.status asc")
    List<Partner> getListPartnerAsc();
}
