package com.java08.quanlituyendung.service;

import java.util.Map;

public interface IThymeleafService {
    String createContent(String template, Map<String,Object> variables);
}
