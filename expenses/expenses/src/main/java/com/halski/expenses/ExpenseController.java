package com.halski.expenses;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import com.halski.expenses.dto.CreateExpense;
import com.halski.expenses.dto.UpdateExpense;
import java.util.List;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    @PostMapping
    public Expense create(@RequestBody CreateExpense request) {
        return expenseService.create(request.name(), request.description(), request.amount(), request.date(), request.categoryId());
    }

    @GetMapping({"", "/"})
    public List<Expense> getAll() {
        return expenseService.getAll();
    }

    @GetMapping("/{id}")
    public Expense getById(@PathVariable Long id) {
        return expenseService.getById(id);
    }

    @PutMapping("/{id}")
    public Expense update(
        @PathVariable Long id,
        @RequestBody UpdateExpense request) {
        return expenseService.update(id, request.name(), request.description(), request.amount(), request.date(), request.categoryId());
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        expenseService.delete(id);
    }
}
