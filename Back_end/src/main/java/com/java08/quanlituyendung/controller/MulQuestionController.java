package com.java08.quanlituyendung.controller;


import com.java08.quanlituyendung.dto.ResponseObject;
import com.java08.quanlituyendung.dto.test.AddQuestionDTO;
import com.java08.quanlituyendung.dto.test.NewTestDTO;
import com.java08.quanlituyendung.dto.test.RecordRequestDTO;
import com.java08.quanlituyendung.service.IMulQuestionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/mul-test")
@Tag(name = "Multiple choice question test")
public class MulQuestionController {

    @Autowired
    private IMulQuestionService iMulQuestionService;


    @Operation(summary = "thêm bai test")
    @PostMapping("/new-test")
    public ResponseEntity<ResponseObject> newTest(Authentication authentication, @RequestBody NewTestDTO request) {
        return iMulQuestionService.newTest(authentication, request);
    }

    @Operation(summary = "get tests by job")
    @GetMapping("/{jdId}")
    public ResponseEntity<ResponseObject> getTestForJob(@PathVariable Long jdId, Authentication authentication) {
        return iMulQuestionService.getTestForJob(jdId, authentication);
    }

    @Operation(summary = "get job by user")
    @GetMapping("/my-test")
    public ResponseEntity<ResponseObject> getMyTest(Authentication authentication) {
        return iMulQuestionService.getMyTest(authentication);
    }
    @Operation(summary = "get job by user by id")
    @GetMapping("/a-test/{id}")
    public ResponseEntity<ResponseObject> getMyTest(@PathVariable Long id, Authentication authentication) {
        return iMulQuestionService.getMyTestID(authentication,id);
    }


    @Operation(summary = "thêm câu hỏi")
    @PostMapping("/add-question")
    public ResponseEntity<ResponseObject> addQuestion(Authentication authentication, @RequestBody AddQuestionDTO questionText) {
        return iMulQuestionService.addQuestion(authentication, questionText);
    }

    @Operation(summary = "xóa câu hỏi")
    @DeleteMapping("/del-question/{quesitonId}")
    public ResponseEntity<ResponseObject> delQuestion(Authentication authentication, @PathVariable Long quesitonId) {
        return iMulQuestionService.delQuestion(authentication, quesitonId);
    }


    @Operation(summary = "post a record")
    @PostMapping("/record")
    public ResponseEntity<ResponseObject> record(Authentication authentication, @RequestBody RecordRequestDTO request) {
        return iMulQuestionService.record(authentication, request);
    }

    @Operation(summary = "get record by userid and jobId")
    @GetMapping("/record/{jobId}")
    public ResponseEntity<ResponseObject> getRecordByUserAndTest(Authentication authentication, @PathVariable Long jobId) {
        return iMulQuestionService.getRecordByJobID(jobId );
    }

}
