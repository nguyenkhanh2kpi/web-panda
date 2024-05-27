package com.java08.quanlituyendung.controller;


import com.java08.quanlituyendung.auth.AuthenticationService;
import com.java08.quanlituyendung.dto.AuthenticationResponseDTO;
import com.java08.quanlituyendung.dto.RegisterRequestDTO;
import com.java08.quanlituyendung.dto.ResponseObject;
import com.java08.quanlituyendung.dto.company.CompanyDTO;
import com.java08.quanlituyendung.entity.AuthenticationProvider;
import com.java08.quanlituyendung.entity.Role;
import com.java08.quanlituyendung.exception.CompanyException;
import com.java08.quanlituyendung.service.ICompanyService;
import com.java08.quanlituyendung.service.IJobPostingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("company")
@RequiredArgsConstructor
@Tag(name = "Company")
public class CompanyController {
    @Autowired
    ICompanyService iCompanyService;

    @Autowired
    IJobPostingService iJobPostingService;

    @Operation(summary = "Lấy tất cả thông tin công ty")
    @GetMapping("")
    public ResponseEntity<ResponseObject> getAllCompany() {
        return iCompanyService.getAllCompany();
    }

    @Operation(summary = "Lấy cty theo id")
    @GetMapping("/{id}")
    public ResponseEntity<ResponseObject> getById(@PathVariable Long id) {
        return iCompanyService.getById(id);
    }


    @Operation(summary = "Lấy jd của công ty")
    @GetMapping("/jobs/{companyId}")
    public ResponseEntity<ResponseObject> getCompanyJd(@PathVariable Long companyId) {
        return iJobPostingService.getCompanyJobs(companyId);
    }

    @Operation(summary = "Lấy danh sách các ứng viên theo công ty của tôi")
    @GetMapping("/my-candidate")
    public ResponseEntity<ResponseObject> getMyCandidate(Authentication authentication) {
        return iJobPostingService.getMyCandidate(authentication);
    }


    @Operation(summary = "Lấy cty cua toi")
    @GetMapping("/my-company")
    public ResponseEntity<ResponseObject> getMy(Authentication authentication) {
        return iCompanyService.getMyCompany(authentication);
    }

    @Operation(summary = "Init cong ty")
    @PostMapping("/init")
    public ResponseEntity<ResponseObject> getAllCompany(Authentication authentication) {
        return iCompanyService.init(authentication);
    }
    @Operation(summary = "Dang ki Reccer")
    @PostMapping("/register-reccer")
    public ResponseEntity<ResponseObject> registerReccer(@RequestBody RegisterRequestDTO request, Authentication authentication) {
        return iCompanyService.registerReccer(request, authentication);
    }

    @Operation(summary = "Cap nhat thong tin cong ty")
    @PostMapping("")
    public ResponseEntity<ResponseObject> update(@Valid @RequestBody CompanyDTO companyDTO, Authentication authentication) {
        try {
            return iCompanyService.update(companyDTO, authentication);
        } catch (CompanyException ex) {
            String errorMessage = "An error occurred while updating the company information: " + ex.getMessage();
            return ResponseEntity.internalServerError().body(ResponseObject.builder().message(errorMessage).build());
        }
    }






}
