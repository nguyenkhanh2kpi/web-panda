package com.java08.quanlituyendung.dto.BlackListPayload;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BlackListUpdateRequestDTO {
    Long blacklistId;
    String description;
}
