//package com.example.demo.utils;
//
//import com.example.demo.entity.Partner;
//import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.SignatureAlgorithm;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.stereotype.Component;
//
//import java.io.Serializable;
//
//import java.util.Date;
//import java.util.HashMap;
//import java.util.Map;
//import java.util.function.Function;
//
//@Component
//public class JWTTokenUtil implements Serializable {
//    private static final long serialVersionUID = -2550185165626007488L;
//    public static final long JWT_TOKEN_VALIDITY= 5 * 60 *60;
//    @Value("${papa.secretKey}")
//    private String secret;
//
//    //retrieve username from jwt token
//    public String getUsernameFromToken(String token){
//        return getClaimFromToken(token,Claims::getSubject);
//    }
//    //retrieve expiration date from jwt token
//    public Date getExpirationDateFromToken(String token){
//        return getClaimFromToken(token,Claims::getExpiration);
//    }
//    //for retrieving any information from token we will need the secret key
//    public <T> T getClaimFromToken(String token, Function<Claims,T> claimsTFunction){
//        final Claims claims = getAllClaimsFromToken(token);
//        return claimsTFunction.apply(claims);
//    }
//    private Claims getAllClaimsFromToken(String token) {
//        return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
//    }
//    //check if the token has expired
//    private Boolean isTokenExpired(String token){
//        final Date expiration = getExpirationDateFromToken(token);
//        return expiration.before(new Date());
//    }
//    //generate token for user
//    public String generateToken(Partner partner) {
//        Map<String, Object> claims = new HashMap<>();
//        claims.put("phone",partner.getPhone());
//        claims.put("password",partner.getPassword());
//        return doGenerateToken(claims);
//    }
//
//    //compaction of the JWT to a URL-safe string
//    private String doGenerateToken(Map<String,Object> claims){
//        return Jwts.builder().setClaims(claims).setIssuedAt(new Date(System.currentTimeMillis()))
//                .setExpiration(new Date(System.currentTimeMillis()+ JWT_TOKEN_VALIDITY*1000))
//                .signWith(SignatureAlgorithm.HS512,secret).compact();
//    }
//   //validate token
//    public Boolean validateToken(String token, UserDetails userDetails){
//        final String username = getUsernameFromToken(token);
//        return (username.equals(userDetails.getUsername())&& !isTokenExpired(token));
//    }
//
//}
