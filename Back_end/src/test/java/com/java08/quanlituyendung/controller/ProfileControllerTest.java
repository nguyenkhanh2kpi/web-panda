package com.java08.quanlituyendung.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.java08.quanlituyendung.dto.ProfileUpdateRequestDTO;
import com.java08.quanlituyendung.dto.ResponseObject;
import com.java08.quanlituyendung.entity.Gender;
import com.java08.quanlituyendung.repository.UserInfoRepository;
import com.java08.quanlituyendung.utils.Constant;
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
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class ProfileControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    ObjectMapper objectMapper = new ObjectMapper();
    @Autowired
    ProfileController profileController;
    @Autowired
    UserInfoRepository userInfoRepository;

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
    void getProfile() throws Exception {
        String token = login("admin@gmail.com", "1234");
        ResultActions result = mockMvc.perform(get("/profile")
                        .header("authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
        String resultString = result.andReturn().getResponse().getContentAsString();
        JacksonJsonParser jsonParser = new JacksonJsonParser();
        var json_response = jsonParser.parseMap(resultString);
        String message = json_response.get("message").toString();
        Map<String, Object> dataObject = (Map<String, Object>) json_response.get("data");
        String email = (String) dataObject.get("email");
        assertEquals(message, Constant.SUCCESS);
        assertEquals(email, "admin@gmail.com");
    }

    @Test
    void update() throws Exception {
        var profile = ProfileUpdateRequestDTO.builder()
                .fullName("Nguyễn Khánh")
                .phone("0941820949")
                .gender(Gender.MALE)
                .address("lam Dong")
                .dob("10-02-2002")
                .build();
        String token = login("admin@gmail.com", "1234");
        mockMvc.perform(put("/profile")
                        .header("authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(profile)))
                .andExpect(status().isOk());
    }


}