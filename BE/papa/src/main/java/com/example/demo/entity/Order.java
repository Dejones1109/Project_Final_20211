package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "order")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order implements Serializable {
    private static final long serialVersionUID = 6447416794596398975L;
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;
    @Column(name = "order_code")
    String orderCode;
    @OneToOne
    @JoinColumn(name = "admin_id")
    Admin admin;
    @Column(name = "partner_id")
    Integer partnerId;
//    @OneToOne
//    @JoinColumn(name = "partner_id")
//    Partner partner;
    @OneToMany(mappedBy = "order")
    @JsonIgnore
    private List<Cart> listCart;
    @Column(name = "is_bill")
    Integer isBill;
    @Column(name = "status")
    Integer status;
    @Column(name = "created_date")
    Date createdDate;
    @Column(name = "updated_date")
    String updateDate;
}
