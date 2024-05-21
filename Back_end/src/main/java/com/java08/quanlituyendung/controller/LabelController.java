package com.java08.quanlituyendung.controller;

import com.java08.quanlituyendung.entity.CvLabel.Label;
import com.java08.quanlituyendung.service.ILabelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/labels")
public class LabelController {

    private final ILabelService labelService;

    @Autowired
    public LabelController(ILabelService labelService) {
        this.labelService = labelService;
    }

    @GetMapping
    public List<Label> getAllLabels(Authentication authentication) {
        return labelService.getAllLabels(authentication);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Label> getLabelById(@PathVariable Long id) {
        Label label = labelService.getLabelById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Label not found with id " + id));
        return ResponseEntity.ok(label);
    }

    @PostMapping
    public Label createLabel(@RequestBody Label label, Authentication authentication) {
        return labelService.createLabel(label,authentication);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Label> updateLabel(@PathVariable Long id, @RequestBody Label labelDetails) {
        Label updatedLabel = labelService.updateLabel(id, labelDetails);
        return ResponseEntity.ok(updatedLabel);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLabel(@PathVariable Long id) {
        labelService.deleteLabel(id);
        return ResponseEntity.noContent().build();
    }
}