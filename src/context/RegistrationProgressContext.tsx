import React, { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { RegistrationProgress, RegistrationFormData, RegistrationStep } from '../types/Registration.types';

interface RegistrationProgressContextType {
  progress: RegistrationProgress;
  nextStep: () => void;
  previousStep: () => void;
  goToStep: (stepNumber: number) => void;
  updateFormData: (data: Partial<RegistrationFormData>) => void;
  resetProgress: () => void;
  markStepCompleted: (stepNumber: number) => void;
}

const RegistrationProgressContext = createContext<RegistrationProgressContextType | undefined>(undefined);

interface RegistrationProgressProviderProps {
  children: ReactNode;
}

const INITIAL_STEPS: RegistrationStep[] = [
  {
    id: 1,
    title: 'Event Selection',
    description: 'Choose your event and team type',
    isCompleted: false,
    isActive: true,
  },
  {
    id: 2,
    title: 'Team Information',
    description: 'Provide team and member details',
    isCompleted: false,
    isActive: false,
  },
  {
    id: 3,
    title: 'Payment',
    description: 'Complete registration payment',
    isCompleted: false,
    isActive: false,
  },
  {
    id: 4,
    title: 'Confirmation',
    description: 'Registration confirmation and receipt',
    isCompleted: false,
    isActive: false,
  },
];

export const RegistrationProgressProvider: React.FC<RegistrationProgressProviderProps> = ({ children }) => {
  const [progress, setProgress] = useState<RegistrationProgress>({
    currentStep: 1,
    totalSteps: INITIAL_STEPS.length,
    steps: INITIAL_STEPS,
    formData: {},
  });

  // Move to next step
  const nextStep = useCallback(() => {
    setProgress(prev => {
      if (prev.currentStep < prev.totalSteps) {
        const newSteps = prev.steps.map(step => ({
          ...step,
          isActive: step.id === prev.currentStep + 1,
          isCompleted: step.id < prev.currentStep + 1 ? true : step.isCompleted,
        }));

        return {
          ...prev,
          currentStep: prev.currentStep + 1,
          steps: newSteps,
        };
      }
      return prev;
    });
  }, []);

  // Move to previous step
  const previousStep = useCallback(() => {
    setProgress(prev => {
      if (prev.currentStep > 1) {
        const newSteps = prev.steps.map(step => ({
          ...step,
          isActive: step.id === prev.currentStep - 1,
        }));

        return {
          ...prev,
          currentStep: prev.currentStep - 1,
          steps: newSteps,
        };
      }
      return prev;
    });
  }, []);

  // Go to specific step
  const goToStep = useCallback((stepNumber: number) => {
    setProgress(prev => {
      if (stepNumber >= 1 && stepNumber <= prev.totalSteps) {
        const newSteps = prev.steps.map(step => ({
          ...step,
          isActive: step.id === stepNumber,
        }));

        return {
          ...prev,
          currentStep: stepNumber,
          steps: newSteps,
        };
      }
      return prev;
    });
  }, []);

  // Update form data
  const updateFormData = useCallback((data: Partial<RegistrationFormData>) => {
    setProgress(prev => ({
      ...prev,
      formData: { ...prev.formData, ...data },
    }));
  }, []);

  // Reset progress
  const resetProgress = useCallback(() => {
    setProgress({
      currentStep: 1,
      totalSteps: INITIAL_STEPS.length,
      steps: INITIAL_STEPS.map(step => ({
        ...step,
        isCompleted: false,
        isActive: step.id === 1,
      })),
      formData: {},
    });
  }, []);

  // Mark step as completed
  const markStepCompleted = useCallback((stepNumber: number) => {
    setProgress(prev => {
      const newSteps = prev.steps.map(step => 
        step.id === stepNumber ? { ...step, isCompleted: true } : step
      );

      return {
        ...prev,
        steps: newSteps,
      };
    });
  }, []);

  const value: RegistrationProgressContextType = {
    progress,
    nextStep,
    previousStep,
    goToStep,
    updateFormData,
    resetProgress,
    markStepCompleted,
  };

  return (
    <RegistrationProgressContext.Provider value={value}>
      {children}
    </RegistrationProgressContext.Provider>
  );
};

// Custom hook to use registration progress context
export const useRegistrationProgress = (): RegistrationProgressContextType => {
  const context = useContext(RegistrationProgressContext);
  if (context === undefined) {
    throw new Error('useRegistrationProgress must be used within a RegistrationProgressProvider');
  }
  return context;
};
