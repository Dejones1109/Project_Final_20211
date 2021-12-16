package com.example.demo.request;

import lombok.Data;

@Data
public class CreatePartnerRequest {
    protected String phone;
    protected String name;
    protected String nameStore;
    protected String address;

}
