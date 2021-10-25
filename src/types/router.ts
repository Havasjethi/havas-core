export interface Objectified<T> {
  [name: string]: T;
}

export interface CoreRouter<Endpoint, MiddleWare, ErrorHandler, ResultWrapper> {
  path: string;

  parent: CoreRouter<Endpoint, MiddleWare, ErrorHandler, ResultWrapper> | undefined;
  children: CoreRouter<Endpoint, MiddleWare, ErrorHandler, ResultWrapper>[];

  endpoints: Objectified<Endpoint>;

  middlewares: MiddleWare[];
  errorHandlers: ErrorHandler[];

  resultWrapper: ResultWrapper | undefined;
  defaultHandler: Endpoint | undefined;
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

export abstract class BaseCoreRouter<
  Endpoint extends { methodName: string },
  MiddleWare,
  ErrorHandler,
  ResultWrapper,
> implements CoreRouter<Endpoint, MiddleWare, ErrorHandler, ResultWrapper>
{
  public path: string = '/';
  public parent: CoreRouter<Endpoint, MiddleWare, ErrorHandler, ResultWrapper> | undefined =
    undefined;
  public children: CoreRouter<Endpoint, MiddleWare, ErrorHandler, ResultWrapper>[] = [];
  public endpoints: { [name in string | number | symbol]: Endpoint } = {};
  public middlewares: MiddleWare[] = [];
  public errorHandlers: ErrorHandler[] = [];
  public resultWrapper: ResultWrapper | undefined;
  public defaultHandler: Endpoint | undefined;

  public add_child(child: AnyRouter) {
    return this.addChild(child);
  }

  public set_parent(parent: AnyRouter) {
    return this.addChild(parent);
  }

  public addChild(child: AnyRouter): this {
    this.children.push(child);
    child.parent = this;

    return this;
  }

  public setParent(parent: BaseCoreRouter<Endpoint, MiddleWare, ErrorHandler, ResultWrapper>) {
    this.parent = parent;
    parent.children.push(this);

    return this;
  }

  public getResultWrapper(): ResultWrapper | undefined {
    let routerNode: AnyRouter | undefined = this;
    let resultWrapper: ResultWrapper | undefined;
    let maxIteration = 100;

    do {
      if ((routerNode as AnyRouter).resultWrapper) {
        resultWrapper = routerNode.resultWrapper;
      } else {
        routerNode = this.parent;
      }
    } while (maxIteration-- > 0 && resultWrapper === undefined && routerNode !== undefined);

    return resultWrapper;
  }

  // public registerEndpoint (endpoint: Endpoint) {
  //   this.endpoints[endpoint.methodName] = endpoint;
  // }

  public registerMiddleware(middleware: MiddleWare) {
    this.middlewares.push(middleware);
  }

  // public registerErrorHandler (errorHandler: ErrorHandler) {
  //   this.errorHandlers.push(errorHandler);
  // }

  public registerResultWrapper(resultWrapper: ResultWrapper) {
    this.resultWrapper = resultWrapper;
  }

  public registerDefaultHandler(defaultHandler: Endpoint) {
    this.defaultHandler = defaultHandler;
  }
}
