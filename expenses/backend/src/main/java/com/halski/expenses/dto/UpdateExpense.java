package com.halski.expenses.dto;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record UpdateExpense(
    @NotBlank(message = "Expense name is required")
    @JsonProperty String name,
    @JsonProperty String description,
    @NotNull(message = "Amount is required")
    @Positive(message = "Amount must be greater than 0")
    @JsonProperty Double amount,
    @NotNull(message = "Date is required")
    @JsonProperty LocalDate date,
    @NotBlank(message = "Category name is required")
    @JsonProperty String categoryName
) {}
