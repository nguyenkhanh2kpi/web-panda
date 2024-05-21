
package com.java08.quanlituyendung.service.impl;

import com.java08.quanlituyendung.converter.BlackListConverter;
import com.java08.quanlituyendung.dto.BlackListPayload.BlackListAddRequestDTO;
import com.java08.quanlituyendung.dto.BlackListPayload.BlackListResponseDTO;
import com.java08.quanlituyendung.dto.BlackListPayload.BlackListUpdateRequestDTO;
import com.java08.quanlituyendung.dto.ResponseObject;
import com.java08.quanlituyendung.entity.BlacklistEntity;
import com.java08.quanlituyendung.entity.Status;
import com.java08.quanlituyendung.entity.UserAccountEntity;
import com.java08.quanlituyendung.repository.BlackListRepository;
import com.java08.quanlituyendung.repository.UserAccountRepository;
import com.java08.quanlituyendung.service.IBlackListService;
import com.java08.quanlituyendung.utils.Constant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class BlackListServiceImpl implements IBlackListService {
    @Autowired
    private BlackListConverter blackListConverter;
    @Autowired
    private UserAccountRepository userAccountRepository;
    @Autowired
    private BlackListRepository blackListRepository;

    @Override
    public ResponseEntity<ResponseObject> add(BlackListAddRequestDTO requestDTO) {
        try {
            Optional<UserAccountEntity> userAccountEntityOptional = userAccountRepository.findById(requestDTO.getUserId());
            if (userAccountEntityOptional.isPresent()) {
                UserAccountEntity userAccountEntity = userAccountEntityOptional.get();
                userAccountEntity.setStatus(Status.BLACKLIST);
                userAccountRepository.save(userAccountEntity);

                BlacklistEntity blacklistEntity = BlacklistEntity.builder()
                        .userAccountEntity(userAccountEntity)
                        .description(requestDTO.getDescription())
                        .dateBlacklist(LocalDateTime.now())
                        .build();

                blackListRepository.save(blacklistEntity);
                return ResponseEntity.status(HttpStatus.OK).body(
                        ResponseObject.builder()
                                .status(HttpStatus.CREATED.toString())
                                .message(Constant.ADD_BLACKLIST_SUCCESS)
                                .build());
            }
            return ResponseEntity.status(HttpStatus.OK).body(
                    ResponseObject.builder()
                            .status(HttpStatus.NOT_FOUND.toString())
                            .message(Constant.ACCOUNT_NOT_FOUND)
                            .build());
        }catch (Exception e){
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.OK).body(
                    ResponseObject.builder()
                            .status(HttpStatus.INTERNAL_SERVER_ERROR.toString())
                            .message(Constant.NOT_AUTHENTICATED)
                            .build());
        }
    }

    @Override
    public ResponseEntity<ResponseObject> update(BlackListUpdateRequestDTO requestDTO) {
        try {
            Optional<BlacklistEntity> blacklistEntityOptional = blackListRepository.findById(requestDTO.getBlacklistId());
            if (blacklistEntityOptional.isPresent()) {
                BlacklistEntity blacklistEntity = blacklistEntityOptional.get();
                blacklistEntity.setDescription(requestDTO.getDescription());
                blacklistEntity.setDateBlacklist(LocalDateTime.now());
                blackListRepository.save(blacklistEntity);
                return ResponseEntity.status(HttpStatus.OK).body(
                        ResponseObject.builder()
                                .status(HttpStatus.OK.toString())
                                .message(Constant.UPDATE_BLACKLIST_SUCCESS)
                                .build());
            }
            return ResponseEntity.status(HttpStatus.OK).body(
                    ResponseObject.builder()
                            .status(HttpStatus.NOT_FOUND.toString())
                            .message(Constant.BLACKLIST_NOT_FOUND)
                            .build());
        }
        catch (Exception e){
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.OK).body(
                    ResponseObject.builder()
                            .status(HttpStatus.INTERNAL_SERVER_ERROR.toString())
                            .message(Constant.FAIL)
                            .build());
        }
    }

    @Override
    public ResponseEntity<ResponseObject> delete(Long[] blacklistId) {
        try {
                blackListRepository.deleteAllById(Arrays.asList(blacklistId));
                return ResponseEntity.status(HttpStatus.OK).body(
                        ResponseObject.builder()
                                .status(HttpStatus.OK.toString())
                                .message(Constant.DELETE_BLACKLIST_SUCCESS)
                                .build());
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.OK).body(
                    ResponseObject.builder()
                            .status(HttpStatus.INTERNAL_SERVER_ERROR.toString())
                            .message(Constant.FAIL)
                            .build());
        }
    }


    @Override
    public ResponseEntity<ResponseObject> getAll() {
        try {
            List<BlacklistEntity> blacklistEntities = blackListRepository.findAllByUserAccountEntityStatus(Status.BLACKLIST);
            List<BlacklistEntity> blacklistEntitiesResult = new ArrayList<>();
            for(BlacklistEntity b: blacklistEntities) {
                UserAccountEntity userAccountEntity = b.getUserAccountEntity();
                BlacklistEntity blacklistEntity = blackListRepository.findFirstByUserAccountEntityOrderByDateBlacklistDesc(userAccountEntity);
                if(!blacklistEntitiesResult.contains(blacklistEntity)){
                    blacklistEntitiesResult.add(blacklistEntity);
                }
            }
            if (!blacklistEntities.isEmpty()){
                return ResponseEntity.status(HttpStatus.OK).body(
                        ResponseObject.builder()
                                .status(HttpStatus.OK.toString())
                                .message(Constant.SUCCESS)
                                .data(blackListConverter.toListBlackListDTO(blacklistEntitiesResult))
                                .build());
            }
            return ResponseEntity.status(HttpStatus.OK).body(
                    ResponseObject.builder()
                            .status(HttpStatus.NOT_FOUND.toString())
                            .message(Constant.BLACKLIST_NOT_FOUND)
                            .build());
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.OK).body(
                    ResponseObject.builder()
                            .status(HttpStatus.INTERNAL_SERVER_ERROR.toString())
                            .message(Constant.FAIL)
                            .build());
        }
    }

    @Override
    public ResponseEntity<ResponseObject> getByBlackListId(Long blacklistId) {
        try {
            List<BlacklistEntity> blacklistEntities= blackListRepository.findAllById(blacklistId);
                if (!blacklistEntities.isEmpty()){
                    return ResponseEntity.status(HttpStatus.OK).body(
                            ResponseObject.builder()
                                    .status(HttpStatus.OK.toString())
                                    .message(Constant.SUCCESS)
                                    .data(blackListConverter.toListBlackListDTO(blacklistEntities))
                                    .build());
                }
                return ResponseEntity.status(HttpStatus.OK).body(
                        ResponseObject.builder()
                                .status(HttpStatus.NOT_FOUND.toString())
                                .message(Constant.BLACKLIST_ID_NOT_FOUND)
                                .build());

        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.OK).body(
                    ResponseObject.builder()
                            .status(HttpStatus.INTERNAL_SERVER_ERROR.toString())
                            .message(Constant.FAIL)
                            .build());
        }
    }

    @Override
    public ResponseEntity<ResponseObject> removeBlackList(Long id) {
        try {
            Optional<UserAccountEntity> userAccountEntityOptional = userAccountRepository.findById(id);
            if (userAccountEntityOptional.isPresent()) {
                UserAccountEntity userAccountEntity = userAccountEntityOptional.get();
                userAccountEntity.setStatus(Status.INPROCESS);
                userAccountRepository.save(userAccountEntity);
                return ResponseEntity.status(HttpStatus.OK).body(
                        ResponseObject.builder()
                                .status(HttpStatus.OK.toString())
                                .message(Constant.REMOVE_BLACKLIST_SUCCESS)
                                .build());
            }
            return ResponseEntity.status(HttpStatus.OK).body(
                    ResponseObject.builder()
                            .status(HttpStatus.NOT_FOUND.toString())
                            .message(Constant.BLACKLIST_NOT_FOUND)
                            .build());
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.OK).body(
                    ResponseObject.builder()
                            .status(HttpStatus.INTERNAL_SERVER_ERROR.toString())
                            .message(Constant.FAIL)
                            .build());
        }
    }

    @Override
    public ResponseEntity<ResponseObject> getBlackListByUserId(Long userId) {
        try {
            List<BlacklistEntity> blacklistEntities= blackListRepository.findAllByUserAccountEntityId(userId);
            if (!blacklistEntities.isEmpty()){
                List<BlackListResponseDTO> blackListResponseDTOList = new ArrayList<>();
                for(BlacklistEntity blacklistEntity: blacklistEntities){
                    BlackListResponseDTO blackListResponseDTO =
                            BlackListResponseDTO.builder()
                                    .id(blacklistEntity.getId())
                                    .date(blacklistEntity.getDateBlacklist())
                                    .reasonBlacklist(blacklistEntity.getDescription()).build();
                    blackListResponseDTOList.add(blackListResponseDTO);
                }
                return ResponseEntity.status(HttpStatus.OK).body(
                        ResponseObject.builder()
                                .status(HttpStatus.OK.toString())
                                .message(Constant.SUCCESS)
                                .data(blackListResponseDTOList)
                                .build());
            }
            return ResponseEntity.status(HttpStatus.OK).body(
                    ResponseObject.builder()
                            .status(HttpStatus.NOT_FOUND.toString())
                            .message(Constant.BLACKLIST_NOT_FOUND)
                            .build());
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.OK).body(
                    ResponseObject.builder()
                            .status(HttpStatus.INTERNAL_SERVER_ERROR.toString())
                            .message(Constant.FAIL)
                            .build());
        }
    }
}