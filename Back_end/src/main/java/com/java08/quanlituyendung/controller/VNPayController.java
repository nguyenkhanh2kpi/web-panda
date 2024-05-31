package com.java08.quanlituyendung.controller;

import com.java08.quanlituyendung.config.VNPayConfig;
import com.java08.quanlituyendung.dto.ResponseObject;
import com.java08.quanlituyendung.dto.vip.BuyRequestDTO;
import com.java08.quanlituyendung.entity.vip.BillEntity;
import com.java08.quanlituyendung.service.BillService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.InetAddress;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@RequestMapping("/payment")
public class VNPayController {

    @Autowired
    BillService billService;

//    @PostMapping("/pay")
//    public ResponseEntity<ResponseObject> getPay(@RequestBody BuyRequestDTO request) throws UnsupportedEncodingException {
//        if (!billService.isPurchaseAllowed(request.getUserEmail(), request.getPackVipType())) {
//            return ResponseEntity.ok(ResponseObject.builder().data("/my-company/3").build());
//        } else {
//            BillEntity bill = billService.buildNewBill(request);
//            String vnp_Version = "2.1.0";
//            String vnp_Command = "pay";
//            String orderType = "other";
//            long amount = request.getPrice() * 100;
//            String bankCode = "VNBANK";
//
//            String vnp_TxnRef = VNPayConfig.getRandomNumber(8);
//            String vnp_IpAddr = "127.0.0.1";
//
//            String vnp_TmnCode = VNPayConfig.vnp_TmnCode;
//
//            Map<String, String> vnp_Params = new HashMap<>();
//            vnp_Params.put("vnp_Version", vnp_Version);
//            vnp_Params.put("vnp_Command", vnp_Command);
//            vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
//            vnp_Params.put("vnp_Amount", String.valueOf(amount));
//            vnp_Params.put("vnp_CurrCode", "VND");
//
////        vnp_Params.put("vnp_BankCode", bankCode);
//            vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
//            vnp_Params.put("vnp_OrderInfo", "Thanh toan don hang:" + vnp_TxnRef);
//            vnp_Params.put("vnp_OrderType", orderType);
//
//            vnp_Params.put("vnp_Locale", "vn");
//            vnp_Params.put("vnp_ReturnUrl", VNPayConfig.vnp_ReturnUrl + "?billId=" + bill.getId());
//            vnp_Params.put("vnp_IpAddr", vnp_IpAddr);
//
//            Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
//            SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
//            String vnp_CreateDate = formatter.format(cld.getTime());
//            vnp_Params.put("vnp_CreateDate", vnp_CreateDate);
//
//            cld.add(Calendar.MINUTE, 15);
//            String vnp_ExpireDate = formatter.format(cld.getTime());
//            vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);
//
//            List fieldNames = new ArrayList(vnp_Params.keySet());
//            Collections.sort(fieldNames);
//            StringBuilder hashData = new StringBuilder();
//            StringBuilder query = new StringBuilder();
//            Iterator itr = fieldNames.iterator();
//            while (itr.hasNext()) {
//                String fieldName = (String) itr.next();
//                String fieldValue = (String) vnp_Params.get(fieldName);
//                if ((fieldValue != null) && (fieldValue.length() > 0)) {
//                    //Build hash data
//                    hashData.append(fieldName);
//                    hashData.append('=');
//                    hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
//                    //Build query
//                    query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
//                    query.append('=');
//                    query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
//                    if (itr.hasNext()) {
//                        query.append('&');
//                        hashData.append('&');
//                    }
//                }
//            }
//            String queryUrl = query.toString();
//            String vnp_SecureHash = VNPayConfig.hmacSHA512(VNPayConfig.secretKey, hashData.toString());
//            queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
//            String paymentUrl = VNPayConfig.vnp_PayUrl + "?" + queryUrl;
//            return ResponseEntity.ok(ResponseObject.builder().data(paymentUrl).build());
//        }
//
//    }

