export default function isFieldValid<TFieldValues, K extends keyof TFieldValues>(formState: any, field: K) {
  return formState.dirtyFields[field] && !formState.errors[field];
}
