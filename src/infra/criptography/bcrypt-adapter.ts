import { Hasher, HashComparer } from '@data/contracts/cryptography'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements Hasher, HashComparer {
  constructor(private readonly salt: number) {}

  async hash(value: string): Promise<string> {
    return await bcrypt.hash(value, this.salt)
  }

  async compare(value: string, digest: string): Promise<boolean> {
    return await bcrypt.compare(value, digest)
  }
}
