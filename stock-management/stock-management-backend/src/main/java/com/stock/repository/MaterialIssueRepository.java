package com.stock.repository;

import com.stock.model.MaterialIssue;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MaterialIssueRepository extends JpaRepository<MaterialIssue, Long> {
    List<MaterialIssue> findByName(String name);
}
