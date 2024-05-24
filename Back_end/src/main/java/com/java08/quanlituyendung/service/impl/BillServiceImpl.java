package com.java08.quanlituyendung.service.impl;

import com.java08.quanlituyendung.auth.UserAccountRetriever;
import com.java08.quanlituyendung.dto.vip.BuyRequestDTO;
import com.java08.quanlituyendung.entity.UserAccountEntity;
import com.java08.quanlituyendung.entity.vip.BillEntity;
import com.java08.quanlituyendung.repository.BillRepository;
import com.java08.quanlituyendung.service.BillService;
import com.java08.quanlituyendung.utils.BillStatus;
import com.java08.quanlituyendung.utils.PackVipType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BillServiceImpl implements BillService {

    @Autowired
    private BillRepository billRepository;

    @Autowired
    private UserAccountRetriever userAccountRetriever;

    @Override
    public BillEntity saveBill(BillEntity bill) {
        return billRepository.save(bill);
    }

    @Override
    public List<BillEntity> getAllBills() {
        return billRepository.findAll();
    }

    @Override
    public BillEntity getBillById(Long id) {
        Optional<BillEntity> bill = billRepository.findById(id);
        return bill.orElse(null);
    }

    @Override
    public BillEntity updateBill(Long id, BillEntity billDetails) {
        BillEntity bill = getBillById(id);
        if (bill != null) {
            bill.setEmail(billDetails.getEmail());
            bill.setIs_payed(billDetails.getIs_payed());
            bill.setPay_date(billDetails.getPay_date());
            bill.setType(billDetails.getType());
            bill.setExpired_at(billDetails.getExpired_at());
            return billRepository.save(bill);
        }
        return null;
    }

    @Override
    public void deleteBill(Long id) {
        billRepository.deleteById(id);
    }

    @Override
    public BillEntity buildNewBill(BuyRequestDTO request) {
        BillEntity bill = BillEntity.builder()
                .email(request.getUserEmail())
                .is_payed(false)
                .pay_date(null)
                .type(request.getPackVipType())
                .expired_at(null)
                .status(BillStatus.CREATED)
                .build();
        return billRepository.save(bill);
    }

    @Override
    public BillEntity payed(BillEntity bill) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime now = LocalDateTime.now();
        bill.setIs_payed(true);
        bill.setPay_date(now.format(formatter));
        bill.setExpired_at(now.plusDays(7).format(formatter));
        bill.setStatus(BillStatus.SUCCESS);
        return billRepository.save(bill);
    }

    @Override
    public boolean isPurchaseAllowed(String email, PackVipType type) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String nowStr = LocalDateTime.now().format(formatter);

        List<BillEntity> bills = billRepository.findByEmailAndType(email, type);

        for (BillEntity bill : bills) {
            String expiredAt = bill.getExpired_at();
            if (expiredAt != null && expiredAt.compareTo(nowStr) > 0) {
                return false;
            }
        }
        return true;
    }
    @Override
    public BillEntity payFail(BillEntity bill) {
        bill.setIs_payed(false);
        bill.setStatus(BillStatus.FAIL);
        return billRepository.save(bill);
    }

    @Override
    public List<BillEntity> getMyBills(Authentication authentication) {
        UserAccountEntity user = userAccountRetriever.getUserAccountEntityFromAuthentication(authentication);
        List<BillEntity> bills =  billRepository.findAll().stream().filter(bill -> Objects.equals(bill.getEmail(), user.getEmail())).collect(Collectors.toList());
        return bills;
    }


}