export type HttpMethodType =
  | 'all'
  | 'get'
  | 'post'
  | 'put'
  | 'delete'
  | 'patch'
  | 'options'
  | 'head';

export interface DecoratedParameters<PostProcessorType> {
  index: number;
  name: string;
  arguments?: unknown[];
  postProcessors?: PostProcessorType[];
}

export type PostProcessor<Input = unknown, Output = unknown> = (value: Input) => Output;

export interface RegistrableMethod<PP> {
  methodName: string;
  parameters: DecoratedParameters<PP>[];
}

export interface CoreEndpoint<PostProcessorType = PostProcessor> extends RegistrableMethod<PostProcessorType> {
  methodType: HttpMethodType;
  path: string;
}
