package com.stock.service;

import com.stock.model.MaterialTransaction;
import com.stock.model.MaterialIssue;
import com.stock.repository.MaterialTransactionRepository;
import com.stock.repository.MaterialIssueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MaterialService {

    @Autowired
    private MaterialTransactionRepository materialTransactionRepository;

    @Autowired
    private MaterialIssueRepository materialIssueRepository;

    public MaterialTransaction save(MaterialTransaction materialTransaction) {
        return materialTransactionRepository.save(materialTransaction);
    }

    public List<MaterialTransaction> getAll() {
        return materialTransactionRepository.findAll();
    }

    public int getRemainingQuantity(String purchaseNo, String name) {
        int totalAdded = materialTransactionRepository.findAll().stream()
                .filter(t -> t.getPurchaseNo().equalsIgnoreCase(purchaseNo) && t.getName().equalsIgnoreCase(name))
                .mapToInt(MaterialTransaction::getQuantity)
                .sum();

        int totalIssued = materialIssueRepository.findAll().stream()
                .filter(i -> i.getPurchaseNo().equalsIgnoreCase(purchaseNo) && i.getName().equalsIgnoreCase(name))
                .mapToInt(MaterialIssue::getQuantity)
                .sum();

        return totalAdded - totalIssued;
    }

    public boolean canIssueMaterial(String purchaseNo, String name, int quantityToIssue) {
        int remaining = getRemainingQuantity(purchaseNo, name);
        return quantityToIssue <= remaining;
    }
}
