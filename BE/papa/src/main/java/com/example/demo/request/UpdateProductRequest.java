package com.example.demo.request;

import lombok.Data;

@Data
public class UpdateProductRequest {
    protected String productName;
    protected String image;
    protected Integer price;
    protected String type;
    protected String remark;
  //  protected  Integer status;
}
