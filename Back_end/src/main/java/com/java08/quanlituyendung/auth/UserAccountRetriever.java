package com.java08.quanlituyendung.auth;


import com.java08.quanlituyendung.entity.UserAccountEntity;
import com.java08.quanlituyendung.repository.UserAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class UserAccountRetriever {
    @Autowired
    private UserAccountRepository userAccountRepository;
    public UserAccountEntity getUserAccountEntityFromAuthentication(Authentication authentication) {
        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            Optional<UserAccountEntity> userAccount = userAccountRepository.findByEmail(userDetails.getUsername());
            if (userAccount.isPresent()) {
                return userAccount.get();
            }
        }
        return null;
    }

}
