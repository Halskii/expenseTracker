package main.java.com.halski.expenses;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;

/**
 * Centralized exception handler for the application.
 * Converts exceptions into consistent JSON error responses that the frontend expects.
 * 
 * Learning point: Instead of controllers throwing exceptions,
 * this intercepts all exceptions and returns predictable error JSON.
 */
@ControllerAdvice
public class GlobalExceptionHandler {

    /**
     * Handles validation errors (e.g., @NotBlank, @Positive fail)
     * Returns 400 Bad Request with field-level error messages
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(
            MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        
        ex.getBindingResult().getFieldErrors().forEach(error ->
            errors.put(error.getField(), error.getDefaultMessage())
        );
        
        return ResponseEntity
            .status(HttpStatus.BAD_REQUEST)
            .body(errors);
    }

    /**
     * Handles not found errors (e.g., requesting an expense that doesn't exist)
     * Returns 404 Not Found with descriptive message
     */
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, String>> handleNotFound(IllegalArgumentException ex) {
        Map<String, String> error = new HashMap<>();
        error.put("error", ex.getMessage());
        
        return ResponseEntity
            .status(HttpStatus.NOT_FOUND)
            .body(error);
    }

    /**
     * Handles all other unexpected exceptions
     * Returns 500 Internal Server Error with a generic message
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleGenericException(Exception ex) {
        Map<String, String> error = new HashMap<>();
        error.put("error", "An unexpected error occurred. Please try again.");
        
        // In production, you'd log this: logger.error("Unexpected error", ex);
        ex.printStackTrace();
        
        return ResponseEntity
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(error);
    }
}
