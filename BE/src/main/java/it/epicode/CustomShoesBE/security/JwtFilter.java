package it.epicode.CustomShoesBE.security;

import it.epicode.CustomShoesBE.exception.NotFoundException;
import it.epicode.CustomShoesBE.exception.UnauthorizedException;
import it.epicode.CustomShoesBE.model.User;
import it.epicode.CustomShoesBE.services.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
@Component
public class JwtFilter extends OncePerRequestFilter {
    @Autowired
    private JwtTools jwtTools;
    @Autowired
    private UserService userService;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String auth = request.getHeader("Authorization");

        if (auth == null || !auth.startsWith("Bearer ")) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Token not found or invalid");
            return;
        }

        String token = auth.substring(7);
        try {
            jwtTools.validateToken(token);
        } catch (UnauthorizedException e) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Unauthorized: " + e.getMessage());
            return;
        }

        String email = jwtTools.extractEmail(token);
        try {
            User user = userService.findByEmail(email);
            System.out.println(user.getAuthorities());
            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);
            filterChain.doFilter(request, response);
        } catch (NotFoundException e) {
            throw new RuntimeException(e);
        }
    }
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String[] pathsToMatch = {"/auth/**","/**/no-auth/**"};
        for(String path:pathsToMatch){

            if(new AntPathMatcher().match(path, request.getServletPath())) return true;
        }
        return false;
    }
}
