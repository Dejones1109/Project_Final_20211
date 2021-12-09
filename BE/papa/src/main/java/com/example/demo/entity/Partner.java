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
@Table(name = "partner")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Partner {
    @Id
    @Column(name = "id")
    String id;
    @Column(name="phone")
    String phone;
    @Column(name="password")
    String password;
    @Column(name = "name")
    String name;
    @Column(name = "name_store")
    String nameStore;
    @Column(name = "address")
    String address;
    @Column(name = "status")
    Integer status;
    @Column(name = "created_date")
    Date createdDate;
}
