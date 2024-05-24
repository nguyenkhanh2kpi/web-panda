package com.java08.quanlituyendung.service.impl;

import com.java08.quanlituyendung.entity.EmailType;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;

@Service
public class MailServerService {

    @Autowired
    private TemplateEngine templateEngine;
    @Async
    public void sendEmail(String recipientEmail, String code, EmailType emailType) {
        try {
            // Determine email subject and template
            String subject = "Verification Mail";
            String body = "Your verification code is: " + code;
            if(emailType.equals(EmailType.RESET_PASSWORD)) {
                subject = "Reset Password Mail";
                body = "Your password reset code is: " + code;
            }

            // URL endpoint
            String url = "https://api.postmarkapp.com/email";

            // JSON request body
            String jsonBody = "{"
                    + "\"From\": \"20110233@student.hcmute.edu.vn\","
                    + "\"To\": \"" + recipientEmail + "\","
                    + "\"Subject\": \"" + subject + "\","
                    + "\"TextBody\": \"" + body + "\","
                    + "\"HtmlBody\": \"<html><body><strong>" + body + "</strong></body></html>\","
                    + "\"MessageStream\": \"outbound\""
                    + "}";

            // Create URL object
            URL obj = new URL(url);
            HttpURLConnection con = (HttpURLConnection) obj.openConnection();

            // Set request method
            con.setRequestMethod("POST");

            // Set request headers
            con.setRequestProperty("Accept", "application/json");
            con.setRequestProperty("Content-Type", "application/json");
            con.setRequestProperty("X-Postmark-Server-Token", "7ba34be9-4c74-4eef-9985-e45a7b44cfee"); // Replace with your Postmark server token

            // Enable output for POST data
            con.setDoOutput(true);

            // Write JSON data to request body
            try (DataOutputStream wr = new DataOutputStream(con.getOutputStream())) {
                wr.writeBytes(jsonBody);
                wr.flush();
            }

            // Get response code
            int responseCode = con.getResponseCode();
            System.out.println("Response Code : " + responseCode);

            // Read response body
            try (BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()))) {
                String inputLine;
                StringBuilder response = new StringBuilder();
                while ((inputLine = in.readLine()) != null) {
                    response.append(inputLine);
                }
                // Print response body
                System.out.println("Response Body : " + response.toString());
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }



    @Async
    public void sendEmail1(String recipientEmail, String code, EmailType emailType) {
        try {
            // Determine email subject and template
            String subject = "Verification Mail";
            String templateFile = "welcome.html";
            if (emailType.equals(EmailType.RESET_PASSWORD)) {
                subject = "Reset Password Mail";
                templateFile = "resetpassword.html";
            }

            // Process HTML template with Thymeleaf
            Context context = new Context();
            context.setVariable("code", code);
            String htmlBody = templateEngine.process(templateFile, context);

            // Construct JSON request body using JSONObject
            JSONObject jsonBody = new JSONObject();
            jsonBody.put("From", "20110233@student.hcmute.edu.vn");
            jsonBody.put("To", recipientEmail);
            jsonBody.put("Subject", subject);
            jsonBody.put("TextBody", code);
            jsonBody.put("HtmlBody", htmlBody);
            jsonBody.put("MessageStream", "outbound");

            // URL endpoint
            String url = "https://api.postmarkapp.com/email";

            // Create URL object
            URL obj = new URL(url);
            HttpURLConnection con = (HttpURLConnection) obj.openConnection();

            // Set request method
            con.setRequestMethod("POST");

            // Set request headers
            con.setRequestProperty("Accept", "application/json");
            con.setRequestProperty("Content-Type", "application/json");
            con.setRequestProperty("X-Postmark-Server-Token", "7ba34be9-4c74-4eef-9985-e45a7b44cfee"); // Replace with your Postmark server token

            // Enable output for POST data
            con.setDoOutput(true);

            // Write JSON data to request body
            try (OutputStream os = con.getOutputStream()) {
                byte[] input = jsonBody.toString().getBytes(StandardCharsets.UTF_8);
                os.write(input, 0, input.length);
            }

            // Get response code
            int responseCode = con.getResponseCode();
            System.out.println("Response Code : " + responseCode);

            // Read response body
            StringBuilder response = new StringBuilder();
            try (BufferedReader in = new BufferedReader(new InputStreamReader(
                    (responseCode >= 200 && responseCode < 300) ? con.getInputStream() : con.getErrorStream(), StandardCharsets.UTF_8))) {
                String inputLine;
                while ((inputLine = in.readLine()) != null) {
                    response.append(inputLine);
                }
            }
            System.out.println("Response Body : " + response.toString());

        } catch (Exception e) {
            e.printStackTrace();  // Print full stack trace
        }
    }


}
