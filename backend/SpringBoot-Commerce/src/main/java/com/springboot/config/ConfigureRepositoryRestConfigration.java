package com.springboot.config;


import com.springboot.entity.Country;
import com.springboot.entity.Product;
import com.springboot.entity.ProductCategory;
import com.springboot.entity.State;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.EntityType;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Configuration
public class ConfigureRepositoryRestConfigration implements RepositoryRestConfigurer {

    private EntityManager entityManager;

    @Autowired
    public ConfigureRepositoryRestConfigration(EntityManager theEntityManager) {
        entityManager = theEntityManager;
    }

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        HttpMethod[] unsupportedaction = {HttpMethod.PUT,HttpMethod.POST,HttpMethod.DELETE};

        // disable HTTP Method for Product
        dispaleHttpMethods(Product.class,config, unsupportedaction);

        // disable HTTP Method for ProductCategory
        dispaleHttpMethods(ProductCategory.class,config, unsupportedaction);

        // disable HTTP Method for Country
        dispaleHttpMethods(Country.class,config, unsupportedaction);

        // disable HTTP Method for Stat
        dispaleHttpMethods(State.class,config, unsupportedaction);

        // call an internal helper method
        exposeIds(config);
    }

    private void dispaleHttpMethods(Class theClass,RepositoryRestConfiguration config, HttpMethod[] unsupportedaction) {
        config.getExposureConfiguration()
              .forDomainType(theClass)
              .withItemExposure((metdata, httpMethods) -> httpMethods.disable(unsupportedaction))
              .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(unsupportedaction));
    }

    private void exposeIds(RepositoryRestConfiguration config) {

        // expose entity ids
        //

        // - get a list of all entity classes from the entity manager
        Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();

        // - create an array of the entity types
        List<Class> entityClasses = new ArrayList<>();

        // - get the entity types for the entities
        for (EntityType tempEntityType : entities) {
            entityClasses.add(tempEntityType.getJavaType());
        }

        // - expose the entity ids for the array of entity/domain types
        Class[] domainTypes = entityClasses.toArray(new Class[0]);
        config.exposeIdsFor(domainTypes);
    }
}