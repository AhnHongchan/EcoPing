package com.silvertown.ecoping.domain.file.service;

import com.silvertown.ecoping.domain.campaign.domain.Campaign;
import com.silvertown.ecoping.domain.file.domain.File;
import com.silvertown.ecoping.domain.file.dto.FileResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface FileService {
    File saveFile(MultipartFile file, Campaign campaign) throws IOException;
    void deleteFile(int fileId) throws IOException;
    FileResponse updateFile(int fileId, MultipartFile file) throws IOException;
    FileResponse getFile(int fileId);
}
