import { registerAs } from '@nestjs/config';
 import * as Joi from 'joi';

 //данные порта по умолчанию если он не задан
 const DEFAULT_PORT = 3000;
 const ENVIRONMENTS = ['development', 'production', 'stage'] as const;

 type Environment = typeof ENVIRONMENTS[number];

 export interface ApplicationConfig {
   environment: string;
   port: number;
 }
 // схема валидации joi
 const validationSchema = Joi.object({
   environment: Joi.string().valid(...ENVIRONMENTS).required(),
   port: Joi.number().port().default(DEFAULT_PORT),
 });

  //функция прерывания по ошибке
 function validateConfig(config: ApplicationConfig): void {
   const { error } = validationSchema.validate(config, { abortEarly: true });
   if (error) {
     throw new Error(`[Application Config Validation Error]: ${error.message}`);
   }
 }

  //запуск функции валидации
 function getConfig(): ApplicationConfig {
   const config: ApplicationConfig = {
     environment: process.env.NODE_ENV as Environment,
     port: parseInt(process.env.PORT || `${DEFAULT_PORT}`, 10),
   };

   validateConfig(config);
   return config;
 }

 export default registerAs('application', getConfig);
