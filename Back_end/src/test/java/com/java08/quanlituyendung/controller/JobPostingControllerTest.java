package com.java08.quanlituyendung.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.java08.quanlituyendung.dto.JobPostingDTO;
import com.java08.quanlituyendung.dto.ResponseObject;
import com.java08.quanlituyendung.entity.JobPostingEntity;
import jakarta.transaction.Transactional;
import org.json.simple.parser.ParseException;
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
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class JobPostingControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    JobPostingController jobPostingController;

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
    void getAllJobPosting() {
        ResponseEntity<ResponseObject> response = jobPostingController.getAllJobPosting();
        assertEquals("Success !", response.getBody().getMessage());
        assertEquals("200 OK", response.getBody().getStatus());
        assertNotNull(response.getBody().getData());
    }

    @Test
    void getDetailJobPosting() throws ParseException {
        ResponseEntity<ResponseObject> response = jobPostingController.getDetailJobPosting(1L);
        assertEquals("Success !", response.getBody().getMessage());
        assertEquals("200 OK", response.getBody().getStatus());
        assertNotNull(response.getBody().getData());
    }

    @Test
    void createJobPosting() throws Exception {
        var job = JobPostingDTO.builder()
                .name("abc")
                .build();
        String token = login("reccer1@gmail.com", "1234");
        mockMvc.perform(post("/job-posting")
                        .header("authorization","Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(job))
                )
                .andExpect(status().isOk())
                .andExpect(content().json("{\"message\": \"Success !\"}"));
    }

    @Test
    void updateJobPosting() throws Exception {
        var job = JobPostingDTO.builder()
                .id(1L)
                .name("asd")
                .user_id(2)
                .build();
        String token = login("reccer1@gmail.com", "1234");
        mockMvc.perform(put("/job-posting/1")
                        .header("authorization","Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(job))
                )
                .andExpect(status().isOk())
                .andExpect(content().json("{\"message\": \"Success !\"}"));
    }

    @Test
    void updateJobPostingFail() throws Exception {
        var job = JobPostingDTO.builder()
                .id(0L)
                .name("asd")
                .user_id(2)
                .build();
        String token = login("reccer1@gmail.com", "1234");
        mockMvc.perform(put("/job-posting/0")
                        .header("authorization","Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(job))
                )
                .andExpect(status().isOk())
                .andExpect(content().json("{\"message\": \"Job posting not found!\"}"));
    }

    @Test
    void deleteJD() throws Exception {
        var job = JobPostingDTO.builder()
                .id(0L)
                .name("asd")
                .user_id(2)
                .build();
        String token = login("reccer1@gmail.com", "1234");
        mockMvc.perform(delete("/job-posting/1")
                        .header("authorization","Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(job))
                )
                .andExpect(status().isOk())
                .andExpect(content().json("{\"message\": \"Delete succsess!\"}"));
    }

    @Test
    void deleteJDFail() throws Exception {
        var job = JobPostingDTO.builder()
                .id(0L)
                .name("asd")
                .user_id(2)
                .build();
        String token = login("reccer1@gmail.com", "1234");
        mockMvc.perform(delete("/job-posting/0")
                        .header("authorization","Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(job))
                )
                .andExpect(status().isOk())
                .andExpect(content().json("{\"message\": \"Job posting not found!\"}"));
    }
}