package com.java08.quanlituyendung.dto.test;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NewTestDTO {
    private Long jdId;
//    private Long time;
    private String summary;
    private LocalDateTime startTime;
    private LocalDateTime endTime;

}
