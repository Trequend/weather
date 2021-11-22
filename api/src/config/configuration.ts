import { validate } from './env.validation';
import { Environment } from './environment-variables.class';

export const configuration = () => {
  const environment = validate(process.env);

  return {
    isProduction: environment.NODE_ENV === Environment.Production,
    port: environment.PORT || 8000,
    mongoUrl: environment.MONGO_URL || 'mongodb://localhost:27017',
    mongoDBName: environment.MONGO_DB_NAME || 'weather',
  };
};

export type Config = ReturnType<typeof configuration>;
