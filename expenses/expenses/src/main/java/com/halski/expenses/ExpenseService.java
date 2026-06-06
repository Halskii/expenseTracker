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

    public Expense create(String name, String description, Double amount, LocalDate date, Long categoryId) {
        Expense expense = new Expense();
        expense.setName(name);
        expense.setDescription(description);
        expense.setAmount(amount);
        expense.setDate(date);
        
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category Not Found"));
        expense.setCategory(category);

        return expenseRepository.save(expense);
    }

    public List<Expense> getAll() {
        return expenseRepository.findAll();
    }

    public Expense getById(Long id) {
        return expenseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Expense Not Found"));
    }

    public Expense update(Long id, String name, String description, Double amount, LocalDate date, Long categoryId) {
        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Expense Not Found"));

        expense.setName(name);
        expense.setDescription(description);
        expense.setAmount(amount);
        expense.setDate(date);

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category Not Found"));
        expense.setCategory(category);

        return expenseRepository.save(expense);
    }

    public void delete(Long id) {
        expenseRepository.deleteById(id);
    }
}
