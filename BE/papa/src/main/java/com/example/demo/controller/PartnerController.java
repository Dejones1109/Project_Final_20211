package com.example.demo.controller;

import com.example.demo.constant.Status;
import com.example.demo.dto.GwResponse;
import com.example.demo.entity.Partner;
import com.example.demo.request.partner.CreatePartnerRequest;
import com.example.demo.request.partner.UpdatePartnerRequest;
import com.example.demo.response.OrderQuantityByStatus;
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
@RequestMapping("/partner")
@Slf4j
@CrossOrigin("*")
public class PartnerController {
    @Autowired
    PartnerService partnerService;
    HttpHeaders responseHeader = new HttpHeaders();
    @GetMapping
    public ResponseEntity<GwResponse<List<Partner>>> findAll() {
        GwResponse<List<Partner>> response = new GwResponse<>();
        try {
            List<Partner> listPartner = partnerService.findAll();
            if (!listPartner.isEmpty()) {
                response.setCode(Status.CODE_SUCCESS);
                response.setMessage(Status.STATUS_SUCCESS);
                response.setData(listPartner);
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
    @GetMapping(value = "/{code}")
    public ResponseEntity<GwResponse<Partner>> findById(@PathVariable String code) {
        GwResponse<Partner> response = new GwResponse<>();
        try {
            Partner partner = partnerService.findByPartnerCode(code);
            if (partner != null) {
                response.setCode(Status.CODE_SUCCESS);
                response.setMessage(Status.STATUS_SUCCESS);
                response.setData(partner);
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
    @GetMapping( value = "/{status}",params = "query=status")
    public ResponseEntity<GwResponse<List<Partner>>> getListPartnerByStatus(@PathVariable Integer status) {
        GwResponse<List<Partner>> response = new GwResponse<>();
        try {
            List<Partner> partners = partnerService.getListPartnerByType(status);
            if (!partners.isEmpty()) {
                response.setCode(Status.CODE_SUCCESS);
                response.setMessage(Status.STATUS_SUCCESS);
                response.setData(partners);
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
    @PostMapping
    public ResponseEntity<GwResponse<Partner>> save(@RequestBody CreatePartnerRequest request) {
        GwResponse<Partner> response = new GwResponse<>();
        String newCode = DataUtil.getNewId("P", partnerService.getMaxLength());
        try {
            Partner partner = Partner.builder()
                    .partCode(newCode)
                    .phone(request.getPhone())
                    .name(request.getName())
                    .address(request.getAddress())
                    .nameStore(request.getNameStore())
                    .status(201)
                    .createdDate(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                    .updatedDate(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                    .build();
            partnerService.save(partner);
            response.setCode(Status.CODE_CREATED);
            response.setMessage(Status.STATUS_CREATED);
            response.setData(partner);
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
    @PutMapping("/{id}")
    public ResponseEntity<GwResponse<List<Partner>>> update(@RequestBody UpdatePartnerRequest request, @PathVariable Integer id) {
        GwResponse<List<Partner>> response = new GwResponse<>();
        Partner partnerCurrent = partnerService.findById(id);
        try {
            //TODPO Validate fields
            if (partnerCurrent == null) {
                return ResponseEntity.badRequest().body(null);
            }
            Partner partnerClone = SerializationUtils.clone(partnerCurrent);
            partnerCurrent.setPhone(request.getPhone());
            partnerCurrent.setName(request.getName());
            partnerCurrent.setNameStore(request.getNameStore());
            partnerCurrent.setAddress(request.getAddress());
            partnerCurrent.setUpdatedDate(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
            partnerService.save(partnerCurrent);
            response.setCode(Status.CODE_SUCCESS);
            response.setMessage(Status.STATUS_SUCCESS);
            List<Partner> partners = new ArrayList<>();
            partners.add(partnerClone);
            partners.add(partnerCurrent);
            response.setData(partners);
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
    @PutMapping(value = "/{id}",params = "query=status")
    public ResponseEntity<GwResponse<Partner>> updateByStatus(@RequestParam Integer status, @PathVariable Integer id) {
        GwResponse<Partner> response = new GwResponse<>();
        Partner partnerCurrent = partnerService.findById(id);
        try {
            //TODPO Validate fields
            if (partnerCurrent == null) {
                return ResponseEntity.badRequest().body(null);
            }
            partnerCurrent.setUpdatedDate(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
            partnerCurrent.setStatus(status);
            partnerService.save(partnerCurrent);
            response.setCode(Status.CODE_SUCCESS);
            response.setMessage(Status.STATUS_SUCCESS);
            response.setData(partnerCurrent);
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
//    @PutMapping(value = "/{id}",params = "query=password")
//    public ResponseEntity<GwResponse<Partner>> login(@RequestParam String phone,@RequestParam String password, @PathVariable Integer id) {
//        GwResponse<Partner> response = new GwResponse<>();
//        Partner partnerCurrent = partnerService.findById(id);
//        try {
//            //TODPO Validate fields
//            if (partnerCurrent == null) {
//                return ResponseEntity.badRequest().body(null);
//            }
//            partnerCurrent.setUpdatedDate(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
//            partnerCurrent.setStatus(status);
//            partnerService.save(partnerCurrent);
//            response.setCode(Status.CODE_SUCCESS);
//            response.setMessage(Status.STATUS_SUCCESS);
//            response.setData(partnerCurrent);
//            responseHeader.add("code", Status.CODE_SUCCESS);
//            responseHeader.add("message", Status.STATUS_SUCCESS);
//            responseHeader.add("responseTime", LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
//            return ResponseEntity.ok().headers(responseHeader).body(response);
//
//        } catch (Throwable e) {
//            e.printStackTrace();
//            response.setCode(Status.CODE_INTERNAL_SERVER_ERROR);
//            response.setMessage(Status.STATUS_INTERNAL_SERVER_ERROR);
//            response.setData(null);
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
//        }
//    }
@GetMapping(value = "/{partnerId}",params = "query=quantityOrder")
public ResponseEntity<GwResponse<OrderQuantityByStatus>> orderQuantityByStatusOfPartner(@PathVariable Integer partnerId) {
    GwResponse<OrderQuantityByStatus> response = new GwResponse<>();
    try {
        OrderQuantityByStatus obj = partnerService.orderQuantityByStatusOfPartner(partnerId);
        if (obj!=null) {
            response.setCode(Status.CODE_SUCCESS);
            response.setMessage(Status.STATUS_SUCCESS);
            response.setData(obj);
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
}
