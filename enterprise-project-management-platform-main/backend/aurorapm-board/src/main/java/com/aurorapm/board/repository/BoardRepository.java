package com.aurorapm.board.repository;

import com.aurorapm.board.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface BoardRepository extends JpaRepository<Board, UUID> {
    List<Board> findByProjectId(UUID projectId);
    Optional<Board> findByProjectIdAndIsDefaultTrue(UUID projectId);
}
