/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Form, Input, Button } from "@nextui-org/react";
import { useState } from "react";

export default function RegisterPage() {
  const [action, setAction] = useState<null | string>(null);

  const handleLogin = async (e: any) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <Form
        className="w-full max-w-xs flex flex-col gap-4"
        validationBehavior="native"
        onReset={() => setAction("reset")}
        onSubmit={handleLogin}
      >
        <Input
          isRequired
          errorMessage="Please enter a valid fullname"
          label="Fullname"
          labelPlacement="outside"
          name="fullname"
          placeholder="Enter your fullname"
          type="text"
        />
        <Input
          isRequired
          errorMessage="Please enter a valid email"
          label="Email"
          labelPlacement="outside"
          name="email"
          placeholder="Enter your email"
          type="email"
        />
        <Input
          isRequired
          errorMessage="Confirm a valid password"
          label="Confirm Password"
          labelPlacement="outside"
          name="password"
          placeholder="Confirm your password"
          type="password"
        />

        <div className="flex gap-2">
          <Button color="primary" type="submit">
            Submit
          </Button>
          <Button type="reset" variant="flat">
            Reset
          </Button>
        </div>
        {action && (
          <div className="text-small text-default-500">
            Action: <code>{action}</code>
          </div>
        )}
      </Form>
    </div>
  );
}