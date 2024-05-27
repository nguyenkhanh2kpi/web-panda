package com.java08.quanlituyendung.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "Blacklist")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BlacklistEntity extends BaseEntity {
    @Column(name = "dateBlacklist")
    private LocalDateTime dateBlacklist;
    @Column(name = "description")
    private String description;
    @ManyToOne
    @JoinColumn(name = "accountId")
    @JsonIgnore
    private UserAccountEntity userAccountEntity;

}
