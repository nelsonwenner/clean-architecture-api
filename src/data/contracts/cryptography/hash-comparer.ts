export interface HashComparer {
  compare: (value: string, digest: string) => Promise<boolean>
}
