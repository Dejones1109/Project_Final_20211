package com.example.demo.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.io.Serializable;
@Data
public  abstract  class RequestAbstract implements Serializable {
    @JsonProperty("api_key")
    String apiKey;
    @JsonProperty("secret_key")
    String secretKey;
}
