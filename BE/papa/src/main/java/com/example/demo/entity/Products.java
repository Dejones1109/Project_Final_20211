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
public class Products {

    @Id
    @Column(name = "id")
    @Getter
    @Setter
    String id;
    @Column(name = "product_name")
    @Getter
    @Setter
    String productName;
    @Column(name = "image")
    @Getter
    @Setter
    String image;
    @Column(name = "price")
    @Getter
    @Setter
    Integer price;
    @Column(name = "type")
    @Getter
    @Setter
    String type;
    @Column(name = "desc")
    @Getter
    @Setter
    String desc;
    @Column(name = "status")
    @Getter
    @Setter
    Integer status;
    @Column(name = "created_date")
    @Getter
    @Setter
    Date createdDate;
    @Column(name = "is_display")
    @Getter
    @Setter
    Integer isDisplay;
    @Column(name = "view")
    @Getter
    @Setter
    Integer view;

}
