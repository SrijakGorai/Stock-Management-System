package com.stock.controller;

import com.stock.dto.RemainingMaterialDTO;
import com.stock.model.MaterialTransaction;
import com.stock.model.MaterialIssue;
import com.stock.repository.MaterialTransactionRepository;
import com.stock.repository.MaterialIssueRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/remaining")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class RemainingMaterialController {

    private final MaterialTransactionRepository materialRepo;
    private final MaterialIssueRepository issueRepo;

    @GetMapping
    public ResponseEntity<List<RemainingMaterialDTO>> getRemainingMaterials() {
        Map<String, Integer> receivedMap = new HashMap<>();
        Map<String, Integer> issuedMap = new HashMap<>();

        materialRepo.findAll().forEach(m ->
            receivedMap.merge(m.getName(), m.getQuantity(), Integer::sum)
        );

        issueRepo.findAll().forEach(i ->
            issuedMap.merge(i.getName(), i.getQuantity(), Integer::sum)
        );

        Set<String> allMaterials = new HashSet<>();
        allMaterials.addAll(receivedMap.keySet());
        allMaterials.addAll(issuedMap.keySet());

        List<RemainingMaterialDTO> remainingList = new ArrayList<>();
        for (String name : allMaterials) {
            int received = receivedMap.getOrDefault(name, 0);
            int issued = issuedMap.getOrDefault(name, 0);
            int remaining = received - issued;
            remainingList.add(new RemainingMaterialDTO(name, received, issued, remaining));
        }

        return ResponseEntity.ok(remainingList);
    }
}
