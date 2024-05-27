package com.java08.quanlituyendung.service;

import com.java08.quanlituyendung.dto.RegisterRequestDTO;
import com.java08.quanlituyendung.dto.ResponseObject;
import com.java08.quanlituyendung.dto.company.CompanyDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

public interface ICompanyService {
    ResponseEntity<ResponseObject> init(Authentication authentication);
    ResponseEntity<ResponseObject> getAllCompany();
    ResponseEntity<ResponseObject> getById(Long id);
    ResponseEntity<ResponseObject> update(CompanyDTO companyDTO, Authentication authentication);
    ResponseEntity<ResponseObject> getMyCompany(Authentication authentication);

    ResponseEntity<ResponseObject> registerReccer(RegisterRequestDTO request, Authentication authentication);
}
