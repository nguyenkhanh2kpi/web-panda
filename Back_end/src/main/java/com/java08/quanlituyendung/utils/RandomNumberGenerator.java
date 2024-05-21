package com.java08.quanlituyendung.utils;

import java.util.Random;

public class RandomNumberGenerator {
    public static String generateSixDigitNumber() {
        Random random = new Random();
        StringBuilder sb = new StringBuilder();

        for (int i = 0; i < 6; i++) {
            int digit = random.nextInt(10);
            sb.append(digit);
        }

        return sb.toString();
    }
}
