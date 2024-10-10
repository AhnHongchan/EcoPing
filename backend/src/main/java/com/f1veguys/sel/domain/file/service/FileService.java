package com.f1veguys.sel.domain.file.service;

import com.f1veguys.sel.domain.campaign.domain.Campaign;
import com.f1veguys.sel.domain.file.domain.File;
import com.f1veguys.sel.domain.file.dto.FileResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface FileService {
    File saveFile(MultipartFile file, Campaign campaign) throws IOException;
    void deleteFile(int fileId) throws IOException;
    FileResponse updateFile(int fileId, MultipartFile file) throws IOException;
    FileResponse getFile(int fileId);
    String getFileExt(MultipartFile file) throws IOException;
}
