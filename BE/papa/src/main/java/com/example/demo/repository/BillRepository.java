package com.example.demo.repository;

import com.example.demo.entity.Bill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BillRepository  extends CrudRepository<Bill,Integer> {
   // @Query("select b from Bill b where b.")
}
