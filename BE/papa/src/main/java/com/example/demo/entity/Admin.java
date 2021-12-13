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
    String id;
    @Column(name="phone")
    String phone;
    @Column(name="password")
    String password;
}
