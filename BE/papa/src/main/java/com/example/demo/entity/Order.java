package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "order")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order {
    @Id
    @Column(name = "id")
    String id;
    @OneToOne
    @JoinColumn(name = "id_admin")
    Admin admin;
    @OneToOne
    @JoinColumn(name = "id_partner")
    Partner partner;
    @OneToMany
    @JoinColumn(name = "id_cart")
    @JsonIgnore
    List<Cart> listCart;
    @Column(name = "is_bill")
    Integer isBill;
    @Column(name = "status")
    Integer status;
    @Column(name = "created_date")
    Date createdDate;
    @Column(name = "updated_date")
    Date updateDate;
}
