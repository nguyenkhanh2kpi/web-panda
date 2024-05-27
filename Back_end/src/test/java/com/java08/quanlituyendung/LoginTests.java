package com.java08.quanlituyendung;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.java08.quanlituyendung.dto.AuthenticationRequestDTO;
import com.java08.quanlituyendung.repository.UserAccountRepository;
import jakarta.transaction.Transactional;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
@Transactional
public class LoginTests {

    @Autowired
    private MockMvc mockMvc;



    @Autowired
    private UserAccountRepository userAccountRepository;
    ObjectMapper objectMapper = new ObjectMapper();

    @Test
    public void testLoginSuccess() throws Exception {
        String email = "admin@gmail.com";
        String username = "admin";
        String password = "1234";
        AuthenticationRequestDTO request = new AuthenticationRequestDTO(email, password,username);


        MvcResult mvcResult = mockMvc.perform(post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Login successful!"))
                .andExpect(jsonPath("$.data").isNotEmpty())
                .andExpect(jsonPath("$.access_token").isNotEmpty())
                .andExpect(jsonPath("$.refresh_token").isNotEmpty())
                .andReturn();

    }

    @Test
    public void testEmailNotExist() throws Exception {

        String email = "emailnotexist@gmail.com";
        String username = "test";
        String password = "test";
        AuthenticationRequestDTO request = new AuthenticationRequestDTO(email, password,username);

        mockMvc.perform(post("/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Email or password does not match!"))
                .andExpect(jsonPath("$.data").isEmpty())
                .andExpect(jsonPath("$.access_token").isEmpty())
                .andExpect(jsonPath("$.refresh_token").isEmpty())
                .andReturn();
    }

    @Test
    public void testPasswordNotMatch() throws Exception {

        String email = "admin@gmail.com";
        String username = "";
        String password = "passworderror";
        AuthenticationRequestDTO request = new AuthenticationRequestDTO(email, password,username);

        mockMvc.perform(post("/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Email or password does not match!"))
                .andExpect(jsonPath("$.data").isEmpty())
                .andExpect(jsonPath("$.access_token").isEmpty())
                .andExpect(jsonPath("$.refresh_token").isEmpty())
                .andReturn();
    }
}