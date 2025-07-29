package com.stock.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MaterialIssue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate issueDate;   // ✅ Clearly named issue date

    private String purchaseNo;     // ✅ Add this field

    private String name;

    private int quantity;

    private String note;
}
