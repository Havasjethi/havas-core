export type DecoratorFactory<ReturnType, Parameters> = (parameters: Parameters) => ReturnType;

export type FactoryClassDecorator<Parameters> = DecoratorFactory<ClassDecorator, Parameters>;

export type FactoryMetodDecorators<Parameters> = DecoratorFactory<MethodDecorator, Parameters>;

export type FactoryParameterDecorator<Parameters> = DecoratorFactory<ParameterDecorator, Parameters>;

export type FactoryMetodParameterDecorator<Parameters> = DecoratorFactory<ParameterDecorator, Parameters>;
