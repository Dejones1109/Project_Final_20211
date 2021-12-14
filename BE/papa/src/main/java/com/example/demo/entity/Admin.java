package com.example.demo.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.bytebuddy.implementation.bind.annotation.Empty;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity
@Table(name = "admin")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Admin implements Serializable {
    private static final long serialVersionUID = 6447416794596398975L;
    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "admin_code")
    String adminCode;
    @Column(name="phone")
    String phone;
    @Column(name="password")
    String password;
    @Column(name = "created_date")
    String createdDate;
    @OneToOne(mappedBy = "admin")
    private Order order;
}
