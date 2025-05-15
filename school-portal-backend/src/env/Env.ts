import fs from 'fs';
import AsyncUtil from 'async-utility';
import { sequelize } from '../sequelize';
import { models } from '../entities';
 
interface EnvProps {
  db: {
    readonly name: string;
    readonly host: string;
    readonly port: number;
    readonly username: string;
    readonly password: string;
  };

  api: {
    readonly path: string;
    readonly port: number;
  };
}
 
export class Env {
  
  private env!: EnvProps;
 
  constructor() {
    AsyncUtil.executeSync(async () => {
      await this.loadLocalEnv();
      await sequelize.init({ ...this.db, models });
    });
  }

  private async loadLocalEnv() {
   const json = await fs.promises.readFile('env.json', 'utf8');
   this.env = JSON.parse(json);
  }

  get db() {
    return this.env.db;
  }
 
  get api() {
    return this.env.api;
  }

}
 