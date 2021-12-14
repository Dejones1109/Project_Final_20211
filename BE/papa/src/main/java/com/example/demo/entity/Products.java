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
public class Products  implements  Serializable{
    private static final long serialVersionUID = 6447416794596398975L;
    @Id
    @Getter
    @Setter
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;
    @Getter
    @Setter
    @Column(name = "product_code")
    String productCode;
//    @OneToOne(mappedBy = "product")
//    private Cart cart;
    @Getter
    @Setter
    @Column(name = "product_name")
    private String productName;
    @Getter
    @Setter
    @Column(name = "image")
    private String image;
    @Getter
    @Setter
    @Column(name = "price")
    private Integer price;
    @Getter
    @Setter
    @Column(name = "type")
    private String type;
    @Getter
    @Setter
    @Column(name = "desc")
    private String desc;
    @Getter
    @Setter
    @Column(name = "status")
    private Integer status;
    @Getter
    @Setter
    @Column(name = "created_date")
    private String createdDate;
    @Getter
    @Setter
    @Column(name = "is_display")
    private Integer isDisplay;
    @Getter
    @Setter
    @Column(name = "view")
    private Integer view;

}
