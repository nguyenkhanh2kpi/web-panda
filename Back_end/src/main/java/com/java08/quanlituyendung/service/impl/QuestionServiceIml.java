package com.java08.quanlituyendung.service.impl;

import com.java08.quanlituyendung.converter.FieldConverter;
import com.java08.quanlituyendung.converter.QuestionConverter;
import com.java08.quanlituyendung.dto.QuestionPayload.QuestionRequestDTO;
import com.java08.quanlituyendung.dto.ResponseObject;
import com.java08.quanlituyendung.entity.FieldEnum;
import com.java08.quanlituyendung.entity.PositionEntity;
import com.java08.quanlituyendung.entity.QuestionEntity;
import com.java08.quanlituyendung.entity.SkillEntity;
import com.java08.quanlituyendung.repository.PositionRepository;
import com.java08.quanlituyendung.repository.QuestionRepository;
import com.java08.quanlituyendung.repository.SkillRepository;
import com.java08.quanlituyendung.service.IQuestionService;
import com.java08.quanlituyendung.utils.Constant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class QuestionServiceIml implements IQuestionService {
    @Autowired
    private QuestionRepository questionRepository;
    @Autowired
    private SkillRepository skillRepository;
    @Autowired
    private QuestionConverter questionConverter;
    @Autowired
    private PositionRepository positionRepository;

    @Autowired
    private FieldConverter fieldConverter;

    @Override
    public ResponseEntity<ResponseObject> create(QuestionRequestDTO request, Authentication authentication) {
        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
            Optional<QuestionEntity> questionEntityOptional =
                    questionRepository.findQuestionEntitiesByQuestion(request.getQuestion());
            if (questionEntityOptional.isPresent()) {
                return ResponseEntity.status(HttpStatus.OK).body(
                        ResponseObject.builder()
                                .status(HttpStatus.CONFLICT.toString())
                                .message(Constant.QUESTION_IS_EXISTED)
                                .build());
            }
            QuestionEntity question = QuestionEntity.builder()
                    .isDeleted(false)
                    .question(request.getQuestion())
                    .field(request.getFieldEnum())
                    .createdBy(authentication.getName())
                    .createTime(LocalDateTime.now())
                    .answer(request.getAnswer())
                    .build();

            List<PositionEntity> positionEntities = new ArrayList<>();
            for(Long pid: request.getPositionIds()){
                Optional<PositionEntity> positionEntityOptional = positionRepository.findById(pid);
                if(positionEntityOptional.isPresent())
                {

                    PositionEntity positionEntity = positionEntityOptional.get();
                    List<QuestionEntity> questionEntities= positionEntity.getQuestionEntities();
                    questionEntities.add(question);
                    positionEntity.setQuestionEntities(questionEntities);
                    positionEntities.add(positionEntity);
                }
            }


            List<SkillEntity> skillEntities = new ArrayList<>();

            for(Long sid: request.getSkillIds()){
                Optional<SkillEntity> skillEntityOptional = skillRepository.findById(sid);
                if(skillEntityOptional.isPresent())
                {
                    SkillEntity skillEntity = skillEntityOptional.get();
                    List<QuestionEntity> questionEntities= skillEntity.getQuestionEntities();
                    questionEntities.add(question);
                    skillEntity.setQuestionEntities(questionEntities);
                    skillEntities.add(skillEntity);
                }
            }
            questionRepository.save(question);
            skillRepository.saveAll(skillEntities);
            positionRepository.saveAll(positionEntities);
            return ResponseEntity.status(HttpStatus.OK).body(
                    ResponseObject.builder()
                            .status(HttpStatus.CREATED.toString())
                            .message(Constant.CREATE_QUESTION_SUCCESS)
                            .build());

        }
        return ResponseEntity.status(HttpStatus.OK).body(
            ResponseObject.builder()
                            .status(HttpStatus.INTERNAL_SERVER_ERROR.toString())
                            .message(Constant.FAIL)
                            .build());

    }


    public void init(QuestionRequestDTO request) {
            QuestionEntity question = QuestionEntity.builder()
                    .isDeleted(false)
                    .question(request.getQuestion())
                    .field(request.getFieldEnum())
                    .createdBy("admin@gmail.com")
                    .createTime(LocalDateTime.now())
                    .answer(request.getAnswer())
                    .build();

            List<PositionEntity> positionEntities = new ArrayList<>();
            for(Long pid: request.getPositionIds()){
                Optional<PositionEntity> positionEntityOptional = positionRepository.findById(pid);
                if(positionEntityOptional.isPresent())
                {

                    PositionEntity positionEntity = positionEntityOptional.get();
                    List<QuestionEntity> questionEntities= positionEntity.getQuestionEntities();
                    questionEntities.add(question);
                    positionEntity.setQuestionEntities(questionEntities);
                    positionEntities.add(positionEntity);
                }
            }


            List<SkillEntity> skillEntities = new ArrayList<>();

            for(Long sid: request.getSkillIds()){
                Optional<SkillEntity> skillEntityOptional = skillRepository.findById(sid);
                if(skillEntityOptional.isPresent())
                {
                    SkillEntity skillEntity = skillEntityOptional.get();
                    List<QuestionEntity> questionEntities= skillEntity.getQuestionEntities();
                    questionEntities.add(question);
                    skillEntity.setQuestionEntities(questionEntities);
                    skillEntities.add(skillEntity);
                }
            }
            questionRepository.save(question);
            skillRepository.saveAll(skillEntities);
            positionRepository.saveAll(positionEntities);
    }


    @Override
    public ResponseEntity<ResponseObject> update(QuestionRequestDTO request,Authentication authentication) {
        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
            Optional<QuestionEntity> questionEntityOptional =
                    questionRepository.findOneById(request.getId());
            if(questionEntityOptional.isPresent()){
                QuestionEntity question = questionEntityOptional.get();
                question.setQuestion(request.getQuestion());
                question.setField(request.getFieldEnum());
                question.setAnswer(request.getAnswer());
                question.setCreateTime(LocalDateTime.now());
                question.setCreatedBy(authentication.getName());
                List<PositionEntity> positionEntities = new ArrayList<>();
                for (PositionEntity p: question.getPositions()){
                    List<QuestionEntity> questionEntities= p.getQuestionEntities();
                    questionEntities.remove(question);
                    p.setQuestionEntities(questionEntities);
                    positionEntities.add(p);
                }
                for(Long pid: request.getPositionIds()){
                    Optional<PositionEntity> positionEntityOptional = positionRepository.findById(pid);
                    if(positionEntityOptional.isPresent())
                    {
                        PositionEntity positionEntity = positionEntityOptional.get();
                        List<QuestionEntity> questionEntities= positionEntity.getQuestionEntities();
                        questionEntities.add(question);
                        positionEntity.setQuestionEntities(questionEntities);
                        positionEntities.add(positionEntity);
                    }
                }


                List<SkillEntity> skillEntities = new ArrayList<>();
                for (SkillEntity s: question.getSkills()){
                    List<QuestionEntity> questionEntities= s.getQuestionEntities();
                    questionEntities.remove(question);
                    s.setQuestionEntities(questionEntities);
                    skillEntities.add(s);
                }
                for(Long sid: request.getSkillIds()){
                    Optional<SkillEntity> skillEntityOptional = skillRepository.findById(sid);
                    if(skillEntityOptional.isPresent())
                    {
                        SkillEntity skillEntity = skillEntityOptional.get();
                        List<QuestionEntity> questionEntities= skillEntity.getQuestionEntities();
                        questionEntities.add(question);
                        skillEntity.setQuestionEntities(questionEntities);
                        skillEntities.add(skillEntity);
                    }
                }
                questionRepository.save(question);
                skillRepository.saveAll(skillEntities);
                positionRepository.saveAll(positionEntities);
                return ResponseEntity.status(HttpStatus.OK).body(
                        ResponseObject.builder()
                                .status(HttpStatus.OK.toString())
                                .message(Constant.UPDATE_QUESTION_SUCCESS)
                                .build());
            }
            return ResponseEntity.status(HttpStatus.OK).body(
                    ResponseObject.builder()
                            .status(HttpStatus.NOT_FOUND.toString())
                            .message(Constant.QUESTION_NOT_FOUND)
                            .build());
        }
        return ResponseEntity.ok(
                ResponseObject.builder()
                        .status(HttpStatus.INTERNAL_SERVER_ERROR.toString())
                        .message(Constant.FAIL)
                        .build());

    }

    @Override
    public ResponseEntity<ResponseObject> delete(Long qId, Authentication authentication) {
        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
            Optional<QuestionEntity> questionEntityOptional = questionRepository.findById(qId);
            if (questionEntityOptional.isPresent()) {
                QuestionEntity questionEntity = questionEntityOptional.get();
                questionEntity.setIsDeleted(true);
                questionRepository.save(questionEntity);
                return ResponseEntity.status(HttpStatus.OK).body(
                        ResponseObject.builder()
                                .status(HttpStatus.OK.toString())
                                .message(Constant.SUCCESS)
                                .build());
            }
            return ResponseEntity.status(HttpStatus.OK).body(
                    ResponseObject.builder()
                            .status(HttpStatus.NOT_FOUND.toString())
                            .message(Constant.QUESTION_NOT_FOUND)
                            .build());
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                ResponseObject.builder()
                        .status(HttpStatus.INTERNAL_SERVER_ERROR.toString())
                        .message(Constant.FAIL)
                        .build());
    }


    @Override
    public ResponseEntity<ResponseObject> getAllByField(FieldEnum fieldEnum) {
        try{
                return ResponseEntity.status(HttpStatus.OK).body(
                        ResponseObject.builder()
                                .status(HttpStatus.CREATED.toString())
                                .message(Constant.SUCCESS)
                                .data(questionConverter.toListQuestionDTO(questionRepository.findAllByFieldAndIsDeletedFalse(fieldEnum).get()))
                                .build());
        }catch (Exception e){
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
        try{
            List<QuestionEntity> questionEntities = questionRepository.findAllByIsDeletedFalse();
            return ResponseEntity.status(HttpStatus.OK).body(
                    ResponseObject.builder()
                            .status(HttpStatus.OK.toString())
                            .message(Constant.SUCCESS)
                            .data(fieldConverter.toFieldDTOList(questionEntities))
                            .build());
        }catch (Exception e){
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.OK).body(
                    ResponseObject.builder()
                            .status(HttpStatus.INTERNAL_SERVER_ERROR.toString())
                            .message(Constant.FAIL)
                            .build());
        }

    }

    @Override
    public ResponseEntity<ResponseObject> getById(Long id) {
        try{
            Optional<QuestionEntity> questionEntityOptional = questionRepository.findOneByIdAndIsDeletedFalse(id);
            if(questionEntityOptional.isPresent()){
                return ResponseEntity.status(HttpStatus.OK).body(
                        ResponseObject.builder()
                                .status(HttpStatus.OK.toString())
                                .message(Constant.SUCCESS)
                                .data(questionConverter.toDTO(questionEntityOptional.get()))
                                .build());
            }
            return ResponseEntity.status(HttpStatus.OK).body(
                    ResponseObject.builder()
                            .status(HttpStatus.NOT_FOUND.toString())
                            .message(Constant.QUESTION_NOT_FOUND)
                            .build());
        }catch (Exception e){
             return ResponseEntity.status(HttpStatus.OK).body(
                    ResponseObject.builder()
                            .status(HttpStatus.INTERNAL_SERVER_ERROR.toString())
                            .message(Constant.FAIL)
                            .build());
        }
    }

    @Override
    public ResponseEntity<ResponseObject> getAllBySkills(Long[] sids) {
        try{
            List<QuestionEntity> questionEntities =
                    questionRepository.findQuestionsContainedBySkills(Arrays.stream(sids).toList());
            return ResponseEntity.status(HttpStatus.OK).body(
                    ResponseObject.builder()
                            .status(HttpStatus.OK.toString())
                            .message(Constant.SUCCESS)
                            .data(fieldConverter.toFieldDTOList(questionEntities))
                            .build());
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.OK).body(
                    ResponseObject.builder()
                            .status(HttpStatus.INTERNAL_SERVER_ERROR.toString())
                            .message(Constant.FAIL)
                            .build());
        }
    }

}
