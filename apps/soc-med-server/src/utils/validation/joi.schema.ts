/* eslint-disable prettier/prettier */
import Joi from "joi";

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(16).required(),
});

export const userCreateSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9@#]{3,30}$"))
    .min(8)
    .max(30)
    .required(),
  name: Joi.string().min(3).required(),
});

export const userUpdateSchema = Joi.object({
  email: Joi.string().email(),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9@#]{3,30}$"))
    .min(8)
    .max(30),
  name: Joi.string().min(3),
});
