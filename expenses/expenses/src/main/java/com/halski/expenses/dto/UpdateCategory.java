package com.halski.expenses.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record UpdateCategory(
    @JsonProperty String name,
    @JsonProperty String description
) {}
