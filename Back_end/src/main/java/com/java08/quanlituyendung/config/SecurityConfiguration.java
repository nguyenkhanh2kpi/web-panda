package com.java08.quanlituyendung.config;


import com.java08.quanlituyendung.auth.CustomAuthenticationFailureHandler;
import com.java08.quanlituyendung.auth.OAuth2LoginSuccessHandler;
import com.java08.quanlituyendung.auth.OAuth2UserService;
import com.java08.quanlituyendung.entity.Role;
import com.java08.quanlituyendung.jwt.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration implements WebMvcConfigurer {
    @Autowired
    JwtAuthenticationFilter jwtAuthenticationFilter;
    @Autowired
    AuthenticationProvider authenticationProvider;
    @Autowired
    OAuth2UserService oAuth2UserService;
    @Autowired
    OAuth2LoginSuccessHandler loginSuccessHandler;
    @Autowired
    CustomAuthenticationFailureHandler customAuthenticationFailureHandler;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .csrf(csrf -> csrf.disable())
                .cors(Customizer.withDefaults())
                .authorizeRequests()
                .requestMatchers("/auth/**", "/v3/**", "/swagger-ui/**", "/recover/**", "/payment/**", "/industries/**")
                .permitAll()
                .requestMatchers(HttpMethod.GET,
                        "/event/**",
                        "/job-posting/**",
                        "/company/**"
                )
                .permitAll()

                .requestMatchers(HttpMethod.GET,
                        "/blacklist/**",
                        "/user/**",
                        "/question/**",
                        "/interview/**",
                        "/interview-detail/**",
                        "/user/**"
                )
                .hasAnyAuthority(
                        Role.ADMIN.name(),
                        Role.RECRUITER.name(),
                        Role.INTERVIEWER.name()
                )


                .requestMatchers(HttpMethod.POST,
                        "/blacklist/**",
                        "/user/**",
                        "/skill/**",
                        "/position/**",
                        "/job-posting/**",
                        "/interview/**",
                        "/calendar/**"
                )
                .hasAnyAuthority(
                        Role.ADMIN.name(),
                        Role.RECRUITER.name(),
                        Role.INTERVIEWER.name()
                )

                .requestMatchers(HttpMethod.POST,
                        "/interview-detail/**",
                        "/question/**"
                )
                .hasAnyAuthority(
                        Role.ADMIN.name(),
                        Role.RECRUITER.name(),
                        Role.INTERVIEWER.name()
                )


                .requestMatchers(HttpMethod.PUT,
                        "/question/**"
                )
                .hasAnyAuthority(
                        Role.ADMIN.name(),
                        Role.RECRUITER.name(),
                        Role.INTERVIEWER.name()
                )

                .requestMatchers(HttpMethod.DELETE,
                        "/question/**"
                )
                .hasAnyAuthority(
                        Role.ADMIN.name(),
                        Role.RECRUITER.name(),
                        Role.INTERVIEWER.name()
                )


                .requestMatchers(HttpMethod.POST,
                        "/apply-job"
                )
                .hasAnyAuthority(
                        Role.ADMIN.name(),
                        Role.RECRUITER.name(),
                        Role.INTERVIEWER.name(),
                        Role.CANDIDATE.name()
                )

                .requestMatchers(HttpMethod.PUT,
                        "/skill/**",
                        "/position/**",
                        "/job-posting/**",
                        "/interview/**",
                        "/event/**",
                        "/blacklist/**"
                )
                .hasAnyAuthority(
                        Role.ADMIN.name(),
                        Role.RECRUITER.name(),
                        Role.INTERVIEWER.name()
                )


                .requestMatchers(HttpMethod.DELETE,
                        "/skill/**",
                        "/position/**",
                        "/job-posting/**",
                        "/interview/**",
                        "/event/**"
                )
                .hasAnyAuthority(
                        Role.ADMIN.name(),
                        Role.RECRUITER.name(),
                        Role.INTERVIEWER.name()
                )

                .requestMatchers(HttpMethod.PUT,
                        "/user/password"
                )
                .hasAnyAuthority(
                        Role.ADMIN.name(),
                        Role.RECRUITER.name(),
                        Role.CANDIDATE.name(),
                        Role.INTERVIEWER.name()
                )


                .anyRequest()
                .authenticated()
                .and()
                .formLogin().disable()
//                .oauth2Login()
//                                .loginPage("/auth/google/login")
////                                .defaultSuccessUrl("/oauth2/google/callback")
//                                .userInfoEndpoint()
//                                .userService(oAuth2UserService)
//                                .and()
//                                .successHandler(loginSuccessHandler)
//                                .failureHandler(customAuthenticationFailureHandler)
//                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        return httpSecurity.build();
    }


    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOriginPatterns("*")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowCredentials(true)
                .maxAge(3600);
    }


}
