export type DecoratorFactory<ReturnType, Parameters> = (parameters: Parameters) => ReturnType;

export type FactoryClassDecorator<Parameters> = DecoratorFactory<ClassDecorator, Parameters>;

export type FactoryMethodDecorators<Parameters> = DecoratorFactory<MethodDecorator, Parameters>;

export type FactoryParameterDecorator<Parameters> = DecoratorFactory<ParameterDecorator, Parameters>;

export type FactoryMethodParameterDecorator<Parameters> = DecoratorFactory<ParameterDecorator, Parameters>;
