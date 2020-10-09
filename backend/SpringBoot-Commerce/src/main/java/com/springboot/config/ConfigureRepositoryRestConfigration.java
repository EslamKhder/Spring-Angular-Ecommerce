package com.springboot.config;


import com.springboot.entity.Product;
import com.springboot.entity.ProductCategory;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;

@Configuration
public class ConfigureRepositoryRestConfigration implements RepositoryRestConfigurer {
    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        HttpMethod[] unsupportedaction = {HttpMethod.PUT,HttpMethod.POST,HttpMethod.DELETE};

        // disable HTTP Method for Product
        config.getExposureConfiguration()
              .forDomainType(Product.class)
              .withItemExposure((metdata, httpMethods) -> httpMethods.disable(unsupportedaction))
              .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(unsupportedaction));

        // disable HTTP Method for ProductCategory
        config.getExposureConfiguration()
                .forDomainType(ProductCategory.class)
                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(unsupportedaction))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(unsupportedaction));
    }
}