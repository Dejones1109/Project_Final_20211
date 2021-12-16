package com.example.demo.controller;

import com.example.demo.constant.Status;
import com.example.demo.dto.GwResponse;
import com.example.demo.entity.Products;
import com.example.demo.request.CreateProductsRequest;
import com.example.demo.request.UpdateProductRequest;
import com.example.demo.services.ProductsService;
import com.example.demo.util.DataUtil;
import lombok.Data;
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
@RequestMapping("/product")
@Slf4j
@CrossOrigin("*")
public class ProductController {
    @Autowired
    ProductsService productsService;
    HttpHeaders responseHeader = new HttpHeaders();

    @GetMapping
    public ResponseEntity<GwResponse<List<Products>>> findAll() {
        GwResponse<List<Products>> response = new GwResponse<>();
        try {
            List<Products> listProduct = productsService.getAll();
            if (listProduct != null) {
                response.setCode(Status.CODE_SUCCESS);
                response.setMessage(Status.STATUS_SUCCESS);
                response.setData(listProduct);
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

    //    @GetMapping("/{id}")
//    public ResponseEntity<GwResponse<Products>> findById(@PathVariable Integer id){
//        GwResponse<Products> response = new GwResponse<>();
//        try {
//            Products products = productsService.getById(id);
//            if(products!=null){
//                response.setCode(Status.CODE_SUCCESS);
//                response.setMessage(Status.STATUS_SUCCESS);
//                response.setData(products);
//                responseHeader.add("code", Status.CODE_SUCCESS);
//                responseHeader.add("message", Status.STATUS_SUCCESS);
//            }else {
//                response.setCode(Status.CODE_NOT_FOUND);
//                response.setMessage(Status.STATUS_NOT_FOUND);
//                response.setData(null);
//                responseHeader.add("code", Status.CODE_NOT_FOUND);
//                responseHeader.add("message", Status.STATUS_NOT_FOUND);
//            }
//            responseHeader.add("responseTime", LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
//            return ResponseEntity.ok().headers(responseHeader).body(response);
//
//
//        }catch (Throwable e){
//            e.printStackTrace();
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
//        }
//    }
    @GetMapping(value = "/{code}")
    public ResponseEntity<GwResponse<Products>> findById(@PathVariable String code) {
        GwResponse<Products> response = new GwResponse<>();
        try {
            Products products = productsService.findProductByProductCode(code);
            if (products != null) {
                response.setCode(Status.CODE_SUCCESS);
                response.setMessage(Status.STATUS_SUCCESS);
                response.setData(products);
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

    @GetMapping(value = "/{type}",params = "query=type")
    public ResponseEntity<GwResponse<List<Products>>> getListProductsByType(@PathVariable String type) {
        GwResponse<List<Products>> response = new GwResponse<>();
        try {
            List<Products> products = productsService.listProductsByType(type);
            if (products != null) {
                response.setCode(Status.CODE_SUCCESS);
                response.setMessage(Status.STATUS_SUCCESS);
                response.setData(products);
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
    public ResponseEntity<GwResponse<Products>> save(@RequestBody CreateProductsRequest product) {
        GwResponse<Products> response = new GwResponse<>();
        String newID = DataUtil.getNewId("C", productsService.getMaxLength());
        try {
            Products products = Products.builder()
                    .productCode(newID)
                    .productName(product.getProductName())
                    .price(product.getPrice())
                    .image(product.getImage())
                    .type(product.getType())
                    .remark(product.getRemark())
                    .status(401)
                    .createdDate(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                    .updatedDate(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                    .view(0)
                    .build();
            //  System.out.println(products);
            productsService.save(products);
            response.setCode(Status.CODE_CREATED);
            response.setMessage(Status.STATUS_CREATED);
            response.setData(products);
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
    public ResponseEntity<GwResponse<List<Products>>> update(@RequestBody UpdateProductRequest request, @PathVariable Integer id) {
        GwResponse<List<Products>> response = new GwResponse<>();
        Products productCurrent = productsService.getById(id);
        try {
            //TODPO Validate fields
            if (productCurrent == null) {
                return ResponseEntity.badRequest().body(null);
            }
            Products productsclone = SerializationUtils.clone(productCurrent);
            productCurrent.setProductName(request.getProductName());
            productCurrent.setPrice(request.getPrice());
            productCurrent.setImage(request.getImage());
            productCurrent.setType(request.getType());
            productCurrent.setRemark(request.getRemark());
            productCurrent.setUpdatedDate(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
            productsService.save(productCurrent);
            response.setCode(Status.CODE_SUCCESS);
            response.setMessage(Status.STATUS_SUCCESS);
            List<Products> productsList = new ArrayList<>();
            productsList.add(productsclone);
            productsList.add(productCurrent);
            response.setData(productsList);
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
    public ResponseEntity<GwResponse<Products>> updateByStatus(@RequestParam Integer status, @PathVariable Integer id) {
        GwResponse<Products> response = new GwResponse<>();
        Products productCurrent = productsService.getById(id);
        try {
            //TODPO Validate fields
            if (productCurrent == null) {
                return ResponseEntity.badRequest().body(null);
            }
            productCurrent.setUpdatedDate(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
            productCurrent.setStatus(status);
            productsService.save(productCurrent);
            response.setCode(Status.CODE_SUCCESS);
            response.setMessage(Status.STATUS_SUCCESS);
            response.setData(productCurrent);
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
    @GetMapping(params = "query=view")
    public ResponseEntity<GwResponse<List<Products>>> getProductByView() {
        GwResponse<List<Products>> response = new GwResponse<>();
        try {
            List<Products> listProduct = productsService.getProductByView();
            if (listProduct != null) {
                response.setCode(Status.CODE_SUCCESS);
                response.setMessage(Status.STATUS_SUCCESS);
                response.setData(listProduct);
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
    @GetMapping(value = "/{keyString}",params = "query=search")
    public ResponseEntity<GwResponse<List<Products>>> searchProductByKey(@PathVariable String keyString) {
        GwResponse<List<Products>> response = new GwResponse<>();
        try {
            List<Products> listProduct = productsService.searchProductByKey(keyString);
            if (listProduct != null) {
                response.setCode(Status.CODE_SUCCESS);
                response.setMessage(Status.STATUS_SUCCESS);
                response.setData(listProduct);
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
