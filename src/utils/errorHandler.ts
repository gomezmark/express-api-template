import Boom from "@hapi/boom";
export const errorAppHandler = (message: any, options: Boom.Options<any, any>, raw?: any) => {
  const error = new Boom(message, options);

  if (process.env.MODE === "development") {
    (error.output.payload as any).raw = raw;
  }
  return error;
};
