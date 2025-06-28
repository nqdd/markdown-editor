import type { ZodTypeAny, z } from 'zod';

export type unbranded<
  T extends z.ZodBranded<ZodTypeAny, string | number | symbol>,
> = ReturnType<T['unwrap']>;

export type primitive<T> =
  | (T extends number ? number : never)
  | (T extends string ? string : never)
  | (T extends boolean ? boolean : never)
  | (T extends bigint ? bigint : never)
  | (T extends symbol ? symbol : never)
  | T;
