package com.java08.quanlituyendung.jwt;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
@Slf4j
public class JwtService {
    private static final String SECRET_KEY = "2414d7e0a684869e0b0c678f94329409ce553d9d3a27b5c2da2068db604c1a40";
    private static final Long TOKEN_EXPIRATION_TIME = (long) (1000*60*30*24);
    private static final Long REFRESH_EXPIRATION_TIME = (long) (1000*60*60*24*7);
    private static final Long RESET_PASSWORD_EXPIRATION_TIME = (long) (1000*60*60*60);
    private AccessRefresh accessRefresh;
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }
    public String extractTokenType(String token) {
        return extractClaim(token, claims -> claims.get("type", String.class));
    }

    public <T> T extractClaim(String token, Function<Claims,T> claimResolver) {
        final Claims claims = extractAllClaims(token);
        return claimResolver.apply(claims);
    }


    public String generateToken(
            UserDetails userDetails
    ) {
        return generateToken(new HashMap<>(), userDetails);
    }
    public String generateRefreshToken(
            UserDetails userDetails
    ) {
        return buildToken(new HashMap<>(), userDetails, REFRESH_EXPIRATION_TIME, accessRefresh.REFRESH.name());
    }

    public String generateResetPasswordToken(UserDetails userDetails){
        return buildToken(new HashMap<>(),userDetails,RESET_PASSWORD_EXPIRATION_TIME,accessRefresh.RESET_PASSWORD.name());
    }

    public String generateToken(
            Map<String, Object> extraClaims,
            UserDetails userDetails
    ) {
        String rolesName = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .findFirst()
                .orElse("");
        extraClaims.put("role", rolesName);
        return buildToken(extraClaims, userDetails, TOKEN_EXPIRATION_TIME, accessRefresh.ACCESS.name());
    }

    public String buildToken(
            Map<String, Object> extraClaims,
            UserDetails userDetails,
            long expiration,
            String access_refresh
    ) {
        extraClaims.put("type",access_refresh);
        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSecretKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean isAccessTokenValid(String token, UserDetails userDetails) {
        final String type = extractTokenType(token);
        return (type.contains(AccessRefresh.ACCESS.toString()) && !isTokenExpired(token));
    }

    // refresh
    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSecretKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Key getSecretKey() {
        byte[] keysBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keysBytes);
    }
}
