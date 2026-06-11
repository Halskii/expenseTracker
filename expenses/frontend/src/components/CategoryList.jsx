import { useState, useEffect } from 'react';
import { getCategories } from '../services/api.js';
import CategoryForm from './CategoryForm';
import '../styles/CategoryList.css';

/**
 * CategoryList Component
 * 
 * Learning goals:
 * - useState: Manage component state (categories list, edit mode)
 * - useEffect: Fetch data when component mounts
 * - Conditional rendering: Show form vs list based on state
 * - Event handling: Delete and edit buttons
 */
export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch categories when component mounts
  // Empty dependency array [] means this runs ONCE on mount
  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    try {
      setLoading(true);
      setError(null);
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      setError(err.message || 'Failed to load categories');
      console.error('Error loading categories:', err);
    } finally {
      setLoading(false);
    }
  }

  // Note: Delete category is not yet available in the backend
  // This would need to be implemented in the Spring Boot API first

  function handleEdit(category) {
    setEditingId(category.id);
    setEditingCategory(category);
  }

  function handleCancelEdit() {
    setEditingId(null);
    setEditingCategory(null);
  }

  function handleCategoryAdded(newCategory) {
    // Add new category to the list
    setCategories([...categories, newCategory]);
  }

  function handleCategoryUpdated(updatedCategory) {
    // Update category in the list
    setCategories(
      categories.map(cat => 
        cat.id === updatedCategory.id ? updatedCategory : cat
      )
    );
    handleCancelEdit();
  }

  // Show loading state
  if (loading) {
    return <div className="loading">Loading categories...</div>;
  }

  return (
    <div className="category-list-container">
      <h2>Categories</h2>

      {/* Show error message if there is one */}
      {error && <div className="error-message">{error}</div>}

      {/* Show form for creating new category or editing */}
      {editingId === null ? (
        <CategoryForm 
          onCategoryAdded={handleCategoryAdded}
          title="Add New Category"
        />
      ) : (
        <CategoryForm 
          category={editingCategory}
          onCategoryUpdated={handleCategoryUpdated}
          onCancel={handleCancelEdit}
          title="Edit Category"
        />
      )}

      {/* Show list of categories */}
      <div className="categories-list">
        <h3>Your Categories</h3>
        {categories.length === 0 ? (
          <p>No categories yet. Create one above!</p>
        ) : (
          <ul>
            {categories.map(category => (
              <li key={category.id} className="category-item">
                <div className="category-info">
                  <h4>{category.name}</h4>
                  <p>{category.description || 'No description'}</p>
                </div>
                <div className="category-actions">
                  <button 
                    onClick={() => handleEdit(category)}
                    className="btn-edit"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(category.id)}
                    className="btn-delete"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div> )}