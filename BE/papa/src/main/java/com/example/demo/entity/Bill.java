package com.example.demo.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "bill")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Bill {
    @Id
    @Column(name = "id")
    String id;
    @OneToOne
    @JoinColumn(name = "id_partner")
    Partner partner;
    @Column(name = "name_company")
    String nameCompany;
    @Column(name = "VAT")
    String VAT;
    @Column(name = "email")
    String email;
    @Column(name = "created_date")
    Date createdDate;
    @Column(name = "updated_date")
    Date updateDate;
}
