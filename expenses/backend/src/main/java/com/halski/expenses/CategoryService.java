package com.halski.expenses;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public Category create(String name, String description) {
        Category category = new Category();
        category.setName(name);
        category.setDescription(description);

        return categoryRepository.save(category);
    }

    public Category update(Long id, String name, String description) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Category with id '" + id + "' not found"));

        category.setName(name);
        category.setDescription(description);

        return categoryRepository.save(category);
    }

    public List<Category> getAll() {
        return categoryRepository.findAll();
    }
}
