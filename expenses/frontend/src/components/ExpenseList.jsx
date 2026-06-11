import { useState, useEffect } from 'react';
import { getExpenses, deleteExpense } from '../services/api.js';
import ExpenseForm from './ExpenseForm';
import '../styles/ExpenseList.css';

/**
 * ExpenseList Component
 * 
 * Learning goals:
 * - More complex state management with multiple related lists
 * - Displaying formatted data (amounts, dates)
 * - Deletion with confirmation
 * - Managing edit/create modes
 */
export default function ExpenseList({ categories }) {
  const [expenses, setExpenses] = useState([]);
  const [editingName, setEditingName] = useState(null);
  const [editingExpense, setEditingExpense] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadExpenses();
  }, []);

  async function loadExpenses() {
    try {
      setLoading(true);
      setError(null);
      const data = await getExpenses();
      setExpenses(data);
    } catch (err) {
      setError(err.message || 'Failed to load expenses');
      console.error('Error loading expenses:', err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(expenseName) {
    if (!window.confirm(`Delete expense "${expenseName}"?`)) {
      return;
    }

    try {
      await deleteExpense(expenseName);
      setExpenses(expenses.filter(exp => exp.name !== expenseName));
    } catch (err) {
      setError(err.message || 'Failed to delete expense');
      console.error('Delete error:', err);
    }
  }

  function handleEdit(expense) {
    setEditingName(expense.name);
    setEditingExpense(expense);
  }

  function handleCancelEdit() {
    setEditingName(null);
    setEditingExpense(null);
  }

  function handleExpenseAdded(newExpense) {
    setExpenses([...expenses, newExpense]);
  }

  function handleExpenseUpdated(updatedExpense) {
    setExpenses(
      expenses.map(exp => 
        exp.name === editingName ? updatedExpense : exp
      )
    );
    handleCancelEdit();
  }

  if (loading) {
    return <div className="loading">Loading expenses...</div>;
  }

  return (
    <div className="expense-list-container">
      <h2>Expenses</h2>

      {error && <div className="error-message">{error}</div>}

      {editingName === null ? (
        <ExpenseForm 
          categories={categories}
          onExpenseAdded={handleExpenseAdded}
          title="Add New Expense"
        />
      ) : (
        <ExpenseForm 
          expense={editingExpense}
          originalName={editingName}
          categories={categories}
          onExpenseUpdated={handleExpenseUpdated}
          onCancel={handleCancelEdit}
          title="Edit Expense"
        />
      )}

      <div className="expenses-list">
        <h3>Your Expenses</h3>
        {expenses.length === 0 ? (
          <p>No expenses yet. Create one above!</p>
        ) : (
          <table className="expenses-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map(expense => (
                <tr key={expense.id} className="expense-row">
                  <td className="expense-name">{expense.name}</td>
                  <td className="expense-category">{expense.categoryName}</td>
                  <td className="expense-amount">${expense.amount.toFixed(2)}</td>
                  <td className="expense-date">{expense.date}</td>
                  <td className="expense-description">{expense.description || '-'}</td>
                  <td className="expense-actions">
                    <button 
                      onClick={() => handleEdit(expense)}
                      className="btn-edit"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(expense.name)}
                      className="btn-delete"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Summary section */}
      {expenses.length > 0 && (
        <div className="expense-summary">
          <p>
            <strong>Total:</strong> $
            {expenses
              .reduce((sum, exp) => sum + exp.amount, 0)
              .toFixed(2)}
          </p>
        </div>
      )}
    </div>
  );
}
