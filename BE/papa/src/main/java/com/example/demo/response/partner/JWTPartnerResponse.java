package com.example.demo.response.partner;

import lombok.Data;

import java.io.Serializable;

@Data
public class JWTPartnerResponse implements Serializable {
    private static final long serialVersionUID = -8091879091924046844L;
    private  final String token;
}
