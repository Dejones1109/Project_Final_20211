package com.example.demo.request.bill;

import lombok.Data;

@Data
public class CreateBillRequest {
    String vat;
    String company;
    String address;
    String email;
}
