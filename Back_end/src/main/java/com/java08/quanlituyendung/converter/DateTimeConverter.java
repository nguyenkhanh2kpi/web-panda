package com.java08.quanlituyendung.converter;

import org.springframework.stereotype.Component;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Component
public class DateTimeConverter {
    private final SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
    private final SimpleDateFormat timeFormat = new SimpleDateFormat("HH:mm");
    private final SimpleDateFormat finalFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");

    public String convertToStartTime(String date, String time) throws ParseException {
        Date dateObj = dateFormat.parse(date);
        String[] timeParts = time.split(" to ");
        Date startTimeObj = timeFormat.parse(timeParts[0]);
        Date startTime = combineDateAndTime(dateObj, startTimeObj);
        return finalFormat.format(startTime);
    }

    public String convertToEndTime(String date, String time) throws ParseException {
        Date dateObj = dateFormat.parse(date);
        String[] timeParts = time.split(" to ");
        Date endTimeObj = timeFormat.parse(timeParts[1]);
        Date endTime = combineDateAndTime(dateObj, endTimeObj);
        return finalFormat.format(endTime);
    }

    private Date combineDateAndTime(Date date, Date time) {
        return new Date(date.getYear(), date.getMonth(), date.getDate(),
                time.getHours(), time.getMinutes(), 0);
    }

}
