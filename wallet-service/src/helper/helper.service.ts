import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class HelperService {
    private algorithm;
    private initVector;
    private Securitykey;

    constructor(
        private configService: ConfigService
    ) {
        this.algorithm = configService.get('ENCRYPTION_ALGORITHM');
        this.initVector = configService.get('ENCRYPTION_INIT_VECTOR');
        this.Securitykey = configService.get('ENCRYPTION_SECURITY_KEY');
    }

    async isValidUsername(attempt) {
        const usernamePattern = /^[a-z0-9_\.]+$/;
        return usernamePattern.test(attempt);
    }

    async hashString(value: string) {
        const salt: any = bcrypt.genSaltSync(10);
        const hash: string = bcrypt.hashSync(value, salt);
        return hash;
    }

    async dehashString(password: string, hashedPassword: string) {
        return bcrypt.compare(password, hashedPassword);
    }

    async encryptString(value: string) {
        const cipher = crypto.createCipheriv(
            this.algorithm,
            Buffer.from(this.Securitykey, 'hex'),
            Buffer.from(this.initVector, 'hex')
        );
        let encryptedData = cipher.update(value, 'utf-8', 'hex');
        encryptedData += cipher.final('hex');
        return encryptedData;
    }

    async decryptString(value: string) {
        const decipher = crypto.createDecipheriv(
            this.algorithm,
            Buffer.from(this.Securitykey, 'hex'),
            Buffer.from(this.initVector, 'hex')
        );
        let decryptedData = decipher.update(value, 'hex', 'utf-8');
        decryptedData += decipher.final('utf8');
        return decryptedData;
    }

    async generateSHA256Hash(value: string) {
        return crypto.createHash('sha256').update(value).digest('hex');
    }
}
