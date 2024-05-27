    package com.java08.quanlituyendung.service;

    import com.java08.quanlituyendung.entity.CvLabel.Label;
    import org.springframework.security.core.Authentication;

    import java.util.List;
    import java.util.Optional;

    public interface ILabelService {


        List<Label> getAllLabels(Authentication  authentication);
        Optional<Label> getLabelById(Long id);
        Label createLabel(Label label,Authentication authentication);
        Label updateLabel(Long id, Label labelDetails);
        void deleteLabel(Long id);

    }
