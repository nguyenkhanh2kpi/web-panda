package com.java08.quanlituyendung.dto.test;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecordRequestDTO {
    private Long id;
    private Long testId;
    private Double score;
    private String record;

}
