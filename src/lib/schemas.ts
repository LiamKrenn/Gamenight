import { z } from 'zod';

const specialCharacter = new RegExp(/[!@#$%^&*(),.?":{}|<>]/);
const lowercase = new RegExp(/[a-z]/);
const uppercase = new RegExp(/[A-Z]/);
const number = new RegExp(/[0-9]/);

export const loginSchema = z.object({
	email: z.string(),
	password: z
		.string()
		.min(6, { message: 'Muss mindestens 6 Zeichen lang sein' })
		.regex(lowercase, { message: 'Muss mindestens einen Kleinbuchstaben enthalten' })
		.regex(uppercase, { message: 'Muss mindestens einen Großbuchstaben enthalten' })
		.regex(number, { message: 'Muss mindestens eine Zahl enthalten' })
		.regex(specialCharacter, { message: 'Muss mindestens ein Sonderzeichen enthalten' })
});
export type LoginSchema = typeof loginSchema;

export const signupSchema = z
	.object({
		username: z.string().min(3, { message: 'Muss mindestens 3 Zeichen lang sein' }),
		email: z.string().email({ message: 'Muss eine gültige E-Mail-Adresse sein' }),
		password: z
			.string()
			.min(6, { message: 'Muss mindestens 6 Zeichen lang sein' })
			.regex(lowercase, { message: 'Muss mindestens einen Kleinbuchstaben enthalten' })
			.regex(uppercase, { message: 'Muss mindestens einen Großbuchstaben enthalten' })
			.regex(number, { message: 'Muss mindestens eine Zahl enthalten' })
			.regex(specialCharacter, { message: 'Muss mindestens ein Sonderzeichen enthalten' }),
		confirmPassword: z.string()
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwörter stimmen nicht überein',
    path: ["confirmPassword"],
	});
export type SignupSchema = typeof signupSchema;

export const signupConfirmSchema = z.object({
  email: z.string().email({ message: 'Muss eine gültige E-Mail-Adresse sein' }),
  code: z.number().int()
})
export type SignupConfirmSchema = typeof signupConfirmSchema;
