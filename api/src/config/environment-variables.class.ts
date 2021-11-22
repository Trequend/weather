import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export enum Environment {
  Development = 'development',
  Production = 'production',
}

function getEnumValues(target: Record<string, unknown>) {
  return Object.values(target).join(', ');
}

export class EnvironmentVariables {
  @IsEnum(Environment, {
    message: `Available values: ${getEnumValues(Environment)}`,
  })
  @IsOptional()
  NODE_ENV?: Environment;

  @Min(1)
  @Max(65535)
  @IsInt()
  @IsOptional()
  PORT?: number;

  @IsString()
  @IsOptional()
  MONGO_URL?: string;

  @IsString()
  @IsOptional()
  MONGO_DB_NAME?: string;
}
