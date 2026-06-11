import { useState, useEffect } from 'react';
import { createCategory, updateCategory } from '../services/api.js';
import '../styles/CategoryForm.css';

/**
 * CategoryForm Component
 * 
 * Learning goals:
 * - Controlled components: Form inputs controlled by state
 * - Form submission: Handling form data and sending to API
 * - Conditional rendering: Different UI for create vs edit mode
 * - State management: Track input values and submission state
 */
export default function CategoryForm({ 
  category = null, 
  onCategoryAdded, 
  onCategoryUpdated, 
  onCancel,
  title = "Add New Category"
}) {
  // Form state
  const [name, setName] = useState(category?.name || '');
  const [description, setDescription] = useState(category?.description || '');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // When category prop changes, update form fields
  useEffect(() => {
    if (category) {
      setName(category.name);
      setDescription(category.description || '');
    }
  }, [category]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const categoryData = { name, description };

      if (category) {
        // Update existing category
        const updated = await updateCategory(category.id, categoryData);
        onCategoryUpdated(updated);
        // Note: Form stays visible in edit mode; parent handles UI
      } else {
        // Create new category
        const created = await createCategory(categoryData);
        onCategoryAdded(created);
        
        // Clear form after successful creation
        setName('');
        setDescription('');
      }
    } catch (err) {
      setError(err.data || { error: err.message });
    } finally {
      setLoading(false);
    }
  }

  function handleCancel() {
    setName('');
    setDescription('');
    setError(null);
    onCancel?.();
  }

  return (
    <form className="category-form" onSubmit={handleSubmit}>
      <h3>{title}</h3>

      {/* Display errors from backend validation */}
      {error && (
        <div className="error-message">
          {error.error || 
            Object.entries(error).map(([field, message]) => (
              <div key={field}>{field}: {message}</div>
            ))}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="name">Category Name *</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Groceries, Entertainment"
          required
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Optional description"
          disabled={loading}
          rows="3"
        />
      </div>

      <div className="form-actions">
        <button 
          type="submit" 
          className="btn-submit"
          disabled={loading}
        >
          {loading ? 'Saving...' : (category ? 'Update' : 'Create')}
        </button>
        {category && (
          <button 
            type="button" 
            className="btn-cancel"
            onClick={handleCancel}
            disabled={loading}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
