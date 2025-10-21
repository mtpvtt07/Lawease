/**
 * Checks if a string is a valid 10-digit Indian mobile number (starts with 6, 7, 8, or 9).
 * @param {string} mobile The mobile number to check.
 * @returns {boolean} True if valid, otherwise false.
 */

// check user mobile number is valid or not 
export const isValidMobile = (mobile) => {
    // 1. Presence and Type Check
    if (typeof mobile !== 'string' || mobile.trim() === '') {
        return false;
    }
    
    // Remove all non-digit characters (except for the validation)
    const cleanedMobile = mobile.replace(/\D/g, ''); 
    
    // 2. Specific Format Check (10 digits starting with 6-9)
    const indianMobileRegex = /^[6-9]\d{9}$/;

    return indianMobileRegex.test(cleanedMobile);
};