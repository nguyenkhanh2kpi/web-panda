
package com.java08.quanlituyendung.repository;

import com.java08.quanlituyendung.entity.SkillEntity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface SkillRepository extends JpaRepository<SkillEntity, Long> {

    Optional<SkillEntity>findById(long id);

    Optional<SkillEntity> findSkillEntitiesBySkillName(String name);

}
