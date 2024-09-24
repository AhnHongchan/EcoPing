package com.silvertown.ecoping.domain.tree.service;

import com.silvertown.ecoping.domain.tree.domain.Tree;
import com.silvertown.ecoping.domain.user.domain.User;

public interface TreeService {

    Tree getTree(int userId);

    Tree startTree(User user);

    void endTree(int id);

    Tree waterTree(int id);

    Tree getGift(int id);
}
