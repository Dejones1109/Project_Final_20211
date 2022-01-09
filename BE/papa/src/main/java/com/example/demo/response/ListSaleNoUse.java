package com.example.demo.response;

import com.example.demo.entity.Sale;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ListSaleNoUse {
    List<Sale> listSaleCondition;
    List<Sale> listSaleNoCondition;
}
