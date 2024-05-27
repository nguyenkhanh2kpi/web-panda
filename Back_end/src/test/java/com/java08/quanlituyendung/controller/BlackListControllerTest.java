package com.java08.quanlituyendung.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.java08.quanlituyendung.dto.BlackListPayload.BlackListAddRequestDTO;
import com.java08.quanlituyendung.dto.BlackListPayload.BlackListUpdateRequestDTO;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.json.JacksonJsonParser;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class BlackListControllerTest {

    @Autowired
    private BlackListController blackListController;

    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper;

    @Test
    void addBlackList() throws Exception {
        var request = BlackListAddRequestDTO.builder()
                .userId(1L)
                .description("hack")
                .build();
        String token = login("admin@gmail.com", "1234");
        mockMvc.perform(post("/blacklist")
                .header("authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request))
        )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Add blacklist success!"));
    }

    @Test
    void removeBlackList() throws Exception {
        String token = login("admin@gmail.com", "1234");
        mockMvc.perform(post("/blacklist/remove/1")
                        .header("authorization", "Bearer " + token)
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Remove blacklist success!"));
    }

    @Test
    void updateBlackList() throws Exception {
        var request = BlackListUpdateRequestDTO.builder()
                .blacklistId(1L)
                .description("ha")
                .build();
        String token = login("admin@gmail.com", "1234");
        mockMvc.perform(put("/blacklist")
                        .header("authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Update blacklist success!"));
    }

    @Test
    void updateBlackListFail() throws Exception {
        var request = BlackListUpdateRequestDTO.builder()
                .blacklistId(0L)
                .description("ha")
                .build();
        String token = login("admin@gmail.com", "1234");
        mockMvc.perform(put("/blacklist")
                        .header("authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Blacklist of this user not found!"));
    }

    @Test
    void getByBlackListId() throws Exception {
        String token = login("admin@gmail.com", "1234");
        mockMvc.perform(get("/blacklist/1")
                        .header("authorization", "Bearer " + token)
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Success !"));
    }

    @Test
    void getByBlackListIdFail() throws Exception {
        String token = login("admin@gmail.com", "1234");
        mockMvc.perform(get("/blacklist/0")
                        .header("authorization", "Bearer " + token)
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("404 NOT_FOUND"))
                .andExpect(jsonPath("$.message").value("ID of this blacklist is not found!"));
    }

    @Test
    void getAllBlackList() throws Exception {
        String token = login("admin@gmail.com", "1234");
        mockMvc.perform(get("/blacklist")
                .header("authorization", "Bearer " + token)
        )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Success !"));
    }

    @Test
    void getBlackListByUserId() throws Exception {
        String token = login("admin@gmail.com", "1234");
        mockMvc.perform(get("/blacklist/history/7")
                        .header("authorization", "Bearer " + token)
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("200 OK"))
                .andExpect(jsonPath("$.message").value("Success !"))
                .andExpect(jsonPath("$.data[0].id").value(1))
                .andExpect(jsonPath("$.data[0].reasonBlacklist").value("hacker"));
    }


    @Test
    void getBlackListByUserIdNotfound() throws Exception {
        String token = login("admin@gmail.com", "1234");
        mockMvc.perform(get("/blacklist/history/1")
                        .header("authorization", "Bearer " + token)
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("404 NOT_FOUND"))
                .andExpect(jsonPath("$.message").value("Blacklist of this user not found!"));
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