import { Metadata } from "@summerpress/constants/constant";

export function ControllerMapping(baseUrl: string): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata(Metadata.Controller, baseUrl, target);
  };
}
