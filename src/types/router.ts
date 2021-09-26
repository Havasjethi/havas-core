export interface CoreRouter<Endpoint,
  MiddleWare,
  ErrorHandler,
  ResultWrapper> {
  path: string;

  parent: CoreRouter<Endpoint, MiddleWare, ErrorHandler, ResultWrapper> | undefined;
  children: CoreRouter<Endpoint, MiddleWare, ErrorHandler, ResultWrapper>[];

  endpoints: Endpoint[];

  middlewares: MiddleWare[];
  errorHandlers: ErrorHandler[];

  resultWrapper: ResultWrapper | undefined;
  defaultHandler: Endpoint | undefined;
}


type AnyRouter = CoreRouter<any, any, any, any>;


export abstract class BaseCoreRouter<Endpoint,
  MiddleWare,
  ErrorHandler,
  ResultWrapper> implements CoreRouter<Endpoint, MiddleWare, ErrorHandler, ResultWrapper> {

  public path: string = '/';
  public parent: CoreRouter<Endpoint, MiddleWare, ErrorHandler, ResultWrapper> | undefined = undefined;
  public children: CoreRouter<Endpoint, MiddleWare, ErrorHandler, ResultWrapper>[] = [];
  public endpoints: Endpoint[] = [];
  public middlewares: MiddleWare[] = [];
  public errorHandlers: ErrorHandler[] = [];
  public resultWrapper: ResultWrapper | undefined;
  public defaultHandler: Endpoint | undefined;

  public add_child (child: AnyRouter) {
    this.children.push(child);
    child.parent = this;
  }

  public set_parent (parent: AnyRouter) {
    this.parent = parent;
    parent.children.push(this);
  }

  public addChild (child: AnyRouter) {
    this.children.push(child);
    child.parent = this;
  }

  public setParent (parent: AnyRouter) {
    this.parent = parent;
    parent.children.push(this);
  }

  public getResultWrapper (): ResultWrapper | undefined {
    let routerNode: AnyRouter | undefined = this;
    let resultWrapper: ResultWrapper | undefined;

    do {
      if ((routerNode as AnyRouter).resultWrapper) {
        resultWrapper = routerNode.resultWrapper;
      } else {
        routerNode = this.parent;
      }
    }
    while (resultWrapper === undefined && routerNode !== undefined);

    return resultWrapper;
  }

  public registerEndpoint (endpoint: Endpoint) {
    this.endpoints.push(endpoint);
  }

  public registerMiddleware (middleware: MiddleWare) {
    this.middlewares.push(middleware);
  }

  public registerErrorHandler (errorHandler: ErrorHandler) {
    this.errorHandlers.push(errorHandler);
  }

  public registerResultWrapper (resultWrapper: ResultWrapper) {
    this.resultWrapper = resultWrapper;
  }

  public registerDefaultHandler(defaultHandler: Endpoint) {
    this.defaultHandler = defaultHandler;
  }
}
