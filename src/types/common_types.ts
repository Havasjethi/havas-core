export type HttpMethodType =
  | 'all'
  | 'get'
  | 'post'
  | 'put'
  | 'delete'
  | 'patch'
  | 'options'
  | 'head';

export interface DecoratedParameters {
  index?: number;
  name: string;
  arguments?: unknown[];
}

export type PostProcessor<Input = unknown, Outout = unknown> = (value: Input) => Outout;

export interface RegistrableMethod {
  methodName: string;
  parameters: DecoratedParameters[];
  postProcessors?: {
    [parameterIndex: number]: PostProcessor[];
  };
}

export interface CoreEndpoint extends RegistrableMethod {
  methodType: HttpMethodType;
  path: string;
}
