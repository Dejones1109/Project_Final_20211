package com.example.demo.response.admin;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardByProductAndPriceResponse {
    protected String productName;
    protected String type;
    protected Integer price;
    protected Double percent;
}
