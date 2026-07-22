package com.aurorapm.board.service;

import com.aurorapm.board.dto.BoardColumnDto;
import com.aurorapm.board.dto.BoardDto;
import com.aurorapm.board.entity.Board;
import com.aurorapm.board.entity.BoardColumn;
import com.aurorapm.board.repository.BoardColumnRepository;
import com.aurorapm.board.repository.BoardRepository;
import com.aurorapm.common.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;
    private final BoardColumnRepository boardColumnRepository;

    @Transactional(readOnly = true)
    public BoardDto getBoardByProject(UUID projectId) {
        Board board = boardRepository.findByProjectIdAndIsDefaultTrue(projectId)
                .orElseGet(() -> createDefaultBoard(projectId));
        return toDto(board);
    }

    @Transactional
    public Board createDefaultBoard(UUID projectId) {
        Board board = Board.builder()
                .projectId(projectId)
                .name("Kanban Board")
                .isDefault(true)
                .build();
        Board savedBoard = boardRepository.save(board);

        List<BoardColumn> defaultColumns = List.of(
                BoardColumn.builder().boardId(savedBoard.getId()).name("To Do").position(0).category("TODO").build(),
                BoardColumn.builder().boardId(savedBoard.getId()).name("In Progress").position(1).category("IN_PROGRESS").build(),
                BoardColumn.builder().boardId(savedBoard.getId()).name("In Review").position(2).category("IN_REVIEW").build(),
                BoardColumn.builder().boardId(savedBoard.getId()).name("Done").position(3).category("DONE").build()
        );
        boardColumnRepository.saveAll(defaultColumns);

        return savedBoard;
    }

    public BoardDto toDto(Board board) {
        List<BoardColumnDto> columns = boardColumnRepository.findByBoardIdOrderByPositionAsc(board.getId())
                .stream()
                .map(col -> BoardColumnDto.builder()
                        .id(col.getId())
                        .boardId(col.getBoardId())
                        .name(col.getName())
                        .position(col.getPosition())
                        .wipLimit(col.getWipLimit())
                        .category(col.getCategory())
                        .build())
                .toList();

        return BoardDto.builder()
                .id(board.getId())
                .projectId(board.getProjectId())
                .name(board.getName())
                .isDefault(board.getIsDefault())
                .columns(columns)
                .createdAt(board.getCreatedAt())
                .updatedAt(board.getUpdatedAt())
                .build();
    }
}
