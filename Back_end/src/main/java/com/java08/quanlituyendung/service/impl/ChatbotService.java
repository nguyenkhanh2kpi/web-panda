package com.java08.quanlituyendung.service.impl;

import com.java08.quanlituyendung.dto.MessageDTO.ChatDTO;

//public class ChatbotService {
//    public String getBotAnswer(ChatDTO chatDTO) {
//        GatewayServer.turnLoggingOff();
//        GatewayServer server = new GatewayServer();
//        server.start();
//        Chatbot hello = (Chatbot) server.getPythonServerEntryPoint(new Class[] { Chatbot.class });
//        String answer = "";
//        try {
//            answer = hello.query(chatDTO.getQuestion());
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        server.shutdown();
//        return answer;
//    }
//}
