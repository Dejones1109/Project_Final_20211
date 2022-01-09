package com.example.demo.controller;

import com.example.demo.constant.Status;
import com.example.demo.dto.GwResponse;
import com.example.demo.entity.Products;
import com.example.demo.entity.Sale;
import com.example.demo.request.product.CreateProductsRequest;
import com.example.demo.request.sys.CreateSaleRequest;
import com.example.demo.response.ListSaleNoUse;
import com.example.demo.services.SaleService;
import com.example.demo.utils.DataUtil;
import com.example.demo.utils.DateUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/system")
@Slf4j
@CrossOrigin("*")
public class SystemController {
    @Autowired
    SaleService saleService;
    HttpHeaders responseHeader = new HttpHeaders();
    @PostMapping(params = "query=sale")
    public ResponseEntity<GwResponse<Sale>> save(@RequestBody CreateSaleRequest request) {
        GwResponse<Sale> response = new GwResponse<>();

        try {
            Sale sale = Sale.builder()
                    .saleCode(request.getSaleCode())
                    .saleName(request.getSaleName())
                    .saleValue(request.getSaleValue())
                    .conditions(request.getConditions())
                    .saleRemark(request.getSaleRemark())
                    .startDate(request.getStartDate())
                    .endDate(request.getEndDate())
                    .status(501)
                    .createdDate(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                    .updatedDate(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                    .build();
            //  System.out.println(products);
            saleService.save(sale);
            response.setCode(Status.CODE_CREATED);
            response.setMessage(Status.STATUS_CREATED);
            response.setData(sale);
            responseHeader.add("code", Status.CODE_CREATED);
            responseHeader.add("message", Status.STATUS_CREATED);
            responseHeader.add("responseTime", LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
            return ResponseEntity.ok().headers(responseHeader).body(response);

        } catch (Throwable e) {
            e.printStackTrace();
            response.setCode(Status.CODE_INTERNAL_SERVER_ERROR);
            response.setMessage(Status.STATUS_INTERNAL_SERVER_ERROR);
            response.setData(null);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    @GetMapping(value = "/{id}")
    public ResponseEntity<GwResponse<Sale>> findById(@PathVariable Integer id){
        GwResponse<Sale> response = new GwResponse<>();
        try {
            Sale sale = saleService.findById(id);
            if(sale!=null){
                response.setCode(Status.CODE_SUCCESS);
                response.setMessage(Status.STATUS_SUCCESS);
                response.setData(sale);
                responseHeader.add("code", Status.CODE_SUCCESS);
                responseHeader.add("message", Status.STATUS_SUCCESS);
            }else {
                response.setCode(Status.CODE_NOT_FOUND);
                response.setMessage(Status.STATUS_NOT_FOUND);
                response.setData(null);
                responseHeader.add("code", Status.CODE_NOT_FOUND);
                responseHeader.add("message", Status.STATUS_NOT_FOUND);
            }
            responseHeader.add("responseTime", LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
            return ResponseEntity.ok().headers(responseHeader).body(response);


        }catch (Throwable e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    @PutMapping(value = "/{id}",params = "query=status")
    public ResponseEntity<GwResponse<Sale>> updateByStatus(@RequestParam Integer status, @PathVariable Integer id) {
        GwResponse<Sale> response = new GwResponse<>();
        Sale saleCurrent = saleService.findById(id);
        try {
            //TODPO Validate fields
            if (saleCurrent == null) {
                return ResponseEntity.badRequest().body(null);
            }
            saleCurrent.setUpdatedDate(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
            saleCurrent.setStatus(status);
            saleService.save(saleCurrent);
            response.setCode(Status.CODE_SUCCESS);
            response.setMessage(Status.STATUS_SUCCESS);
            response.setData(saleCurrent);
            responseHeader.add("code", Status.CODE_SUCCESS);
            responseHeader.add("message", Status.STATUS_SUCCESS);
            responseHeader.add("responseTime", LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
            return ResponseEntity.ok().headers(responseHeader).body(response);

        } catch (Throwable e) {
            e.printStackTrace();
            response.setCode(Status.CODE_INTERNAL_SERVER_ERROR);
            response.setMessage(Status.STATUS_INTERNAL_SERVER_ERROR);
            response.setData(null);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    @GetMapping(value = "/{partnerId}", params = "query=listSaleNoUse")
    public ResponseEntity<GwResponse<ListSaleNoUse>> getListSaleNoUse(@PathVariable Integer partnerId,@RequestParam Integer condition) {
        GwResponse<ListSaleNoUse> response = new GwResponse<>();
        try {
            ListSaleNoUse saleNoUse = saleService.getListSaleNoUse(partnerId,condition);
            if (saleNoUse!=null) {
                response.setCode(Status.CODE_SUCCESS);
                response.setMessage(Status.STATUS_SUCCESS);
                response.setData(saleNoUse);
                responseHeader.add("code", Status.CODE_SUCCESS);
                responseHeader.add("message", Status.STATUS_SUCCESS);
            } else {
                response.setCode(Status.CODE_NOT_FOUND);
                response.setMessage(Status.STATUS_NOT_FOUND);
                response.setData(null);
                responseHeader.add("code", Status.CODE_NOT_FOUND);
                responseHeader.add("message", "Partner don't exits");
            }
            responseHeader.add("responseTime", LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));

            return ResponseEntity.ok().headers(responseHeader).body(response);

        } catch (Throwable e) {
            e.printStackTrace();
            response.setCode(Status.CODE_INTERNAL_SERVER_ERROR);
            response.setMessage(Status.STATUS_INTERNAL_SERVER_ERROR);
            response.setData(null);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    @GetMapping
    public ResponseEntity<GwResponse<List<Sale>>> fillAll(){
        GwResponse<List<Sale>> response = new GwResponse<>();
        try {
            List<Sale> sale = saleService.fillAll();
            if(!sale.isEmpty()){
                response.setCode(Status.CODE_SUCCESS);
                response.setMessage(Status.STATUS_SUCCESS);
                response.setData(sale);
                responseHeader.add("code", Status.CODE_SUCCESS);
                responseHeader.add("message", Status.STATUS_SUCCESS);
            }else {
                response.setCode(Status.CODE_NOT_FOUND);
                response.setMessage(Status.STATUS_NOT_FOUND);
                response.setData(null);
                responseHeader.add("code", Status.CODE_NOT_FOUND);
                responseHeader.add("message", Status.STATUS_NOT_FOUND);
            }
            responseHeader.add("responseTime", LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
            return ResponseEntity.ok().headers(responseHeader).body(response);


        }catch (Throwable e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
