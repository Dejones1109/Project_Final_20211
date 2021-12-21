package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

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
    @Getter
    @Setter
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;
    @Column(name = "cart_code")
    @Getter
    @Setter
    String cartCode;
    @OneToOne
    @JoinColumn(name = "product_id")
    @Getter
    @Setter
    private Products product;
    @OneToOne
    @JoinColumn(name = "partner_id")
    @Getter
    @Setter
    private Partner partner;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    @JsonIgnore
    @Getter
    @Setter
    private Order order;
    @Column(name = "quantity")
    @Getter
    @Setter
    Integer quantity;
    @Column(name = "price")
    @Getter
    @Setter
    Integer price;
//    @Column(name = "choose")
//    @Getter
//    @Setter
//    Integer choose;
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
