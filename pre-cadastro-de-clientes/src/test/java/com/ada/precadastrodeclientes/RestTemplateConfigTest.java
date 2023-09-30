package com.ada.precadastrodeclientes;
import org.springframework.web.client.RestTemplate;
import com.ada.precadastrodeclientes.config.RestTemplateConfig;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class RestTemplateConfigTest {

    @Test
    public void testRestTemplateCreation() {
        RestTemplateConfig restTemplateConfig = new RestTemplateConfig();
        RestTemplate restTemplate = restTemplateConfig.restTemplate();

        assertNotNull(restTemplate);
    }
}