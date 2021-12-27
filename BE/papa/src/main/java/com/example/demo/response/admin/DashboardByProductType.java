package com.example.demo.response.admin;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DashboardByProductType {
    protected String productType;
    protected Double percent;
    protected Integer price;
    protected String color;
    protected String legendFontColor;
    protected Integer legendFontSize;

}
