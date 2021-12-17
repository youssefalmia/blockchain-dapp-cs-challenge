package ieee.cs.trackingappbackend;

import ieee.cs.trackingappbackend.entities.TrackingData;
import ieee.cs.trackingappbackend.repositories.TrackingDataRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;

@SpringBootApplication
public class TrackingAppBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(TrackingAppBackendApplication.class, args);
    }

    @Bean
    CommandLineRunner commandLineRunner(TrackingDataRepository trackingDataRepository){
        TrackingData trackingData1 = new TrackingData(null,"37.20743442057966","9.666982773826687   ","16:12:26 17/12/21","256",false);
        TrackingData trackingData2 = new TrackingData(null,"37.15792557011335","9.29482090294704","16:45:26 17/12/21","256",false);
        return args -> {
            trackingDataRepository.save(trackingData1);
            trackingDataRepository.save(trackingData2);
        };
    }

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.applyPermitDefaultValues();/*
        corsConfiguration.setAllowCredentials(true);
        corsConfiguration.setAllowedOrigins(Arrays.asList("http://localhost:19002"));
        corsConfiguration.setAllowedHeaders(Arrays.asList("Origin", "Access-Control-Allow-Origin", "Content-Type",
                "Accept", "Authorization", "Origin, Accept", "X-Requested-With",
                "Access-Control-Request-Method", "Access-Control-Request-Headers"));
        corsConfiguration.setExposedHeaders(Arrays.asList("Origin", "Content-Type", "Accept", "Authorization",
                "Access-Control-Allow-Origin", "Access-Control-Allow-Origin", "Access-Control-Allow-Credentials"));*/
        corsConfiguration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
        UrlBasedCorsConfigurationSource urlBasedCorsConfigurationSource = new UrlBasedCorsConfigurationSource();
        urlBasedCorsConfigurationSource.registerCorsConfiguration("/**", corsConfiguration);
        return new CorsFilter(urlBasedCorsConfigurationSource);
    }

}
