import { Metadata } from "@summerpress/constants/constant";

export enum Method {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
  HEAD = "HEAD",
  OPTIONS = "OPTIONS",
}

export type RequestMethod = {
  method: Method;
  path: string;
  handler: string | symbol;
};

export function RequestMapping(method: Method, path?: string): MethodDecorator {
  return (target: Object, propertyKey: string | symbol) => {
    const controllerClass = target.constructor;
    const routers: RequestMethod[] = Reflect.hasMetadata(
      Metadata.Router,
      controllerClass
    )
      ? Reflect.getMetadata(Metadata.Router, controllerClass)
      : [];

    const router: RequestMethod = {
      method,
      path: path ? path : "/",
      handler: propertyKey,
    };

    routers.push(router);
    Reflect.defineMetadata(Metadata.Router, routers, controllerClass);
  };
}
