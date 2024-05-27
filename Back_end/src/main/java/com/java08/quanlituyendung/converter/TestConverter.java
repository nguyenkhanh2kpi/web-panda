package com.java08.quanlituyendung.converter;

import com.java08.quanlituyendung.dto.test.*;
import com.java08.quanlituyendung.entity.CVEntity;
import com.java08.quanlituyendung.entity.JobPostingEntity;
import com.java08.quanlituyendung.entity.Test.MulQuestionEntity;
import com.java08.quanlituyendung.entity.Test.MulQuestionOptionEntity;
import com.java08.quanlituyendung.entity.Test.TestEntity;
import com.java08.quanlituyendung.entity.Test.TestRecordEntity;
import com.java08.quanlituyendung.entity.UserAccountEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor

public class TestConverter {
    public TestResponseDTO toDTO(TestEntity testEntity) {
        List<MulQuestionResponseDTO> questions = new ArrayList<>();
        testEntity.getMulQuestions().forEach(question -> {
            questions.add(toMulQuestionDto(question));
        });
        TestResponseDTO testResponseDTO = new TestResponseDTO();
        testResponseDTO.setId(testEntity.getId());
        testResponseDTO.setJdId(testEntity.getJobPostingEntity().getId());
        testResponseDTO.setJob(testEntity.getJobPostingEntity().getName());
        testResponseDTO.setSummary(testEntity.getSummary());
        testResponseDTO.setStartTime(testEntity.getStartTime().toString());
        testResponseDTO.setEndTime(testEntity.getEndTime().toString());
        testResponseDTO.setQuestions(questions);
        testResponseDTO.setAttendees(testEntity.getAttendees());
        return testResponseDTO;
    }


    public OptionResponseDTO toOptionDto(MulQuestionOptionEntity option) {
        return OptionResponseDTO.builder()
                .id(option.getId())
                .optionText(option.getOptionText())
                .isAnswer(option.isAnswer())
                .build();
    }

    public MulQuestionResponseDTO toMulQuestionDto(MulQuestionEntity question) {
        List<OptionResponseDTO> options= new ArrayList<>();
        question.getOptions().forEach(option -> {
            options.add(toOptionDto(option));
        });

        return MulQuestionResponseDTO.builder()
                .id(question.getId())
                .questionText(question.getQuestionText())
                .options(options)
                .build();
    }

    public TestEntity toEntity(NewTestDTO request, JobPostingEntity job) {
        List<CVEntity> cvs = job.getCvEntities();
        List<String> attendees = cvs.stream().map(cvEntity -> {
            return cvEntity.getUserAccountEntity().getEmail();
        }).collect(Collectors.toList());
        return TestEntity.builder()
                .mulQuestions(new ArrayList<>())
                .jobPostingEntity(job)
                .summary(request.getSummary())
                .startTime(request.getStartTime())
                .endTime(request.getEndTime())
                .attendees(attendees)
                .build();
    }

    public MulQuestionOptionEntity optionToEntity(AddQuesitonOptionDTO dto,MulQuestionEntity question) {
        return MulQuestionOptionEntity.builder()
                .optionText(dto.getOptionText())
                .question(question)
                .isAnswer(dto.isAnswer())
                .build();
    }

    public TestRecordEntity toRecordEntity(RecordRequestDTO dto, UserAccountEntity user, TestEntity test) {
        return TestRecordEntity.builder()
                .record(dto.getRecord())
                .score(dto.getScore())
                .userAccountEntity(user)
                .testEntity(test)
                .build();
    }

// dung cho ung vien get
    public TestResponseDTO toDTOcandidate(TestEntity testEntity, UserAccountEntity user) {
        List<MulQuestionResponseDTO> questions = new ArrayList<>();
        testEntity.getMulQuestions().forEach(question -> {
            questions.add(toMulQuestionDto(question));
        });
        TestResponseDTO testResponseDTO = new TestResponseDTO();
        testResponseDTO.setId(testEntity.getId());
        testResponseDTO.setJdId(testEntity.getJobPostingEntity().getId());
        testResponseDTO.setJob(testEntity.getJobPostingEntity().getName());
        testResponseDTO.setSummary(testEntity.getSummary());
        testResponseDTO.setStartTime(testEntity.getStartTime().toString());
        testResponseDTO.setEndTime(testEntity.getEndTime().toString());
        testResponseDTO.setQuestions(questions);
        testResponseDTO.setAttendees(testEntity.getAttendees());
        List<TestRecordEntity> records = testEntity.getRecords();
        records.forEach(testRecordEntity -> {
            if(testRecordEntity.getUserAccountEntity().equals(user)) {
                testResponseDTO.setRecord(true);
            }
            else {
                testResponseDTO.setRecord(false);
            }
        });
        return testResponseDTO;
    }


}
