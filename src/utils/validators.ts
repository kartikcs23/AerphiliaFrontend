export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 */
export const isValidPassword = (password: string): {
  isValid: boolean;
  requirements: {
    minLength: boolean;
    hasUppercase: boolean;
    hasLowercase: boolean;
    hasNumber: boolean;
    hasSpecialChar: boolean;
  };
} => {
  const requirements = {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const isValid = Object.values(requirements).every(req => req);

  return { isValid, requirements };
};

/**
 * Validate Indian phone number
 */
export const isValidPhoneNumber = (phone: string): boolean => {
  // Remove all non-digits
  const cleaned = phone.replace(/\D/g, '');
  
  // Check for 10-digit Indian mobile number
  if (cleaned.length === 10 && /^[6-9]/.test(cleaned)) {
    return true;
  }
  
  // Check for 12-digit number with country code (91)
  if (cleaned.length === 12 && cleaned.startsWith('91') && /^91[6-9]/.test(cleaned)) {
    return true;
  }
  
  return false;
};

/**
 * Validate name (alphabets, spaces, hyphens only)
 */
export const isValidName = (name: string): boolean => {
  const nameRegex = /^[a-zA-Z\s\-'\.]+$/;
  return nameRegex.test(name) && name.trim().length >= 2;
};

/**
 * Validate team name
 */
export const isValidTeamName = (teamName: string): boolean => {
  const trimmed = teamName.trim();
  return trimmed.length >= 3 && trimmed.length <= 50 && /^[a-zA-Z0-9\s\-_]+$/.test(trimmed);
};

/**
 * Validate college/institution name
 */
export const isValidCollegeName = (college: string): boolean => {
  const trimmed = college.trim();
  return trimmed.length >= 2 && trimmed.length <= 100;
};

/**
 * Validate year of study
 */
export const isValidYearOfStudy = (year: string): boolean => {
  const validYears = ['1st', '2nd', '3rd', '4th', '5th', 'Graduate', 'Post Graduate', 'PhD'];
  return validYears.includes(year);
};

/**
 * Validate age (for events with age restrictions)
 */
export const isValidAge = (age: number, minAge: number = 16, maxAge: number = 35): boolean => {
  return age >= minAge && age <= maxAge;
};

/**
 * Validate file type for uploads
 */
export const isValidFileType = (fileName: string, allowedTypes: string[]): boolean => {
  const fileExtension = fileName.split('.').pop()?.toLowerCase();
  return allowedTypes.includes(fileExtension || '');
};

/**
 * Validate file size
 */
export const isValidFileSize = (fileSize: number, maxSizeInMB: number): boolean => {
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  return fileSize <= maxSizeInBytes;
};

/**
 * Validate URL format
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Validate Indian Pincode
 */
export const isValidPincode = (pincode: string): boolean => {
  const pincodeRegex = /^[1-9][0-9]{5}$/;
  return pincodeRegex.test(pincode);
};

/**
 * Validate emergency contact relationship
 */
export const isValidRelationship = (relationship: string): boolean => {
  const validRelationships = [
    'Parent', 'Guardian', 'Sibling', 'Spouse', 'Friend', 
    'Relative', 'Teacher', 'Mentor', 'Other'
  ];
  return validRelationships.includes(relationship);
};

/**
 * Validate payment amount
 */
export const isValidPaymentAmount = (amount: number, expectedAmount: number): boolean => {
  return amount === expectedAmount && amount > 0;
};

/**
 * Validate registration deadline
 */
export const isRegistrationOpen = (deadline: Date): boolean => {
  const now = new Date();
  return now < deadline;
};

/**
 * Validate team member count
 */
export const isValidTeamSize = (memberCount: number, minSize: number, maxSize: number): boolean => {
  return memberCount >= minSize && memberCount <= maxSize;
};

/**
 * Comprehensive form validation
 */
export const validateRegistrationForm = (formData: any): {
  isValid: boolean;
  errors: Record<string, string>;
} => {
  const errors: Record<string, string> = {};

  // Validate required fields
  if (!formData.eventId) {
    errors.eventId = 'Please select an event';
  }

  if (!formData.participantType) {
    errors.participantType = 'Please select participant type';
  }

  if (formData.participantType === 'team') {
    if (!formData.teamName || !isValidTeamName(formData.teamName)) {
      errors.teamName = 'Please enter a valid team name (3-50 characters, alphanumeric)';
    }

    if (!formData.teamMembers || formData.teamMembers.length === 0) {
      errors.teamMembers = 'Please add at least one team member';
    }

    formData.teamMembers?.forEach((member: any, index: number) => {
      if (!member.name || !isValidName(member.name)) {
        errors[`teamMember${index}Name`] = `Team member ${index + 1}: Invalid name`;
      }

      if (!member.email || !isValidEmail(member.email)) {
        errors[`teamMember${index}Email`] = `Team member ${index + 1}: Invalid email`;
      }

      if (!member.phone || !isValidPhoneNumber(member.phone)) {
        errors[`teamMember${index}Phone`] = `Team member ${index + 1}: Invalid phone number`;
      }
    });
  }

  if (!formData.emergencyContact?.name || !isValidName(formData.emergencyContact.name)) {
    errors.emergencyContactName = 'Please enter a valid emergency contact name';
  }

  if (!formData.emergencyContact?.phone || !isValidPhoneNumber(formData.emergencyContact.phone)) {
    errors.emergencyContactPhone = 'Please enter a valid emergency contact phone';
  }

  if (!formData.emergencyContact?.relationship || !isValidRelationship(formData.emergencyContact.relationship)) {
    errors.emergencyContactRelationship = 'Please select a valid relationship';
  }

  if (!formData.agreeToTerms) {
    errors.agreeToTerms = 'You must agree to the terms and conditions';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
