package com.example.demo.services;

import com.example.demo.response.admin.DashboardByProductAndPriceResponse;
import com.example.demo.response.admin.DashboardByProductType;

import java.util.List;

public interface DashboardService {
    List<DashboardByProductAndPriceResponse> dashboardByProductAndPrice(String startDate, String endDate);
    List<DashboardByProductType> dashboardPercentByProductType(String startDate, String endDate);
}
