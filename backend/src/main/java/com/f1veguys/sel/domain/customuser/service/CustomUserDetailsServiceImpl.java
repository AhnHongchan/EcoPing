package com.f1veguys.sel.domain.customuser.service;


import com.f1veguys.sel.domain.customuser.CustomUserDetails;
import com.f1veguys.sel.domain.user.domain.User;
import com.f1veguys.sel.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
public class CustomUserDetailsServiceImpl implements CustomUserDetailsService{

    @Autowired
    private UserRepository userRepository;



    @Override
    public CustomUserDetails loadUserByUsername(String userEmail) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(userEmail).orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + userEmail));
        if(user == null) {
            throw new UsernameNotFoundException("User not found with userEmail: " + userEmail);
        }
        return new CustomUserDetails(user);
    }
}
