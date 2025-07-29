package com.stock.repository;

import com.stock.model.MaterialTransaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MaterialTransactionRepository extends JpaRepository<MaterialTransaction, Long> {}
