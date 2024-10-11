package com.f1veguys.sel.domain.tree.service;

import com.f1veguys.sel.domain.pointshistory.service.PointsHistoryService;
import com.f1veguys.sel.domain.tree.domain.Tree;
import com.f1veguys.sel.global.error.exception.*;
import com.f1veguys.sel.global.error.exception.InsufficientPointsException;
import com.f1veguys.sel.domain.points.domain.Points;
import com.f1veguys.sel.domain.points.repository.PointsRepository;
import com.f1veguys.sel.domain.tree.repository.TreeRepository;
import com.f1veguys.sel.domain.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@Transactional
@RequiredArgsConstructor
public class TreeServiceImpl implements TreeService {

    private final TreeRepository treeRepository;
    private final PointsRepository pointsRepository;
    private final PointsHistoryService pointsHistoryService;

    @Override
    public Tree getTree(int userId) {
        return treeRepository.findFirstByUserIdAndGrownFalseOrderByCreatedDateDesc(userId);
    }

    @Override
    public Tree startTree(User user) {
        Tree tree = Tree.builder()
                .user(user)
                .grown(false)
                .createdDate(LocalDateTime.now())
                .build();
        return treeRepository.save(tree);
    }

    @Override
    public void endTree(int id) {
        Tree tree = treeRepository.findById(id)
                .orElseThrow(TreeNotFoundException::new);

        if (tree.getCount() == 3000 && !tree.isGrown()) {

            tree.setGrown(true);
            treeRepository.save(tree);
        }
    }

    @Override
    public Tree waterTree(Tree tree, int userId) {

        Points userPoints = pointsRepository.findByUserId(userId)
                .orElseThrow(PointsNotFoundException::new);

        if (500 > userPoints.getBalance()) {
            throw new InsufficientPointsException();
        }

        if (tree.getCount() >= 3000) {
            throw new TreeAlmostGrownException(0);
        }

        // 포인트 차감
        userPoints.setBalance(userPoints.getBalance() - 500);
        pointsRepository.save(userPoints);
        
        //내역 저장
        pointsHistoryService.savePointsHistory(id, Operation.SPEND, 500, "나무 물 주기");

        // 나무 물주기
        tree.setCount(tree.getCount() + 500);
        return treeRepository.save(tree);
    }

    @Override
    public void getGift(int id) {
        Tree tree = treeRepository.findFirstByUserIdAndGrownFalseOrderByCreatedDateDesc(id);
        tree.setCount(3000);
        tree.setGrown(true);
        treeRepository.save(tree);
    }
}
