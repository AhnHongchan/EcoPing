package com.f1veguys.sel.domain.file.controller;

import com.f1veguys.sel.domain.file.service.FileService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/file")
@Tag(name = "FileController", description = "파일 API")
public class FileController {
    private final FileService fileService;

//    @PostMapping(consumes = "multipart/form-data")
//    @Operation(summary = "이미지 업로드", description = "이미지 파일을 DB에 업로드합니다.")
//    public ResponseEntity<?> upload(@RequestPart("file") MultipartFile file) throws Exception {
//        return ResponseEntity.ok(fileService.saveFile(file));
//    }
//
//    @DeleteMapping("/{fileId}")
//    @Operation(summary = "이미지 삭제", description = "이미지 파일을 DB에서 삭제합니다.")
//    public ResponseEntity<?> delete(@PathVariable("fileId") int fileId) throws Exception {
//        fileService.deleteFile(fileId);
//        return ResponseEntity.noContent().build();
//    }
//
//    @PutMapping(path="/{fileId}",consumes = "multipart/form-data")
//    @Operation(summary = "이미지 수정", description = "이미지 파일을 DB에서 수정합니다.")
//    public ResponseEntity<?> update(@PathVariable("fileId") int fileId, @RequestPart("file")MultipartFile file) throws Exception {
//        return ResponseEntity.ok().body(fileService.updateFile(fileId, file));
//    }
//
//    @GetMapping("/{fileId}")
//    @Operation(summary = "이미지 조회", description = "이미지 파일을 DB에서 조회합니다.")
//    public ResponseEntity<?> getFile(@PathVariable("fileId") int fileId) {
//        return ResponseEntity.ok().body(fileService.getFile(fileId));
//    }

}