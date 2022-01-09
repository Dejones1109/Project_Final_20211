package com.example.demo.entity;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "sale")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Sale implements Serializable {
    private static final long serialVersionUID = 6447416794596398975L;
    @Id
    @Getter
    @Setter
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;
    @Getter
    @Setter
    @Column(name = "sale_code")
    String saleCode;
    @Getter
    @Setter
    @Column(name = "sale_name")
    String saleName;
    @Getter
    @Setter
    @Column(name = "sale_value")
    Integer saleValue;
    @Getter
    @Setter
    @Column(name = "conditions")
    Integer conditions;
    @Getter
    @Setter
    @Column(name = "sale_remark")
    String saleRemark;
    @Getter
    @Setter
    @Column(name = "start_date")
    String startDate;
    @Getter
    @Setter
    @Column(name = "end_date")
    String endDate;
    @Getter
    @Setter
    @Column(name = "status")
    Integer status;
    @Getter
    @Setter
    @Column(name = "created_date")
    private String createdDate;
    @Getter
    @Setter
    @Column(name = "updated_date")
    private String updatedDate;

}
