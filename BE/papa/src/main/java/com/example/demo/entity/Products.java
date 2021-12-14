package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "product")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class Products  implements  Serializable{
    private static final long serialVersionUID = 6447416794596398975L;
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;
    @Column(name = "product_code")
    String productCode;
    @OneToOne(mappedBy = "product")
    private Cart cart;
    @Column(name = "product_name")
    private String productName;
    @Column(name = "image")
    private String image;
    @Column(name = "price")
    private Integer price;
    @Column(name = "type")
    private String type;
    @Column(name = "desc")
    private String desc;
    @Column(name = "status")
    private Integer status;
    @Column(name = "created_date")
    private String createdDate;
    @Column(name = "is_display")
    private Integer isDisplay;
    @Column(name = "view")
    private Integer view;

}
