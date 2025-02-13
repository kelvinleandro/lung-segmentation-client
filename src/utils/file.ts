/**
 * Handles file selection and validation for `.dcm` files.
 *
 * This function is used as an event handler for a file input field.
 * It validates if the selected file has a `.dcm` extension. If the file is valid,
 * it returns the selected file. Otherwise, it throws an error indicating the file type is invalid.
 *
 * @param {React.ChangeEvent<HTMLInputElement>} event - The change event triggered by selecting a file.
 *
 * @returns {File | undefined} - The selected file if it is a `.dcm` file; otherwise, an error is thrown.
 *
 * @throws {Error} - Throws an error with message "INVALID_FILE_TYPE" if the selected file does not have a `.dcm` extension.
 */
export const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (!file) return;

  if (!file.name.endsWith(".dcm")) {
    throw new Error("INVALID_FILE_TYPE");
  }

  return file;
};
