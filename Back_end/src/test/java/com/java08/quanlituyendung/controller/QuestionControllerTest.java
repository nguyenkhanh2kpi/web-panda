package com.java08.quanlituyendung.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.java08.quanlituyendung.dto.QuestionPayload.QuestionRequestDTO;
import com.java08.quanlituyendung.dto.ResponseObject;
import com.java08.quanlituyendung.entity.FieldEnum;
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

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class QuestionControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper = new ObjectMapper();


    @Autowired
    private QuestionController questionController;


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
    void create() throws Exception {
        Long[] ids = {1L, 2L};
        String tk = login("interviewer1@gmail.com","1234");
        var question = QuestionRequestDTO.builder()
                .question("test")
                .answer("test")
                .positionIds(List.of(ids))
                .skillIds(List.of(ids))
                .build();
        mockMvc.perform(post("/question")
                .header("authorization","Bearer "+ tk)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(question)))
                .andExpect(status().isOk());
    }
    @Test
    void createFail() throws Exception {
        Long[] ids = {1L, 2L};
        String tk = login("interviewer1@gmail.com","1234");
        var question = QuestionRequestDTO.builder()
                .question("Câu hỏi test?")
                .answer("test")
                .positionIds(List.of(ids))
                .skillIds(List.of(ids))
                .build();
        mockMvc.perform(post("/question")
                        .header("authorization","Bearer "+ tk)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(question)))
                .andExpect(status().isOk());
        mockMvc.perform(post("/question")
                        .header("authorization","Bearer "+ tk)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(question)))
                .andExpect(status().isOk())
                .andExpect(content().json("{\"message\": \"Question is existed!!\"}"));
    }

    @Test
    void deleteTest() throws Exception {
        String tk = login("interviewer1@gmail.com","1234");
        mockMvc.perform(delete("/question/3")
                        .header("authorization", "Bearer " + tk)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().json("{\"message\": \"Success !\"}"));
    }

    @Test
    void update() throws Exception {
        Long[] ids = {1L, 2L};
        String tk = login("interviewer1@gmail.com","1234");
        var request = QuestionRequestDTO.builder()
                .id(3L)
                .question("1asds")
                .answer("asd")
                .skillIds(List.of(ids))
                .positionIds(List.of(ids))
                .build();
        mockMvc.perform(put("/question")
                        .header("authorization","Bearer "+ tk)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(content().json("{\"message\": \"Update question success!\"}"));
    }

    @Test
    void updateFail() throws Exception {
        Long[] ids = {1L, 2L};
        String tk = login("interviewer1@gmail.com","1234");
        var request = QuestionRequestDTO.builder()
                .id(-1L)
                .question("1asds")
                .answer("asd")
                .skillIds(List.of(ids))
                .positionIds(List.of(ids))
                .build();
        mockMvc.perform(put("/question")
                        .header("authorization","Bearer "+ tk)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(content().json("{\"message\": \"Question not found!!\"}"));
    }

    @Test
    void getAll() {
        ResponseEntity<ResponseObject> response = questionController.getAll();
        assertEquals("Success !", response.getBody().getMessage());
        assertEquals("200 OK", response.getBody().getStatus());
        assertNotNull(response.getBody().getData());
    }

    @Test
    void getOneById() {
        ResponseEntity<ResponseObject> response = questionController.getAll();
        assertEquals("Success !", response.getBody().getMessage());
        assertEquals("200 OK", response.getBody().getStatus());
        assertNotNull(response.getBody().getData());
    }

    @Test
    void getAllBySkill() {
        Long[] skillIds = {1L, 2L};
        ResponseEntity<ResponseObject> response = questionController.getAllBySkill(skillIds);
        assertEquals("Success !", response.getBody().getMessage());
        assertEquals("200 OK", response.getBody().getStatus());
        assertNotNull(response.getBody().getData());
    }

    @Test
    void getAllByField() {
        ResponseEntity<ResponseObject> response = questionController.getAllByField(FieldEnum.TechSkill);
        assertEquals("Success !", response.getBody().getMessage());
        assertEquals("201 CREATED", response.getBody().getStatus());
        assertNotNull(response.getBody().getData());
    }
}