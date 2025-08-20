/**
 * useFormValidation Hook for Aerophilia 2025
 * Custom hook for form validation with TypeScript support
 */

import { useState, useCallback } from 'react';
import { APP_MESSAGES } from '../constants/appMessages';

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | null;
}

export interface ValidationRules {
  [key: string]: ValidationRule;
}

export interface ValidationErrors {
  [key: string]: string;
}

export interface UseFormValidationReturn {
  errors: ValidationErrors;
  isValid: boolean;
  validate: (formData: Record<string, any>) => boolean;
  validateField: (fieldName: string, value: any) => string | null;
  clearErrors: () => void;
  clearFieldError: (fieldName: string) => void;
}

export const useFormValidation = (rules: ValidationRules): UseFormValidationReturn => {
  const [errors, setErrors] = useState<ValidationErrors>({});

  // Validate a single field
  const validateField = useCallback((fieldName: string, value: any): string | null => {
    const rule = rules[fieldName];
    if (!rule) return null;

    // Required validation
    if (rule.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
      return `${fieldName} is required`;
    }

    // Skip other validations if field is empty and not required
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      return null;
    }

    // Min length validation
    if (rule.minLength && typeof value === 'string' && value.length < rule.minLength) {
      return `${fieldName} must be at least ${rule.minLength} characters long`;
    }

    // Max length validation
    if (rule.maxLength && typeof value === 'string' && value.length > rule.maxLength) {
      return `${fieldName} must not exceed ${rule.maxLength} characters`;
    }

    // Pattern validation
    if (rule.pattern && typeof value === 'string' && !rule.pattern.test(value)) {
      // Common pattern error messages
      if (fieldName.toLowerCase().includes('email')) {
        return APP_MESSAGES.VALIDATION.EMAIL_INVALID;
      }
      if (fieldName.toLowerCase().includes('phone')) {
        return APP_MESSAGES.VALIDATION.PHONE_INVALID;
      }
      return `${fieldName} format is invalid`;
    }

    // Custom validation
    if (rule.custom) {
      return rule.custom(value);
    }

    return null;
  }, [rules]);

  // Validate entire form
  const validate = useCallback((formData: Record<string, any>): boolean => {
    const newErrors: ValidationErrors = {};

    // Validate all fields that have rules
    Object.keys(rules).forEach(fieldName => {
      const error = validateField(fieldName, formData[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [rules, validateField]);

  // Clear all errors
  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  // Clear specific field error
  const clearFieldError = useCallback((fieldName: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
  }, []);

  const isValid = Object.keys(errors).length === 0;

  return {
    errors,
    isValid,
    validate,
    validateField,
    clearErrors,
    clearFieldError,
  };
};

// Common validation rules
export const VALIDATION_RULES = {
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  password: {
    required: true,
    minLength: 8,
  },
  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  phone: {
    required: true,
    pattern: /^[+]?[1-9][\d\s\-\(\)]{8,15}$/,
  },
  teamName: {
    required: true,
    minLength: 3,
    maxLength: 50,
  },
} as const;
