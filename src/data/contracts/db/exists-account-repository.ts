export interface ExistsAccountRepository {
  exists: (email: string) => Promise<boolean>
}
