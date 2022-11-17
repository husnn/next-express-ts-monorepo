export const cleanPackageName = (name: string) => {
  const parts = name.split('/');
  if (parts.length > 1) {
    return parts.slice(1).join('/');
  }
  return name;
};
