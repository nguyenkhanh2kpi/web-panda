package com.java08.quanlituyendung.entity;

public enum Industry {
    IT_PHAN_MEM("IT - Phần mềm"),
    KE_TOAN_KIEM_TOAN("Kế toán / Kiểm toán"),
    LUAT("Luật"),
    BAO_HIEM("Bảo hiểm"),
    BAT_DONG_SAN("Bất động sản"),
    DUOC_PHAM_Y_TE_CONG_NGHE_SINH_HOC("Dược phẩm / Y tế / Công nghệ sinh học"),
    INTERNET_ONLINE("Internet / Online"),
    MARKETING_TRUYEN_THONG_QUANG_CAO("Marketing / Truyền thông / Quảng cáo"),
    NHA_HANG_KHACH_SAN("Nhà hàng / Khách sạn"),
    IN_AN_XUAT_BAN("In ấn / Xuất bản"),
    BAN_LE_HANG_TIEU_DUNG_FMCG("Bán lẻ - Hàng tiêu dùng - FMCG"),
    SAN_XUAT("Sản xuất"),
    CHUNG_KHOAN("Chứng khoán"),
    XAY_DUNG("Xây dựng"),
    NGAN_HANG("Ngân hàng"),
    NHAN_SU("Nhân sự"),
    THIET_KE_KIEN_TRUC("Thiết kế / Kiến trúc"),
    MOI_TRUONG("Môi trường"),
    XUAT_NHAP_KHAU("Xuất nhập khẩu"),
    BAO_TRI_SUA_CHUA("Bảo trì / Sửa chữa"),
    DIEN_TU_DIEN_LANH("Điện tử / Điện lạnh"),
    THOI_TRANG("Thời trang"),
    CO_KHI("Cơ khí"),
    TU_VAN("Tư vấn"),
    VIEN_THONG("Viễn thông"),
    GIAO_DUC_DAO_TAO("Giáo dục / Đào tạo"),
    THUONG_MAI_DIEN_TU("Thương mại điện tử"),
    LOGISTICS_VAN_TAI("Logistics - Vận tải"),
    TO_CHUC_PHI_LOI_NHUAN("Tổ chức phi lợi nhuận"),
    CO_QUAN_NHA_NUOC("Cơ quan nhà nước"),
    DU_LICH("Du lịch"),
    TU_DONG_HOA("Tự động hóa"),
    AGENCY_DESIGN_DEVELOPMENT("Agency (Design/Development)"),
    AGENCY_MARKETING_ADVERTISING("Agency (Marketing/Advertising)"),
    NANG_LUONG("Năng lượng"),
    GIAI_TRI("Giải trí"),
    IT_PHAN_CUNG("IT - Phần cứng"),
    NONG_LAM_NGU_NGHIEP("Nông Lâm Ngư nghiệp"),
    TAI_CHINH("Tài chính"),
    KHAC("Khác");

    private final String displayName;

    Industry(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }

    @Override
    public String toString() {
        return this.displayName;
    }
}
