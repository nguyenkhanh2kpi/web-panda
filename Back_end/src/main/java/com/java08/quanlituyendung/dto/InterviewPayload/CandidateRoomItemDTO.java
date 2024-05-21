package com.java08.quanlituyendung.dto.InterviewPayload;


import com.java08.quanlituyendung.entity.CVEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CandidateRoomItemDTO {
    private Long itemId;
    private Long candidateId;
    private String name;
    private String email;
    private String date;
    private String time;
    private String status;
    // moi them
    private String avatar;

    private String skill;
    private String experience;

}
