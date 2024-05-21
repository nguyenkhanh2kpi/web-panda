package com.java08.quanlituyendung.dto;

import org.json.simple.JSONObject;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CVTemporaryResponseDTO {
    Long id;
    private JSONObject cv;
}
