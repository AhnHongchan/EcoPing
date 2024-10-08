package com.f1veguys.sel.domain.file.service;

import com.f1veguys.sel.domain.campaign.domain.Campaign;
import com.f1veguys.sel.domain.file.domain.File;
import com.f1veguys.sel.domain.file.dto.FileResponse;
import com.f1veguys.sel.domain.file.repository.FileRepository;
import com.f1veguys.sel.global.error.exception.FileNotFoundException;
import com.f1veguys.sel.global.error.exception.UnsupportedFormatException;
import com.f1veguys.sel.global.util.FileUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class FileServiceImpl implements FileService {

    @Value("${file.upload-dir}")
    private String uploadDir;

    private final FileRepository fileRepository;

    @Override
    public File saveFile(MultipartFile file, Campaign campaign) throws IOException {
        String originalFileName = file.getOriginalFilename();
        String storedFileName = UUID.randomUUID() + "." + FileUtil.getFileExt(originalFileName);
        String ext = getFileExt(file);
        File fileEntity = File.builder()
                .type("image/" + ext)
                .name(originalFileName)
                .path(storedFileName)
                .campaign(campaign)
                .build();

        return fileRepository.save(fileEntity);
    }

    @Override
    public void deleteFile(int fileId) throws IOException {
        File fileEntity = fileRepository.findById(fileId)
                .orElseThrow(FileNotFoundException::new);
        Path filePath = Paths.get(uploadDir, fileEntity.getPath());

        Files.deleteIfExists(filePath);  // 파일 삭제 시도
        fileRepository.deleteById(fileId);  // 데이터베이스에서 파일 엔티티 삭제
    }

    @Override
    public FileResponse updateFile(int fileId, MultipartFile file) throws IOException {
        File oldFileEntity = fileRepository.findById(fileId)
                .orElseThrow(FileNotFoundException::new);
        Path oldFilePath = Paths.get(uploadDir, oldFileEntity.getPath());
        Files.deleteIfExists(oldFilePath); // 기존 파일 삭제

        String originalFileName = file.getOriginalFilename();
        String storedFileName = UUID.randomUUID() + "." + FileUtil.getFileExt(originalFileName);
        String ext = FileUtil.getFileExt(originalFileName);
        oldFileEntity.setType("image/" + ext);
        oldFileEntity.setName(originalFileName);
        oldFileEntity.setPath(storedFileName);
        fileRepository.save(oldFileEntity); // 엔터티 업데이트

        return new FileResponse(oldFileEntity);
    }

    @Override
    public FileResponse getFile(int fileId) {
        File fileEntity = fileRepository.findById(fileId)
                .orElseThrow(FileNotFoundException::new);
        return new FileResponse(fileEntity);
    }

    @Override
    public String getFileExt(MultipartFile file) throws IOException {
        String originalFileName = file.getOriginalFilename();
        String storedFileName = UUID.randomUUID() + "." + FileUtil.getFileExt(originalFileName);

        if (!FileUtil.isImageFile(originalFileName)) {
            throw new UnsupportedFormatException();
        }

        Path savePath = Paths.get(uploadDir, storedFileName);
        Files.createDirectories(savePath.getParent());
        file.transferTo(savePath);

        return FileUtil.getFileExt(originalFileName);
    }
}
