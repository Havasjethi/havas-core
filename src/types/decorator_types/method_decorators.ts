import { FactoryClassDecorator } from '../../meta/decorators';

export type MethodTypeDecorator<T> = FactoryClassDecorator<T>;

export type Get = MethodTypeDecorator<string>;
export type Post = MethodTypeDecorator<string>;
export type Put = MethodTypeDecorator<string>;
export type Delete = MethodTypeDecorator<string>;
export type Patch = MethodTypeDecorator<string>;

export type Method = MethodTypeDecorator<[string, string]>;
