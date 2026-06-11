package com.halski.expenses.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;

public record CreateCategory(
    @NotBlank(message = "Category name is required")
    @JsonProperty String name,
    @JsonProperty String description
) {}
