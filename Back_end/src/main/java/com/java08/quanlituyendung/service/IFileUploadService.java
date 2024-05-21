package com.java08.quanlituyendung.service;

import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

public interface  IFileUploadService {
    String uploadFile(MultipartFile file) throws IOException;
}
