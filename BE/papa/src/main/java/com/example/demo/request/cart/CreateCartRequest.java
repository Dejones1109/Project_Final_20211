package com.example.demo.request.cart;

import lombok.Data;

import javax.persistence.criteria.CriteriaBuilder;

@Data
public class CreateCartRequest {
    protected  Integer productId;
    protected Integer partnerId;
    protected Integer quantity;
}
