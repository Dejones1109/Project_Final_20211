package com.example.demo.request;

import lombok.Data;

@Data
public class CreateProductRequest {
    protected String productName;
    protected String image;
    protected Integer price;
    protected String type;
    protected String desc;
}
