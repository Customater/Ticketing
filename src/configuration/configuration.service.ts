import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConfigurationService {
  constructor(private configService: ConfigService) {}

  get(key: string): any {
    return this.configService.get(key);
  }

  // getAll(): Record<string, any> {
  //   return this.configService.get();
  // }

  get port(): number {
    return this.get('port');
  }

  get databaseHost(): string {
    return this.get('database.host');
  }
}
