package com.java08.quanlituyendung.service.impl;

import com.java08.quanlituyendung.auth.UserAccountRetriever;
import com.java08.quanlituyendung.converter.SkillConverter;
import com.java08.quanlituyendung.dto.QuestionPayload.SkillRequestDTO;
import com.java08.quanlituyendung.dto.ResponseObject;
import com.java08.quanlituyendung.entity.Role;
import com.java08.quanlituyendung.entity.SkillEntity;
import com.java08.quanlituyendung.repository.SkillRepository;
import com.java08.quanlituyendung.service.ISkillService;
import com.java08.quanlituyendung.utils.Constant;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SkillServiceImpl implements ISkillService {

    @Autowired
    private final SkillRepository skillRepository;
    @Autowired
    private final SkillConverter skillConverter;
    @Autowired
    private final UserAccountRetriever userAccountRetriever;

    @Override
    public ResponseEntity<ResponseObject> create(SkillRequestDTO request, Authentication authentication) {
        try {
            if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
                if (request.getSkillName().equals("") || request.getSkillName() == null) {
                    return ResponseEntity.status(HttpStatus.OK).body(
                            ResponseObject.builder()
                                    .status(HttpStatus.BAD_REQUEST.toString())
                                    .message("Null Name")
                                    .build());
                }
                if (skillRepository.findSkillEntitiesBySkillName(request.getSkillName()).isPresent()) {
                    return ResponseEntity.ok(
                            ResponseObject.builder()
                                    .status(HttpStatus.CONFLICT.toString())
                                    .message(Constant.CONTENT_IS_EXIST)
                                    .build());
                }
                skillRepository.save(SkillEntity.builder()
                        .skillName(request.getSkillName())
                        .isDeleted(false)
                        .createdBy(authentication.getName())
                        .updateTime(LocalDateTime.now().atOffset(ZoneOffset.ofHours(7)).toLocalDateTime())
                        .build());
                return ResponseEntity.ok(
                        ResponseObject.builder()
                                .status(HttpStatus.OK.toString())
                                .message(Constant.SUCCESS)
                                .build());

            }
            return ResponseEntity.ok(
                    ResponseObject.builder()
                            .status(HttpStatus.FORBIDDEN.toString())
                            .message(Constant.CONTENT_IS_EXIST)
                            .build());
        } catch (Exception e) {
            return ResponseEntity.ok(
                    ResponseObject.builder()
                            .status(HttpStatus.INTERNAL_SERVER_ERROR.toString())
                            .message(e.getMessage())
                            .build());
        }
    }

    @Override
    public ResponseEntity<ResponseObject> update(Long id, SkillRequestDTO request, Authentication authentication) {
        try {
            if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
                if (skillRepository.findSkillEntitiesBySkillName(request.getSkillName()).isPresent()) {
                    return ResponseEntity.ok(
                            ResponseObject.builder()
                                    .status(HttpStatus.CONFLICT.toString())
                                    .message(Constant.CONTENT_IS_EXIST)
                                    .build());
                }
                if (request.getSkillName().equals("") || request.getSkillName() == null) {
                    return ResponseEntity.status(HttpStatus.OK).body(
                            ResponseObject.builder()
                                    .status(HttpStatus.BAD_REQUEST.toString())
                                    .message("Null Name")
                                    .build());
                }
                Optional<SkillEntity> skillEntityOptional = skillRepository.findById(id);
                if (skillEntityOptional.isPresent()) {
                    SkillEntity skillEntity = skillEntityOptional.get();
                    skillEntity.setSkillName(request.getSkillName());
                    skillEntity.setUpdateTime(LocalDateTime.now().atOffset(ZoneOffset.ofHours(7)).toLocalDateTime());
                    skillEntity.setCreatedBy(authentication.getName());
                    skillRepository.save(skillEntity);
                    return ResponseEntity.status(HttpStatus.OK).body(
                            ResponseObject.builder()
                                    .status(HttpStatus.OK.toString())
                                    .message(Constant.SUCCESS)
                                    .build());
                }
                return ResponseEntity.status(HttpStatus.OK).body(
                        ResponseObject.builder()
                                .status(HttpStatus.NOT_FOUND.toString())
                                .message(Constant.FAIL)
                                .build());
            }
            return ResponseEntity.status(HttpStatus.OK).body(
                    ResponseObject.builder()
                            .status(HttpStatus.FORBIDDEN.toString())
                            .message(Constant.NOT_AUTHENTICATED)
                            .build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    ResponseObject.builder()
                            .status(HttpStatus.INTERNAL_SERVER_ERROR.toString())
                            .message("Something went wrong!")
                            .build());
        }
    }

    @Override
    public ResponseEntity<ResponseObject> getAll(Authentication authentication) {
        var user = userAccountRetriever.getUserAccountEntityFromAuthentication(authentication);
        try {
            List<SkillEntity> skillEntities = skillRepository.findAll();
            if(user.getRole().equals(Role.INTERVIEWER)) {
                return ResponseEntity.status(HttpStatus.OK).body(
                        ResponseObject.builder()
                                .status(HttpStatus.OK.toString())
                                .message(Constant.SUCCESS)
                                .data(skillConverter.toSkillsDTOList(skillEntities.stream().filter(skillEntity -> {
                                    return skillEntity.getCreatedBy().equals(user.getEmail());
                                }).collect(Collectors.toList())))
                                .build());
            }
            return ResponseEntity.status(HttpStatus.OK).body(
                    ResponseObject.builder()
                            .status(HttpStatus.OK.toString())
                            .message(Constant.SUCCESS)
                            .data(skillConverter.toSkillsDTOList(skillEntities))
                            .build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    ResponseObject.builder()
                            .status(HttpStatus.INTERNAL_SERVER_ERROR.toString())
                            .message(Constant.NOT_AUTHENTICATED)
                            .build());
        }
    }

    @Override
    public ResponseEntity<ResponseObject> getById(Long id) {
        try {
            Optional<SkillEntity> skillEntities = skillRepository.findById(id);
            if (skillEntities.isPresent()) {
                return ResponseEntity.status(HttpStatus.OK).body(
                        ResponseObject.builder()
                                .status(HttpStatus.OK.toString())
                                .message(Constant.SUCCESS)
                                .data(skillConverter.toSkillDto(skillEntities.get()))
                                .build());
            }
            return ResponseEntity.status(HttpStatus.OK).body(
                    ResponseObject.builder()
                            .status(HttpStatus.INTERNAL_SERVER_ERROR.toString())
                            .message(Constant.NOT_AUTHENTICATED)
                            .build());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    ResponseObject.builder()
                            .status(HttpStatus.INTERNAL_SERVER_ERROR.toString())
                            .message(Constant.NOT_AUTHENTICATED)
                            .build());
        }
    }

    public ResponseEntity<ResponseObject> delete(Long id, Authentication authentication) {
        try {
            if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
                Optional<SkillEntity> skillEntityOptional = skillRepository.findById(id);
                if (skillEntityOptional.isPresent()) {
                    SkillEntity skillEntity = skillEntityOptional.get();
                    skillEntity.setIsDeleted(true);
                    skillRepository.save(skillEntity);
                    return ResponseEntity.status(HttpStatus.OK).body(
                            ResponseObject.builder()
                                    .status(HttpStatus.OK.toString())
                                    .message(Constant.SUCCESS)
                                    .build());
                }
                return ResponseEntity.status(HttpStatus.OK).body(
                        ResponseObject.builder()
                                .status(HttpStatus.NOT_FOUND.toString())
                                .message(Constant.FAIL)
                                .build());
            }
            return ResponseEntity.status(HttpStatus.OK).body(
                    ResponseObject.builder()
                            .status(HttpStatus.FORBIDDEN.toString())
                            .message(Constant.NOT_AUTHENTICATED)
                            .build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    ResponseObject.builder()
                            .status(HttpStatus.INTERNAL_SERVER_ERROR.toString())
                            .message(e.getMessage())
                            .build());
        }
    }


}
