package com.java08.quanlituyendung.service.impl;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.java08.quanlituyendung.auth.UserAccountRetriever;
import com.java08.quanlituyendung.dto.MessageDTO.ChatInfo;
import com.java08.quanlituyendung.dto.ResponseObject;
import com.java08.quanlituyendung.entity.UserAccountEntity;
import com.java08.quanlituyendung.service.IMessageService;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
@RequiredArgsConstructor
public class MessageServiceImpl implements IMessageService {
    private UserAccountRetriever userAccountRetriever;

    private String privateKey = "577f1035-3b9e-4267-b35c-2cd57b0431a3";
    private static String CHAT_ENGINE_PROJECT_ID = "2689e2c3-fe10-416a-95b8-1267082c3cca";

    @Autowired
    public MessageServiceImpl(UserAccountRetriever userAccountRetriever) {
        this.userAccountRetriever = userAccountRetriever;
    }

    @Override
    public ResponseEntity<ResponseObject> getMyMessage(Authentication authentication) {
        UserAccountEntity user = userAccountRetriever.getUserAccountEntityFromAuthentication(authentication);
        if (user == null) {
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(HttpStatus.NOT_ACCEPTABLE.toString())
                    .message("Something went wrong")
                    .build());
        }

        try {
            JsonObject responseJson = callChatEngineAPI(privateKey.toString(), user);

            boolean isAuthenticated = responseJson.get("is_authenticated").getAsBoolean();
            String message = isAuthenticated ? "OKLA" : "Something wrong with message engine";

            return ResponseEntity.ok(ResponseObject.builder()
                    .status(HttpStatus.OK.toString())
                    .message(message)
                    .build());
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(HttpStatus.NOT_ACCEPTABLE.toString())
                    .message("Something went wrong")
                    .build());
        }
    }

    @Override
    public ResponseEntity<ResponseObject> getChatWithUser(Authentication authentication, String email) {
        UserAccountEntity user = userAccountRetriever.getUserAccountEntityFromAuthentication(authentication);
        if (user == null) {
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(HttpStatus.NOT_ACCEPTABLE.toString())
                    .message("Something went wrong")
                    .build());
        }

        HttpURLConnection con = null;
        try {
            URL url = new URL("https://api.chatengine.io/chats/");
            con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("PUT");
            // Set headers
            con.setRequestProperty("Content-Type", "application/json");
            con.setRequestProperty("Accept", "application/json");
            con.setRequestProperty("Project-ID", CHAT_ENGINE_PROJECT_ID);
            con.setRequestProperty("User-Name", user.getUsername().toString());
            con.setRequestProperty("User-Secret", "123");
            // Add request body
            con.setDoOutput(true);
            Map<String, Object> body = new HashMap<String, Object>();
            body.put("usernames", new String[]{email});
            body.put("title", null);
            body.put("is_direct_chat", String.valueOf(false));

            String jsonInputString = new JSONObject(body).toString();
            try (OutputStream os = con.getOutputStream()) {
                byte[] input = jsonInputString.getBytes("utf-8");
                os.write(input, 0, input.length);
            }

            //response
            StringBuilder responseStr = new StringBuilder();
            try (BufferedReader br = new BufferedReader(
                    new InputStreamReader(con.getInputStream(), "utf-8"))) {
                String responseLine = null;
                while ((responseLine = br.readLine()) != null) {
                    responseStr.append(responseLine.trim());
                }
            }

            JsonObject responseJson = new Gson().fromJson(responseStr.toString(), JsonObject.class);

            boolean isAuthenticated = responseJson.get("is_authenticated").getAsBoolean();
            String chatID = responseJson.get("id").getAsString();
            String chatAccesKey = responseJson.get("access_key").getAsString();

            if (isAuthenticated) {
                return ResponseEntity.ok(ResponseObject.builder()
                        .status(HttpStatus.OK.toString())
                        .data(ChatInfo.builder().chatID(chatID).accessKey(chatAccesKey).build())
                        .message("OKLA")
                        .build());
            } else {
                return ResponseEntity.ok(ResponseObject.builder()
                        .status(HttpStatus.OK.toString())
                        .message("Something wrong with message engine")
                        .build());
            }


        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        } finally {
            if (con != null) {
                con.disconnect();
            }
        }


    }

    private JsonObject callChatEngineAPI(String privateKey, UserAccountEntity user) throws IOException {
        URL url = new URL("https://api.chatengine.io/users/");
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("PUT");
        connection.setRequestProperty("Content-Type", "application/json");
        connection.setRequestProperty("Accept", "application/json");
        connection.setRequestProperty("PRIVATE-KEY", privateKey);

        // Body
        connection.setDoOutput(true);
        Map<String, String> body = new HashMap<>();
        body.put("username", user.getUsername());
        body.put("secret", "123");
        body.put("email", user.getUsername());
        body.put("last_name", user.getUserInfo().getFullName());
        String jsonInputString = new JSONObject(body).toString();
        try (OutputStream os = connection.getOutputStream()) {
            byte[] input = jsonInputString.getBytes("utf-8");
            os.write(input, 0, input.length);
        }

        // Response
        StringBuilder responseStr = new StringBuilder();
        try (BufferedReader br = new BufferedReader(
                new InputStreamReader(connection.getInputStream(), "utf-8"))) {
            String responseLine;
            while ((responseLine = br.readLine()) != null) {
                responseStr.append(responseLine.trim());
            }
        }

        return new Gson().fromJson(responseStr.toString(), JsonObject.class);
    }


