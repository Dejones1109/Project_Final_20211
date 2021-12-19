package com.example.demo.controller;

import com.example.demo.constant.Status;
import com.example.demo.dto.GwResponse;
import com.example.demo.entity.Cart;
import com.example.demo.entity.Partner;
import com.example.demo.entity.Products;
import com.example.demo.request.cart.CreateCartRequest;
import com.example.demo.request.partner.CreatePartnerRequest;
import com.example.demo.request.product.UpdateProductRequest;
import com.example.demo.services.CartService;
import com.example.demo.services.PartnerService;
import com.example.demo.services.ProductsService;
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
@RequestMapping("/cart")
@Slf4j
@CrossOrigin("*")
public class CartController {
    @Autowired
    CartService cartService;
    @Autowired
    ProductsService productsService;
    @Autowired
    PartnerService partnerService;
    HttpHeaders responseHeader = new HttpHeaders();

    @GetMapping
    public ResponseEntity<GwResponse<List<Cart>>> getListToCart(@RequestParam Integer partnerId){
        GwResponse<List<Cart>> response = new GwResponse<>();
        try {
            List<Cart> cartList= cartService.getListToCart(partnerId);
            if (!cartList.isEmpty()) {
                response.setCode(Status.CODE_SUCCESS);
                response.setMessage(Status.STATUS_SUCCESS);
                response.setData(cartList);
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
    public ResponseEntity<GwResponse<Cart>> save(@RequestBody CreateCartRequest request) {
        GwResponse<Cart> response = new GwResponse<>();
        String newCode = DataUtil.getNewId("CA", cartService.getMaxLength());
        Products products = productsService.getById(request.getProductId());
        if(products==null){
            return ResponseEntity.badRequest().body(null);
        }
        Partner partner = partnerService.findById(request.getPartnerId());
        if(partner==null){
            return ResponseEntity.badRequest().body(null);
        }
        try {
            Cart cart = Cart.builder()
                    .cartCode(newCode)
                    .product(products)
                    .partner(partner)
                    .order(null)
                    .price(products.getPrice()*request.getQuantity())
                    .quantity(request.getQuantity())
                    .status(101)
                    .createdDate(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                    .updatedDate(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                    .build();
            cartService.save(cart);
            System.out.println(cart);
            response.setCode(Status.CODE_CREATED);
            response.setMessage(Status.STATUS_CREATED);
            response.setData(cart);
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
    @PutMapping(value = "/{id}",params = "query=quantity")
    public ResponseEntity<GwResponse<List<Cart>>> updateByQuantity(@RequestParam Integer quantity, @PathVariable Integer id) {
        GwResponse<List<Cart>> response = new GwResponse<>();
        Cart cartCurrent = cartService.findById(id);
        try {
            //TODPO Validate fields
            if (cartCurrent == null) {
                return ResponseEntity.badRequest().body(null);
            }
            Cart cartClone = SerializationUtils.clone(cartCurrent);
            cartCurrent.setQuantity(quantity);
            cartCurrent.setPrice(quantity*cartCurrent.getProduct().getPrice());
            cartCurrent.setUpdatedDate(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
            cartService.save(cartCurrent);
            response.setCode(Status.CODE_SUCCESS);
            response.setMessage(Status.STATUS_SUCCESS);
            List<Cart> cartList = new ArrayList<>();
            cartList.add(cartClone);
            cartList.add(cartCurrent);
            response.setData(cartList);
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
//    @PutMapping(value = "/{id}",params = "query=choose")
//    public ResponseEntity<GwResponse<List<Cart>>> updateByChoose(@RequestParam Integer choose, @PathVariable Integer id) {
//        GwResponse<List<Cart>> response = new GwResponse<>();
//        Cart cartCurrent = cartService.findById(id);
//        try {
//            //TODPO Validate fields
//            if (cartCurrent == null) {
//                return ResponseEntity.badRequest().body(null);
//            }
//            Cart cartClone = SerializationUtils.clone(cartCurrent);
//            cartCurrent.setChoose(choose);
//            cartCurrent.setUpdatedDate(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
//            cartService.save(cartCurrent);
//            response.setCode(Status.CODE_SUCCESS);
//            response.setMessage(Status.STATUS_SUCCESS);
//            List<Cart> cartList = new ArrayList<>();
//            cartList.add(cartClone);
//            cartList.add(cartCurrent);
//            response.setData(cartList);
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
    @DeleteMapping("/{id}")
    public ResponseEntity<GwResponse> deleteByCart(@PathVariable Integer id) {
        GwResponse<GwResponse> response = new GwResponse<>();
        Cart cartCurrent = cartService.findById(id);
        try {
            //TODPO Validate fields
            if (cartCurrent == null) {
                return ResponseEntity.badRequest().body(null);
            }
            cartService.delete(cartCurrent);
            response.setCode(Status.CODE_SUCCESS);
            response.setMessage(Status.STATUS_SUCCESS);
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
