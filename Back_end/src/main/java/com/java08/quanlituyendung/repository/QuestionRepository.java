package com.java08.quanlituyendung.repository;

import com.java08.quanlituyendung.entity.FieldEnum;
import com.java08.quanlituyendung.entity.QuestionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface QuestionRepository extends JpaRepository<QuestionEntity, Long> {
    Optional<QuestionEntity> findOneByIdAndIsDeletedFalse(long id);
    Optional<QuestionEntity> findOneById(long id);
    List<QuestionEntity> findAllByIsDeletedFalse();
    Optional<QuestionEntity> findQuestionEntitiesByQuestion(String name);
    Optional<List<QuestionEntity>> findAllByFieldAndIsDeletedFalse(FieldEnum fieldEnum);
    @Query("SELECT DISTINCT q FROM QuestionEntity q JOIN q.skills s WHERE s.id IN :sids AND q.isDeleted = false")
    List<QuestionEntity> findQuestionsContainedBySkills(@Param("sids") List<Long> skillIds);
}
