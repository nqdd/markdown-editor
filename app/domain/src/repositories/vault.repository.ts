import { createToken } from '@repo/ioc/token';
import { VaultEntity } from '../entities/vault.entity';

export const tVaultRepository =
  createToken<VaultRepository>('VAULT_REPOSITORY');

export interface VaultRepository {
  getById(id: string): Promise<VaultEntity | null>;
  getSelectedVault(): Promise<VaultEntity | null>;
  getAllByUser(userId: string): Promise<VaultEntity[]>;
  create(vault: VaultEntity): Promise<void>;
  update(vault: VaultEntity): Promise<void>;
  delete(id: string): Promise<void>;
}