    @PostMapping("/pay")
    public ResponseEntity<ResponseObject> getPay(@RequestBody BuyRequestDTO request) throws UnsupportedEncodingException {
        try {
            if (!billService.isPurchaseAllowed(request.getUserEmail(), request.getPackVipType())) {
                return ResponseEntity.ok(ResponseObject.builder().data("/my-company/3").build());
            } else {
                BillEntity bill = billService.buildNewBill(request);
                String vnp_Version = "2.1.0";
                String vnp_Command = "pay";
                String orderType = "other";
                long amount = request.getPrice() * 100;
                String bankCode = "VNBANK";

                String vnp_TxnRef = VNPayConfig.getRandomNumber(8);
                String vnp_IpAddr = InetAddress.getLocalHost().getHostAddress();

                String vnp_TmnCode = VNPayConfig.vnp_TmnCode;

                Map<String, String> vnp_Params = new HashMap<>();
                vnp_Params.put("vnp_Version", vnp_Version);
                vnp_Params.put("vnp_Command", vnp_Command);
                vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
                vnp_Params.put("vnp_Amount", String.valueOf(amount));
                vnp_Params.put("vnp_CurrCode", "VND");

                vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
                vnp_Params.put("vnp_OrderInfo", "Thanh toan don hang:" + vnp_TxnRef);
                vnp_Params.put("vnp_OrderType", orderType);

                vnp_Params.put("vnp_Locale", "vn");
                vnp_Params.put("vnp_ReturnUrl", VNPayConfig.vnp_ReturnUrl + "?billId=" + bill.getId());
                vnp_Params.put("vnp_IpAddr", vnp_IpAddr);

                Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
                SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
                String vnp_CreateDate = formatter.format(cld.getTime());
                vnp_Params.put("vnp_CreateDate", vnp_CreateDate);

                cld.add(Calendar.MINUTE, 15);
                String vnp_ExpireDate = formatter.format(cld.getTime());
                vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

                List<String> fieldNames = new ArrayList<>(vnp_Params.keySet());
                Collections.sort(fieldNames);
                StringBuilder hashData = new StringBuilder();
                StringBuilder query = new StringBuilder();
                for (String fieldName : fieldNames) {
                    String fieldValue = vnp_Params.get(fieldName);
                    if ((fieldValue != null) && (fieldValue.length() > 0)) {
                        // Build hash data
                        hashData.append(fieldName);
                        hashData.append('=');
                        hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                        // Build query
                        query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
                        query.append('=');
                        query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                        if (!fieldName.equals(fieldNames.get(fieldNames.size() - 1))) {
                            query.append('&');
                            hashData.append('&');
                        }
                    }
                }
                String queryUrl = query.toString();
                String vnp_SecureHash = VNPayConfig.hmacSHA512(VNPayConfig.secretKey, hashData.toString());
                queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
                String paymentUrl = VNPayConfig.vnp_PayUrl + "?" + queryUrl;
                return ResponseEntity.ok(ResponseObject.builder().data(paymentUrl).build());
            }
        } catch (Exception e) {
            // Log lỗi chi tiết
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ResponseObject.builder().data("Lỗi khi xử lý thanh toán").build());
        }
    }

    @GetMapping("/payment-callback")
    public void paymentCallback(@RequestParam Map<String, String> queryParams, HttpServletResponse response) throws IOException {
        String vnp_ResponseCode = queryParams.get("vnp_ResponseCode");
        String billId = queryParams.get("billId");
        if (billId != null && !billId.equals("")) {
            if ("00".equals(vnp_ResponseCode)) {
                BillEntity bill = billService.getBillById(Long.valueOf(billId));
                billService.payed(bill);
                response.sendRedirect("http://localhost:3000/my-company/3");
            } else {
                BillEntity bill = billService.getBillById(Long.valueOf(billId));
                billService.payFail(bill);
                response.sendRedirect("http://localhost:3000/my-company/3");
            }
        }
    }

}
