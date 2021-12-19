package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "orders")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order implements Serializable {
    private static final long serialVersionUID = 6447416794596398975L;
    @Id
    @Column(name = "id")
    @Getter
    @Setter
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;
    @Getter
    @Setter
    @Column(name = "order_code")
    String orderCode;
    @OneToOne
    @Getter
    @Setter
    @JoinColumn(name = "admin_id")
    Admin admin;
//    @Column(name = "partner_id")
//    Integer partnerId;
    @OneToOne
    @Getter
    @Setter
    @JoinColumn(name = "partner_id")
    Partner partner;
    @OneToMany(mappedBy = "order")
    @Getter
    @Setter
    @JsonIgnore
    private List<Cart> listCart;
    @Column(name = "total_price")
    @Getter
    @Setter
    Integer totalPrice;
    @Column(name = "is_bill")
    @Getter
    @Setter
    Integer isBill;
    @Column(name = "status")
    @Getter
    @Setter
    Integer status;
    @Column(name = "created_date")
    @Getter
    @Setter
    String createdDate;
    @Column(name = "updated_date")
    @Getter
    @Setter
    String updatedDate;
}
