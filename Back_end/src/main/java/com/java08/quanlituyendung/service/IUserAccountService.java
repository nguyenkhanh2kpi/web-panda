package com.java08.quanlituyendung.service;

import com.java08.quanlituyendung.dto.ChangePasswordDTO;
import com.java08.quanlituyendung.dto.ResetPasswordDTO;

public interface IUserAccountService {
    void resetPassword(ResetPasswordDTO resetPasswordDTO, String jwt);
    void changePassword(ChangePasswordDTO changePasswordDTO, String jwt);

}
