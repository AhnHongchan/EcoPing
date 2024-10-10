package com.f1veguys.sel.domain.card.service;

import com.f1veguys.sel.domain.card.domain.Card;

public interface CardService {
    Card saveCard(int num1, int num2, int num3, int num4, int cvc) throws Exception;
    String getCardNumber(Card card) throws Exception;
}
