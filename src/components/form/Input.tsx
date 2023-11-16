'use client';

import { classNames, validationStyles } from "@/utils/classNames";
import { FC, InputHTMLAttributes, useEffect, useRef, useState } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  inputClassNames?: string;
  customErrorMessage?: string;
}

export const Input: FC<Props> = ({ id, label, type = 'text', value, onChange = () => null, inputClassNames = '', customErrorMessage = '', ...props }) => {
  const [inputValue, setValue] = useState<string>('');
  const [validityState, setValidityState] = useState<ValidityState>();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValue(value?.toString() ?? '');
  }, [value]);

  let errorMessage = '';

  if (!validityState?.valid) {
    if (validityState?.customError) {
      errorMessage = inputRef.current?.validationMessage || 'Invalid value';
    } else if (validityState?.valueMissing) {
      errorMessage = 'This field is required';
    } else if (validityState?.typeMismatch) {
      errorMessage = 'This field type is invalid';
    } else if (validityState?.patternMismatch) {
      errorMessage = "This field doesn't match the pattern";
    } else if (validityState?.tooShort) {
      errorMessage = 'Too short';
    } else if (validityState?.tooLong) {
      errorMessage = 'Too long';
    } else if (validityState?.rangeUnderflow) {
      errorMessage = 'Too small';
    } else if (validityState?.rangeOverflow) {
      errorMessage = 'Too big';
    } else if (validityState?.stepMismatch) {
      errorMessage = 'Invalid value';
    } else if (validityState?.badInput) {
      errorMessage = 'Invalid value';
    }
  }

  return (
    <label className="flex flex-col gap-2">
      {label}
      <input 
        id={id}
        type={type} 
        value={inputValue} 
        onChange={(e) => {
          setValue(e.currentTarget.value);
          e.currentTarget.setCustomValidity('');
          setValidityState(e.currentTarget.validity);

          onChange?.(e);
        }}
        ref={inputRef}
        className={classNames('px-1 border outline-none bg-gray-200 dark:bg-gray-700 placeholder:invisible', validationStyles(['border-green-500'], ['bg-red-500', 'border-red-500']), inputClassNames)}
        {...props}
      />
      {errorMessage && (
        <p className="text-red-500">
          {errorMessage}
        </p>
      )}
    </label>
  );
};