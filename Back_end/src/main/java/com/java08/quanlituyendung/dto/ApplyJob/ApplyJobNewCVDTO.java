package com.java08.quanlituyendung.dto.ApplyJob;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApplyJobNewCVDTO {
    private String cv;
    private Long jobId;
}
