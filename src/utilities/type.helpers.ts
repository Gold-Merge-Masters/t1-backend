export type OmitOptional<T> = {
  [P in keyof Required<T> as Pick<T, P> extends Required<Pick<T, P>> ? P : never]: T[P];
};
