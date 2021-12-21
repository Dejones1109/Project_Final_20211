package com.example.demo.response.admin;

import com.example.demo.entity.Partner;
import lombok.Data;

@Data
public class GetPartnerByQuantity {
    private Partner partner;
    private Integer totalPrice;
}
