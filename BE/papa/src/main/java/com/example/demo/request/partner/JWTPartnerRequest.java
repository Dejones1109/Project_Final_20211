package com.example.demo.request.partner;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class JWTPartnerRequest  implements Serializable {
    private static final long serialVersionUID = 5926468583005150707L;
    private String phone;
    private String password;
}
