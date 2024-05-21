package com.java08.quanlituyendung.controller;

import com.google.rpc.context.AttributeContext;
import com.java08.quanlituyendung.dto.MessageDTO.ChatDTO;
import com.java08.quanlituyendung.dto.ResponseObject;
import com.java08.quanlituyendung.service.IMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping(value = "/message")
public class MessageController {
//    private static String CHAT_ENGINE_PROJECT_ID = "bd1f57d0-c073-4374-bbb9-ee898f8af3ec";
//    private static String CHAT_ENGINE_PRIVATE_KEY = "f6c9a615-51f4-4d04-82ef-e292040cbc85";

    @Autowired
    private IMessageService messageService;

    @GetMapping
    public ResponseEntity<ResponseObject> getMyMessage(Authentication authentication) {
        return messageService.getMyMessage(authentication);
    }

    @PostMapping("/chat-to")
    public ResponseEntity<ResponseObject> getChatWithUser(Authentication authentication, String email) {
        return messageService.getChatWithUser(authentication, email);
    }



    ///
//    @PostMapping("/chatbot")
//    public ResponseEntity<Object> getBotAnswer(@RequestBody ChatDTO chatDTO){
//        return new ResponseEntity<>(chatbotService.getBotAnswer(chatDTO), HttpStatus.OK);
//    }


}
