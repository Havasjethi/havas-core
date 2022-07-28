import { UniversalPostProcessor } from '../post_processors';

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

export interface RegistrableMethod<PP> {
  methodName: string;
  // TODO :: Update this to contecrete type () A -> B  | A -> B, B -> C | ...
  parameters: DecoratedParameters<PP>[];
}

export interface CoreEndpoint<PostProcessorType = UniversalPostProcessor>
  extends RegistrableMethod<PostProcessorType> {
  methodType: HttpMethodType;
  path: string;
}
