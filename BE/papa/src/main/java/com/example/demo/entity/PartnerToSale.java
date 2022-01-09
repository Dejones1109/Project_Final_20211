package com.example.demo.entity;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "partner_to_sale")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PartnerToSale implements Serializable {
    private static final long serialVersionUID = 6447416794596398975L;
    @Id
    @Getter
    @Setter
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;
    @OneToOne
    @JoinColumn(name = "order_id")
    @Getter
    @Setter
    private Order order;
    @OneToOne
    @JoinColumn(name = "sale_id")
    @Getter
    @Setter
    private Sale sale;
    @Getter
    @Setter
    @Column(name = "created_date")
    private String createdDate;
}
