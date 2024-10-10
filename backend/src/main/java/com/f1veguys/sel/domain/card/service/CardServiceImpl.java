package com.f1veguys.sel.domain.card.service;


import com.f1veguys.sel.domain.card.domain.Card;
import com.f1veguys.sel.domain.card.repository.CardRepository;
import com.f1veguys.sel.global.util.EncryptionUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CardServiceImpl implements CardService {
    @Autowired
    private CardRepository cardRepository;

    @Autowired
    private EncryptionUtil encryptionUtil;

    @Transactional
    public Card saveCard(int number1, int number2, int number3, int number4, int cvc) throws Exception {
        Card card = new Card();
        card.setNumber1(encryptionUtil.encrypt(number1));
        card.setNumber2(encryptionUtil.encrypt(number2));
        card.setNumber3(encryptionUtil.encrypt(number3));
        card.setNumber4(encryptionUtil.encrypt(number4));
        card.setCvc(encryptionUtil.encrypt(cvc));
        return cardRepository.save(card);
    }

    public String getCardNumber(Card card) throws Exception {
        return encryptionUtil.decrypt(card.getNumber4());
    }
}
