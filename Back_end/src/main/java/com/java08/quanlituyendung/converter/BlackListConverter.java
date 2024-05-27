package com.java08.quanlituyendung.converter;


import com.java08.quanlituyendung.entity.BlacklistEntity;
import com.java08.quanlituyendung.entity.CVEntity;
import com.java08.quanlituyendung.entity.JobPostingEntity;
import com.java08.quanlituyendung.repository.CvRepository;
import org.json.simple.JSONObject;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class BlackListConverter {
    @Autowired
    private UserInfoConverter userInfoConverter;
    @Autowired
    private CvRepository cvRepository;
    @Autowired
    private JobPostingConverter jobPostingConverter;

    public JSONObject toDTO(BlacklistEntity blacklistEntity) throws ParseException {
        List<CVEntity> listCV = cvRepository.findAllByUserAccountEntityId(blacklistEntity.getUserAccountEntity().getUserInfo().getId());
        List<JSONObject> listJobPosting = new ArrayList<>();
        for (CVEntity cv : listCV) {
            JobPostingEntity jobPostingEntity = cv.getJobPostingEntity();
            JSONObject objJobPosting = jobPostingConverter.toJsonForUser(jobPostingEntity);
            listJobPosting.add(objJobPosting);
        }
        JSONObject obj = userInfoConverter.toJson(blacklistEntity.getUserAccountEntity().getUserInfo());
        obj.put("blackListId",blacklistEntity.getId());
        obj.put("email", blacklistEntity.getUserAccountEntity().getEmail());
        obj.put("status", blacklistEntity.getUserAccountEntity().getStatus());
        obj.put("reasonBlacklist", blacklistEntity.getDescription());
        obj.put("DateBlacklist", blacklistEntity.getDateBlacklist());
        obj.put("ListJobPosting", listJobPosting);
        return obj;
    }

    public List<JSONObject> toListBlackListDTO(List<BlacklistEntity> blacklistEntities) throws ParseException {
        List<JSONObject> jsonObjectList = new ArrayList<>();
        for(BlacklistEntity b : blacklistEntities){
            jsonObjectList.add(toDTO(b));
        }
        return jsonObjectList;
    }
}
