package com.uasz.sbcar2;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.uasz.sbcar2.service.UserDetailsServiceImpl;


@Configuration
public class SecurityConfig {
    
    @Autowired
    private UserDetailsServiceImpl userdetailsService;

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception{
        auth.userDetailsService(userdetailsService).passwordEncoder(new BCryptPasswordEncoder());
    }
}
