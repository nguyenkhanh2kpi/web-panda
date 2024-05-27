package com.java08.quanlituyendung.service.impl;

import com.java08.quanlituyendung.entity.Token;
import com.java08.quanlituyendung.entity.TokenType;
import com.java08.quanlituyendung.entity.UserAccountEntity;
import com.java08.quanlituyendung.repository.TokenRepository;
import com.java08.quanlituyendung.repository.UserAccountRepository;
import com.java08.quanlituyendung.service.ITokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class TokenServiceImpl implements ITokenService {
    private final UserAccountRepository userAccountRepository;
    private final TokenRepository tokenRepository;
    @Override
    public void saveUserToken(UserAccountEntity user, String jwtToken) {
        var token = Token.builder()
                .user(user)
                .token(jwtToken)
                .tokenType(TokenType.BEARER)
                .expired(false)
                .revoked(false)
                .build();
        tokenRepository.save(token);
    }
    @Override
    public void saverResetPasswordToken(UserAccountEntity user, String jwtToken) {
        var token = Token.builder()
                .user(user)
                .token(jwtToken)
                .tokenType(TokenType.RESET_PASSWORD)
                .expired(false)
                .revoked(false)
                .build();
        tokenRepository.save(token);
    }

    @Override
    public void revokeAllUserToken(UserAccountEntity user) {
        var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());
        if(validUserTokens.isEmpty()) {
            return;
        }
        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }

    @Override
    public Boolean isTokenAlive(String token) {
        Token t = tokenRepository.findByToken(token);
        return (tokenRepository.existsByToken(token) && !t.isRevoked() && !t.isExpired());
    }
}
