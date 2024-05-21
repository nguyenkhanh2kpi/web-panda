package com.java08.quanlituyendung.dto;

import com.java08.quanlituyendung.entity.JobPostingEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.json.simple.JSONObject;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JobPostingDTO {
    private Long id;
    private String name;
    private String position;
    private String language;
    private String location;
    private String salary;
    private String number;
    private String workingForm;
    private String sex;
    private String experience;
    private String detailLocation;
    private String detailJob;
    private String requirements;
    private String interest;
    private String image;
    private Boolean status;
    private List<JSONObject> listCandidate;
    private Integer user_id;
    private String createDate;

    private Boolean requireTest;
    private JobPostingEntity.State state;

    private String industry;
    private String industry2;
}
