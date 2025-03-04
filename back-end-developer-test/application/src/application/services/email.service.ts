import { Config } from "@infrastructure/configuration/env/dotenv.config";
import nodemailer, { Transporter } from "nodemailer";

export class EmailService {

  private transporter: Transporter;

  private configService: Config;

  constructor() {
    this.configService = Config.getInstance();

    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.nodemailerEmail,
        pass: this.configService.nodemailerPassword,
      },
    });
  }
  
  async sendEmail(email: string) {
    const info = await this.transporter.sendMail({
      from: this.configService.nodemailerEmail,
      to: email,
      subject: "Cadastro efetuado com sucesso", 
      text: "Cadastro efetuado com sucesso.",
      html: "<b>Cadastro efetuado com sucesso</b>"
    });
  }
}