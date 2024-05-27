package com.java08.quanlituyendung.auth;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.auth.oauth2.TokenResponse;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.client.util.store.FileDataStoreFactory;
import com.google.api.services.people.v1.PeopleService;
import com.google.api.services.people.v1.model.Person;
import com.java08.quanlituyendung.repository.UserAccountRepository;
import com.java08.quanlituyendung.repository.UserInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.*;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.List;
@Service
public class LoginGoogleService {
    private static final String CREDENTIALS_FILE_PATH = "/credentials.json";
    private static final String APPLICATION_NAME = "Login with Google";
    private static final JsonFactory JSON_FACTORY = JacksonFactory.getDefaultInstance();
    private static final List<String> SCOPES = Collections.singletonList("email");
    private static final String TOKENS_DIRECTORY_PATH = "tokens";

    @Autowired
    UserAccountRepository userRepository;
    @Autowired
    UserInfoRepository userInfoRepository;
    public Credential getCredentialsFromAccessToken(final NetHttpTransport HTTP_TRANSPORT, String accessToken) throws IOException {

        //InputStream in = new FileInputStream(CREDENTIALS_FILE_PATH);
        InputStream in = LoginGoogleService.class.getResourceAsStream(CREDENTIALS_FILE_PATH);
        GoogleClientSecrets clientSecrets = GoogleClientSecrets.load(JSON_FACTORY, new InputStreamReader(in));
        TokenResponse tokenResponse = new TokenResponse();
        tokenResponse.setAccessToken(accessToken);
        tokenResponse.setTokenType("Bearer");
        GoogleAuthorizationCodeFlow flow = new GoogleAuthorizationCodeFlow.Builder(
                HTTP_TRANSPORT, JSON_FACTORY, clientSecrets, SCOPES)
                .setDataStoreFactory(new FileDataStoreFactory(new java.io.File(TOKENS_DIRECTORY_PATH)))
                .setAccessType("offline")
                .setApprovalPrompt("auto")
                .build();
        return flow.createAndStoreCredential(tokenResponse, "user");
    }
    public Person getUserInfo(Credential credential) throws IOException, GeneralSecurityException {
        final NetHttpTransport HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();
        PeopleService peopleService = new PeopleService.Builder(HTTP_TRANSPORT, JSON_FACTORY, httpRequest -> {
            credential.initialize(httpRequest);
            httpRequest.setConnectTimeout(60000);
            httpRequest.setReadTimeout(60000);
        }).setApplicationName(APPLICATION_NAME).build();

        // Lấy thông tin người dùng từ Google People API
        return peopleService.people().get("people/me")
                .setPersonFields("names,emailAddresses,phoneNumbers,photos,addresses,birthdays,genders")
                .execute();
    }

}
