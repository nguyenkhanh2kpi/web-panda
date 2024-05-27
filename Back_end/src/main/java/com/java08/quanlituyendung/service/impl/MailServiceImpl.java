package com.java08.quanlituyendung.service.impl;

import com.java08.quanlituyendung.entity.EmailType;
import com.java08.quanlituyendung.service.IMailService;
import com.java08.quanlituyendung.service.IThymeleafService;
import jakarta.mail.internet.MimeMessage;
import org.apache.http.client.fluent.Content;
import org.apache.http.client.fluent.Request;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class MailServiceImpl implements IMailService {

    @Autowired
    JavaMailSender javaMailSender;
    @Autowired
    IThymeleafService thymeleafService;
    @Value("${spring.mail.username}")
    private String email;

    @Value("${deliverableMail.api_key}")
    private String api_key;

    @Async
    public void sendEmail(String mail, String code, EmailType emailType) {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message,
                    MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                    StandardCharsets.UTF_8.name());

            String subject = "Verification Mail";
            String templateName = "welcome.html";

            Map<String, Object> variables = new HashMap<>();
            variables.put("code", code);

            if(emailType.equals(EmailType.RESET_PASSWORD)) {
                subject = "Reset Password Mail";
                templateName = "resetpassword.html";
            }
            helper.setFrom(email);
            helper.setTo(mail);
            helper.setSubject(subject);
            helper.setText(thymeleafService.createContent(templateName, variables), true);
            javaMailSender.send(message);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
     public Boolean isDeliverableMail(String email) {

        try {
            Content content = Request.Get("https://emailvalidation.abstractapi.com/v1/" +
                            "?api_key="+api_key +
                            "&email="+email)
                    .execute().returnContent();

            //convert to json
            JSONObject jsonObject = new JSONObject(content.toString());
            String deliverability = jsonObject.getString("deliverability");

            //check deliverable mail
            if(deliverability.equals("DELIVERABLE")){
                return true;
            }
            return false;

        } catch (IOException error) {
            System.out.println("undeliverable mail");
            System.out.println(error);
            return true;
        }
    }


}
