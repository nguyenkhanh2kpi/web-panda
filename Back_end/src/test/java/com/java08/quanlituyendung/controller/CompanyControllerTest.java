package com.java08.quanlituyendung.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.java08.quanlituyendung.dto.RegisterRequestDTO;
import com.java08.quanlituyendung.dto.ResponseObject;
import com.java08.quanlituyendung.dto.company.CompanyDTO;
import com.java08.quanlituyendung.repository.CompanyRepository;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.json.JacksonJsonParser;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class CompanyControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    CompanyRepository companyRepository;

    @Autowired
    CompanyController companyController;

    private String login(String email, String password) throws Exception {
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "password");
        params.add("client_id", "fooClientIdPassword");

        String requestBody = "{\"email\":\"" + email + "\",\"password\":\"" + password + "\"}";

        ResultActions result = mockMvc.perform(post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody)
                        .with(SecurityMockMvcRequestPostProcessors.httpBasic("fooClientIdPassword", "secret"))
                        .accept("application/json;charset=UTF-8"))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"));

        String resultString = result.andReturn().getResponse().getContentAsString();

        JacksonJsonParser jsonParser = new JacksonJsonParser();
        return jsonParser.parseMap(resultString).get("access_token").toString();
    }

    @Test
    void getAllCompany() {
        ResponseEntity<ResponseObject> response = companyController.getAllCompany();
        assertEquals("Success", response.getBody().getMessage());
        assertEquals("200 OK", response.getBody().getStatus());
        assertNotNull(response.getBody().getData());
    }

    @Test
    void getById() {
        ResponseEntity<ResponseObject> response = companyController.getCompanyJd(1L);
        assertEquals("Success !", response.getBody().getMessage());
        assertEquals("200 OK", response.getBody().getStatus());
        assertNotNull(response.getBody().getData());
    }

    @Test
    void getCompanyJd() {
        ResponseEntity<ResponseObject> response = companyController.getCompanyJd(1L);
        assertEquals("Success !", response.getBody().getMessage());
        assertEquals("200 OK", response.getBody().getStatus());
        assertNotNull(response.getBody().getData());
    }

    @Test
    void getMy() {
        ResponseEntity<ResponseObject> response = companyController.getCompanyJd(1L);
        assertEquals("Success !", response.getBody().getMessage());
        assertEquals("200 OK", response.getBody().getStatus());
        assertNotNull(response.getBody().getData());
    }

    @Test
    void testGetAllCompany() {
        ResponseEntity<ResponseObject> response = companyController.getCompanyJd(1L);
        assertEquals("Success !", response.getBody().getMessage());
        assertEquals("200 OK", response.getBody().getStatus());
        assertNotNull(response.getBody().getData());
    }

    @Test
    void registerReccer() throws Exception {
        RegisterRequestDTO requestDTO = new RegisterRequestDTO();
        requestDTO.setUsername("admin");
        requestDTO.setPassword("test");
        requestDTO.setEmail("admin@gmail.com");
        String token = login("admin@gmail.com", "1234");
        MvcResult result = mockMvc.perform(post("/company/register-reccer")
                        .header("authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(requestDTO)))
                .andExpect(status().isOk())
                .andExpect(content().json("{\"message\": \"email is exist\"}"))
                .andReturn();
    }

    @Test
    void registerReccerSuccess() throws Exception {
        RegisterRequestDTO requestDTO = new RegisterRequestDTO();
        requestDTO.setUsername("reccer3");
        requestDTO.setPassword("test");
        requestDTO.setEmail("reccer3@gmail.com");
        String token = login("admin@gmail.com", "1234");
        MvcResult result = mockMvc.perform(post("/company/register-reccer")
                        .header("authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(requestDTO)))
                .andExpect(status().isOk())
                .andExpect(content().json("{\"message\": \"Success\"}"))
                .andReturn();
    }

    @Test
    void update() throws Exception {
        var company = CompanyDTO.builder()
                .name("cty")
                .phone("cty")
                .address("cty")
                .info("cty")
                .website("cty")
                .avatar("cty")
                .build();
        String token = login("reccer1@gmail.com", "1234");
        MvcResult result = mockMvc.perform(post("/company")
                        .header("authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(company)))
                .andExpect(status().isOk())
                .andExpect(content().json("{\"message\": \"Success update\"}"))
                .andReturn();
    }
}