package com.halski.expenses.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record CreateCategory(
    @JsonProperty String name,
    @JsonProperty String description
) {}
