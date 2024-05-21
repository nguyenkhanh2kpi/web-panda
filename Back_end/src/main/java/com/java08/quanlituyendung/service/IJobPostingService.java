package com.java08.quanlituyendung.service;

import com.java08.quanlituyendung.dto.JobPostingDTO;
import com.java08.quanlituyendung.dto.ResponseObject;
import org.json.simple.parser.ParseException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

public interface IJobPostingService {
    ResponseEntity<ResponseObject> getAllJobPosting();
    ResponseEntity<ResponseObject> getDetailJobPosting(long id) throws ParseException;
    ResponseEntity<ResponseObject> save(JobPostingDTO jobPostingDTO, Authentication authentication);
    ResponseEntity<ResponseObject> delete(Long id);
    ResponseEntity<ResponseObject> getCompanyJobs(Long id);

    ResponseEntity<ResponseObject> getMyCandidate(Authentication authentication);
}
