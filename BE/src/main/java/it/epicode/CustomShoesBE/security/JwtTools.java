package it.epicode.CustomShoesBE.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import it.epicode.CustomShoesBE.exception.UnauthorizedException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

import it.epicode.CustomShoesBE.model.User;

import java.util.Date;

@Component
@PropertySource("application.properties")
public class JwtTools {
    @Value("${spring.jwt.secret}")
    private String secret;
    @Value("${spring.jwt.expiration}")
    private String expiration;

    public String createToken(User user){
        return "Bearer "+ Jwts.builder().subject(user.getEmail())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis()+Long.parseLong(expiration)))
                .signWith(Keys.hmacShaKeyFor(secret.getBytes())).compact();
    }
    public void validateToken(String token) throws UnauthorizedException {
        try{
            Jwts.parser().verifyWith(Keys.hmacShaKeyFor(secret.getBytes())).build().parse(token);
        }catch(Exception e){
            throw new UnauthorizedException("Your token is expired or messed");
        }
    }
    public String extractEmail(String token){
        return Jwts.parser().verifyWith(Keys.hmacShaKeyFor(secret.getBytes())).build()
                .parseSignedClaims(token).getPayload().getSubject();
    }
}
