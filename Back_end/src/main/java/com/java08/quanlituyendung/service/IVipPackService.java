package com.java08.quanlituyendung.service;

import com.java08.quanlituyendung.entity.vip.VipPackReccerEntity;

import java.util.List;
import java.util.Optional;

public interface IVipPackService {
    List<VipPackReccerEntity> findAll();
    Optional<VipPackReccerEntity> findById(Long id);
    VipPackReccerEntity save(VipPackReccerEntity vipPackReccerEntity);
    VipPackReccerEntity update(Long id, VipPackReccerEntity vipPackReccerEntity);
    void deleteById(Long id);
}
