package com.example.demo.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderQuantityByStatus {
    protected Long orderWaiting;
    protected Long orderShip;
    protected Long orderDone;
    protected Long orderCancel;
    protected Long orderNoPay;
    protected Long orderPayed;
}
