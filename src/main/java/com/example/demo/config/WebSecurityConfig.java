package com.example.demo.config;

import java.util.Arrays;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.example.demo.bll.AccountService;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

	@Resource(name = "accountService")
	private AccountService accountService;

	@Autowired
	private JwtEntryPoint unauthorizedHandler;

	@Override
	@Bean
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}

	@Autowired
	public void globalUserDetails(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(accountService).passwordEncoder(encoder());
	}

	@Bean
	public JwtFilter authenticationTokenFilterBean() throws Exception {
		return new JwtFilter();
	}

	@Bean
	CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration config = new CorsConfiguration();
		config.setAllowedOrigins(Arrays.asList("*"));
		config.setAllowedMethods(Arrays.asList("*"));
		config.setAllowedHeaders(Arrays.asList("*"));
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", config);
		return source;
	}

	@Bean
	public BCryptPasswordEncoder encoder() {
		return new BCryptPasswordEncoder();
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.cors().and().csrf().disable().exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and().authorizeRequests()
				.antMatchers("/", "/account/login").permitAll().anyRequest().authenticated();
		http.addFilterBefore(authenticationTokenFilterBean(), UsernamePasswordAuthenticationFilter.class);
	}

	@Override
	public void configure(WebSecurity web) throws Exception {
		web.ignoring().antMatchers("/*.html", "/*.css", "/*.js");
	}
	/*
	 * @Bean
	 * 
	 * @ConfigurationProperties("security.oauth2.google.client") public
	 * AuthorizationCodeResourceDetails google() { return new
	 * AuthorizationCodeResourceDetails(); }
	 * 
	 * @Bean
	 * 
	 * @ConfigurationProperties("security.oauth2.google.resource") public
	 * ResourceServerProperties googleResource() { return new
	 * ResourceServerProperties(); }
	 * 
	 * private Filter ssoGoogleFilter() { OAuth2ClientAuthenticationProcessingFilter
	 * googleFilter = new OAuth2ClientAuthenticationProcessingFilter(
	 * "/google/login"); OAuth2RestTemplate googleTemplate = new
	 * OAuth2RestTemplate(google(), oauth2ClientContext);
	 * googleFilter.setRestTemplate(googleTemplate); googleFilter
	 * .setTokenServices(new
	 * UserInfoTokenServices(googleResource().getUserInfoUri(),
	 * google().getClientId())); return googleFilter; }
	 * 
	 * private Filter ssoFilter() { List<Filter> filters = new ArrayList<>();
	 * filters.add(ssoGoogleFilter()); // filters.add(ssoFacebookFilter());
	 * 
	 * CompositeFilter filter = new CompositeFilter(); filter.setFilters(filters);
	 * return filter; }
	 */
}