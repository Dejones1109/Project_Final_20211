package com.example.demo.repository.Imp;

import com.example.demo.entity.Sale;
import com.example.demo.repository.DashBoardRepository;
import com.example.demo.response.OrderQuantityByStatus;
import com.example.demo.response.admin.DashboardByProductAndPriceResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
@Transactional
public class DashBoardRepositoryImp implements DashBoardRepository {
    @Autowired
    JdbcTemplate jdbcTemplate;
    @Override
    public List<DashboardByProductAndPriceResponse> dashboardByProductAndPrice(String startDate, String endDate) {
        List<DashboardByProductAndPriceResponse> resultList = new ArrayList<>();
        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("dashboardByProductAndPrice");
        Map<String, Object> inputParams = new HashMap<>();
        inputParams.put("start_date", startDate);
        inputParams.put("end_date", endDate);
        Map<String, Object> execute = jdbcCall.execute(inputParams);
        ArrayList<Map> dataMap = (ArrayList<Map>) execute.get("#result-set-1");
        dataMap.forEach(map -> {
            DashboardByProductAndPriceResponse dashboard = DashboardByProductAndPriceResponse.builder()
                    .productName((String)map.get("product_name"))
                    .type((String) map.get("type"))
                    .price((Integer) map.get("price"))
                    .percent(Double.parseDouble(map.get("percent").toString()))
                    .build();
            resultList.add(dashboard);
        });

        return resultList;
    }

    @Override
    public OrderQuantityByStatus orderQuantityByStatusOfPartner(Integer partnerId) {
        OrderQuantityByStatus dashboard = new OrderQuantityByStatus();
        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("orderQuantityByStatusOfPartner");
        Map<String, Object> inputParams = new HashMap<>();
        inputParams.put("id", partnerId);
        Map<String, Object> execute = jdbcCall.execute(inputParams);
        ArrayList<Map> dataMap = (ArrayList<Map>) execute.get("#result-set-1");
        dataMap.forEach(map -> {

            dashboard.setOrderWaiting((Long) map.get("waiting"));
            dashboard.setOrderShip((Long) map.get("ship"));
            dashboard.setOrderDone((Long) map.get("done"));
            dashboard.setOrderCancel((Long) map.get("cancel"));
            dashboard.setOrderNoPay((Long) map.get("nopay"));
            dashboard.setOrderPayed((Long) map.get("payed"));


        });
        return dashboard;

    }

    @Override
    public OrderQuantityByStatus orderQuantityByStatusOfAdmin() {
        OrderQuantityByStatus dashboard = new OrderQuantityByStatus();
        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("orderQuantityByStatusOfAdmin");
        Map<String, Object> inputParams = new HashMap<>();
        Map<String, Object> execute = jdbcCall.execute(inputParams);
        ArrayList<Map> dataMap = (ArrayList<Map>) execute.get("#result-set-1");
        dataMap.forEach(map -> {

            dashboard.setOrderWaiting((Long) map.get("waiting"));
            dashboard.setOrderShip((Long) map.get("ship"));
            dashboard.setOrderDone((Long) map.get("done"));
            dashboard.setOrderCancel((Long) map.get("cancel"));
            dashboard.setOrderNoPay((Long) map.get("nopay"));
            dashboard.setOrderPayed((Long) map.get("payed"));
        });
        return dashboard;
    }

    @Override
    public List<Sale> getOrderSaleByPartnerUsed(Integer partnerId) {
        List<Sale> list = new ArrayList<>();
        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("listSalePartnerUsed");
        Map<String, Object> inputParams = new HashMap<>();
        inputParams.put("pid", partnerId);
        Map<String, Object> execute = jdbcCall.execute(inputParams);
        ArrayList<Map> dataMap = (ArrayList<Map>) execute.get("#result-set-1");
        dataMap.forEach(map -> {
   Sale sale = new Sale();
            sale.setId((Integer) map.get("id"));
            sale.setSaleCode((String) map.get("sale_code"));
            sale.setSaleName((String) map.get("sale_name"));
            sale.setSaleValue((Integer) map.get("sale_value"));
            sale.setSaleRemark((String) map.get("sale_remark"));
            sale.setStartDate((String) map.get("start_date"));
            sale.setEndDate((String) map.get("end_date"));
            list.add(sale);
        });
        return list;
    }
}