//    @Override
//    public ResponseEntity<ResponseObject> getMyMessage(Authentication authentication) {
//        UserAccountEntity user = userAccountRetriever.getUserAccountEntityFromAuthentication(authentication);
//        if (user != null) {
//            HttpURLConnection connection = null;
//            try {
//                URL url = new URL("https://api.chatengine.io/users/");
//                connection = (HttpURLConnection) url.openConnection();
//                connection.setRequestMethod("PUT");
//                connection.setRequestProperty("Content-Type", "application/json");
//                connection.setRequestProperty("Accept", "application/json");
//                connection.setRequestProperty("PRIVATE-KEY", privateKey.toString());
//
//
//                //body
//                connection.setDoOutput(true);
//                Map<String, String> body = new HashMap<String, String>();
//                body.put("username", user.getUsername().toString());
//                body.put("secret", "123");
//                body.put("email", user.getUsername());
//                body.put("last_name", user.getUserInfo().getFullName());
//                String jsonInputString = new JSONObject(body).toString();
//                try (OutputStream os = connection.getOutputStream()) {
//                    byte[] input = jsonInputString.getBytes("utf-8");
//                    os.write(input, 0, input.length);
//                }
//
//                // response
//                StringBuilder responseStr = new StringBuilder();
//                try (BufferedReader br = new BufferedReader(
//                        new InputStreamReader(connection.getInputStream(), "utf-8"))) {
//                    String responseLine = null;
//                    while ((responseLine = br.readLine()) != null) {
//                        responseStr.append(responseLine.trim());
//                    }
//                }
//
//                JsonObject responseJson = new Gson().fromJson(responseStr.toString(), JsonObject.class);
//
//
//                boolean isAuthenticated = responseJson.get("is_authenticated").getAsBoolean();
//                if (isAuthenticated) {
//                    return ResponseEntity.ok(ResponseObject.builder()
//                            .status(HttpStatus.OK.toString())
//                            .message("OKLA")
//                            .build());
//                } else {
//                    return ResponseEntity.ok(ResponseObject.builder()
//                            .status(HttpStatus.OK.toString())
//                            .message("Something wrong with message engine")
//                            .build());
//                }
//
//
//            } catch (Exception e) {
//                e.printStackTrace();
//                return ResponseEntity.ok(ResponseObject.builder()
//                        .status(HttpStatus.NOT_ACCEPTABLE.toString())
//                        .message("something went wrong")
//                        .build());
//            } finally {
//                if (connection != null) {
//                    connection.disconnect();
//                }
//            }
//
//        } else {
//            return ResponseEntity.ok(ResponseObject.builder()
//                    .status(HttpStatus.NOT_ACCEPTABLE.toString())
//                    .message("something went wrong")
//                    .build());
//        }
//    }
}


