/**
 * May be T type object.
 */
export type MayBe<T extends object = object> = { [K in keyof T]: unknown };
