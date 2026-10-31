import { useState, useEffect } from 'react';
import { createExpense, updateExpense } from '../services/api.js';
import '../styles/ExpenseForm.css';

/**
 * ExpenseForm Component
 * 
 * Learning goals:
 * - Working with date inputs in React
 * - Dependent state: Using categories list to populate dropdown
 * - More complex form with multiple field types
 * - Validation and error handling
 */
export default function ExpenseForm({ 
  expense = null,
  originalName = null,
  categories = [],
  onExpenseAdded,
  onExpenseUpdated,
  onCancel,
  title = "Add New Expense"
}) {
  const [name, setName] = useState(expense?.name || '');
  const [description, setDescription] = useState(expense?.description || '');
  const [amount, setAmount] = useState(expense?.amount || '');
  const [date, setDate] = useState(expense?.date || '');
  const [categoryName, setCategoryName] = useState(expense?.categoryName || '');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Update form when expense prop changes
  useEffect(() => {
    if (expense) {
      setName(expense.name);
      setDescription(expense.description || '');
      setAmount(expense.amount);
      setDate(expense.date);
      setCategoryName(expense.categoryName);
    }
  }, [expense]);

  // Set default category if available
  useEffect(() => {
    if (!expense && categories.length > 0 && !categoryName) {
      setCategoryName(categories[0].name);
    }
  }, [categories, expense, categoryName]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const expenseData = { 
        name, 
        description, 
        amount: parseFloat(amount),
        date,
        categoryName
      };

      if (expense) {
        // Update existing expense
        const updated = await updateExpense(originalName, expenseData);
        onExpenseUpdated(updated);
      } else {
        // Create new expense
        const created = await createExpense(expenseData);
        onExpenseAdded(created);
        
        // Clear form
        setName('');
        setDescription('');
        setAmount('');
        setDate('');
        if (categories.length > 0) {
          setCategoryName(categories[0].name);
        }
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
    setAmount('');
    setDate('');
    setError(null);
    onCancel?.();
  }

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <h3>{title}</h3>

      {error && (
        <div className="error-message">
          {error.error || 
            Object.entries(error).map(([field, message]) => (
              <div key={field}>{field}: {message}</div>
            ))}
        </div>
      )}

      {categories.length === 0 && (
        <div className="warning-message">
          ⚠️ No categories available. Create a category first!
        </div>
      )}

      <div className="form-group">
        <label htmlFor="exp-name">Expense Name *</label>
        <input
          id="exp-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Lunch, Gas"
          required
          disabled={loading}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="exp-amount">Amount *</label>
          <input
            id="exp-amount"
            type="number"
            step="0.01"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="exp-date">Date *</label>
          <input
            id="exp-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            disabled={loading}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="exp-category">Category *</label>
        <select
          id="exp-category"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          required
          disabled={loading || categories.length === 0}
        >
          <option value="">-- Select a category --</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="exp-description">Description</label>
        <textarea
          id="exp-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Optional details"
          disabled={loading}
          rows="3"
        />
      </div>

      <div className="form-actions">
        <button 
          type="submit" 
          className="btn-submit"
          disabled={loading || categories.length === 0}
        >
          {loading ? 'Saving...' : (expense ? 'Update' : 'Create')}
        </button>
        {expense && (
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
