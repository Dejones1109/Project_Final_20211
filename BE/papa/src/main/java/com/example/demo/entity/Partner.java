package com.example.demo.entity;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "partner")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Partner implements Serializable {
    private static final long serialVersionUID = 6447416794596398975L;
    @Id
    @Column(name = "id")
    @Getter
    @Setter
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;
    @Column(name = "partner_code")
    @Getter
    @Setter
    String partCode;
    @Column(name="phone")
    @Getter
    @Setter
    String phone;
    @Column(name="password")
    @Getter
    @Setter
    String password;
    @Column(name = "name")
    @Getter
    @Setter
    String name;
    @Column(name = "name_store")
    @Getter
    @Setter
    String nameStore;
    @Column(name = "address")
    @Getter
    @Setter
    String address;
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
