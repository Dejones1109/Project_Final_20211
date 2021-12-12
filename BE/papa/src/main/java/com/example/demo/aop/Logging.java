package com.example.demo.aop;


import com.example.demo.util.StringUtil;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.ArrayUtils;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@Aspect
@Slf4j
@Component
public class Logging {
    @Autowired
    HttpServletRequest httpRequest;

    @Pointcut("execution(* com.example.demo.controller.*.*(..))")
    private void callControllerMethod() {
    }
    @Around("callControllerMethod()")
    public Object logAroundFunction(ProceedingJoinPoint joinPoint) {
        try {
            Object[] args = joinPoint.getArgs();
            StringBuilder logBuilder = new StringBuilder();
            String[] argNames = ((MethodSignature) joinPoint.getSignature()).getParameterNames(); // parameter name
            Map<String, Object> paramMap = new HashMap<>();
            paramMap.put("requestId", httpRequest.getHeader("requestId"));
            paramMap.put("clientTime", httpRequest.getHeader("clientTime"));
            if (ArrayUtils.isNotEmpty(args)) {
                for (int i = 0; i < args.length; i++) {
                    Object param = args[i];
                    if (!(param instanceof HttpServletRequest)) {
                        paramMap.put(argNames[i], param);
                    }
                }
            }
            logBuilder.append(String.format("[%s : %s] ",joinPoint.getSignature(),httpRequest.getRequestURL()));
            logBuilder.append( "\n Request: \n");
            logBuilder.append(StringUtil.toJsonString(paramMap) + "\n");
            logBuilder.append(" Response: \n");
            Object result = joinPoint.proceed(args);
            logBuilder.append(StringUtil.toJsonString(result));
            log.info(logBuilder.toString());
            return result;
        } catch (Throwable e) {
            e.printStackTrace();
        }
        return null;
    }
}
