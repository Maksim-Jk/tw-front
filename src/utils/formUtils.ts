export function getFieldProps(v$: any, field: string) {
  const fieldValidator = v$[field];
  return {
    errorMessage: fieldValidator.$errors[0]?.$message,
    isDirty: fieldValidator.$dirty,
    hasError: fieldValidator.$error,
  };
}
