package com.java08.quanlituyendung.dto.InterviewPayload;

import com.java08.quanlituyendung.dto.AbstractDTO;
import com.java08.quanlituyendung.dto.UserAccountPayload.UserAccountCustomResponseDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RoomResponseDTO extends AbstractDTO {
    private Long jobPostId;
    private String jobName;
    private String roomName;
    private String roomSkill;
    private String roomDescription;
    private String startDate;
    private String endDate;
    private String status;
    private String link;
    private List<UserAccountCustomResponseDTO> listInterviewer;
    private List<CandidateRoomItemDTO> listCandidate;
}
