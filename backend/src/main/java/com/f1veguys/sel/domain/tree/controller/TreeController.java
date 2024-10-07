package com.f1veguys.sel.domain.tree.controller;

import com.f1veguys.sel.domain.badge.domain.Badge;
import com.f1veguys.sel.domain.badge.service.BadgeService;
import com.f1veguys.sel.domain.customuser.CustomUserDetails;
import com.f1veguys.sel.domain.tree.domain.Tree;
import com.f1veguys.sel.domain.tree.service.TreeService;
import com.f1veguys.sel.domain.user.domain.User;
import com.f1veguys.sel.global.error.exception.UserNotFoundException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Random;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/tree")
@Tag(name = "TreeController", description = "나무 API")
public class TreeController {

    private final TreeService treeService;
    private final BadgeService badgeService;

    @GetMapping("/{userId}")
    @Operation(summary = "나무 정보 조회", description = "나무의 상세 정보를 조회합니다.")
    public ResponseEntity<Tree> getTree(@PathVariable("userId") int id) {
        Tree tree = treeService.getTree(id);
        return ResponseEntity.ok(tree);
    }

//    // 트리 시작
//    @PostMapping("/start")
//    public Tree startTree(@RequestBody User user) {
//        return treeService.startTree(user);
//    }

    // 물주기
    @PutMapping("/{treeId}/water")
    @Operation(summary = "나무에 물주기", description = "나무에 물(포인트, 500)를 줍니다.")
    public ResponseEntity<Tree> waterTree(@PathVariable("treeId") int id) {
        Tree tree = treeService.waterTree(id);
        return ResponseEntity.ok(tree);
    }

//    // 트리 종료 (id로 찾아서 종료)
//    @PutMapping("/{id}/end")
//    public void endTree(@PathVariable int id) {
//        treeService.endTree(id);
//    }

    // 기프티콘 받기
    @PutMapping("/{treeId}/gifticon")
    @Operation(summary = "완성된 나무에서 기프티콘 받기", description = "완성된 나무에서 기프티콘 받기 버튼을 눌러 나무를 초기화합니다")
    public ResponseEntity<?> getGift(@PathVariable("treeId") int id, @AuthenticationPrincipal CustomUserDetails userDetails) {
        Tree tree = treeService.getGift(id);
        User user = userDetails.getUser();
        List<Badge> badges = user.getBadges();
        Random random = new Random();
        int randomNum = random.nextInt(9)+1;
        boolean newTree = true;
        for (Badge badge : badges) {
            if (badge.getType() == randomNum) {
                newTree = false;
                break;
            }
        }
        if(newTree){
            Badge badge = Badge.builder()
                    .user(user)
                    .type(randomNum)
                    .build();
        }
        HashMap<String, Object> response = new HashMap<>();
        response.put("newTree", newTree);
        response.put("badgeNum", randomNum);
        return ResponseEntity.ok(response);
    }

}
