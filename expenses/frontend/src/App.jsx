import { useState, useEffect } from 'react';
import { getCategories } from './services/api';
import CategoryList from './components/CategoryList';
import ExpenseList from './components/ExpenseList';
import './App.css';

/**
 * Main App Component
 * 
 * This component:
 * 1. Loads categories on startup
 * 2. Passes categories to both CategoryList and ExpenseList
 * 3. Manages the overall app layout
 * 
 * Learning point: Notice how categories are loaded once here
 * and shared with child components. This avoids loading them
 * multiple times and keeps components in sync.
 */
function App() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      console.error('Failed to load categories:', err);
    } finally {
      setLoading(false);
    }
  }

  // Update categories after a new one is added in CategoryList
  // This is a simple way to keep everything in sync
  function handleCategoryAdded(newCategory) {
    setCategories([...categories, newCategory]);
  }

  function handleCategoryUpdated(updatedCategory) {
    setCategories(
      categories.map(cat => 
        cat.id === updatedCategory.id ? updatedCategory : cat
      )
    );
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>💰 Expense Tracker</h1>
        <p>Track your spending with categories</p>
      </header>

      <main className="app-main">
        <div className="app-grid">
          {/* Categories Section */}
          <section className="categories-section">
            <CategoryList 
              onCategoryAdded={handleCategoryAdded}
              onCategoryUpdated={handleCategoryUpdated}
            />
          </section>

          {/* Expenses Section */}
          <section className="expenses-section">
            {loading ? (
              <div className="loading">Loading categories...</div>
            ) : (
              <ExpenseList categories={categories} />
            )}
          </section>
        </div>
      </main>

      <footer className="app-footer">
        <p>Learning React & Spring Boot 🚀</p>
      </footer>
    </div>
  );
}

export default App;
