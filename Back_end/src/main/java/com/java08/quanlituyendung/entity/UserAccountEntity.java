package com.java08.quanlituyendung.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;

@Entity
@Table(name = "UserAccount")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserAccountEntity extends BaseEntity implements UserDetails {
    public enum State{
        UNAUTHENTICATED,
        ACTIVE,
        BANNED
    }


    @Column(name = "email")
    private String email;
    @Column(name = "username")
    private String username;
    @Column(name = "password")
    private String password;

    private Long reccerId;


    @Enumerated(EnumType.STRING)
    @Column(name="auth_provider")
    private AuthenticationProvider authenticationProvider;

    @Temporal(TemporalType.TIMESTAMP)
    LocalDateTime creationTime;

    @Column(name = "state")
    @Enumerated(EnumType.STRING)
    private State state;

    @Column(name = "role")
    @Enumerated(EnumType.STRING)
    private Role role;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private Status status;


    @OneToOne(mappedBy = "userAccountInfo", cascade = CascadeType.ALL)
    @JsonIgnore
    private UserInfoEntity userInfo;

    @OneToMany(mappedBy = "userAccountEntity", cascade = CascadeType.ALL, fetch=FetchType.EAGER)
    private List<BlacklistEntity> blackList;

    //Candidate
    @OneToMany(mappedBy = "userAccountEntity")
    @JsonIgnore
    private List<CVEntity> cvEntities = new ArrayList<>();

    @OneToMany(mappedBy = "userAccountEntity")
    @JsonIgnore
    private List<InterviewEntity> interviewEntities = new ArrayList<>();


    // lien ket toi buoi phong van
    //Interviewer
    @ManyToMany(mappedBy = "interviewers")
    @JsonIgnore
    private List<InterviewEntity> interviewEntityList = new ArrayList<>();

    //reccer
    @JsonIgnore
    @OneToMany(mappedBy = "userAccountEntity")
    private List<EventEntity> eventEntityList = new ArrayList<>();

    // co the la nguoi tao
    @OneToMany(mappedBy = "userAccountEntity")
    @JsonIgnore
    private List<JobPostingEntity> jobPostingEntities = new ArrayList<>();


    public AuthenticationProvider getAuthenticationProvider() {
        return authenticationProvider;
    }

    public void setAuthenticationProvider(AuthenticationProvider authenticationProvider) {
        this.authenticationProvider = authenticationProvider;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    public String getUsernameReal() {
        return username;
    }

    public void setState(State state) {
        this.state = state;
    }
}
