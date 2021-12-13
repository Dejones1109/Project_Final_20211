package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
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
    String id;
    @Column(name = "product_name")
    String productName;
    @Column(name = "image")
    String image;
    @Column(name = "price")
    Integer price;
    @Column(name = "type")
    String type;
    @Column(name = "desc")
    String desc;
    @Column(name = "status")
    Integer status;
    @Column(name = "created_date")
    String createdDate;
    @Column(name = "is_display")
    Integer isDisplay;
    @Column(name = "view")
    Integer view;

}
