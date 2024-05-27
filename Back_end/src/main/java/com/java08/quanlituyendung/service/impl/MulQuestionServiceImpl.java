package com.java08.quanlituyendung.service.impl;

import com.java08.quanlituyendung.auth.UserAccountRetriever;
import com.java08.quanlituyendung.converter.TestConverter;
import com.java08.quanlituyendung.dto.ResponseObject;
import com.java08.quanlituyendung.dto.test.AddQuestionDTO;
import com.java08.quanlituyendung.dto.test.NewTestDTO;
import com.java08.quanlituyendung.dto.test.RecordRequestDTO;
import com.java08.quanlituyendung.dto.test.TestResponseDTO;
import com.java08.quanlituyendung.entity.JobPostingEntity;
import com.java08.quanlituyendung.entity.Role;
import com.java08.quanlituyendung.entity.Test.MulQuestionEntity;
import com.java08.quanlituyendung.entity.Test.MulQuestionOptionEntity;
import com.java08.quanlituyendung.entity.Test.TestEntity;
import com.java08.quanlituyendung.entity.Test.TestRecordEntity;
import com.java08.quanlituyendung.entity.UserAccountEntity;
import com.java08.quanlituyendung.repository.*;
import com.java08.quanlituyendung.service.IMulQuestionService;
import com.java08.quanlituyendung.utils.Constant;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class MulQuestionServiceImpl implements IMulQuestionService {
    private UserAccountRetriever userAccountRetriever;
    private MulQuestionRepository mulQuestionRepository;
    private TestRepository testRepository;
    private JobPostingRepository jobPostingRepository;
    private TestConverter testConverter;
    private MulOptionRepository mulOptionRepository;

    private RecordRepository recordRepository;

    @Autowired
    public MulQuestionServiceImpl(UserAccountRetriever userAccountRetriever
            , MulQuestionRepository mulQuestionRepository
            , JobPostingRepository jobPostingRepository
            , TestConverter testConverter
            , MulOptionRepository mulOptionRepository
            , RecordRepository recordRepository
            , TestRepository testRepository) {
        this.userAccountRetriever = userAccountRetriever;
        this.mulQuestionRepository = mulQuestionRepository;
        this.testRepository = testRepository;
        this.jobPostingRepository = jobPostingRepository;
        this.testConverter = testConverter;
        this.mulOptionRepository = mulOptionRepository;
        this.recordRepository = recordRepository;
    }


    @Override
    public ResponseEntity<ResponseObject> getTestForJob(Long jdId, Authentication authentication) {
        List<TestEntity> tests = testRepository.findAllByJobPostingEntityId(jdId);

        List<TestResponseDTO> testDTOs = tests.stream()
                .map(testEntity -> testConverter.toDTO(testEntity))
                .collect(Collectors.toList());

        return ResponseEntity.ok(ResponseObject.builder()
                .status(HttpStatus.OK.toString())
                .data(testDTOs)
                .message(Constant.SUCCESS)
                .build());
    }

    @Override
    public ResponseEntity<ResponseObject> record(Authentication authentication, RecordRequestDTO request) {
        UserAccountEntity user = userAccountRetriever.getUserAccountEntityFromAuthentication(authentication);
        Optional<TestEntity> test = testRepository.findById(request.getTestId());
        if (user == null || test.isEmpty()) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ResponseObject.builder()
                            .status(Constant.FAIL)
                            .message("Failed: User not found or Test not found")
                            .build());
        } else {
            test.get().getRecords().add(testConverter.toRecordEntity(request, user, test.get()));
            testRepository.save(test.get());
            return ResponseEntity.status(HttpStatus.OK)
                    .body(ResponseObject.builder()
                            .status(HttpStatus.OK.toString())
                            .message(Constant.SUCCESS)
                            .data(test.get().getRecords())
                            .build());
        }
    }

    @Override
    public ResponseEntity<ResponseObject> getMyTest(Authentication authentication) {
        UserAccountEntity user = userAccountRetriever.getUserAccountEntityFromAuthentication(authentication);
        List<TestEntity> allTest = testRepository.findAll();
        List<TestResponseDTO> result = allTest.stream().filter(test -> {
            var attendees = test.getAttendees();
            return attendees.contains(user.getEmail());
        }).map((TestEntity testEntity) -> testConverter.toDTOcandidate(testEntity, user)).collect(Collectors.toList());
        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseObject.builder()
                        .status(HttpStatus.OK.toString())
                        .message(Constant.SUCCESS)
                        .data(result)
                        .build());
    }

    @Override
    public ResponseEntity<ResponseObject> getMyTestID(Authentication authentication, Long id) {
        if (id != null) {
            Optional<TestEntity> optionalTest = testRepository.findById(id);
            if (optionalTest.isPresent()) {
                TestEntity testEntity = optionalTest.get();
                UserAccountEntity user = userAccountRetriever.getUserAccountEntityFromAuthentication(authentication);
                TestResponseDTO testDTO = testConverter.toDTOcandidate(testEntity, user);
                return ResponseEntity.status(HttpStatus.OK)
                        .body(ResponseObject.builder()
                                .status(HttpStatus.OK.toString())
                                .message(Constant.SUCCESS)
                                .data(testDTO)
                                .build());
            } else {
                return ResponseEntity.status(HttpStatus.OK)
                        .body(ResponseObject.builder()
                                .status(HttpStatus.NOT_FOUND.toString())
                                .message("Test not found")
                                .build());
            }
        } else {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(ResponseObject.builder()
                            .status(HttpStatus.BAD_REQUEST.toString())
                            .message("ID parameter is required")
                            .build());
        }
    }


    @Override
    public ResponseEntity<ResponseObject> newTest(Authentication authentication, NewTestDTO request) {
        UserAccountEntity user = userAccountRetriever.getUserAccountEntityFromAuthentication(authentication);
        Optional<JobPostingEntity> job = jobPostingRepository.findById(request.getJdId());
        if (user.getRole() == Role.RECRUITER && job.isPresent()) {
            TestEntity test = testConverter.toEntity(request, job.get());
            return ResponseEntity.status(HttpStatus.OK)
                    .body(ResponseObject.builder()
                            .status(HttpStatus.CREATED.toString())
                            .data(testConverter.toDTO(testRepository.save(test)))
                            .message(Constant.SUCCESS)
                            .build());
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ResponseObject.builder()
                        .status(HttpStatus.INTERNAL_SERVER_ERROR.toString())
                        .message("You are not allow to create test")
                        .build());
    }


    @Override
    public ResponseEntity<ResponseObject> addQuestion(Authentication authentication, AddQuestionDTO request) {
        UserAccountEntity user = userAccountRetriever.getUserAccountEntityFromAuthentication(authentication);
        Optional<TestEntity> optionalTest = testRepository.findById(request.getTestId());

        if (user == null || optionalTest.isEmpty()) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ResponseObject.builder()
                            .status(Constant.FAIL)
                            .message("Failed to add question: User not found or Test not found")
                            .build());

        } else {
            MulQuestionEntity newQuestion = MulQuestionEntity.builder()
                    .questionText(request.getQuestionText())
                    .options(new ArrayList<>())
                    .build();

            for (var optionRequest : request.getOptions()) {
                MulQuestionOptionEntity optionItem = testConverter.optionToEntity(optionRequest, newQuestion);
                newQuestion.getOptions().add(optionItem);
            }

            TestEntity test = optionalTest.get();
            test.getMulQuestions().add(newQuestion);
            testRepository.save(test);
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(HttpStatus.OK.toString())
                    .data(test)
                    .message("Question added successfully")
                    .build());
        }
    }

    @Override
    public ResponseEntity<ResponseObject> delQuestion(Authentication authentication, Long id) {
        Optional<MulQuestionEntity> questionEntity = mulQuestionRepository.findById(id);
        if (questionEntity.isEmpty()) {
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(HttpStatus.NOT_FOUND.toString())
                    .data(id)
                    .message("Question not found")
                    .build());
        } else {
            mulQuestionRepository.delete(questionEntity.get());
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(HttpStatus.OK.toString())
                    .data("")
                    .message("Question del successfully")
                    .build());
        }
    }


    // theo jobId
    @Override
    public ResponseEntity<ResponseObject> getRecordByJobID(Long jobId) {
        List<TestRecordEntity> recordEntities = recordRepository.findAll();
        List<TestRecordEntity> response = recordEntities.stream().filter(r -> {
            return (r.getTestEntity().getJobPostingEntity().getId() == jobId);
        }).collect(Collectors.toList());
        return ResponseEntity.ok(ResponseObject.builder()
                .status(HttpStatus.OK.toString())
                .data(response)
                .message(Constant.SUCCESS)
                .build());
    }
}
