package com.ada.precadastrodeclientes;

import com.ada.precadastrodeclientes.config.OpenAPIConfig;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import io.swagger.v3.oas.models.OpenAPI;

public class OpenAPIConfigTest {

    @Test
    public void testOpenAPIConfiguration() {
        OpenAPIConfig openAPIConfig = new OpenAPIConfig();
        OpenAPI openAPI = openAPIConfig.myOpenAPI();

        assertNotNull(openAPI);
        assertNotNull(openAPI.getInfo());
        assertEquals("1.0", openAPI.getInfo().getVersion());
    }
}