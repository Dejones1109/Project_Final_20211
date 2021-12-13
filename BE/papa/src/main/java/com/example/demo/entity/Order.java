package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "order")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order implements Serializable {
    private static final long serialVersionUID = 6447416794596398975L;
    @Id
    @Column(name = "id")
    String id;
    @JoinColumn(name = "id_partner")
    String idPartner;
    @OneToMany(mappedBy = "order")
    @JsonIgnore
    List<Cart> listCart;
    @Column(name = "is_bill")
    Integer isBill;
    @Column(name = "status")
    Integer status;
    @Column(name = "created_date")
    Date createdDate;
    @Column(name = "updated_date")
    String updateDate;
    @JoinColumn(name = "id_admin")
    String idAdmin;
}
