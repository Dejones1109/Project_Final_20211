package com.example.demo.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.criteria.CriteriaBuilder;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class CreateProductsResponse {
    protected String productCode;
    protected String productName;
    protected String image;
    protected Integer price;
    protected String type;
    protected String desc;
    protected Integer status;
    protected Integer isDisplay;
    protected Integer view;
    protected String createdDate;
}
