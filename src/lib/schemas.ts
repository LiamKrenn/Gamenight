import { z } from 'zod';

const verificationCodeLength = 4;
const verificationCode = new RegExp(/^\d{4}$/);
const specialCharacter = new RegExp(/[!@#$%^&*(),.?":{}|<>]/);
const lowercase = new RegExp(/[a-z]/);
const uppercase = new RegExp(/[A-Z]/);
const number = new RegExp(/[0-9]/);
const noUmlaut = new RegExp(/^[^äöüÄÖÜß]*$/);
const noWhitespace = new RegExp(/^\S+$/);
const onlyLettersAndNumbers = new RegExp(/^[a-zA-Z0-9]*$/);

export const profileSchema = z.object({
	username: z
		.string()
		.min(4, { message: 'Must be at least 4 characters long' })
		.max(20, { message: 'Must be at most 20 characters long' })
		.regex(noUmlaut, { message: 'Must not contain umlauts' })
		.regex(noWhitespace, { message: 'Must not contain whitespaces' })
		.regex(onlyLettersAndNumbers, { message: 'Must not contain special characters' }),
	email: z.string().email({ message: 'Must be a valid email address' })
});
export type ProfileSchema = typeof profileSchema;

export const loginSchema = z.object({
	email: z.string(),
	password: z.string()
});
export type LoginSchema = typeof loginSchema;

export const signupSchema = z
	.object({
		username: z
			.string()
			.min(4, { message: 'Must be at least 4 characters long' })
			.max(20, { message: 'Must be at most 20 characters long' })
			.regex(noUmlaut, { message: 'Must not contain umlauts' })
			.regex(noWhitespace, { message: 'Must not contain whitespaces' })
			.regex(onlyLettersAndNumbers, { message: 'Must not contain special characters' }),
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
		path: ['confirmPassword']
	});
export type SignupSchema = typeof signupSchema;

export const signupConfirmSchema = z.object({
	email: z.string().email({ message: 'Must be a valid email' }),
	code: z.string().regex(verificationCode, { message: `Must be ${verificationCodeLength} digits long` })
});
export type SignupConfirmSchema = typeof signupConfirmSchema;

export const forgotPasswordSchema = z.object({
  email: z.string(),
	new_password: z
			.string()
			.min(6, { message: 'Must be at least 6 characters long' })
			.regex(lowercase, { message: 'Must contain at least one lowercase letter' })
			.regex(uppercase, { message: 'Must contain at least one uppercase letter' })
			.regex(number, { message: 'Must contain at least one number' })
			.regex(specialCharacter, { message: 'Must contain at least one special character' }),
	confirmPassword: z.string()
}).refine((data) => data.new_password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword']
});
export type ForgotPasswordSchema = typeof forgotPasswordSchema;

export const forgotPasswordConfirmSchema = z.object({
  email: z.string(),
  code: z.string().regex(verificationCode, { message: `Must be ${verificationCodeLength} digits long` })
});
export type ForgotPasswordConfirmSchema = typeof forgotPasswordConfirmSchema;

