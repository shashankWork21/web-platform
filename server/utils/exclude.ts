export function exclude<
  Model extends Record<string, any>,
  Key extends keyof Model
>(model: Model, keys: Key[]): Omit<Model, Key> {
  return Object.fromEntries(
    Object.entries(model).filter(([key]) => !keys.includes(key as Key))
  ) as Omit<Model, Key>;
}
