package com.java08.quanlituyendung.controller;


import com.java08.quanlituyendung.dto.BlackListPayload.BlackListAddRequestDTO;
import com.java08.quanlituyendung.dto.BlackListPayload.BlackListUpdateRequestDTO;
import com.java08.quanlituyendung.dto.ResponseObject;
import com.java08.quanlituyendung.service.IBlackListService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping(value = "/blacklist")
@RequiredArgsConstructor
@Tag(name = "Black List")
public class BlackListController {


    private final IBlackListService blackListService;
    @Operation(summary = "Sử dụng phương thức này để thêm 1 account vào danh sách blacklist")

    @PostMapping
    public ResponseEntity<ResponseObject> addBlackList(@RequestBody BlackListAddRequestDTO request) {
        return blackListService.add(request);
    }
    @Operation(summary = "Sử dụng phương thức này để đưa account ra khỏi danh sách blacklist")
    @PostMapping({"/remove/{userId}"})
    public ResponseEntity<ResponseObject> removeBlackList(@PathVariable("userId") Long userId) {
        return blackListService.removeBlackList(userId);
    }
    @Operation(summary = "Sử dụng phương thức này để cập nhật mô tả của một blacklist")
    @PutMapping
    public ResponseEntity<ResponseObject> updateBlackList(@RequestBody BlackListUpdateRequestDTO request) {
        return blackListService.update(request);
    }
    @Operation(summary = "Sử dụng phương thức này để lấy 1 blacklist cụ thể theo id")
    @GetMapping("/{blackListId}")
    public ResponseEntity<ResponseObject> getByBlackListId(@PathVariable("blackListId") Long blackListId) {
        return  blackListService.getByBlackListId(blackListId);
    }
    @Operation(summary = "Sử dụng phương thức này để lấy toàn bộ danh sách blacklist")
    @GetMapping
    public ResponseEntity<ResponseObject> getAllBlackList() {
        return  blackListService.getAll();
    }


    @Operation(summary = "Sử dụng phương thức này để lấy lịch sử blacklist theo userId")
    @GetMapping("/history/{userId}")
    public ResponseEntity<ResponseObject> getBlackListByUserId(@PathVariable("userId") Long userId) {
        return  blackListService.getBlackListByUserId(userId);
    }

}
