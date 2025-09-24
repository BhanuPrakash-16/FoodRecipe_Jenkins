package klu.model;


import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JWTManager {

	public final String SEC_KEY = "QWERTYUIOPASDFGHJKLZXCVBNM13245678979809asfdfggfgjjyvjhhjhfhgfhbvbhds";
	public final SecretKey KEY = Keys.hmacShaKeyFor(SEC_KEY.getBytes());
	
	//Generate JWT 
	public String generateToken(String email)
	{
		Map<String, String> data = new HashMap<String, String>();
		data.put("email", email);
		
		return Jwts.builder()
				.setClaims(data)
				.setIssuedAt(new Date())
				.setExpiration(new Date(new Date().getTime() + 84600000))
				.signWith(KEY)
				.compact();				
	}
	
	//Validate JWT Token
		public String validateToken(String token)
		  {
		    Claims claim = Jwts.parserBuilder()
		            .setSigningKey(KEY)
		            .build()
		            .parseClaimsJws(token)
		            .getBody();
		    
		    Date expiry = claim.getExpiration();
		    if(expiry == null || expiry.before(new Date()))
		      return "401";
		    
		    return claim.get("email", String.class);
		  }
	
}
