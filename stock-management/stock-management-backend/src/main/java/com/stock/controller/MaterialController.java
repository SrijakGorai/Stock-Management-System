package com.stock.controller;

import com.stock.model.MaterialTransaction;
import com.stock.model.MaterialIssue;
import com.stock.repository.MaterialIssueRepository;
import com.stock.repository.MaterialTransactionRepository;
import com.stock.service.MaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/materials")
public class MaterialController {

    @Autowired
    private MaterialService materialService;

    @Autowired
    private MaterialTransactionRepository transactionRepo;

    @Autowired
    private MaterialIssueRepository issueRepo;

    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<MaterialTransaction> addMaterial(@RequestBody MaterialTransaction materialTransaction) {
        MaterialTransaction saved = materialService.save(materialTransaction);
        return ResponseEntity.ok(saved);
    }

    @GetMapping
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity<List<MaterialTransaction>> getAllMaterials() {
        List<MaterialTransaction> materials = materialService.getAll();
        return ResponseEntity.ok(materials);
    }

    // ✅ NEW ENDPOINT: Remaining Materials
    @GetMapping("/remaining")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity<List<Map<String, Object>>> getRemainingMaterials() {
        List<MaterialTransaction> transactions = transactionRepo.findAll();
        List<MaterialIssue> issues = issueRepo.findAll();

        Map<String, Integer> addedMap = new HashMap<>();
        Map<String, Integer> issuedMap = new HashMap<>();
        Map<String, MaterialTransaction> detailMap = new HashMap<>();

        for (MaterialTransaction t : transactions) {
            String key = (t.getPurchaseNo() + "_" + t.getName()).toLowerCase().trim();
            addedMap.put(key, addedMap.getOrDefault(key, 0) + t.getQuantity());
            detailMap.putIfAbsent(key, t);
        }

        for (MaterialIssue i : issues) {
            String key = (i.getPurchaseNo() + "_" + i.getName()).toLowerCase().trim();
            issuedMap.put(key, issuedMap.getOrDefault(key, 0) + i.getQuantity());
        }

        List<Map<String, Object>> result = new ArrayList<>();

        for (String key : addedMap.keySet()) {
            int added = addedMap.get(key);
            int issued = issuedMap.getOrDefault(key, 0);
            int remaining = added - issued;

            MaterialTransaction t = detailMap.get(key);
            Map<String, Object> row = new HashMap<>();
            row.put("date", t.getDate());
            row.put("purchaseNo", t.getPurchaseNo());
            row.put("name", t.getName());
            row.put("unit", t.getUnit());
            row.put("note", t.getNote());
            row.put("added", added);
            row.put("issued", issued);
            row.put("remaining", remaining);

            result.add(row);
        }

        return ResponseEntity.ok(result);
    }
}