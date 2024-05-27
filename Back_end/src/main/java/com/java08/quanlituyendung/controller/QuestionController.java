package com.java08.quanlituyendung.controller;

import com.java08.quanlituyendung.dto.QuestionPayload.QuestionRequestDTO;
import com.java08.quanlituyendung.dto.ResponseObject;
import com.java08.quanlituyendung.entity.FieldEnum;
import com.java08.quanlituyendung.service.IQuestionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping(value = "/question")
@Tag(name = "Question")
public class QuestionController {
    @Autowired
    private IQuestionService questionService;
    @Operation(summary = "Sử dụng phương thức này để tạo câu hỏi mới")
    @PostMapping
    public ResponseEntity<ResponseObject> create(@RequestBody QuestionRequestDTO request, Authentication authentication) {
        return questionService.create(request, authentication);
    }
    @Operation(summary = "Sử dụng phương thức này để xoá câu hỏi hiện có theo id")
    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseObject> delete(@PathVariable("id") Long id, Authentication authentication) {

        return questionService.delete(id, authentication);
    }
    @Operation(summary = "Sử dụng phương thức này để cập nhật câu hỏi hiện có")
    @PutMapping
    public ResponseEntity<ResponseObject> update(@RequestBody QuestionRequestDTO request, Authentication authentication) {

        return questionService.update(request, authentication);
    }
    @Operation(summary = "Sử dụng phương thức này lấy tất cả câu hỏi mới hiện có")
    @GetMapping
    public ResponseEntity<ResponseObject> getAll() {
        return  questionService.getAll();
    }
    @Operation(summary = "Sử dụng phương thức này để lấy câu hỏi theo id")
    @GetMapping("/{id}")
    public ResponseEntity<ResponseObject> getOneById(@PathVariable("id") Long id) {
        return  questionService.getById(id);
    }
    @Operation(summary = "Sử dụng phương thức này để lấy tất cả câu hỏi theo skill")
    @GetMapping("/skill")
    public ResponseEntity<ResponseObject> getAllBySkill(@RequestParam("skillIds") Long[] sids) {
        return questionService.getAllBySkills(sids);
    }
    @Operation(summary = "Sử dụng phương thức này để lấy tất cả câu hỏi theo field")
    @GetMapping("/field")
    public ResponseEntity<ResponseObject> getAllByField(@RequestParam("fieldName") FieldEnum field) {
        return questionService.getAllByField(field);
    }

}
