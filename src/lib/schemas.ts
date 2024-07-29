import { z } from 'zod';

const specialCharacter = new RegExp(/[!@#$%^&*(),.?":{}|<>]/);
const lowercase = new RegExp(/[a-z]/);
const uppercase = new RegExp(/[A-Z]/);
const number = new RegExp(/[0-9]/);

export const loginSchema = z.object({
	email: z.string(),
	password: z.string()
});
export type LoginSchema = typeof loginSchema;

export const signupSchema = z
  .object({
    username: z.string().min(4, { message: 'Must be at least 4 characters long' }).max(20, { message: 'Must be at most 20 characters long' }),
    email: z.string().email({ message: 'Must be a valid email address' }),
    password: z
      .string()
      .min(6, { message: 'Must be at least 6 characters long' })
      .regex(lowercase, { message: 'Must contain at least one lowercase letter' })
      .regex(uppercase, { message: 'Must contain at least one uppercase letter' })
      .regex(number, { message: 'Must contain at least one number' })
      .regex(specialCharacter, { message: 'Must contain at least one special character' }),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
  path: ["confirmPassword"],
  });
export type SignupSchema = typeof signupSchema;

export const signupConfirmSchema = z.object({
  email: z.string().email({ message: 'Must be a valid email' }),
  code: z.string()
    .regex(/^\d{4}$/, { message: 'Must be 4 digits long' })
})
export type SignupConfirmSchema = typeof signupConfirmSchema;
