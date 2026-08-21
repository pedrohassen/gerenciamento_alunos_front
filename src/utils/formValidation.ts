export function isFormValid(inputs: { name: string }[], values: Record<string, { value: any }>): boolean {
  return inputs.every((input) => {
    const field = values[input.name];
    return field.value && field.value.toString().trim() !== "";
  });
}
