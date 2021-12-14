package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "cart")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Cart implements Serializable {
    private static final long serialVersionUID = 6447416794596398975L;
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;
    @Column(name = "cart_code")
    String cartCode;
    @OneToOne
    @JoinColumn(name = "product_id")
    private Products product;
    @OneToOne
    @JoinColumn(name = "partner_id")
    private Partner partner;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "order_id",nullable = true)
    @JsonIgnore
    private Order order;
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
