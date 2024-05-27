package com.java08.quanlituyendung.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class InviteToEventListDTO {
    private Long eventId;
    private List<Long> listInviteIds;
}
