package com.java08.quanlituyendung.controller;

import com.java08.quanlituyendung.entity.Industry;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/industries")
public class IndustryController {

    @GetMapping
    public List<String> getAllIndustries() {
        return Arrays.stream(Industry.values())
                .map(Industry::getDisplayName)
                .collect(Collectors.toList());
    }
}