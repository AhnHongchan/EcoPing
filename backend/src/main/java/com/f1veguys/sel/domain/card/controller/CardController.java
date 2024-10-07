package com.f1veguys.sel.domain.card.controller;

import com.f1veguys.sel.domain.card.domain.Card;
import com.f1veguys.sel.domain.card.service.CardService;
import com.f1veguys.sel.domain.customuser.CustomUserDetails;
import com.f1veguys.sel.domain.user.domain.User;
import com.f1veguys.sel.global.util.EncryptionUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/card")
@RequiredArgsConstructor
public class CardController {
    private final CardService cardService;
    private final EncryptionUtil encryptionUtil;

    @GetMapping("/check")
    public ResponseEntity<?> checkCard(@AuthenticationPrincipal CustomUserDetails userDetails) throws Exception {
        Card card = userDetails.getCard();
        HashMap<String, Object> response = new HashMap<>();
        if (card == null) {
            response.put("existsCard", false);
        }else{
            response.put("existsCard", true);
            response.put("cardNumber", encryptionUtil.decrypt(card.getNumber4()));
        }
        return ResponseEntity.ok(response);
    }

    @Transactional
    @PostMapping("/register")
    public ResponseEntity<?> registerCard(@AuthenticationPrincipal CustomUserDetails userDetails,
                                          @RequestBody Map<String, Integer> numbers ) throws Exception {
        Card card = cardService.saveCard(numbers.get("num1"), numbers.get("num2"), numbers.get("num3")
        , numbers.get("num4"), numbers.get("cvc"));
        User user = userDetails.getUser();
        user.setCard(card);
        card.setUser(user);
        return ResponseEntity.ok(encryptionUtil.decrypt(card.getNumber4()));
    }

}
