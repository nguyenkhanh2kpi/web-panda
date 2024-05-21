package com.java08.quanlituyendung;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.java08.quanlituyendung.dto.RegisterRequestDTO;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;



@SpringBootTest
@AutoConfigureMockMvc
@RunWith(SpringRunner.class)
@Transactional
class RegisterTests {
    @Autowired
    private MockMvc mockMvc;
    ObjectMapper objectMapper;
    @BeforeEach
    public void setUp(){
        this.objectMapper = new ObjectMapper();
    }

    @Test
    void missEmail() throws Exception{
        RegisterRequestDTO requestDTO = new RegisterRequestDTO();
        requestDTO.setUsername("testMissEmail");
        requestDTO.setPassword("testMissEmail");
        requestDTO.setEmail("");
        MvcResult result = mockMvc.perform(post("/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(requestDTO)))
                .andExpect(status().isOk())
                .andExpect(content().json("{\"message\": \"Registration failed!: Missing Email!\"}"))
                .andReturn();
    }

    @Test
    void missUsername() throws Exception{
        RegisterRequestDTO requestDTO = new RegisterRequestDTO();
        requestDTO.setUsername("");
        requestDTO.setPassword("testMissUsername");
        requestDTO.setEmail("testMissUsername");
        MvcResult result = mockMvc.perform(post("/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(requestDTO)))
                .andExpect(status().isOk())
                .andExpect(content().json("{\"message\": \"Registration failed!: Missing Username!\"}"))
                .andReturn();
    }

    @Test
    void missPassword() throws Exception{
        RegisterRequestDTO requestDTO = new RegisterRequestDTO();
        requestDTO.setUsername("testMissPassword");
        requestDTO.setPassword("");
        requestDTO.setEmail("testMissPassword");
        MvcResult result = mockMvc.perform(post("/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(requestDTO)))
                .andExpect(status().isOk())
                .andExpect(content().json("{\"message\": \"Registration failed!: Missing Password!\"}"))
                .andReturn();
    }

    @Test
    void existEmail() throws Exception{
        RegisterRequestDTO requestDTO = new RegisterRequestDTO();
        requestDTO.setUsername("test");
        requestDTO.setPassword("test");
        requestDTO.setEmail("admin@gmail.com");

        MvcResult result = mockMvc.perform(post("/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(requestDTO)))
                .andExpect(status().isOk())
                .andExpect(content().json("{\"message\": \"Email already exists!\"}"))
                .andReturn();
    }

    @Test
    void existUsername() throws Exception{
        RegisterRequestDTO requestDTO = new RegisterRequestDTO();
        requestDTO.setUsername("admin");
        requestDTO.setPassword("test");
        requestDTO.setEmail("testusernameexists@gmail.com");

        MvcResult result = mockMvc.perform(post("/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(requestDTO)))
                .andExpect(status().isOk())
                .andExpect(content().json("{\"message\": \"Username already exists!\"}"))
                .andReturn();
    }
}
