package com.halski.expenses;

import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class ExpenseService {
    private final ExpenseRepository expenseRepository;
    private final CategoryRepository categoryRepository;

    public ExpenseService(ExpenseRepository expenseRepository, CategoryRepository categoryRepository) {
        this.expenseRepository = expenseRepository;
        this.categoryRepository = categoryRepository;
    }

    public Expense create(String name, String description, Double amount, LocalDate date, String categoryName) {
        Expense expense = new Expense();
        expense.setName(name);
        expense.setDescription(description);
        expense.setAmount(amount);
        expense.setDate(date);
        expense.setCategoryName(categoryName);

        return expenseRepository.save(expense);
    }

    public List<Expense> getAll() {
        return expenseRepository.findAll();
    }

    public Expense getById(String name) {
        return expenseRepository.findByName(name)
                .orElseThrow(() -> new RuntimeException("Expense Not Found"));
    }

    public Expense update(String name, String newName, String description, Double amount, LocalDate date, String categoryName) {
        Expense expense = expenseRepository.findByName(name)
                .orElseThrow(() -> new RuntimeException("Expense Not Found"));

        expense.setName(newName);
        expense.setDescription(description);
        expense.setAmount(amount);
        expense.setDate(date);
        expense.setCategoryName(categoryName);

        return expenseRepository.save(expense);
    }

    public void delete(String name) {
        Expense expense = expenseRepository.findByName(name)
                .orElseThrow(() -> new RuntimeException("Expense Not Found"));
        expenseRepository.delete(expense);
    }
}
