import { VaultEntity } from '@repo/domain/entities/vault.entity';
import { VaultRepository } from '@repo/domain/repositories/vault.repository';

export class BrowserVaultRepository implements VaultRepository {
  getById(_id: string): Promise<VaultEntity | null> {
    throw new Error('Method not implemented.');
  }
  getAllByUser(_userId: string): Promise<VaultEntity[]> {
    throw new Error('Method not implemented.');
  }
  create(_vault: VaultEntity): Promise<void> {
    throw new Error('Method not implemented.');
  }
  update(_vault: VaultEntity): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(_id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  getSelectedVault(): Promise<VaultEntity | null> {
    throw new Error('Method not implemented.');
  }
}
