package com.example.demo.entity;

import lombok.*;
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
    @Getter
    @Setter
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "admin_code")
    @Getter
    @Setter
    String adminCode;
    @Column(name="phone")
    @Getter
    @Setter
    String phone;
    @Column(name="password")
    @Getter
    @Setter
    String password;
    @Column(name = "created_date")
    @Getter
    @Setter
    String createdDate;
}
