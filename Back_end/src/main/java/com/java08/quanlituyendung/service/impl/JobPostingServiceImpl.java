package com.java08.quanlituyendung.service.impl;

import com.java08.quanlituyendung.auth.UserAccountRetriever;
import com.java08.quanlituyendung.converter.JobPostingConverter;
import com.java08.quanlituyendung.converter.UserInfoConverter;
import com.java08.quanlituyendung.dto.JobPostingDTO;
import com.java08.quanlituyendung.dto.ResponseObject;
import com.java08.quanlituyendung.dto.company.CandidateCompanyItemDTO;
import com.java08.quanlituyendung.entity.CVEntity;
import com.java08.quanlituyendung.entity.JobPostingEntity;
import com.java08.quanlituyendung.entity.UserAccountEntity;
import com.java08.quanlituyendung.entity.UserInfoEntity;
import com.java08.quanlituyendung.repository.*;
import com.java08.quanlituyendung.service.IJobPostingService;
import com.java08.quanlituyendung.utils.Constant;
import org.json.simple.JSONObject;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class JobPostingServiceImpl implements IJobPostingService {
    @Autowired
    UserAccountRepository userAccountRepository;
    @Autowired
    CompanyRepository companyRepository;
    @Autowired
    JobPostingConverter jobPostingConverter;
    @Autowired
    JobPostingRepository jobPostingRepository;
    @Autowired
    UserInfoRepository userInfoRepository;
    @Autowired
    CvRepository cvRepository;
    @Autowired
    UserInfoConverter userInfoConverter;
    @Autowired
    UserAccountRetriever userAccountRetriever;

    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

    @Override
    public ResponseEntity<ResponseObject> getAllJobPosting() {
        try {
            List<JobPostingEntity> listJobPostingEntity = jobPostingRepository.findAll();
            if (!listJobPostingEntity.isEmpty()) {
                List<JobPostingDTO> listJobPostingDTO = new ArrayList<>();
                for (JobPostingEntity jobPostingEntity : listJobPostingEntity) {
                    JobPostingDTO jobPostingDTO = jobPostingConverter.toDTO(jobPostingEntity);
                    listJobPostingDTO.add(jobPostingDTO);
                }
                return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.builder().status(HttpStatus.OK.toString()).message(Constant.SUCCESS).data(listJobPostingDTO).build());
            }
            return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.builder().status(HttpStatus.NOT_FOUND.toString()).message(Constant.JOBPOSTINGLIST_NOT_FOUND).build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.builder().status(HttpStatus.INTERNAL_SERVER_ERROR.toString()).message(Constant.FAIL).build());
        }
    }

    public ResponseEntity<ResponseObject> getDetailJobPosting(long id) throws ParseException {
        try {
            JobPostingEntity jobPostingEntity = jobPostingRepository.findOneById(id);
            if (jobPostingEntity == null) {
                return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.builder().status(HttpStatus.NOT_FOUND.toString()).message(Constant.JOBPOSTING_NOT_FOUND).build());
            }
            List<JSONObject> listCandidate = new ArrayList<>();
            List<CVEntity> listCV = cvRepository.findAllByJobPostingEntityId(id);
            for (CVEntity cv : listCV) {
                UserInfoEntity userInfoEntity = userInfoRepository.findOneById(cv.getUserAccountEntity().getId());
                JSONObject obj = userInfoConverter.toJson(userInfoEntity);
                obj.put("email", cv.getUserAccountEntity().getEmail());
                obj.put("cv_pdf", cv.getUrl());
                obj.put("status", userInfoEntity.getUserAccountInfo().getStatus());
                listCandidate.add(obj);
            }
            JobPostingDTO jobPostingDTO = jobPostingConverter.toDTO(jobPostingEntity);
            jobPostingDTO.setListCandidate(listCandidate);
            return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.builder().status(HttpStatus.OK.toString()).message(Constant.SUCCESS).data(jobPostingDTO).build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.builder().status(HttpStatus.INTERNAL_SERVER_ERROR.toString()).message(Constant.FAIL).build());
        }
    }

    public ResponseEntity<ResponseObject> save(JobPostingDTO jobPostingDTO, Authentication authentication) {
        try {
            UserAccountEntity user = userAccountRetriever.getUserAccountEntityFromAuthentication(authentication);
            JobPostingEntity jobPostingEntity = new JobPostingEntity();
            if (jobPostingDTO.getId() != null) {
                JobPostingEntity oldJobPostingEntity = jobPostingRepository.findOneById(jobPostingDTO.getId());
                if (oldJobPostingEntity == null) {
                    return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.builder().status(HttpStatus.NOT_FOUND.toString()).message(Constant.JOBPOSTING_NOT_FOUND).build());
                }
                jobPostingEntity = jobPostingConverter.toEntity(jobPostingDTO, oldJobPostingEntity);
                jobPostingEntity.setUpdateDate(sdf.format(Date.valueOf(LocalDate.now())));
            } else {
                jobPostingEntity = jobPostingConverter.toEntity(jobPostingDTO);
                jobPostingEntity.setUserAccountEntity(user);
                jobPostingEntity.setCreateDate(sdf.format(Date.valueOf(LocalDate.now())));
            }
            jobPostingEntity = jobPostingRepository.save(jobPostingEntity);
            jobPostingDTO = jobPostingConverter.toDTO(jobPostingEntity);

            return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.builder().status("OK").message(Constant.SUCCESS).data(jobPostingDTO).build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.builder().status(HttpStatus.INTERNAL_SERVER_ERROR.toString()).message(Constant.FAIL).build());
        }
    }

    public ResponseEntity<ResponseObject> delete(Long id) {
        try {
            JobPostingEntity jobPostingEntity = jobPostingRepository.findOneById(id);
            if (jobPostingEntity == null) {
                return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.builder().status(HttpStatus.NOT_FOUND.toString()).message(Constant.JOBPOSTING_NOT_FOUND).build());
            }
            jobPostingEntity.setStatus(false);
            jobPostingEntity.setState(JobPostingEntity.State.END);
            jobPostingRepository.save(jobPostingEntity);
            return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.builder().status(HttpStatus.OK.toString()).message(Constant.Delete_SUCCESS).build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.builder().status(HttpStatus.INTERNAL_SERVER_ERROR.toString()).message(Constant.FAIL).build());
        }
    }

    @Override
    public ResponseEntity<ResponseObject> getCompanyJobs(Long companyId) {
        var company = companyRepository.findById(companyId);

        if (company.isPresent()) {
            var user = userAccountRepository.findById(company.get().getUserId());
            if (user.isPresent()) {
                var jd = jobPostingRepository.findByUserAccountEntity(user.get());
                List<JobPostingDTO> list = jd.stream().map(jobPostingConverter::toDTO).collect(Collectors.toList());
                return ResponseEntity.status(HttpStatus.OK)
                        .body(ResponseObject.builder()
                                .status(HttpStatus.OK.toString())
                                .data(list)
                                .message(Constant.SUCCESS).build());
            }
        }
        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseObject.builder()
                        .status(HttpStatus.FORBIDDEN.toString())
                        .message(Constant.FAIL).build());
    }

    @Override
    public ResponseEntity<ResponseObject> getMyCandidate(Authentication authentication) {
        var user = userAccountRetriever.getUserAccountEntityFromAuthentication(authentication);
        if (user != null) {
            var jobs = jobPostingRepository.findByUserAccountEntity(user);
            List<CandidateCompanyItemDTO> response = jobPostingConverter.getListCandidateFromListJob(jobs);
            return ResponseEntity.ok(ResponseObject.builder()
                    .message("Success")
                    .status(HttpStatus.OK.toString())
                    .data(response)
                    .build());

        } else {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(ResponseObject.builder()
                            .status(HttpStatus.FORBIDDEN.toString())
                            .message(Constant.FAIL).build());
        }
    }

    @Override
    public ResponseEntity<ResponseObject> updateJobState(long id, String state) {
        Optional<JobPostingEntity> optionalJob = jobPostingRepository.findById(id);
        if (optionalJob.isPresent()) {
            JobPostingEntity job = optionalJob.get();
            try {
                job.setState(JobPostingEntity.State.valueOf(state.toUpperCase()));
                jobPostingRepository.save(job);
                return ResponseEntity.ok(ResponseObject.builder()
                        .message("Success")
                        .status(HttpStatus.OK.toString())
                        .data("")
                        .build());
            } catch (IllegalArgumentException e) {
                return ResponseEntity.status(HttpStatus.OK)
                        .body(ResponseObject.builder()
                                .status(HttpStatus.FORBIDDEN.toString())
                                .message(Constant.FAIL).build());
            }
        } else {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(ResponseObject.builder()
                            .status(HttpStatus.FORBIDDEN.toString())
                            .message(Constant.FAIL).build());
        }
    }

    @Override
    public ResponseEntity<ResponseObject> setJobVIPStatus(long id, boolean vipStatus, Authentication authentication) {
        try {
            var user = userAccountRetriever.getUserAccountEntityFromAuthentication(authentication);
            List<JobPostingEntity> userListJob = jobPostingRepository.findByUserAccountEntity(user);
            userListJob.forEach(jobPostingEntity -> {
                if (jobPostingEntity.getId() == id) {
                    jobPostingEntity.setIsVip(true);
                } else {
                    jobPostingEntity.setIsVip(false);
                }
                jobPostingRepository.save(jobPostingEntity);
            });
            return ResponseEntity.ok(ResponseObject.builder()
                    .message("Success")
                    .status(HttpStatus.OK.toString())
                    .data("")
                    .build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(ResponseObject.builder()
                            .status(HttpStatus.FORBIDDEN.toString())
                            .message(Constant.FAIL).build());
        }
    }

    @Override
    public ResponseEntity<ResponseObject> getMyJobs(Authentication authentication) {
        var user = userAccountRetriever.getUserAccountEntityFromAuthentication(authentication);
        try {
            List<JobPostingEntity> listJobPostingEntity = jobPostingRepository.findAll().stream().filter(jobPostingEntity -> jobPostingEntity
                    .getUserAccountEntity().equals(user)).collect(Collectors.toList());
            if (!listJobPostingEntity.isEmpty()) {
                List<JobPostingDTO> listJobPostingDTO = new ArrayList<>();
                for (JobPostingEntity jobPostingEntity : listJobPostingEntity) {
                    JobPostingDTO jobPostingDTO = jobPostingConverter.toDTO(jobPostingEntity);
                    listJobPostingDTO.add(jobPostingDTO);
                }
                return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.builder().status(HttpStatus.OK.toString()).message(Constant.SUCCESS).data(listJobPostingDTO).build());
            }
            return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.builder().status(HttpStatus.NOT_FOUND.toString()).message(Constant.JOBPOSTINGLIST_NOT_FOUND).build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.builder().status(HttpStatus.INTERNAL_SERVER_ERROR.toString()).message(Constant.FAIL).build());
        }
    }

}
