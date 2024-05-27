package com.java08.quanlituyendung.service.impl;

import com.java08.quanlituyendung.converter.PositionConverter;
import com.java08.quanlituyendung.dto.QuestionPayload.PositionDTORequest;
import com.java08.quanlituyendung.dto.ResponseObject;
import com.java08.quanlituyendung.entity.PositionEntity;
import com.java08.quanlituyendung.repository.PositionRepository;
import com.java08.quanlituyendung.service.IPositionService;
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

@Service
@RequiredArgsConstructor
public class PositionServiceImpl implements IPositionService {
    @Autowired
    private final PositionRepository positionRepository;

    @Autowired
    PositionConverter positionConverter;

    @Override
    public ResponseEntity<ResponseObject> create(PositionDTORequest request, Authentication authentication) {
        try {
            if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
                if (request.getName().equals("") || request.getName() == null) {
                    return ResponseEntity.status(HttpStatus.OK).body(
                            ResponseObject.builder()
                                    .status(HttpStatus.BAD_REQUEST.toString())
                                    .message("Null Name")
                                    .build());
                }
                if (positionRepository.findPositionEntitiesByPositionName(request.getName()).isPresent()) {
                    return ResponseEntity.status(HttpStatus.OK).body(
                            ResponseObject.builder()
                                    .status(HttpStatus.NOT_IMPLEMENTED.toString())
                                    .message(Constant.CONTENT_IS_EXIST)
                                    .build());
                }
                positionRepository.save(PositionEntity.builder()
                        .positionName(request.getName())
                        .isDeleted(false)
                        .createdBy(authentication.getName())
                        .updateTime(LocalDateTime.now().atOffset(ZoneOffset.ofHours(7)).toLocalDateTime())
                        .build());
                return ResponseEntity.status(HttpStatus.OK).body(
                        ResponseObject.builder()
                                .status(HttpStatus.OK.toString())
                                .message(Constant.SUCCESS)
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

    @Override
    public ResponseEntity<ResponseObject> update(PositionDTORequest request, Long id, Authentication authentication) {
        try {
            if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
                if (positionRepository.findPositionEntitiesByPositionName(request.getName()).isPresent()) {
                    return ResponseEntity.status(HttpStatus.OK).body(
                            ResponseObject.builder()
                                    .status(HttpStatus.NOT_IMPLEMENTED.toString())
                                    .message(Constant.CONTENT_IS_EXIST)
                                    .build());
                }
                if (request.getName().equals("") || request.getName() == null) {
                    return ResponseEntity.status(HttpStatus.OK).body(
                            ResponseObject.builder()
                                    .status(HttpStatus.BAD_REQUEST.toString())
                                    .message("Null Name")
                                    .build());
                }
                Optional<PositionEntity> positionEntityOptional = positionRepository.findById(id);
                if (positionEntityOptional.isPresent()) {
                    PositionEntity positionEntity = positionEntityOptional.get();
                    positionEntity.setPositionName(request.getName());
                    positionEntity.setUpdateTime(LocalDateTime.now().atOffset(ZoneOffset.ofHours(7)).toLocalDateTime());
                    positionEntity.setCreatedBy(authentication.getName());
                    positionRepository.save(positionEntity);
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

    public ResponseEntity<ResponseObject> delete(long id, Authentication authentication) {
        try {
            if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
                Optional<PositionEntity> positionEntityOptional = positionRepository.findById(id);
                if (positionEntityOptional.isPresent()) {
                    PositionEntity positionEntity = positionEntityOptional.get();
                    positionEntity.setIsDeleted(true);
                    positionRepository.save(positionEntity);
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

    @Override
    public ResponseEntity<ResponseObject> getAll() {
        try {
            List<PositionEntity> positionEntities = positionRepository.findAll();
            return ResponseEntity.status(HttpStatus.OK).body(
                    ResponseObject.builder()
                            .status(HttpStatus.OK.toString())
                            .message(Constant.SUCCESS)
                            .data(positionConverter.toListPositionDTO(positionEntities))
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
            Optional<PositionEntity> positionEntities = positionRepository.findById(id);
            if (positionEntities.isPresent()) {
                return ResponseEntity.status(HttpStatus.OK).body(
                        ResponseObject.builder()
                                .status(HttpStatus.OK.toString())
                                .message(Constant.SUCCESS)
                                .data(positionConverter.toPositionDTO(positionEntities.get()))
                                .build());
            }
            return ResponseEntity.status(HttpStatus.OK).body(
                    ResponseObject.builder()
                            .status(HttpStatus.INTERNAL_SERVER_ERROR.toString())
                            .message("Cannot find position")
                            .build());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    ResponseObject.builder()
                            .status(HttpStatus.INTERNAL_SERVER_ERROR.toString())
                            .message(Constant.NOT_AUTHENTICATED)
                            .build());
        }
    }

}
