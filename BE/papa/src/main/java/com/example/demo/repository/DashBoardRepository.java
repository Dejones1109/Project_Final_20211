package com.example.demo.repository;

import com.example.demo.entity.Sale;
import com.example.demo.response.OrderQuantityByStatus;
import com.example.demo.response.admin.DashboardByProductAndPriceResponse;

import java.util.List;
import java.util.Map;

public interface DashBoardRepository {
    List<DashboardByProductAndPriceResponse> dashboardByProductAndPrice(String startDate, String endDate);
    OrderQuantityByStatus orderQuantityByStatusOfPartner(Integer partnerId);
    OrderQuantityByStatus orderQuantityByStatusOfAdmin();
    List<Sale> getOrderSaleByPartnerUsed(Integer partnerId);
}
