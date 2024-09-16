import dotenv from 'dotenv';


dotenv.config({path:'.env'});

class Secrets{
    public DB_HOST: string;
    public DB_USER: string;
    public DB_PASSWORD: string;
    public DB_PORT: Number;
    public DB_NAME: string;



  constructor() {
    this.DB_HOST = process.env.DB_HOST || 'localhost';
    this.DB_USER = process.env.DB_USER || 'root';
    this.DB_PASSWORD = process.env.DB_PASSWORD || '';
    this.DB_PORT = Number(process.env.DB_PORT )|| 3306;
    this.DB_NAME = process.env.DB_NAME|| 'defaultdb';
  }
}

export const secrets = new Secrets();

