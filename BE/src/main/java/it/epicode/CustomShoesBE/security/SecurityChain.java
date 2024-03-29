package it.epicode.CustomShoesBE.security;

import it.epicode.CustomShoesBE.enums.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity(debug = true)
public class SecurityChain {
    @Autowired
    private JwtTools jwtTools;
    @Autowired
    private JwtFilter jwtFilter;
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.csrf(AbstractHttpConfigurer::disable);
        httpSecurity.cors(Customizer.withDefaults());

        httpSecurity.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        httpSecurity.authorizeHttpRequests(request -> request.requestMatchers("/auth/**").permitAll());

        httpSecurity.authorizeHttpRequests(request -> request.requestMatchers(HttpMethod.GET,"/products/**").permitAll());
        httpSecurity.authorizeHttpRequests(request -> request.requestMatchers("/products/create").hasAuthority(Role.ADMIN.name()));
        httpSecurity.authorizeHttpRequests(request -> request.requestMatchers("/products/update/**").hasAuthority(Role.ADMIN.name()));
        httpSecurity.authorizeHttpRequests(request -> request.requestMatchers("/products/delete/**").hasAuthority(Role.ADMIN.name()));
        httpSecurity.authorizeHttpRequests(request -> request.requestMatchers("/products/upload/**").hasAuthority(Role.ADMIN.name()));

        httpSecurity.authorizeHttpRequests(request -> request.requestMatchers(HttpMethod.GET,"/users/all").hasAuthority(Role.ADMIN.name()));
        httpSecurity.authorizeHttpRequests(request -> request.requestMatchers("/users/**").permitAll());

        httpSecurity.authorizeHttpRequests(request -> request.requestMatchers(HttpMethod.GET,"/addresses/all").hasAuthority(Role.ADMIN.name()));
        httpSecurity.authorizeHttpRequests(request -> request.requestMatchers("/addresses/**").permitAll());

        httpSecurity.authorizeHttpRequests(request -> request.requestMatchers("/**").denyAll());

        return httpSecurity.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        config.setAllowedOrigins(List.of("http://localhost:4200/"));
        config.setAllowedMethods(List.of("*"));
        config.setAllowedHeaders(List.of("*"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return source;
    }
}
