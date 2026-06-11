package com.halski.expenses;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;
import jakarta.validation.Valid;
import com.halski.expenses.dto.CreateExpense;
import com.halski.expenses.dto.UpdateExpense;
import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin(origins = "http://localhost:5173")
public class ExpenseController {

    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    @PostMapping
    public Expense create(@Valid @RequestBody CreateExpense request) {
        return expenseService.create(request.name(), request.description(), request.amount(), request.date(), request.categoryName());
    }

    @GetMapping({"", "/"})
    public List<Expense> getAll() {
        return expenseService.getAll();
    }

    @GetMapping("/{name}")
    public Expense getById(@PathVariable String name) {
        return expenseService.getById(name);
    }

    @PutMapping("/{name}")
    public Expense update(
        @PathVariable String name,
        @Valid @RequestBody UpdateExpense request) {
        return expenseService.update(name, request.name(), request.description(), request.amount(), request.date(), request.categoryName());
    }

    @DeleteMapping("/{name}")
    public void delete(@PathVariable String name) {
        expenseService.delete(name);
    }
}
