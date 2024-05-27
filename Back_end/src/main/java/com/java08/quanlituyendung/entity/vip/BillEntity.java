package com.java08.quanlituyendung.entity.vip;


import com.java08.quanlituyendung.utils.BillStatus;
import com.java08.quanlituyendung.utils.PackVipType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name = "bills")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class BillEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String email;
    private Boolean is_payed;
    private String pay_date;
    private PackVipType type;
    private String expired_at;
    private BillStatus status;
}
