interface FieldProps {
  errorMessage?: string;
  isDirty: boolean;
  hasError: boolean;
}

interface ValidationResult {
  $errors: Array<{ $message: string }>;
  $dirty: boolean;
  $error: boolean;
}

export function getFieldProps(v$: Record<string, ValidationResult>, field: string): FieldProps {
  const fieldValidator = v$[field];
  return {
    errorMessage: fieldValidator.$errors[0]?.$message,
    isDirty: fieldValidator.$dirty,
    hasError: fieldValidator.$error,
  };
}
