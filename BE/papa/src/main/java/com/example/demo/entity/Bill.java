package com.example.demo.entity;

import lombok.*;

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
    @Getter
    @Setter
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;
    @OneToOne
    @JoinColumn(name = "partner_id")
    @Getter
    @Setter
    Partner partner;
    @Column(name = "bill_code")
    @Getter
    @Setter
    String billCode;
    @Column(name = "company_name")
    @Getter
    @Setter
    String companyName;
    @Column(name = "company_address")
    @Getter
    @Setter
    String companyAddress;
    @Column(name = "vat")
    @Getter
    @Setter
    String VAT;
    @Column(name = "email")
    @Getter
    @Setter
    String email;
    @Column(name = "created_date")
    @Getter
    @Setter
    String createdDate;
    @Column(name = "updated_date")
    @Getter
    @Setter
    String updatedDate;
}
