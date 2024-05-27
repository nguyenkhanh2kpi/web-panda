
package com.java08.quanlituyendung.repository;

import com.java08.quanlituyendung.entity.PositionEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface PositionRepository extends JpaRepository<PositionEntity, Long> {

    Optional<PositionEntity> findById(long id);
    Optional<PositionEntity> findPositionEntitiesByPositionName(String name);

}
