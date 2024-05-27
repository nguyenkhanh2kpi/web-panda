package com.java08.quanlituyendung.dto.vip;

import com.java08.quanlituyendung.utils.PackVipType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BuyRequestDTO {
    private long price;
    private PackVipType packVipType;
    private String userEmail;
}
