package com.example.demo.controller;

import com.example.demo.constant.Status;
import com.example.demo.dto.GwResponse;
import com.example.demo.entity.*;
import com.example.demo.request.order.CreateOrderRequest;
import com.example.demo.services.AdminService;
import com.example.demo.services.CartService;
import com.example.demo.services.OrderService;
import com.example.demo.services.PartnerService;
import com.example.demo.utils.DataUtil;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.SerializationUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/orders")
@Slf4j
@CrossOrigin("*")
public class OrderController {
    @Autowired
    OrderService orderService;
    @Autowired
    PartnerService partnerService;
    @Autowired
    CartService cartService;
    @Autowired
    AdminService adminService;
    HttpHeaders responseHeader = new HttpHeaders();

    @PostMapping
    public ResponseEntity<GwResponse<Order>> saveOrder(@RequestBody CreateOrderRequest request) {
        GwResponse<Order> response = new GwResponse<>();
        String newCode = DataUtil.getNewId("O", orderService.getMaxLength());
        Partner partner = partnerService.findById(request.getPartnerId());
        if (partner == null) {
            return ResponseEntity.badRequest().body(null);
        }
        Admin admin = adminService.findById(request.getAdminId());
        if (admin == null) {
            return ResponseEntity.badRequest().body(null);
        }
        Order order = new Order();
        int totalPrice = 0;
        for (int c : request.getCartId()) {
            Cart cart = cartService.findById(c);
            totalPrice += cart.getPrice();
            cartService.save(cart);
        }
        try {
            System.out.println();
            order.setOrderCode(newCode);
            order.setAdmin(admin);
            order.setPartner(partner);
            order.setIsBill(request.getIsBill());
            order.setStatus(301);
            order.setCreatedDate(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
            order.setUpdatedDate(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
            order.setTotalPrice(totalPrice);
            orderService.save(order);
            response.setCode(Status.CODE_CREATED);
            response.setMessage(Status.STATUS_CREATED);
            response.setData(order);
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
        } finally {
            // List<Cart> listCart = new ArrayList<>();
            //  String subString[] = request.getCart().split("-");

            for (int c : request.getCartId()) {
                Cart cart = cartService.findById(c);
                cart.setStatus(102);
                cart.setOrder(order);
                cartService.save(cart);
            }
        }
    }

    @GetMapping(params = "query=status")
    public ResponseEntity<GwResponse<List<Order>>> getListOrderByStatus(@RequestParam Integer status, @RequestParam Integer partnerId) {
        GwResponse<List<Order>> response = new GwResponse<>();
        try {
            List<Order> orderList = new ArrayList<>();
            if (status == 0) {
                orderList = orderService.getListOrderOfPartner(partnerId);
            } else {
                orderList = orderService.getListOrderByStatusOfPartner(status, partnerId);

            }
            if (!orderList.isEmpty()) {
                response.setCode(Status.CODE_SUCCESS);
                response.setMessage(Status.STATUS_SUCCESS);
                response.setData(orderList);
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
    public ResponseEntity<GwResponse<Order>> findByCode(@PathVariable String code) {
        GwResponse<Order> response = new GwResponse<>();
        try {
            Order order = orderService.findByCode(code);
            if (order != null) {
                response.setData(order);
                response.setCode(Status.CODE_SUCCESS);
                response.setMessage(Status.STATUS_SUCCESS);
                responseHeader.add("code", Status.CODE_SUCCESS);
                responseHeader.add("message", Status.STATUS_SUCCESS);
                responseHeader.add("responseTime", LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
                return ResponseEntity.ok().headers(responseHeader).body(response);
            } else {
                response.setCode(Status.CODE_NOT_FOUND);
                response.setMessage(Status.STATUS_NOT_FOUND);
                response.setData(null);
                responseHeader.add("code", Status.CODE_NOT_FOUND);
                responseHeader.add("message", Status.STATUS_NOT_FOUND);
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

    @PutMapping(value = "/{id}", params = "query=status")
    public ResponseEntity<GwResponse<List<Order>>> updateByStatus(@PathVariable Integer id, @RequestParam Integer status) {
        GwResponse<List<Order>> response = new GwResponse<>();
        Order orderCurrent = orderService.findById(id);
        try {
            if (orderCurrent != null) {
                Order orderClone = SerializationUtils.clone(orderCurrent);
                orderCurrent.setStatus(status);
                orderCurrent.setUpdatedDate(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
                orderService.save(orderCurrent);
                List<Order> list = new ArrayList<>();
                list.add(orderClone);
                list.add(orderCurrent);
                response.setData(list);
                response.setCode(Status.CODE_SUCCESS);
                response.setMessage(Status.STATUS_SUCCESS);
                responseHeader.add("code", Status.CODE_SUCCESS);
                responseHeader.add("message", Status.STATUS_SUCCESS);
                responseHeader.add("responseTime", LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
                return ResponseEntity.ok().headers(responseHeader).body(response);
            } else {
                response.setCode(Status.CODE_NOT_FOUND);
                response.setMessage(Status.STATUS_NOT_FOUND);
                response.setData(null);
                responseHeader.add("code", Status.CODE_NOT_FOUND);
                responseHeader.add("message", Status.STATUS_NOT_FOUND);
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
        finally {
            if(status == 303){
                List<Cart> cartList = cartService.getListToCartNoStatus(id);
                for (Cart c:cartList
                     ) {
                    c.setStatus(103);
                    c.setUpdatedDate(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
                    cartService.save(c);
                }
            }
        }
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<GwResponse<List<Order>>> modifyOrder(@PathVariable Integer id) {
        GwResponse<List<Order>> response = new GwResponse<>();
        Order orderCurrent = orderService.findById(id);
        int totalPrice = 0;
        List<Cart> listCartToList = cartService.getListToCartNoStatus(id);
        for (Cart c : listCartToList
        ) {
            totalPrice += c.getPrice();
        }
        try {
            if (orderCurrent != null) {
                Order orderClone = SerializationUtils.clone(orderCurrent);
                orderCurrent.setTotalPrice(totalPrice);
                orderCurrent.setUpdatedDate(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
                orderService.save(orderCurrent);
                List<Order> list = new ArrayList<>();
                list.add(orderClone);
                list.add(orderCurrent);
                response.setData(list);
                response.setCode(Status.CODE_SUCCESS);
                response.setMessage(Status.STATUS_SUCCESS);
                responseHeader.add("code", Status.CODE_SUCCESS);
                responseHeader.add("message", Status.STATUS_SUCCESS);
                responseHeader.add("responseTime", LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
                return ResponseEntity.ok().headers(responseHeader).body(response);
            } else {
                response.setCode(Status.CODE_NOT_FOUND);
                response.setMessage(Status.STATUS_NOT_FOUND);
                response.setData(null);
                responseHeader.add("code", Status.CODE_NOT_FOUND);
                responseHeader.add("message", Status.STATUS_NOT_FOUND);
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
}
