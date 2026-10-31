package com.halski.expenses;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;
import jakarta.validation.Valid;
import com.halski.expenses.dto.CreateCategory;
import com.halski.expenses.dto.UpdateCategory;
import java.util.List;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "http://localhost:5173")
public class CategoryController {
    
    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @PostMapping
    public Category create(@Valid @RequestBody CreateCategory request) {
        return categoryService.create(request.name(), request.description());
    }

    @PutMapping("/{id}")
    public Category update(
        @PathVariable Long id,
        @Valid @RequestBody UpdateCategory request) {
        return categoryService.update(id, request.name(), request.description());
    }

    @GetMapping({"", "/"})
    public List<Category> getAll() {
        return categoryService.getAll();
    }
}
