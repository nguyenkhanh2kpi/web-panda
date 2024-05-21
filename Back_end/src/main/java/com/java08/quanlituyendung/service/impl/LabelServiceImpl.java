package com.java08.quanlituyendung.service.impl;

import com.java08.quanlituyendung.auth.UserAccountRetriever;
import com.java08.quanlituyendung.controller.ResourceNotFoundException;
import com.java08.quanlituyendung.entity.CvLabel.Label;
import com.java08.quanlituyendung.repository.LabelRepository;
import com.java08.quanlituyendung.service.ILabelService;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class LabelServiceImpl implements ILabelService {
    private final LabelRepository labelRepository;
    private final UserAccountRetriever userAccountRetriever;
    public LabelServiceImpl(LabelRepository labelRepository,UserAccountRetriever userAccountRetriever) {
        this.labelRepository = labelRepository;
        this.userAccountRetriever = userAccountRetriever;
    }

    @Override
    public List<Label> getAllLabels(Authentication authentication) {
        var user = userAccountRetriever.getUserAccountEntityFromAuthentication(authentication);
        return labelRepository.findAll().stream()
                .filter(label -> label.getUserId().equals(user.getId()))
                .collect(Collectors.toList());
    }

    public Optional<Label> getLabelById(Long id) {
        return labelRepository.findById(id);
    }

    public Label createLabel(Label label,Authentication authentication) {
        var user = userAccountRetriever.getUserAccountEntityFromAuthentication(authentication);
        label.setUserId(user.getId());
        return labelRepository.save(label);
    }

    public Label updateLabel(Long id, Label labelDetails) {
        Label label = labelRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Label not found with id " + id));

        label.setUserId(labelDetails.getUserId());
        label.setName(labelDetails.getName());
        label.setColor(labelDetails.getColor());

        return labelRepository.save(label);
    }

    public void deleteLabel(Long id) {
        Label label = labelRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Label not found with id " + id));

        labelRepository.delete(label);
    }
}
