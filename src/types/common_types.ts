
export type HttpMethodType = 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head';

export interface DecoratedParameters {
  index?: number;
  name: string;
  arguments?: any[];
}

export interface RegistrableMethod {
  methodName: string;
  parameters: DecoratedParameters[];
}

export interface CoreEndpoint extends RegistrableMethod{
  methodType: HttpMethodType;
  path: string;
}
