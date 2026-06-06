package com.halski.expenses.dto;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonProperty;

public record UpdateExpense(
    @JsonProperty String name,
    @JsonProperty String description,
    @JsonProperty Double amount,
    @JsonProperty LocalDate date,
    @JsonProperty String categoryName
) {}
