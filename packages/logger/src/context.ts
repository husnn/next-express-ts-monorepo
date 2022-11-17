import { Namespace, createNamespace } from 'cls-hooked';

let context: Namespace;

export const getContext = () => {
  if (!context) context = createNamespace('context');
  return context;
};

export const setCtxMetadata = (data: any) => getContext().set('metadata', data);

export const getCtxMetadata = () => getContext().get('metadata');

export default context;
