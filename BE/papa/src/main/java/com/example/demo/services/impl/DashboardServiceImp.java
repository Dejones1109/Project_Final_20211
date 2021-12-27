package com.example.demo.services.impl;

import com.example.demo.entity.Products;
import com.example.demo.repository.DashBoardRepository;
import com.example.demo.repository.ProductRepository;
import com.example.demo.response.OrderQuantityByStatus;
import com.example.demo.response.admin.DashboardByProductAndPriceResponse;
import com.example.demo.response.admin.DashboardByProductType;
import com.example.demo.services.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class DashboardServiceImp implements DashboardService {
    @Autowired
    DashBoardRepository dashBoardRepository;
    @Autowired
    ProductRepository productRepository;

    @Override
    public List<DashboardByProductAndPriceResponse> dashboardByProductAndPrice(String startDate, String endDate) {
        return dashBoardRepository.dashboardByProductAndPrice(startDate, endDate);
    }

    @Override
    public List<DashboardByProductType> dashboardPercentByProductType(String startDate, String endDate) {
        List<DashboardByProductAndPriceResponse> dashboard = dashBoardRepository.dashboardByProductAndPrice(startDate, endDate);
        List<DashboardByProductType> resultList = new ArrayList<>();
        double percentChaoChim = 0;
        int priceChaoChim = 0;
        double percentChaoTimCan = 0;
        int priceChaoTimCan = 0;
        double percentChaoCa = 0;
        int priceChaoCa = 0;
        double percentChaoLuon = 0;
        int priceChaoLuon = 0;
        double percentChaoHaiSan = 0;
        int priceChaoHaiSan = 0;
        double percentChaoThit = 0;
        int priceChaoThit = 0;
        double percentChaoEch = 0;
        int priceChaoEch = 0;
        double percentChaoCua = 0;
        int priceChaoCua = 0;
        //   String[]

        for (DashboardByProductAndPriceResponse dashboard1 : dashboard) {
            if ("Cháo thịt".equals(dashboard1.getType())) {
                percentChaoThit += dashboard1.getPercent();
                priceChaoThit+=dashboard1.getPrice();
            }else if ("Cháo tim cận".equals(dashboard1.getType())) {
                percentChaoTimCan += dashboard1.getPercent();
                priceChaoTimCan+=dashboard1.getPrice();
            }else if ("Cháo cá".equals(dashboard1.getType())) {
                percentChaoCa += dashboard1.getPercent();
                priceChaoCa+=dashboard1.getPrice();
            }else if ("Cháo lươn".equals(dashboard1.getType())) {
                percentChaoLuon += dashboard1.getPercent();
                priceChaoLuon+=dashboard1.getPrice();
            }else if ("Cháo hải sản".equals(dashboard1.getType())) {
                percentChaoHaiSan += dashboard1.getPercent();
                percentChaoHaiSan+=dashboard1.getPrice();
            }else if ("Cháo chim".equals(dashboard1.getType())) {
                percentChaoChim += dashboard1.getPercent();
                priceChaoChim+=dashboard1.getPrice();
            }else if ("Cháo ếch".equals(dashboard1.getType())) {
                percentChaoEch += dashboard1.getPercent();
                priceChaoEch+=dashboard1.getPrice();
            }else {
                percentChaoCua+=dashboard1.getPercent();
                priceChaoCua+=dashboard1.getPrice();
            }
        }
        resultList.add(new DashboardByProductType("Cháo thịt",percentChaoThit,priceChaoThit,"#007bff","#007bff",15));
        resultList.add(new DashboardByProductType("Cháo tim cận",percentChaoTimCan,priceChaoTimCan,"#6f42c1","#6f42c1",15));
        resultList.add(new DashboardByProductType("Cháo cá",percentChaoCa,priceChaoCa,"#fd7e14","#fd7e14",15));
        resultList.add(new DashboardByProductType("Cháo lươn",percentChaoLuon,priceChaoLuon,"#ffc107","#ffc107",15));
        resultList.add(new DashboardByProductType("Cháo hải sản",percentChaoHaiSan,priceChaoHaiSan,"#17a2b8","#17a2b8",15));
        resultList.add(new DashboardByProductType("Cháo chim",percentChaoChim,priceChaoChim,"#ffc107","#ffc107",15));
        resultList.add(new DashboardByProductType("Cháo ếch",percentChaoEch,priceChaoEch,"#dc3545","#dc3545",15));
        resultList.add(new DashboardByProductType("Cháo cua",percentChaoCua,priceChaoCua,"#343a40","#343a40",15));
        return resultList;
    }

    @Override
    public OrderQuantityByStatus orderQuantityByStatusOfAdmin() {
        return dashBoardRepository.orderQuantityByStatusOfAdmin();
    }
}
