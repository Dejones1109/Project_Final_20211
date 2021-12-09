package com.example.demo.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

@Entity
@Table(name = "product")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {
    @Id
    @Column(name = "id")
    String id;
    @Column(name = "product_name")
    String productName;
    @Column(name = "image")
    String image;
    @Column(name = "type")
    String type;
    @Column(name = "desc")
    String desc;
    @Column(name = "status")
    Integer status;
    @Column(name = "created_date")
    Date createdDate;
    @Column(name = "is_display")
    Integer isDisplay;

}
