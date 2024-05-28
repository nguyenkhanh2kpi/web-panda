package com.java08.quanlituyendung;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.java08.quanlituyendung.dto.InterviewCreateDTO;
import com.java08.quanlituyendung.repository.UserAccountRepository;
import com.java08.quanlituyendung.utils.Constant;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.json.JacksonJsonParser;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@ExtendWith(MockitoExtension.class)
@SpringBootTest
@AutoConfigureMockMvc
@RunWith(SpringRunner.class)
@Transactional
class InterviewTests {
	@Autowired
	UserAccountRepository userAccountRepository;

	@Autowired
	private MockMvc mockMvc;

	@Autowired
	ObjectMapper objectMapper = new ObjectMapper();

	@BeforeEach
	public void setUp() {
		objectMapper = new ObjectMapper();
		MockitoAnnotations.initMocks(this);
	}
	private String login(MockMvc mockMvc, String email, String password) throws Exception {
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
	void getInterviewSuccess() throws Exception {
		String token = login(mockMvc,"admin@gmail.com","1234");
		MvcResult result = mockMvc.perform(get("/interview")
						.header("Authorization", "Bearer " + token)
						.contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.status").value(HttpStatus.OK.toString()))
				.andExpect(jsonPath("$.message").value(Constant.SUCCESS))
				.andExpect(jsonPath("$.data").isNotEmpty())
				.andReturn();
	}

	@Test
	void getInterviewFail() throws Exception {
		String token = login(mockMvc,"johndoe@gmail.com","1234");
		MvcResult result = mockMvc.perform(get("/interview")
						.header("Authorization", "Bearer " + token)
						.contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isForbidden())
				.andReturn();
	}


	@Test
	void addInterviewSuccess() throws Exception {
		String token = login(mockMvc, "reccer1@gmail.com", "1234");
		InterviewCreateDTO requestDTO = new InterviewCreateDTO();
		requestDTO.setJobPostId("1");
		requestDTO.setRoomName("phong x jd 2");
		requestDTO.setRoomSkill("python fast apiiii");
		requestDTO.setRoomDescription("room3description");
		requestDTO.setStartDate("28-7-2023");
		requestDTO.setEndDate("28-7-2023");
		String requestBody = objectMapper.writeValueAsString(requestDTO);
		mockMvc.perform(post("/interview/create-interview")
						.header("Authorization", "Bearer " + token)
						.contentType(MediaType.APPLICATION_JSON)
						.content(requestBody))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.status").value(HttpStatus.OK.toString()))
				.andExpect(jsonPath("$.message").value(Constant.SUCCESS))
				.andExpect(jsonPath("$.data").isNotEmpty())
				.andExpect(jsonPath("$.data.id").isNumber());
	}
	@Test
	void addInterviewNotFound() throws Exception {
		String token = login(mockMvc, "admin@gmail.com", "1234");
		InterviewCreateDTO requestDTO = new InterviewCreateDTO();
		requestDTO.setJobPostId("223432432432423452");
		requestDTO.setRoomName("phong x jd 2");
		requestDTO.setRoomSkill("python fast apiiii");
		requestDTO.setRoomDescription("room3description");
		requestDTO.setStartDate("28-7-2023");
		requestDTO.setEndDate("28-7-2023");
		String requestBody = objectMapper.writeValueAsString(requestDTO);
		mockMvc.perform(post("/interview/create-interview")
						.header("Authorization", "Bearer " + token)
						.contentType(MediaType.APPLICATION_JSON)
						.content(requestBody))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.status").value(HttpStatus.NOT_FOUND.toString()))
				.andExpect(jsonPath("$.message").value(Constant.CAN_NOT_FIND_THIS_JOB))
				.andExpect(jsonPath("$.data").isEmpty());
	}
	@Test
	void addInterviewForbidden() throws Exception {
		String token = login(mockMvc, "interviewer1@gmail.com", "1234");
		InterviewCreateDTO requestDTO = new InterviewCreateDTO();
		requestDTO.setJobPostId("2");
		requestDTO.setRoomName("phong x jd 2");
		requestDTO.setRoomSkill("python fast apiiii");
		requestDTO.setRoomDescription("room3description");
		requestDTO.setStartDate("28-7-2023");
		requestDTO.setEndDate("28-7-2023");
		String requestBody = objectMapper.writeValueAsString(requestDTO);
		mockMvc.perform(post("/interview/create-interview")
						.header("Authorization", "Bearer " + token)
						.contentType(MediaType.APPLICATION_JSON)
						.content(requestBody))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.status").value(HttpStatus.OK.toString()))
				.andExpect(jsonPath("$.message").value(Constant.SUCCESS))
				.andExpect(jsonPath("$.data").isNotEmpty())
				.andExpect(jsonPath("$.data.id").isNumber());
	}

}
