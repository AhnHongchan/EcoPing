package com.f1veguys.sel.global.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.security.SecureRandom;
import java.util.Base64;

@Service
public class EncryptionUtil {

    private static final String ALGORITHM = "AES/GCM/NoPadding";
    private static final int TAG_LENGTH_BIT = 128;
    private static final int IV_LENGTH_BYTE = 12;

    private final SecretKey key;

    public EncryptionUtil(@Value("${encryption.key}") String secretKey) throws Exception {
        byte[] decodedKey = Base64.getDecoder().decode(secretKey);
        this.key = new SecretKeySpec(decodedKey, "AES");
    }

    public String encrypt(int number) throws Exception {
        byte[] iv = new byte[IV_LENGTH_BYTE];
        SecureRandom.getInstanceStrong().nextBytes(iv);

        Cipher cipher = Cipher.getInstance(ALGORITHM);
        GCMParameterSpec parameterSpec = new GCMParameterSpec(TAG_LENGTH_BIT, iv);
        cipher.init(Cipher.ENCRYPT_MODE, key, parameterSpec);

        byte[] cipherText = cipher.doFinal(Integer.toString(number).getBytes());

        byte[] encryptedData = new byte[iv.length + cipherText.length];
        System.arraycopy(iv, 0, encryptedData, 0, iv.length);
        System.arraycopy(cipherText, 0, encryptedData, iv.length, cipherText.length);

        return Base64.getEncoder().encodeToString(encryptedData);
    }

    public String decrypt(String encryptedData) throws Exception {
        byte[] decodedData = Base64.getDecoder().decode(encryptedData);

        byte[] iv = new byte[IV_LENGTH_BYTE];
        byte[] cipherText = new byte[decodedData.length - IV_LENGTH_BYTE];

        System.arraycopy(decodedData, 0, iv, 0, iv.length);
        System.arraycopy(decodedData, iv.length, cipherText, 0, cipherText.length);

        Cipher cipher = Cipher.getInstance(ALGORITHM);
        GCMParameterSpec parameterSpec = new GCMParameterSpec(TAG_LENGTH_BIT, iv);
        cipher.init(Cipher.DECRYPT_MODE, key, parameterSpec);

        byte[] decryptedData = cipher.doFinal(cipherText);

        return new String(decryptedData);
    }

    public String decryptLastFour(String encryptedData) throws Exception {
        String decrypted = decrypt(encryptedData);
        return decrypted.substring(decrypted.length() - 4);
    }

}