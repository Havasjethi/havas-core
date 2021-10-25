export interface CoreRouter<Endpoint, MiddleWare, ErrorHandler, ResultWrapper> {
  path: string;

  parent: CoreRouter<Endpoint, MiddleWare, ErrorHandler, ResultWrapper> | undefined;
  children: CoreRouter<Endpoint, MiddleWare, ErrorHandler, ResultWrapper>[];

  // endpoints: Endpoint[];
  endpoints: { [name: string]: Endpoint };

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
  Endpoint extends { name: string },
  MiddleWare,
  ErrorHandler,
  ResultWrapper,
> implements CoreRouter<Endpoint, MiddleWare, ErrorHandler, ResultWrapper>
{
  public path: string = '/';
  public parent: CoreRouter<Endpoint, MiddleWare, ErrorHandler, ResultWrapper> | undefined =
    undefined;
  public children: CoreRouter<Endpoint, MiddleWare, ErrorHandler, ResultWrapper>[] = [];
  // public endpoints: Endpoint[] = [];
  public endpoints: { [name: string]: Endpoint } = {};
  public middlewares: MiddleWare[] = [];
  public errorHandlers: ErrorHandler[] = [];
  public resultWrapper: ResultWrapper | undefined;
  public defaultHandler: Endpoint | undefined;

  public add_child(child: BaseCoreRouter<Endpoint, MiddleWare, ErrorHandler, ResultWrapper>) {
    this.children.push(child);
    child.parent = this;

    return this;
  }

  public set_parent(parent: BaseCoreRouter<Endpoint, MiddleWare, ErrorHandler, ResultWrapper>) {
    this.parent = parent;
    parent.children.push(this);

    return this;
  }

  public addChild(child: BaseCoreRouter<Endpoint, MiddleWare, ErrorHandler, ResultWrapper>) {
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

    do {
      if ((routerNode as AnyRouter).resultWrapper) {
        resultWrapper = routerNode.resultWrapper;
      } else {
        routerNode = this.parent;
      }
    } while (resultWrapper === undefined && routerNode !== undefined);

    return resultWrapper;
  }

  // public registerEndpoint (endpoint: Endpoint) {
  //   this.endpoints[endpoint.name] = endpoint;
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

  // public registerDefaultHandler (defaultHandler: Endpoint) {
  //   this.defaultHandler = defaultHandler;
  // }
}
