package com.stock.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RemainingMaterialDTO {
    private String name;
    private int receivedQuantity;
    private int issuedQuantity;
    private int remainingQuantity;
}
