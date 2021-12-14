package com.example.demo.controller;

import com.example.demo.constant.Status;
import com.example.demo.dto.GwResponse;
import com.example.demo.entity.Products;
import com.example.demo.services.ProductsService;
import com.example.demo.util.DataUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.sql.Date;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/product")
@Slf4j
@CrossOrigin("*")
public class ProductController {
    @Autowired
    ProductsService productsService;
    HttpHeaders responseHeader = new HttpHeaders();

    @GetMapping
    public ResponseEntity<GwResponse<List<Products>>> findAll(){
        GwResponse<List<Products>> response = new GwResponse<>();
        try {
            List<Products> listProduct = productsService.getAll();
            if(listProduct!=null){
                response.setCode(Status.CODE_SUCCESS);
                response.setMessage(Status.STATUS_SUCCESS);
                response.setData(listProduct);
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
    @GetMapping("/{id}")
    public ResponseEntity<GwResponse<Products>> findById(@PathVariable Integer id){
        GwResponse<Products> response = new GwResponse<>();
        try {
            Products products = productsService.getById(id);
            if(products!=null){
                response.setCode(Status.CODE_SUCCESS);
                response.setMessage(Status.STATUS_SUCCESS);
                response.setData(products);
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
    @GetMapping(value = "/type")
    public ResponseEntity<GwResponse<List<Products>>> getListProductsByType(@RequestParam String type ){
        GwResponse<List<Products>> response = new GwResponse<>();
        try {
            List<Products> products = productsService.listProductsByType(type);
            if(products!=null){
                response.setCode(Status.CODE_SUCCESS);
                response.setMessage(Status.STATUS_SUCCESS);
                response.setData(products);
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

    @PostMapping
    public ResponseEntity<GwResponse<Products>> save(@RequestBody Products product){
        GwResponse<Products> response = new GwResponse<>();
        String newID = DataUtil.getNewId("C",productsService.getMaxLength());
        try {
            Products products = Products.builder()
                    .productCode(newID)
                    .productName(product.getProductName())
                    .price(product.getPrice())
                    .image(product.getImage())
                    .type(product.getType())
                    .desc(product.getDesc())
                    .status(401)
                    .createdDate(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                    .isDisplay(1)
                    .view(1)
                    .build();
//            products.setId(newID);
//            products.setProductName(product.getProductName());
//            products.setImage(product.getImage());
//            products.setPrice(product.getPrice());
//            products.setType(product.getType());
//            products.setDesc(product.getDesc());
//            products.setStatus(401);
//            products.setIsDisplay(1);
//            products.setCreatedDate(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
//            products.setView(0);
            System.out.println(products);
            productsService.save(products);
            response.setCode(Status.CODE_SUCCESS);
            response.setMessage(Status.STATUS_SUCCESS);
            response.setData(products);
            responseHeader.add("code", Status.CODE_SUCCESS);
            responseHeader.add("message", Status.STATUS_SUCCESS);
            responseHeader.add("responseTime", LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
            return ResponseEntity.ok().headers(responseHeader).body(response);

        }catch (Throwable e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

}
