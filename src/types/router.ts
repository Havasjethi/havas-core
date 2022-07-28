import { RegistrableMethod, UniversalPostProcessor } from '..';
import { CoreEndpoint } from './common_types';

export interface Objectified<T> {
  [name: string]: T;
}

export interface CoreRouter<Endpoint, MiddleWare, ErrorHandler, ResultWrapper> {
  // path: string;
  // parent: this | undefined;
  // children: CoreRouter<Endpoint, MiddleWare, ErrorHandler, ResultWrapper>[];
  // endpoints: Objectified<Endpoint>;
  // middlewares: MiddleWare[];
  // errorHandlers: ErrorHandler[];
  // resultWrapper: ResultWrapper | undefined;
  // defaultHandler: Endpoint | undefined;
}

type AnyRouter = CoreRouter<any, any, any, any>;

export type ResultWrapperTypeCallable = <
  Req = unknown,
  Res = unknown,
  Next = unknown,
  Result = unknown,
>({
  response,
  request,
  next,
  result,
}: {
  response: Req;
  request: Res;
  next: Next;
  result: Result;
}) => any;

export type MapLike<T> = {
  [name in string | number | symbol]: T;
};

export type ErrorHandlerEntry = RegistrableMethod<UniversalPostProcessor>;

export interface WebDescription<
  IEndpoint extends CoreEndpoint = any,
  IRegistrableMiddleware = any,
  IResWraper = any,
  EndpointFunction = any,
  IErrorHandlerFunction = any,
> {
  layersInitialized: boolean;
  path: string;
  children: this[];
  parent: this | undefined;

  endpoints: MapLike<IEndpoint>;
  middlewares: IRegistrableMiddleware[];
  errorHandlers: ErrorHandlerEntry[];
  resultWrapper: IResWraper | undefined;
  defaultHandlerMethod?: IEndpoint | undefined;
  defaultHandlerFunction?: EndpointFunction;
  errorHandlerMethods: MapLike<RegistrableMethod<UniversalPostProcessor>>;
  errorHandlerFunctions: IErrorHandlerFunction[];

  /** Defined by the creator  */
  getRoutable(): any;

  /** any is the class object  */
  getResultWrapper(): [IResWraper, any] | undefined;
}

type AnyWebDescription = WebDescription<any, any>;

export abstract class BaseCoreRouter<
  IEndpoint extends CoreEndpoint = any,
  IRegistrableMiddleware = any,
  IResWraper = any,
  EndpointFunction = any,
  IErrorHandlerFunction = any,
> implements WebDescription
{
  abstract getRoutable(): any;
  public path: string = '/';
  public layersInitialized: boolean = true;
  public parent: this | undefined = undefined;
  public children: this[] = [];
  public endpoints: MapLike<IEndpoint> = {};
  public middlewares: IRegistrableMiddleware[] = [];
  public errorHandlers: ErrorHandlerEntry[] = [];
  public resultWrapper: IResWraper | undefined;
  public defaultHandlerMethod?: IEndpoint;
  public defaultHandlerFunction?: EndpointFunction | undefined;

  public errorHandlerMethods: MapLike<RegistrableMethod<UniversalPostProcessor>> = {};
  public errorHandlerFunctions: IErrorHandlerFunction[] = [];

  public add_child(child: AnyWebDescription) {
    return this.addChild(child);
  }

  public set_parent(parent: AnyWebDescription) {
    return this.addChild(parent);
  }

  public addChild(child: AnyWebDescription): this {
    this.children.push(child as this);
    child.parent = this;

    return this;
  }

  public setParent(parent: AnyWebDescription) {
    this.parent = parent as this;
    parent.children.push(this);

    return this;
  }

  public getResultWrapperWithParent(): [IResWraper, AnyWebDescription] | undefined {
    let routerNode: AnyWebDescription | undefined = this;
    let resultWrapper: IResWraper | undefined;
    let maxIteration = 100;

    do {
      if (routerNode.resultWrapper) {
        resultWrapper = routerNode.resultWrapper;
      } else {
        routerNode = this.parent;
      }
    } while (maxIteration-- > 0 && resultWrapper === undefined && routerNode !== undefined);

    return resultWrapper ? [resultWrapper, routerNode!] : undefined;
  }

  public getResultWrapper(): [IResWraper, AnyWebDescription] | undefined {
    return this.getResultWrapperWithParent();
  }
}
