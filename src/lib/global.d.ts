export declare global {
  declare module globalThis {
    var mongoose: {
      conn: unknown
      promise: unknown
    };
  }
}