type SnakeCase<T extends string> = T extends `${infer A}${infer B}`
  ? `${A extends keyof typeof charMap ? `_${Lowercase<A>}` : A}${SnakeCase<B>}`
  : T;

type SnakeCaseKeys<T, Skip extends (keyof T)[]> = {
  [key in keyof T as key extends string
    ? key extends Skip[number]
      ? key
      : SnakeCase<Extract<key, string>>
    : key]: T[key];
};

const charMap = {
  A: 'a',
  B: 'b',
  C: 'c',
  D: 'd',
  E: 'e',
  F: 'f',
  G: 'g',
  H: 'h',
  I: 'i',
  J: 'j',
  K: 'k',
  L: 'l',
  M: 'm',
  N: 'n',
  O: 'o',
  P: 'p',
  Q: 'q',
  R: 'r',
  S: 's',
  T: 't',
  U: 'u',
  V: 'v',
  W: 'w',
  X: 'x',
  Y: 'y',
  Z: 'z',
};

/**
 * This is a method for converting objects fields from camel case to snake case
 * @param object For example your initial object is { firstField: 1, secondField: 2 }
 * after converting it will be { first_field: 1, second_field: 2 }
 * @param skip If you want to exclude some field or fields so you can add it here
 * @returns \{ firstField: 1, secondField: 2 } -> { first_field: 1, second_field: 2 }
 */
export const toSnakeCase = <T extends Record<string, any>, Skip extends (keyof T)[] = []>(
  object: T,
  skip: Skip = [] as unknown as Skip,
): SnakeCaseKeys<T, Skip> => {
  const newObject: Record<string, any> = {};
  for (const key in object) {
    if (skip.includes(key as keyof T)) {
      newObject[key] = object[key];
      continue;
    }
    const newKey = key.replace(/[A-Z]/g, (match) => `_${charMap[match]}`);
    newObject[newKey] = object[key];
  }
  return newObject as SnakeCaseKeys<T, Skip>;
};

export const toSnakeCaseV2 = <T extends Record<string, any>, Skip extends (keyof T)[] = []>(
  object: T,
  skip: Skip = [] as unknown as Skip,
): SnakeCaseKeys<T, Skip> => {
  const newObject: Record<string, any> = {};
  for (const key in object) {
    if (skip.includes(key as keyof T)) {
      newObject[key] = object[key];
      continue;
    }
    const newKey = key.replace(/[A-Z]/g, (match) => `_${charMap[match]}`);
    newObject[newKey] = object[key];
  }
  return newObject as SnakeCaseKeys<T, Skip>;
};
