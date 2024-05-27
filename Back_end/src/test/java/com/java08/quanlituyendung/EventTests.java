package com.java08.quanlituyendung;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.java08.quanlituyendung.dto.RegisterRequestDTO;
import com.java08.quanlituyendung.entity.Role;
import com.java08.quanlituyendung.entity.UserAccountEntity;
import com.java08.quanlituyendung.repository.UserAccountRepository;
import com.java08.quanlituyendung.utils.Constant;
import jakarta.transaction.Transactional;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.json.JacksonJsonParser;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.io.FileInputStream;
import java.util.LinkedHashMap;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
@Transactional
public class EventTests {

//        @Autowired
//        RecruiterRepository recruiterRepository;

    @Autowired
    UserAccountRepository userAccountRepository;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper = new ObjectMapper();

    public void setUp() throws Exception {
        RegisterRequestDTO requestDTO = new RegisterRequestDTO();
        requestDTO.setPassword("1234");
        requestDTO.setEmail("admin@gmail.com");


        MvcResult resultCreate = mockMvc.perform(post("/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(requestDTO)))
                .andExpect(status().isCreated())
                .andExpect(content().json("{\"message\": \"Registration successful!\"}"))
                .andReturn();

        UserAccountEntity user = userAccountRepository.findByEmail("testmail@gmail.com").orElseThrow();
        user.setRole(Role.RECRUITER);
        userAccountRepository.save(user);


    }


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
    public void testGetEventAPI() throws Exception {
        String token = login("admin@gmail.com", "1234");

        String requestBodyCreate = "{\r\n" + //
                "    \"title\": \"Testing create title\",\r\n" + //
                "    \"article\": \"Test article\",\r\n" + //
                "    \"time\": \"30-7-2023\",\r\n" + //
                "    \"author\": \"tue1234\",\r\n" + //
                "    \"status\": true,\r\n" + //
                "    \"image\": \"https://images2.thanhnien.vn/528068263637045248/2023/6/26/blackpinksanghanoivietnambieudien11-1687757871275987370049.jpg\",\r\n" + //
                "    \"content\": \"test content\"\r\n" + //
                "}";
        ResultActions resultCreate = mockMvc.perform(post("/event")
                        .header("authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBodyCreate)
                        .accept("application/json;charset=UTF-8"))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"));

        String resultCreateString = resultCreate.andReturn().getResponse().getContentAsString();
        JacksonJsonParser jsonParser = new JacksonJsonParser();
        var json_response_create = jsonParser.parseMap(resultCreateString);
        var data_create = json_response_create.get("data");
        String id = ((LinkedHashMap) data_create).get("id").toString();

        ResultActions result = this.mockMvc.perform(get("/event/" + id)
                        .header("authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json"));
        String resultString = result.andReturn().getResponse().getContentAsString();
        var json_response = jsonParser.parseMap(resultString);
        String status = json_response.get("message").toString();
        assertTrue(status.equals(Constant.SUCCESS), () -> "response status testGetEvent is OK");
    }

    @Test // Add thành công, nhưng status code trả về là null thay vì 200
    public void testCreateEventAPI() throws Exception {

        String token = login("admin@gmail.com", "1234");
        String requestBody = "{\r\n" + //
                "    \"title\": \"Testing create title\",\r\n" + //
                "    \"article\": \"Test article\",\r\n" + //
                "    \"time\": \"30-7-2023\",\r\n" + //
                "    \"author\": \"tue1234\",\r\n" + //
                "    \"status\": true,\r\n" + //
                "    \"image\": \"https://images2.thanhnien.vn/528068263637045248/2023/6/26/blackpinksanghanoivietnambieudien11-1687757871275987370049.jpg\",\r\n" + //
                "    \"content\": \"test content\"\r\n" + //
                "}";
        ResultActions result = mockMvc.perform(post("/event")
                        .header("authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody)
                        .accept("application/json;charset=UTF-8"))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"));

        String resultString = result.andReturn().getResponse().getContentAsString();
        JacksonJsonParser jsonParser = new JacksonJsonParser();
        var json_response = jsonParser.parseMap(resultString);
        String message = json_response.get("message").toString();
        assertTrue(message.equals("Event success add !"), () -> "response status testGetEvent is OK");

    }

    @Test
    public void testDeleteEvent() throws Exception {

        String token = login("admin@gmail.com", "1234");

        String requestBodyCreate = "{\r\n" + //
                "    \"title\": \"Testing create title\",\r\n" + //
                "    \"article\": \"Test article\",\r\n" + //
                "    \"time\": \"30-7-2023\",\r\n" + //
                "    \"author\": \"tue1234\",\r\n" + //
                "    \"status\": true,\r\n" + //
                "    \"image\": \"https://images2.thanhnien.vn/528068263637045248/2023/6/26/blackpinksanghanoivietnambieudien11-1687757871275987370049.jpg\",\r\n" + //
                "    \"content\": \"test content\"\r\n" + //
                "}";
        ResultActions resultCreate = mockMvc.perform(post("/event")
                        .header("authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBodyCreate)
                        .accept("application/json;charset=UTF-8"))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"));

        String resultCreateString = resultCreate.andReturn().getResponse().getContentAsString();
        JacksonJsonParser jsonParser = new JacksonJsonParser();
        var json_response_create = jsonParser.parseMap(resultCreateString);
        var data_create = json_response_create.get("data");
        String delete_id = ((LinkedHashMap) data_create).get("id").toString();
        ResultActions result = mockMvc.perform(delete("/event/" + delete_id)
                        .header("authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept("application/json;charset=UTF-8"))
                .andExpect(status().isOk());
        String resultString = result.andReturn().getResponse().getContentAsString();
        var json_response_delete = jsonParser.parseMap(resultString);
        var data_delete = json_response_delete.get("data");
        String status = ((LinkedHashMap) data_delete).get("status").toString();
        assertTrue(status.equals("false"), () -> "response message testDeleteEvent is OK");
    }

    @Test
    public void testUpdateEvent() throws Exception {

        String token = login("admin@gmail.com", "1234");

        String requestBodyCreate = "{\r\n" + //
                "    \"title\": \"Testing create title\",\r\n" + //
                "    \"article\": \"Test article\",\r\n" + //
                "    \"time\": \"30-7-2023\",\r\n" + //
                "    \"author\": \"tue1234\",\r\n" + //
                "    \"status\": true,\r\n" + //
                "    \"image\": \"https://images2.thanhnien.vn/528068263637045248/2023/6/26/blackpinksanghanoivietnambieudien11-1687757871275987370049.jpg\",\r\n" + //
                "    \"content\": \"test content\"\r\n" + //
                "}";
        ResultActions resultCreate = mockMvc.perform(post("/event")
                        .header("authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBodyCreate)
                        .accept("application/json;charset=UTF-8"))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"));

        String resultCreateString = resultCreate.andReturn().getResponse().getContentAsString();
        JacksonJsonParser jsonParser = new JacksonJsonParser();
        var json_response_create = jsonParser.parseMap(resultCreateString);
        var data_create = json_response_create.get("data");
        String update_id = ((LinkedHashMap) data_create).get("id").toString();
        String requestBodyUpdate = "{\r\n" + //
                "    \"title\": \"Testing update create title\",\r\n" + //
                "    \"article\": \"Test update article\",\r\n" + //
                "    \"time\": \"30-7-2023\",\r\n" + //
                "    \"author\": \"tue1234\",\r\n" + //
                "    \"status\": true,\r\n" + //
                "    \"image\": \"https://images2.thanhnien.vn/528068263637045248/2023/6/26/blackpinksanghanoivietnambieudien11-1687757871275987370049.jpg\",\r\n" + //
                "    \"content\": \"test update content\"\r\n" + //
                "}";

        ResultActions result = mockMvc.perform(put("/event/" + update_id)
                        .header("authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBodyUpdate)
                        .accept("application/json;charset=UTF-8"))
                .andExpect(status().isOk());
        String resultString = result.andReturn().getResponse().getContentAsString();
        var json_response = jsonParser.parseMap(resultString);
        String message = json_response.get("message").toString();
        assertTrue(message.equals(Constant.SUCCESS), () -> "response status testGetEvent is OK");
    }

    @Test
    public void testUploadImage() throws Exception {

        String token = login("admin@gmail.com", "1234");

        String requestBodyCreate = "{\r\n" + //
                "    \"title\": \"Testing create title\",\r\n" + //
                "    \"article\": \"Test article\",\r\n" + //
                "    \"time\": \"30-7-2023\",\r\n" + //
                "    \"author\": \"tue1234\",\r\n" + //
                "    \"status\": true,\r\n" + //
                "    \"image\": \"https://images2.thanhnien.vn/528068263637045248/2023/6/26/blackpinksanghanoivietnambieudien11-1687757871275987370049.jpg\",\r\n" + //
                "    \"content\": \"test content\"\r\n" + //
                "}";
        ResultActions resultCreate = mockMvc.perform(post("/event")
                        .header("authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBodyCreate)
                        .accept("application/json;charset=UTF-8"))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"));

        String resultCreateString = resultCreate.andReturn().getResponse().getContentAsString();
        JacksonJsonParser jsonParser = new JacksonJsonParser();
        var json_response_create = jsonParser.parseMap(resultCreateString);
        var data_create = json_response_create.get("data");
        String eventId = ((LinkedHashMap) data_create).get("id").toString();
        String currDir = System.getProperty("user.dir");
        FileInputStream fis = new FileInputStream(currDir + "\\src\\test\\java\\com\\java08\\quanlituyendung\\snap.png");
        MockMultipartFile file = new MockMultipartFile("file", fis);

        ResultActions result = mockMvc.perform(multipart("/event/" + eventId + "/upload/image")
                        .file(file)
                        .header("authorization", "Bearer " + token)

                )
                .andExpect(status().isOk());

        String resultString = result.andReturn().getResponse().getContentAsString();
        var json_response = jsonParser.parseMap(resultString);
        String message = json_response.get("message").toString();
        assertTrue(message.equals(Constant.SUCCESS), () -> "response message testUploadImage is OK");
    }
}
