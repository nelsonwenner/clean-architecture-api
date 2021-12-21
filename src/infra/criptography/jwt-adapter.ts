import { Encrypter, Decrypter } from '@data/contracts'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor(private readonly secret: string) {}

  async encrypt(value: string): Promise<string> {
    return jwt.sign({ id: value }, this.secret)
  }

  async decrypt(value: string): Promise<string> {
    return jwt.verify(value, this.secret) as any
  }
}
