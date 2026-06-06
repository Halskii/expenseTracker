package com.halski.expenses;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {
    
    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @PostMapping
    public Category create(@RequestBody CreateCategory request) {
        return categoryService.create(request.name(), request.description());
    }

    @PutMapping("/{id}")
    public Category update(
        @PathVariable Long id,
        @RequestBody UpdateCategory request) {
        return categoryService.update(id, request.name(), request.description());
    }

    @GetMapping({"", "/"})
    public List<Category> getAll() {
        return categoryService.getAll();
    }

    public static record UpdateCategory(
        @JsonProperty String name,
        @JsonProperty String description
    ) {}

    public static record CreateCategory(
        @JsonProperty String name,
        @JsonProperty String description
    ) {}
}
