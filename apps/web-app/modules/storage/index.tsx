export const saveObject = (key: string, obj: object) => {
  const j = JSON.stringify(obj);
  localStorage.setItem(key, j);
};

export function readObject<T>(key: string, fallback: T) {
  const obj = localStorage.getItem(key) ?? '';
  try {
    return JSON.parse(obj) as T;
  } catch {
    return fallback;
  }
}

export const useStorage = <T = any,>(key: string) => {
  const write = (val: any) => {
    if (typeof val === 'object') {
      saveObject(key, val);
    } else {
      localStorage.setItem(key, val);
    }
  };

  const read = (obj: boolean, fallback: any = {}): T => {
    if (typeof localStorage === 'undefined') return fallback;
    if (obj) return readObject(key, fallback);
    return localStorage.getItem(key) as T;
  };

  return { read, write };
};

export default useStorage;
