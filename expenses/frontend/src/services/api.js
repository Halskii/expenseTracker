/**
 * API Client for Expense Tracker Backend
 * 
 * Learning point: This file centralizes all backend API calls.
 * Instead of making fetch calls scattered throughout components,
 * all API logic lives here. Components import functions from this file.
 * 
 * Benefits:
 * - Easy to change API URL in one place
 * - Consistent error handling
 * - Cleaner component code
 */

const API_BASE_URL = 'http://localhost:8080/api';

/**
 * Helper function to handle API responses
 * Checks for errors and formats response data
 */
async function handleResponse(response) {
  // If response is not OK (status outside 200-299 range)
  if (!response.ok) {
    // Try to parse error message from backend
    let errorData;
    try {
      errorData = await response.json();
    } catch {
      errorData = { error: 'An error occurred' };
    }
    
    // Create error with backend message
    const error = new Error(
      errorData.error || 
      Object.values(errorData).join(', ') || 
      'API Error'
    );
    error.status = response.status;
    error.data = errorData;
    throw error;
  }
  
  return response.json();
}

// ========== EXPENSE ENDPOINTS ==========

/**
 * Get all expenses
 * Returns: Array of expense objects
 */
export async function getExpenses() {
  const response = await fetch(`${API_BASE_URL}/expenses`);
  return handleResponse(response);
}

/**
 * Get a single expense by name
 * Returns: Single expense object
 */
export async function getExpenseByName(name) {
  const response = await fetch(`${API_BASE_URL}/expenses/${name}`);
  return handleResponse(response);
}

/**
 * Create a new expense
 * Expects: { name, description, amount, date, categoryName }
 * Returns: Created expense object with ID
 */
export async function createExpense(expenseData) {
  const response = await fetch(`${API_BASE_URL}/expenses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(expenseData),
  });
  return handleResponse(response);
}

/**
 * Update an existing expense
 * Expects: { name, description, amount, date, categoryName }
 * Returns: Updated expense object
 */
export async function updateExpense(originalName, expenseData) {
  const response = await fetch(`${API_BASE_URL}/expenses/${originalName}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(expenseData),
  });
  return handleResponse(response);
}

/**
 * Delete an expense
 * Returns: nothing (204 No Content)
 */
export async function deleteExpense(name) {
  const response = await fetch(`${API_BASE_URL}/expenses/${name}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch {
      errorData = { error: 'Failed to delete expense' };
    }
    const error = new Error(errorData.error || 'Failed to delete expense');
    error.status = response.status;
    throw error;
  }
}

// ========== CATEGORY ENDPOINTS ==========

/**
 * Get all categories
 * Returns: Array of category objects
 */
export async function getCategories() {
  const response = await fetch(`${API_BASE_URL}/categories`);
  return handleResponse(response);
}

/**
 * Create a new category
 * Expects: { name, description }
 * Returns: Created category object with ID
 */
export async function createCategory(categoryData) {
  const response = await fetch(`${API_BASE_URL}/categories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(categoryData),
  });
  return handleResponse(response);
}

/**
 * Update an existing category
 * Expects: { name, description }
 * Returns: Updated category object
 */
export async function updateCategory(categoryId, categoryData) {
  const response = await fetch(`${API_BASE_URL}/categories/${categoryId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(categoryData),
  });
  return handleResponse(response);
}
