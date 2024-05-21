package com.java08.quanlituyendung.controller;

import com.java08.quanlituyendung.dto.ResponseObject;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.java08.quanlituyendung.service.IFileUploadService;

@RestController
@RequestMapping("/file")
@Tag(name = "File Upload")
public class FileUploadController {

    private final IFileUploadService fileUploadService;

    @Autowired
    public FileUploadController(IFileUploadService fileUploadService) {
        this.fileUploadService = fileUploadService;
    }

    @Operation(summary = "Sử dụng phương thức này để upload file lên firebase")
    @PostMapping("/upload")
    public ResponseEntity<ResponseObject> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            String fileUrl = fileUploadService.uploadFile(file);
            return ResponseEntity.status(HttpStatus.OK).body(
                    ResponseObject.builder()
                            .status(HttpStatus.OK.toString())
                            .message("upload file success!")
                            .data(fileUrl).build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    ResponseObject.builder()
                            .status(HttpStatus.INTERNAL_SERVER_ERROR.toString())
                            .message("upload file error!")
                            .data(null).build());
        }
    }
}