package com.example.demo.controller;

import com.example.demo.constant.Status;
import com.example.demo.dto.GwResponse;
import com.example.demo.entity.Bill;
import com.example.demo.entity.Cart;
import com.example.demo.entity.Partner;
import com.example.demo.request.bill.CreateBillRequest;
import com.example.demo.request.partner.CreatePartnerRequest;
import com.example.demo.request.partner.UpdatePartnerRequest;
import com.example.demo.services.BillService;
import com.example.demo.services.PartnerService;
import com.example.demo.utils.DataUtil;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.SerializationUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/bill")
@Slf4j
@CrossOrigin("*")
public class BillController {
    @Autowired
    BillService billService;
    @Autowired
    PartnerService partnerService;
    HttpHeaders responseHeader = new HttpHeaders();
    @GetMapping("/{partnerId}")
    public ResponseEntity<GwResponse<Bill>> findBillByPartnerId(@PathVariable Integer partnerId){
        GwResponse<Bill> response = new GwResponse<>();
        try {
            Bill bill= billService.findBillByPartnerId(partnerId);
            if (bill!=null) {
                System.out.println(bill);
                response.setCode(Status.CODE_SUCCESS);
                response.setMessage(Status.STATUS_SUCCESS);
                response.setData(bill);
                responseHeader.add("code", Status.CODE_SUCCESS);
                responseHeader.add("message", Status.STATUS_SUCCESS);
            } else {
                response.setCode(Status.CODE_NOT_FOUND);
                response.setMessage(Status.STATUS_NOT_FOUND);
                response.setData(null);
                responseHeader.add("code", Status.CODE_NOT_FOUND);
                responseHeader.add("message", Status.STATUS_NOT_FOUND);
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
    @PostMapping("/{id}")
    public ResponseEntity<GwResponse<Bill>> save(@RequestBody CreateBillRequest request,@PathVariable Integer id) {
        GwResponse<Bill> response = new GwResponse<>();
        String newCode = DataUtil.getNewId("B", billService.getMaxLength());

        try {
            Bill bill = billService.findBillByPartnerId(id);
            if (bill != null) {
                response.setCode(Status.CODE_SUCCESS);
                response.setMessage(Status.STATUS_USERNAME_EXITS);
                response.setData(bill);
                responseHeader.add("code", Status.CODE_SUCCESS);
                responseHeader.add("message", "Bill exits");
                responseHeader.add("responseTime", LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
                return ResponseEntity.ok().headers(responseHeader).body(response);
            } else {
                Bill billNew = Bill.builder()
                        .billCode(newCode)
                        .VAT(request.getVat())
                        .companyAddress(request.getAddress())
                        .companyName(request.getCompany())
                        .email(request.getEmail())
                        .partner(partnerService.findById(id))
                        .createdDate(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                        .updatedDate(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                        .build();
                billService.save(billNew);
                response.setCode(Status.CODE_CREATED);
                response.setMessage(Status.STATUS_CREATED);
                response.setData(billNew);
                responseHeader.add("code", Status.CODE_CREATED);
                responseHeader.add("message", Status.STATUS_CREATED);
                responseHeader.add("responseTime", LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
                return ResponseEntity.ok().headers(responseHeader).body(response);
            }

        } catch (Throwable e) {
            e.printStackTrace();
            response.setCode(Status.CODE_INTERNAL_SERVER_ERROR);
            response.setMessage(Status.STATUS_INTERNAL_SERVER_ERROR);
            response.setData(null);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    @PutMapping("/{id}")
    public ResponseEntity<GwResponse<Bill>> update(@RequestBody CreateBillRequest request, @PathVariable Integer id) {
        GwResponse<Bill> response = new GwResponse<>();

        Bill billCurrent = billService.findBillByPartnerId(id);


        try {
            //TODPO Validate fields
            if (billCurrent == null) {
                return ResponseEntity.badRequest().body(null);
            }

            billCurrent.setVAT(request.getVat());
            billCurrent.setCompanyAddress(request.getAddress());
            billCurrent.setCompanyName(request.getCompany());
            billCurrent.setEmail(request.getEmail());
            billCurrent.setUpdatedDate(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
            billService.save(billCurrent);
            response.setCode(Status.CODE_SUCCESS);
            response.setMessage(Status.STATUS_SUCCESS);
            response.setData(billCurrent);
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
}
