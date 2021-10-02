export interface ExistsAccount {
  exists: (email: string) => Promise<boolean>
}
