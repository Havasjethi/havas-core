import { FactoryClassDecorator } from '../../meta/decorators';

export type RequestMapping = FactoryClassDecorator<string>;

export type Router = FactoryClassDecorator<string>;

export type Controller = Router;

export type App = FactoryClassDecorator<string>;
