package com.java08.quanlituyendung.service;

import com.java08.quanlituyendung.entity.EmailType;

public interface IMailService {
    void sendEmail(String mail, String code, EmailType emailType);
    Boolean isDeliverableMail(String email);

}
