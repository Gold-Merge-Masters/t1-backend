type Camelize<T extends string> = T extends `${infer A}_${infer B}` ? `${A}${Capitalize<Camelize<B>>}` : T;

type CamelizeKeys<T, Skip extends (keyof T)[]> = {
  [key in keyof T as key extends string ? (key extends Skip[number] ? key : Camelize<key>) : key]: T[key];
};

/**
 * This is a method for converting objects fields from snake case to camel case
 * @param object For example your initial object is { first_field: 1, second_field: 2 }
 * after converting it will be { firstField: 1, secondField: 2 }
 * @param skip If you want to exclude some field or fields so you can add it here
 * @returns \{ first_field: 1, second_field: 2 } -> { firstField: 1, secondField: 2 }
 */
export const toCamelCase = <T extends Record<string, any>, Skip extends (keyof T)[] = []>(
  object: T,
  skip: Skip = [] as unknown as Skip,
): CamelizeKeys<T, Skip> => {
  const newObject: Record<string, any> = {};
  for (const key in object) {
    if (skip.includes(key as keyof T)) {
      newObject[key] = object[key];
      continue;
    }
    const newKey = key.replace(/([-_][a-z])/gi, ($1) => {
      return $1.toUpperCase().replace('_', '');
    });
    newObject[newKey] = object[key];
  }
  return newObject as CamelizeKeys<T, Skip>;
};

export const toCamelCaseV2 = <T extends Record<string, any>, Skip extends (keyof T)[] = []>(
  object: T,
  skip: Skip = [] as unknown as Skip,
): CamelizeKeys<T, Skip> => {
  const newObject: Record<string, any> = {};
  const replaceObj = (object: T) => {
    for (const key in object) {
      if (typeof key === 'object') {
        replaceObj(key);
      }
      if (skip.includes(key as keyof T)) {
        newObject[key] = object[key];
        continue;
      }
      const newKey = key.replace(/([-_][a-z])/gi, ($1) => {
        return $1.toUpperCase().replace('_', '');
      });
      newObject[newKey] = object[key];
    }
  };
  replaceObj(object);
  return newObject as CamelizeKeys<T, Skip>;
};
