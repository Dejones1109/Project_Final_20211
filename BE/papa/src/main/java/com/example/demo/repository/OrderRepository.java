package com.example.demo.repository;

import com.example.demo.entity.Order;
import com.example.demo.response.admin.GetPartnerByQuantity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository  extends CrudRepository<Order,Integer> {
    @Query("select count(o) from Order o ")
    Integer getMaxLength();
    @Query("select o from Order o where o.status=:status order by o.createdDate desc")
    List<Order> getListOrderByStatus(Integer status);
    @Query("select o from Order o where o.status=:status and o.partner.id=:partnerId order by o.createdDate desc")
    List<Order> getListOrderByStatusOfPartner(Integer status,Integer partnerId);
    @Query("select o from Order o where  o.partner.id=:partnerId order by o.createdDate desc")
    List<Order> getListOrderOfPartner(Integer partnerId);
    @Query("select o from Order  o where o.orderCode=:code")
    Order findByCode(String code);
    @Query("select o from Order  o where o.updatedDate like concat('%',:date,'%') ")
    List<Order> getListAllOrderByDay(String date);
    @Query("select o from Order  o where o.status=:status and o.updatedDate like concat('%',:date,'%')")
    List<Order> getListOrderStatusByDay(Integer status,String date);
    @Query("select o.partner,sum(o.totalPrice) as totalPrice from Order o where o.status=303 group by o.partner.id order by totalPrice desc")
    List<Object> getPartnerByQuantity();
}
