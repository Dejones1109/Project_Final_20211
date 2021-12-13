package com.example.demo.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "cart")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Cart {
    @Id
    @Column(name = "id")
    String id;
    @OneToOne
    @JoinColumn(name = "id_product")
    Products products;
    @OneToOne
    @JoinColumn(name = "id_partner")
    Partner partner;
    @Column(name = "quantity")
    Integer quantity;
    @Column(name = "price")
    Integer price;
    @Column(name = "choose")
    Integer choose;
    @Column(name = "status")
    Integer status;
    @Column(name = "created_date")
    String createdDate;
}
