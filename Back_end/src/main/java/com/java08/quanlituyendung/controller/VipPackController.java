package com.java08.quanlituyendung.controller;


import com.java08.quanlituyendung.entity.vip.BillEntity;
import com.java08.quanlituyendung.entity.vip.VipPackReccerEntity;
import com.java08.quanlituyendung.service.BillService;
import com.java08.quanlituyendung.service.IVipPackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/vip-packs")
public class VipPackController {
    @Autowired
    private IVipPackService vipPackService;

    @Autowired
    private BillService billService;

    @GetMapping
    public List<VipPackReccerEntity> getAllVipPacks() {
        return vipPackService.findAll();
    }

    @GetMapping("/my-bills")
    public ResponseEntity<List<BillEntity>> getMyBill(Authentication authentication) {
        return ResponseEntity.ok(billService.getMyBills(authentication));
    }

    @GetMapping("/{id}")
    public ResponseEntity<VipPackReccerEntity> getVipPackById(@PathVariable Long id) {
        Optional<VipPackReccerEntity> vipPack = vipPackService.findById(id);
        if (vipPack.isPresent()) {
            return ResponseEntity.ok(vipPack.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public VipPackReccerEntity createVipPack(@RequestBody VipPackReccerEntity vipPackReccerEntity) {
        return vipPackService.save(vipPackReccerEntity);
    }

    @PutMapping("/{id}")
    public ResponseEntity<VipPackReccerEntity> updateVipPack(@PathVariable Long id, @RequestBody VipPackReccerEntity vipPackReccerEntity) {
        try {
            return ResponseEntity.ok(vipPackService.update(id, vipPackReccerEntity));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVipPack(@PathVariable Long id) {
        try {
            vipPackService.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
