package com.aurorapm.collaboration.repository;

import com.aurorapm.collaboration.entity.FileAttachment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface FileAttachmentRepository extends JpaRepository<FileAttachment, UUID> {
    List<FileAttachment> findByWorkItemId(UUID workItemId);
}
