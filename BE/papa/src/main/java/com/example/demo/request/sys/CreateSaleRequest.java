package com.example.demo.request.sys;

import lombok.Data;

@Data
public class CreateSaleRequest {
    protected String saleCode;
    protected String saleName;
    protected Integer saleValue;
    protected Integer conditions;
    protected String saleRemark;
    protected String startDate;
    protected String endDate;
}
