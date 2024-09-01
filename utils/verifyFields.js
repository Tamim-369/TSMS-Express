export function validate(fields) {
  // checking for empty or undefined fields and returning an error message if found
  for (const [key, value] of Object.entries(fields)) {
    if (!value || value.trim() === "") {
      return {
        valid: false,
        message: `${key.charAt(0).toUpperCase() + key.slice(1)} is required`,
      };
    }
  }
  return { valid: true };
}
