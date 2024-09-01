export function isFilled(fields) {
  // checking for empty or undefined fields and returning an error message if found
  for (const [key, value] of Object.entries(fields)) {
    if (!value || value.toString().trim() === "") {
      return {
        exist: false,
        message: `${key.charAt(0).toUpperCase() + key.slice(1)} is required`,
      };
    }
  }
  return { exist: true };
}
