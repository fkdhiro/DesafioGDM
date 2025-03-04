import dotenv from 'dotenv';

export class Config {
  private static instance: Config;
  private readonly _port: number;
  private readonly _databaseUrl: string;
  private readonly _jwtSecret: string;
  private readonly _jwtExpiresIn: string;
  private readonly _nodemailerEmail: string;
  private readonly _nodemailerPassword: string;

  private constructor() {
    dotenv.config();
    this._port = parseInt(process.env.PORT || '3000', 10);
    this._databaseUrl = process.env.MONGO_CONNECTION || '';
    this._jwtSecret = process.env.JWT_SECRET || '';
    this._jwtExpiresIn = process.env.JWT_EXPIRES_IN || '1h';
    this._nodemailerEmail = process.env.NODEMAILER_EMAIL || '1h';
    this._nodemailerPassword = process.env.NODEMAILER_PASSWORD || '1h';
  }

  public static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config();
    }
    return Config.instance;
  }

  public get port(): number {
    return this._port;
  }

  public get databaseUrl(): string {
    return this._databaseUrl;
  }

  public get jwtSecret(): string {
    return this._jwtSecret;
  }

  public get jwtExpiresIn(): string {
    return this._jwtExpiresIn;
  }

  public get nodemailerEmail(): string {
    return this._nodemailerEmail;
  }

  public get nodemailerPassword(): string {
    return this._nodemailerPassword;
  }
}
