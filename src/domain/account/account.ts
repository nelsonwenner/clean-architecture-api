import { Entity } from '@domain/common/entity'

export interface AccountModel {
  id?: string
  name: string
  email: string
  password: string
}

export class Account extends Entity<AccountModel> {
  get name(): string {
    return this.props.name
  }

  get email(): string {
    return this.props.email
  }

  get password(): string {
    return this.props.password
  }

  private constructor(props: AccountModel, id?: string) {
    super(props, id)
  }

  static create(props: AccountModel, id?: string): Account {
    return new Account(props, id)
  }
}
