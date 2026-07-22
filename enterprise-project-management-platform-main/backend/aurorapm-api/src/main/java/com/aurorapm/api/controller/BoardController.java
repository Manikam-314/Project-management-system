package com.aurorapm.api.controller;

import com.aurorapm.board.dto.BoardDto;
import com.aurorapm.board.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/boards")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

    @GetMapping
    @PreAuthorize("hasAuthority('org:read')")
    public ResponseEntity<BoardDto> getBoardByProject(@RequestParam UUID projectId) {
        return ResponseEntity.ok(boardService.getBoardByProject(projectId));
    }
}
