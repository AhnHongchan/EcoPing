package com.f1veguys.sel.domain.file.dto;

import com.f1veguys.sel.domain.file.domain.File;

public record FileResponse(
        int fileId,
        String filePath,
        String fileName,
        String fileType
) {
    public FileResponse(File file) {
        this(file.getFileId(), file.getPath(), file.getName(), file.getType());
    }
}
