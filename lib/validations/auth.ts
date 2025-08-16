import { z } from "zod"

// Esquema para inicio de sesión
export const signInSchema = z.object({
  email: z
    .string()
    .min(1, "El email es requerido")
    .email("Formato de email inválido"),
  password: z
    .string()
    .min(1, "La contraseña es requerida")
    .min(8, "La contraseña debe tener al menos 8 caracteres"),
})

// Esquema para registro
export const signUpSchema = z.object({
  name: z
    .string()
    .min(1, "El nombre es requerido")
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede exceder 50 caracteres"),
  email: z
    .string()
    .min(1, "El email es requerido")
    .email("Formato de email inválido"),
  password: z
    .string()
    .min(1, "La contraseña es requerida")
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "La contraseña debe contener al menos una minúscula, una mayúscula y un número"
    ),
  confirmPassword: z
    .string()
    .min(1, "Confirma tu contraseña"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
})

// Esquema para recuperación de contraseña
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "El email es requerido")
    .email("Formato de email inválido"),
})

// Esquema para OTP
export const otpSchema = z.object({
  email: z
    .string()
    .min(1, "El email es requerido")
    .email("Formato de email inválido"),
  otp: z
    .string()
    .min(1, "El código OTP es requerido")
    .length(6, "El código OTP debe tener 6 dígitos")
    .regex(/^\d{6}$/, "El código OTP debe contener solo números"),
})

// Esquema para restablecimiento de contraseña
export const resetPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "El email es requerido")
    .email("Formato de email inválido"),
  otp: z
    .string()
    .min(1, "El código OTP es requerido")
    .length(6, "El código OTP debe tener 6 dígitos")
    .regex(/^\d{6}$/, "El código OTP debe contener solo números"),
  password: z
    .string()
    .min(1, "La nueva contraseña es requerida")
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "La contraseña debe contener al menos una minúscula, una mayúscula y un número"
    ),
  confirmPassword: z
    .string()
    .min(1, "Confirma tu nueva contraseña"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
})

// Tipos derivados de los esquemas
export type SignInFormData = z.infer<typeof signInSchema>
export type SignUpFormData = z.infer<typeof signUpSchema>
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>
export type OtpFormData = z.infer<typeof otpSchema>
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>
