package com.halski.expenses.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.LocalDate;

public record CreateExpense(
    @JsonProperty String name,
    @JsonProperty String description,
    @JsonProperty Double amount,
    @JsonProperty LocalDate date,
    @JsonProperty String categoryName
) {}


