package com.example.demo.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "bill")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Bill implements Serializable {
    private static final long serialVersionUID = 6447416794596398975L;
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;
    @OneToOne
    @JoinColumn(name = "partner_id")
    Partner partner;
    @Column(name = "bill_code")
    String billCode;
    @Column(name = "company_name")
    String companyName;
    @Column(name = "company_address")
    String companyAddress;
    @Column(name = "vat")
    String VAT;
    @Column(name = "email")
    String email;
    @Column(name = "created_date")
    String createdDate;
    @Column(name = "updated_date")
    String updateDate;
}
