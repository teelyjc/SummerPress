import { Metadata } from "@summerpress/constants/constant";
import { RequestMethod } from "@summerpress/decorators/method";
import { FastifyInstance, FastifyListenOptions } from "fastify";

type Controller = any;

export class SummerPress {
  private readonly server: FastifyInstance;

  public constructor(server: FastifyInstance) {
    this.server = server;
  }

  public register(controller: Controller) {
    const { constructor } = controller as Object;

    const group: string = Reflect.getMetadata(Metadata.Controller, constructor);
    const routers: RequestMethod[] = Reflect.getMetadata(
      Metadata.Router,
      constructor
    );

    routers.map(({ method, path, handler }) => {
      const defaultPath = `${group}${path}`.replace(/^\/+|\/+$/g, "");

      this.server.route({
        method,
        url: `/${defaultPath}`,
        handler: controller[handler].bind(this),
      });
    });
  }

  public run(options: FastifyListenOptions): void {
    this.server.listen(options);
  }
}
