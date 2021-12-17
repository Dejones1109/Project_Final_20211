package com.example.demo.request.product;

import lombok.Data;

@Data
public class CreateProductsRequest {
    protected String productName;
    protected String image;
    protected Integer price;
    protected String type;
    protected String remark;
}
