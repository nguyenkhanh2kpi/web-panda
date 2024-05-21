package com.java08.quanlituyendung.service;

import com.java08.quanlituyendung.dto.BlackListPayload.BlackListAddRequestDTO;
import com.java08.quanlituyendung.dto.BlackListPayload.BlackListUpdateRequestDTO;
import com.java08.quanlituyendung.dto.ResponseObject;
import org.springframework.http.ResponseEntity;

public interface IBlackListService {
    ResponseEntity<ResponseObject> add(BlackListAddRequestDTO requestDTO);
    ResponseEntity<ResponseObject> update(BlackListUpdateRequestDTO requestDTO);
    ResponseEntity<ResponseObject> delete(Long[] id);
    ResponseEntity<ResponseObject> getAll();
    ResponseEntity<ResponseObject> getByBlackListId(Long id);
    ResponseEntity<ResponseObject> removeBlackList(Long id);
    ResponseEntity<ResponseObject> getBlackListByUserId(Long UserId);

}
