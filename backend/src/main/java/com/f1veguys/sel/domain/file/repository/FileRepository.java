package com.f1veguys.sel.domain.file.repository;

import com.f1veguys.sel.domain.file.domain.File;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FileRepository extends JpaRepository<File,Integer> {


}
