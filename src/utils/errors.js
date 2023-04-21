export function getFormErrorsByField(error, field) {
  /*
   * Given an error object and a field name, return the error message for that field.
   * If there is no error for the field, return an empty string.
   */

  if (!error || !field) {
    return "";
  }

  const errors = error.errors || {};
  const fieldErrors = errors[field] || [];

  if (fieldErrors.length > 0) {
    return fieldErrors[0];
  }

  return "";
}

export function hasErrorForField(error, field) {
  console.log(error);
  console.log(field);
  /*
   * Given an error object and a field name, return true if there is an error message for that field.
   * Otherwise, return false.
   */

  if (!error || !field) {
    return false;
  }

  const errors = error.errors || {};
  const fieldErrors = errors[field] || [];

  console.log(fieldErrors.length > 0);

  return fieldErrors.length > 0;
}
