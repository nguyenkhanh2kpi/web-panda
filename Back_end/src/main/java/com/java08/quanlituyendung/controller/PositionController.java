package com.java08.quanlituyendung.controller;

import com.java08.quanlituyendung.dto.*;
import com.java08.quanlituyendung.dto.QuestionPayload.PositionDTORequest;
import com.java08.quanlituyendung.service.IPositionService;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/position")
@RequiredArgsConstructor
@Tag(name = "Position")
public class PositionController {

    @Autowired
    private final IPositionService positionService;

    @Operation(summary = "Tạo Position mới")
    @PostMapping
    public ResponseEntity<ResponseObject> createPosition(@RequestBody PositionDTORequest request, Authentication authentication) {
        return positionService.create(request, authentication);
    }

    @Operation(summary = "Lấy tất cả Position trong database")
    @GetMapping
    public ResponseEntity<ResponseObject> getAll() {
        return positionService.getAll();
    }

    @Operation(summary = "Lấy Position theo ID")
    @GetMapping("/{id}")
    public ResponseEntity<ResponseObject> getByID(@PathVariable Long id) {
        return positionService.getById(id);
    }


    @Operation(summary = "Xóa  Position thông qua ID")
    @DeleteMapping(value = "/{id}")
    public ResponseEntity<ResponseObject> deletePosition(@PathVariable long id, Authentication authentication) {
        return positionService.delete(id, authentication);
    }

    @Operation(summary = "Cập nhật thông tin Position thông qua ID")
    @PutMapping(value = "/{id}")
    public ResponseEntity<ResponseObject> updatePosition(@RequestBody PositionDTORequest request, @PathVariable long id, Authentication authentication) {
        return positionService.update(request, id, authentication);
    }
}
