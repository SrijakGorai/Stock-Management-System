package com.stock.controller;

import com.stock.model.MaterialIssue;
import com.stock.model.MaterialTransaction;
import com.stock.repository.MaterialIssueRepository;
import com.stock.repository.MaterialTransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/issue")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class MaterialIssueController {

    private final MaterialIssueRepository issueRepo;
    private final MaterialTransactionRepository transactionRepo;

    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> issueMaterial(@RequestBody MaterialIssue issue) {
        String keyPurchaseNo = issue.getPurchaseNo();
        String keyName = issue.getName();

        int totalAdded = transactionRepo.findAll().stream()
                .filter(t -> t.getPurchaseNo().equalsIgnoreCase(keyPurchaseNo) && t.getName().equalsIgnoreCase(keyName))
                .mapToInt(MaterialTransaction::getQuantity)
                .sum();

        int totalIssued = issueRepo.findAll().stream()
                .filter(i -> i.getPurchaseNo().equalsIgnoreCase(keyPurchaseNo) && i.getName().equalsIgnoreCase(keyName))
                .mapToInt(MaterialIssue::getQuantity)
                .sum();

        int remaining = totalAdded - totalIssued;

        if (issue.getQuantity() > remaining) {
            return ResponseEntity.badRequest().body("Not enough material available to issue.");
        }

        MaterialIssue saved = issueRepo.save(issue);
        return ResponseEntity.ok(saved);
    }

    @GetMapping
    public ResponseEntity<List<MaterialIssue>> getAllIssues() {
        return ResponseEntity.ok(issueRepo.findAll());
    }
}
