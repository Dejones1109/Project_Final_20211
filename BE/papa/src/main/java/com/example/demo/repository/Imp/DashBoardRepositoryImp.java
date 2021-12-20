package com.example.demo.repository.Imp;

import com.example.demo.repository.DashBoardRepository;
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
}
