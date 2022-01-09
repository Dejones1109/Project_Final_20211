package com.example.demo.request.order;

import lombok.Data;

import javax.persistence.criteria.CriteriaBuilder;


@Data
public class CreateOrderRequest {
    protected Integer adminId;
    protected Integer partnerId;
    protected Integer[] cartId;
    protected Integer isBill;
    protected Integer saleId;

}
