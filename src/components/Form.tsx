'use client';

import { useRef, useState } from "react";
import { Button } from "./form/Button";
import { Input } from "./form/Input";

export const Form = () => {
  const [isValid, setIsValid] = useState<boolean | undefined>();
  const [isSubmitted, setIsSubmitted] = useState<boolean | undefined>();
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        console.table({
          email: formData.get('email'),
          password: formData.get('password'),
        });

        setIsSubmitted(true);
      }}
      onChange={(e) => setIsValid(e.currentTarget.checkValidity())}
      onInvalid={(e) => {
        e.preventDefault();
      }}
      ref={formRef}
      className="flex flex-col gap-4 w-2/3"
    >
      {isSubmitted && <p className="text-green-500">Form has been submitted!</p>}
      <Input 
        name="email"
        label="Email"
        type="email"
        placeholder="Email"
        pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
        autoComplete="email"
        onInvalid={e => {
          const { validity } = e.currentTarget;
          
          if (validity.typeMismatch || validity.patternMismatch) {
            e.currentTarget.setCustomValidity('Invalid email');
          }
        }}
        required
      />
      <Input 
        name="password"
        label="Password"
        type="password"
        placeholder="Password"
        pattern="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\S+$).{8,}$"
        required
      />
      <Button label="Submit" /* disabled={!isValid} */ />
    </form>
  );
};