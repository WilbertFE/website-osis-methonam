/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Form, Input, Button } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [action, setAction] = useState<null | string>(null);
  const { push } = useRouter();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        redirect: false,
        callbackUrl: "/dashboard",
        email: e.target.email.value,
        password: e.target.password.value,
      });
      if (!res?.error) {
        push("/dashboard");
      } else {
        console.log(res.error);
      }
    } catch (error) {
      console.log(error);
    }
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
          errorMessage="Please enter a valid email"
          label="Email"
          labelPlacement="outside"
          name="email"
          placeholder="Enter your email"
          type="email"
        />
        <Input
          isRequired
          errorMessage="Please enter a valid password"
          label="Password"
          labelPlacement="outside"
          name="password"
          placeholder="Enter your password"
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
