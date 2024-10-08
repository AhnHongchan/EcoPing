package com.f1veguys.sel.domain.tree.service;

import com.f1veguys.sel.domain.tree.domain.Tree;
import com.f1veguys.sel.domain.user.domain.User;

public interface TreeService {

    Tree getTree(int userId);

    Tree startTree(User user);

    void endTree(int id);

    Tree waterTree(Tree tree, int userId);

    void getGift(int id);

}
