package com.java08.quanlituyendung.service;

import com.java08.quanlituyendung.dto.vip.BuyRequestDTO;
import com.java08.quanlituyendung.entity.vip.BillEntity;
import com.java08.quanlituyendung.utils.PackVipType;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface BillService {
    BillEntity saveBill(BillEntity bill);
    List<BillEntity> getAllBills();
    BillEntity getBillById(Long id);
    BillEntity updateBill(Long id, BillEntity billDetails);
    void deleteBill(Long id);
    BillEntity buildNewBill(BuyRequestDTO request);
    BillEntity payed(BillEntity bill);

    boolean isPurchaseAllowed(String email, PackVipType type);

    BillEntity payFail(BillEntity bill);

    List<BillEntity> getMyBills(Authentication  authentication);

}
