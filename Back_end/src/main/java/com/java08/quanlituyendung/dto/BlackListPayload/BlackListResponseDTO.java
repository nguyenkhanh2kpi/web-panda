package com.java08.quanlituyendung.dto.BlackListPayload;


import com.java08.quanlituyendung.entity.Role;
import com.java08.quanlituyendung.entity.Status;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.json.simple.JSONObject;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BlackListResponseDTO {
    Long id;
    String reasonBlacklist;
    LocalDateTime date;
}
