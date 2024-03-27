package it.epicode.CustomShoesBE;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Properties;

@Configuration
@PropertySource("application.properties")
public class AppConfig {
    @Bean
    public Cloudinary getcloudinary(@Value("${cloudinary.name}")String name,
                                    @Value("${cloudinary.api_key}")String apiKey,
                                    @Value("${cloudinary.api_secret}")String apiSecret){
        return new Cloudinary(ObjectUtils.asMap(
                "cloud_name", name,
                "api_key", apiKey,
                "api_secret", apiSecret));
    }
    @Bean
    public JavaMailSenderImpl getJavaMailSender(@Value("${gmail.host}")String host,
                                                @Value("${gmail.port}")String port,
                                                @Value("${gmail.email}")String email,
                                                @Value("${gmail.transportProtocol}") String transportProtocol,
                                                @Value("${gmail.smtpAuth}") String mailSmtpAuth,
                                                @Value("${gmail.smtpStarttlsEnable}")String smtpStarttlsEnable,
                                                @Value("${gmail.debug}")String debug,
                                                @Value("${gmail.smtSslEnable}")String smtSslEnable,
                                                @Value("${gmail.password}")String password){
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost(host);
        mailSender.setPort(Integer.parseInt(port));

        mailSender.setUsername(email);
        mailSender.setPassword(password);

        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", transportProtocol);
        props.put("mail.smtp.auth", mailSmtpAuth);
        props.put("mail.smtp.starttls.enable", smtpStarttlsEnable);
        props.put("mail.debug", debug);
        props.put("smtp.ssl.enable",smtSslEnable);
        return mailSender;
    }
    @Bean
    public PasswordEncoder encoder(){
        return new BCryptPasswordEncoder();
    }
}
