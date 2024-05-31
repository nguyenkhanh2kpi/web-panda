package com.java08.quanlituyendung.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.java08.quanlituyendung.dto.InterviewPayload.MarkCandidatePayload;
import com.java08.quanlituyendung.dto.ResponseObject;
import com.java08.quanlituyendung.utils.Constant;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.json.JacksonJsonParser;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;


@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class InterviewDetailControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    InterviewDetailController interviewDetailController;

    @Test
    void getAll() throws Exception {
        String token = login("reccer1@gmail.com", "1234");

        mockMvc.perform(get("/interview-detail").header("authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("SUCCESS !"))
                .andExpect(jsonPath("$.data").isNotEmpty());
    }

    @Test
    void getById() throws Exception {
        String token = login("reccer1@gmail.com", "1234");
        mockMvc.perform(get("/interview-detail/1").header("authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("SUCCESS !"))
                .andExpect(jsonPath("$.data").isNotEmpty());
    }

    @Test
    void getInterviewDetailByRoomId() throws Exception {
        String token = login("reccer1@gmail.com", "1234");
        mockMvc.perform(get("/interview-detail/room/1").header("authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("SUCCESS !"))
                .andExpect(jsonPath("$.data").isNotEmpty());
    }

    @Test
    void markCandidate() throws Exception {
        var request = MarkCandidatePayload.builder()
                .interviewDetailId(1L)
                .averageMark(9F)
                .comment("comment")
                .build();
        String token = login("interviewer1@gmail.com", "1234");
        mockMvc.perform(post("/interview-detail/mark")
                        .header("authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("SUCCESS!!"));
    }

    @Test
    void markCandidateFail() throws Exception {
        var request = MarkCandidatePayload.builder()
                .interviewDetailId(1L)
                .averageMark(9F)
                .comment("comment")
                .build();
        String token = login("candidate@gmail.com", "1234");
        mockMvc.perform(post("/interview-detail/mark")
                        .header("authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isForbidden());
    }

    private String login(String email, String password) throws Exception {
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
}