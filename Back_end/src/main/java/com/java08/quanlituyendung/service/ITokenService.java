package com.java08.quanlituyendung.service;

import com.java08.quanlituyendung.entity.UserAccountEntity;



public interface ITokenService {

    public void saveUserToken(UserAccountEntity user, String jwtToken);

    public void revokeAllUserToken(UserAccountEntity user) ;

    public Boolean isTokenAlive(String token);

    public void saverResetPasswordToken(UserAccountEntity user, String jwtToken);


}
