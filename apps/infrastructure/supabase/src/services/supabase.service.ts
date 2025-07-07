import { createToken } from '@repo/ioc/container';
import {
  createClient as supabaseCreateClient,
  SupabaseClient,
} from '@supabase/supabase-js';

export const tSupabaseService = createToken<SupabaseService>('SupabaseService');

export class SupabaseService {
  private readonly _client: SupabaseClient;
  public static instance: SupabaseService;

  private constructor(
    private readonly supabaseUrl: string,
    private readonly supabaseKey: string
  ) {
    this._client = supabaseCreateClient(this.supabaseUrl, this.supabaseKey);
  }

  public static init(
    supabaseUrl: string,
    supabaseKey: string
  ): SupabaseService {
    if (!SupabaseService.instance) {
      SupabaseService.instance = new SupabaseService(supabaseUrl, supabaseKey);
    }
    return SupabaseService.instance;
  }

  get client(): SupabaseClient {
    return this._client;
  }

  get auth() {
    return this._client.auth;
  }

  get storage() {
    return this._client.storage;
  }

  get realtime() {
    return this._client.realtime;
  }

  // Convenience method for database operations
  from(table: string) {
    return this._client.from(table);
  }

  // Convenience method for RPC calls
  rpc(fn: string, args?: Record<string, unknown>) {
    return this._client.rpc(fn, args);
  }
}
