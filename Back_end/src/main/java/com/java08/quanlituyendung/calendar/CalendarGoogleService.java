package com.java08.quanlituyendung.calendar;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.auth.oauth2.TokenResponse;
import com.google.api.client.auth.openidconnect.IdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.client.util.store.FileDataStoreFactory;
import com.google.api.services.calendar.Calendar;
import com.google.api.services.calendar.CalendarScopes;
import com.google.api.services.calendar.model.Event;
import com.google.api.services.people.v1.PeopleService;
import com.google.api.services.people.v1.model.Person;
import com.java08.quanlituyendung.converter.EventRequestConverter;
import com.java08.quanlituyendung.dto.CalendarAddRequestDTO;
import com.java08.quanlituyendung.dto.google.GoogleTransferDTO;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import org.springframework.stereotype.Service;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.List;

@Service
public class CalendarGoogleService {
    private static final String APPLICATION_NAME = "Google Calendar API Java Quickstart";
    private static final JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();
    private static final List<String> SCOPES = Collections.singletonList(CalendarScopes.CALENDAR_EVENTS + " " + CalendarScopes.CALENDAR);
    private static final String CREDENTIALS_FILE_PATH = "/credentials.json";
    private static final String TOKENS_DIRECTORY_PATH = "tokens";

    /**
     * Creates an authorized Credential object.
     *
     * @param HTTP_TRANSPORT The network HTTP Transport.
     * @return An authorized Credential object.
     * @throws IOException If the credentials.json file cannot be found.
     */

    private static Credential getCredentials(final NetHttpTransport HTTP_TRANSPORT, String accessToken) throws IOException {
        InputStream in = CalendarGoogleService.class.getResourceAsStream(CREDENTIALS_FILE_PATH);
        if (in == null) {
            throw new FileNotFoundException("Resource not found: " + CREDENTIALS_FILE_PATH);
        }
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
        Credential credential = flow.createAndStoreCredential(tokenResponse, "user");
        return credential;
    }

    public Event createEvent(CalendarAddRequestDTO requestDTO) throws IOException, GeneralSecurityException {
        final NetHttpTransport HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();
        Calendar service =
                new Calendar.Builder(HTTP_TRANSPORT, JSON_FACTORY, getCredentials(HTTP_TRANSPORT, requestDTO.getToken()))
                        .setApplicationName(APPLICATION_NAME)
                        .build();
        Event eventOffline = EventRequestConverter.convertToEventCalendarOffline(requestDTO);
        Event eventonline = EventRequestConverter.convertToEventCalendar(requestDTO);

        String calendarId = "primary";
        if (requestDTO.isOffline()) {
            return service.events().insert(calendarId, eventOffline)
                    .setSendNotifications(true)
                    .setConferenceDataVersion(1)
                    .execute();

        } else {
            return service.events().insert(calendarId, eventonline)
                    .setSendNotifications(true)
                    .setConferenceDataVersion(1)
                    .execute();
        }
    }

    public GoogleTransferDTO getEmailFromToken(String accessToken) throws IOException, GeneralSecurityException {
        HttpTransport httpTransport = GoogleNetHttpTransport.newTrustedTransport();
        GoogleCredential credential = new GoogleCredential().setAccessToken(accessToken);
        PeopleService service = new PeopleService.Builder(httpTransport, JSON_FACTORY, credential)
                .setApplicationName(APPLICATION_NAME)
                .build();
        Person me = service.people().get("people/me").setPersonFields("names,emailAddresses,phoneNumbers,photos,addresses,birthdays,genders").execute();
        GoogleTransferDTO googleTransferDTO = new GoogleTransferDTO();
        if (me.getPhoneNumbers() != null && !me.getPhoneNumbers().isEmpty()) {
            googleTransferDTO.setPhone(me.getPhoneNumbers().get(0).getValue().toString());
        }
        if (me.getNames() != null && !me.getNames().isEmpty()) {
            googleTransferDTO.setUsername(me.getNames().get(0).getDisplayName());
        }
        if (me.getEmailAddresses() != null && !me.getEmailAddresses().isEmpty()) {
            googleTransferDTO.setEmail(me.getEmailAddresses().get(0).getValue());
        }
        if (me.getPhotos() != null && !me.getPhotos().isEmpty()) {
            googleTransferDTO.setAvatar(me.getPhotos().get(0).getUrl());
        }
        if (me.getBirthdays() != null && !me.getBirthdays().isEmpty()) {
            googleTransferDTO.setBirthDay(String.valueOf(me.getBirthdays().get(0)));
        }
        if (me.getAddresses() != null && !me.getAddresses().isEmpty()) {
            googleTransferDTO.setAddress(String.valueOf(me.getAddresses().get(0)));
        }
        if (me.getGenders() != null && !me.getGenders().isEmpty()) {
            googleTransferDTO.setGender(String.valueOf(me.getGenders().get(0)));
        }
        return googleTransferDTO;


    }

}

