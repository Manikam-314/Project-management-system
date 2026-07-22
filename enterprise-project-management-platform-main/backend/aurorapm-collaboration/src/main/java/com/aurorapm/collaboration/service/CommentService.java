package com.aurorapm.collaboration.service;

import com.aurorapm.collaboration.entity.Comment;
import com.aurorapm.collaboration.repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;

    @Transactional(readOnly = true)
    public List<Comment> getCommentsByWorkItem(UUID workItemId) {
        return commentRepository.findByWorkItemIdOrderByCreatedAtAsc(workItemId);
    }

    @Transactional
    public Comment addComment(UUID workItemId, UUID authorId, String content, UUID parentId) {
        Comment comment = Comment.builder()
                .workItemId(workItemId)
                .authorId(authorId)
                .content(content)
                .parentId(parentId)
                .build();
        return commentRepository.save(comment);
    }
}
