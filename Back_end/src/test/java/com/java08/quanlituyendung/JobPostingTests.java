package com.java08.quanlituyendung;

import com.java08.quanlituyendung.dto.JobPostingDTO;
import com.java08.quanlituyendung.dto.ResponseObject;
import com.java08.quanlituyendung.service.IJobPostingService;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;

import static org.hamcrest.collection.IsCollectionWithSize.hasSize;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.springframework.boot.json.JacksonJsonParser;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class JobPostingTests {

    @Autowired private MockMvc mockMvc;
    @MockBean private IJobPostingService jobPostingService;

    private String login(MockMvc mockMvc, String email, String password) throws Exception {
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
    public void testCreateJobPosting() throws Exception {
        String tk = login(mockMvc, "reccer1@gmail.com", "1234");
        JobPostingDTO jobPostingDTO = JobPostingDTO.builder()
                .id(1L)
                .name("Job 1")
                .position("Position 1")
                .language("English")
                .location("City 1")
                .salary("50000")
                .number("3")
                .workingForm("Full-time")
                .sex("Male")
                .experience("3 years")
                .detailLocation("Street A, City 1")
                .detailJob("Job details 1")
                .requirements("Requirements for Job 1")
                .interest("Interest for Job 1")
                .image("image1.jpg")
                .status(true)
                .listCandidate(new ArrayList<>())
                .build();


        ObjectMapper objectMapper = new ObjectMapper();
        String requestBody = objectMapper.writeValueAsString(jobPostingDTO);

        ResponseObject responseObject = new ResponseObject("OK", "Success!", jobPostingDTO);

        doReturn(ResponseEntity.ok().body(responseObject))
                .when(jobPostingService)
                .save(Mockito.any(JobPostingDTO.class), Mockito.any(Authentication.class));
        mockMvc.perform(post("/job-posting")
                        .header("Authorization", "Bearer " + tk)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("OK"))
                .andExpect(jsonPath("$.message").value("Success!"))
                .andExpect(jsonPath("$.data.id").value(jobPostingDTO.getId()))
                .andExpect(jsonPath("$.data.name").value(jobPostingDTO.getName()))
                .andExpect(jsonPath("$.data.position").value(jobPostingDTO.getPosition()))
                .andExpect(jsonPath("$.data.language").value(jobPostingDTO.getLanguage()))
                .andDo(print());
    }



    @Test
    public void testGetDetailJobPosting() throws Exception {
        String tk = login(mockMvc, "reccer1@gmail.com", "1234");
        long jobPostingId = 1L;

        JobPostingDTO jobPostingDTO = JobPostingDTO.builder()
                .id(jobPostingId)
                .name("Job 1")
                .position("Position 1")
                .language("English")
                .location("City 1")
                .salary("50000")
                .number("3")
                .workingForm("Full-time")
                .sex("Male")
                .experience("3 years")
                .detailLocation("Street A, City 1")
                .detailJob("Job details 1")
                .requirements("Requirements for Job 1")
                .interest("Interest for Job 1")
                .image("image1.jpg")
                .status(true)
                .listCandidate(new ArrayList<>())
                .build();

        doReturn(ResponseEntity.ok().body(new ResponseObject("OK", "Job posting details retrieved successfully.", jobPostingDTO)))
                .when(jobPostingService).getDetailJobPosting(jobPostingId);

        mockMvc.perform(get("/job-posting/{id}", jobPostingId)
                        .header("Authorization", "Bearer " + tk))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("OK"))
                .andExpect(jsonPath("$.message").value("Job posting details retrieved successfully."))
                .andExpect(jsonPath("$.data.id").value(jobPostingDTO.getId()))
                .andExpect(jsonPath("$.data.name").value(jobPostingDTO.getName()))
                .andExpect(jsonPath("$.data.position").value(jobPostingDTO.getPosition()))
                .andExpect(jsonPath("$.data.language").value(jobPostingDTO.getLanguage()));
    }

}
