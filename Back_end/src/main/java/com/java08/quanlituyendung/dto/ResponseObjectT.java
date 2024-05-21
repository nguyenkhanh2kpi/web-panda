package com.java08.quanlituyendung.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResponseObjectT<T>  {
    @ApiModelProperty(value = "Status message", example = "OK")
    private String status;
    @ApiModelProperty(value = "Message", example = "Success")
    private String message;
    @ApiModelProperty(value = "Data payload")
    private T data;
}
