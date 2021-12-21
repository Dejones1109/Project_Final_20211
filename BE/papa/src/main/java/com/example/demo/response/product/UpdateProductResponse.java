package com.example.demo.response.product;

import com.example.demo.entity.Products;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class UpdateProductResponse {
    Products previousProduct;
    Products updateProduct;
}
