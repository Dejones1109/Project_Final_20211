package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Value;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@lombok.Data
public class GwResponse<T> {
    private String code;
    private String message;
    private T data;
}
