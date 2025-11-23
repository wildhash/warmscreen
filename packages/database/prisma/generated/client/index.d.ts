
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Interview
 * 
 */
export type Interview = $Result.DefaultSelection<Prisma.$InterviewPayload>
/**
 * Model Question
 * 
 */
export type Question = $Result.DefaultSelection<Prisma.$QuestionPayload>
/**
 * Model Response
 * 
 */
export type Response = $Result.DefaultSelection<Prisma.$ResponsePayload>
/**
 * Model FeedbackLoop
 * 
 */
export type FeedbackLoop = $Result.DefaultSelection<Prisma.$FeedbackLoopPayload>
/**
 * Model AgentLog
 * 
 */
export type AgentLog = $Result.DefaultSelection<Prisma.$AgentLogPayload>
/**
 * Model ScoringModel
 * 
 */
export type ScoringModel = $Result.DefaultSelection<Prisma.$ScoringModelPayload>
/**
 * Model Pattern
 * 
 */
export type Pattern = $Result.DefaultSelection<Prisma.$PatternPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserRole: {
  ADMIN: 'ADMIN',
  RECRUITER: 'RECRUITER',
  CANDIDATE: 'CANDIDATE'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]


export const InterviewStatus: {
  SCHEDULED: 'SCHEDULED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
};

export type InterviewStatus = (typeof InterviewStatus)[keyof typeof InterviewStatus]


export const Decision: {
  STRONG_HIRE: 'STRONG_HIRE',
  HIRE: 'HIRE',
  NO_HIRE: 'NO_HIRE',
  STRONG_NO_HIRE: 'STRONG_NO_HIRE'
};

export type Decision = (typeof Decision)[keyof typeof Decision]


export const Difficulty: {
  EASY: 'EASY',
  MEDIUM: 'MEDIUM',
  HARD: 'HARD',
  EXPERT: 'EXPERT'
};

export type Difficulty = (typeof Difficulty)[keyof typeof Difficulty]


export const FeedbackType: {
  QUESTION_EFFECTIVENESS: 'QUESTION_EFFECTIVENESS',
  SCORING_ACCURACY: 'SCORING_ACCURACY',
  AGENT_PERFORMANCE: 'AGENT_PERFORMANCE',
  PATTERN_DETECTED: 'PATTERN_DETECTED',
  SELF_HEALING: 'SELF_HEALING'
};

export type FeedbackType = (typeof FeedbackType)[keyof typeof FeedbackType]


export const AgentType: {
  ANALYZER: 'ANALYZER',
  VERIFIER: 'VERIFIER',
  PLANNER: 'PLANNER',
  CONDUCTOR: 'CONDUCTOR',
  TAGGER: 'TAGGER',
  SCORER: 'SCORER',
  NARRATOR: 'NARRATOR'
};

export type AgentType = (typeof AgentType)[keyof typeof AgentType]

}

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

export type InterviewStatus = $Enums.InterviewStatus

export const InterviewStatus: typeof $Enums.InterviewStatus

export type Decision = $Enums.Decision

export const Decision: typeof $Enums.Decision

export type Difficulty = $Enums.Difficulty

export const Difficulty: typeof $Enums.Difficulty

export type FeedbackType = $Enums.FeedbackType

export const FeedbackType: typeof $Enums.FeedbackType

export type AgentType = $Enums.AgentType

export const AgentType: typeof $Enums.AgentType

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.interview`: Exposes CRUD operations for the **Interview** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Interviews
    * const interviews = await prisma.interview.findMany()
    * ```
    */
  get interview(): Prisma.InterviewDelegate<ExtArgs>;

  /**
   * `prisma.question`: Exposes CRUD operations for the **Question** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Questions
    * const questions = await prisma.question.findMany()
    * ```
    */
  get question(): Prisma.QuestionDelegate<ExtArgs>;

  /**
   * `prisma.response`: Exposes CRUD operations for the **Response** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Responses
    * const responses = await prisma.response.findMany()
    * ```
    */
  get response(): Prisma.ResponseDelegate<ExtArgs>;

  /**
   * `prisma.feedbackLoop`: Exposes CRUD operations for the **FeedbackLoop** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FeedbackLoops
    * const feedbackLoops = await prisma.feedbackLoop.findMany()
    * ```
    */
  get feedbackLoop(): Prisma.FeedbackLoopDelegate<ExtArgs>;

  /**
   * `prisma.agentLog`: Exposes CRUD operations for the **AgentLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AgentLogs
    * const agentLogs = await prisma.agentLog.findMany()
    * ```
    */
  get agentLog(): Prisma.AgentLogDelegate<ExtArgs>;

  /**
   * `prisma.scoringModel`: Exposes CRUD operations for the **ScoringModel** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ScoringModels
    * const scoringModels = await prisma.scoringModel.findMany()
    * ```
    */
  get scoringModel(): Prisma.ScoringModelDelegate<ExtArgs>;

  /**
   * `prisma.pattern`: Exposes CRUD operations for the **Pattern** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Patterns
    * const patterns = await prisma.pattern.findMany()
    * ```
    */
  get pattern(): Prisma.PatternDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Interview: 'Interview',
    Question: 'Question',
    Response: 'Response',
    FeedbackLoop: 'FeedbackLoop',
    AgentLog: 'AgentLog',
    ScoringModel: 'ScoringModel',
    Pattern: 'Pattern'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "interview" | "question" | "response" | "feedbackLoop" | "agentLog" | "scoringModel" | "pattern"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Interview: {
        payload: Prisma.$InterviewPayload<ExtArgs>
        fields: Prisma.InterviewFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InterviewFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InterviewFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewPayload>
          }
          findFirst: {
            args: Prisma.InterviewFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InterviewFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewPayload>
          }
          findMany: {
            args: Prisma.InterviewFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewPayload>[]
          }
          create: {
            args: Prisma.InterviewCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewPayload>
          }
          createMany: {
            args: Prisma.InterviewCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InterviewCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewPayload>[]
          }
          delete: {
            args: Prisma.InterviewDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewPayload>
          }
          update: {
            args: Prisma.InterviewUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewPayload>
          }
          deleteMany: {
            args: Prisma.InterviewDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InterviewUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.InterviewUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewPayload>
          }
          aggregate: {
            args: Prisma.InterviewAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInterview>
          }
          groupBy: {
            args: Prisma.InterviewGroupByArgs<ExtArgs>
            result: $Utils.Optional<InterviewGroupByOutputType>[]
          }
          count: {
            args: Prisma.InterviewCountArgs<ExtArgs>
            result: $Utils.Optional<InterviewCountAggregateOutputType> | number
          }
        }
      }
      Question: {
        payload: Prisma.$QuestionPayload<ExtArgs>
        fields: Prisma.QuestionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.QuestionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.QuestionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>
          }
          findFirst: {
            args: Prisma.QuestionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.QuestionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>
          }
          findMany: {
            args: Prisma.QuestionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>[]
          }
          create: {
            args: Prisma.QuestionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>
          }
          createMany: {
            args: Prisma.QuestionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.QuestionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>[]
          }
          delete: {
            args: Prisma.QuestionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>
          }
          update: {
            args: Prisma.QuestionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>
          }
          deleteMany: {
            args: Prisma.QuestionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.QuestionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.QuestionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>
          }
          aggregate: {
            args: Prisma.QuestionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQuestion>
          }
          groupBy: {
            args: Prisma.QuestionGroupByArgs<ExtArgs>
            result: $Utils.Optional<QuestionGroupByOutputType>[]
          }
          count: {
            args: Prisma.QuestionCountArgs<ExtArgs>
            result: $Utils.Optional<QuestionCountAggregateOutputType> | number
          }
        }
      }
      Response: {
        payload: Prisma.$ResponsePayload<ExtArgs>
        fields: Prisma.ResponseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ResponseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResponsePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ResponseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResponsePayload>
          }
          findFirst: {
            args: Prisma.ResponseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResponsePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ResponseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResponsePayload>
          }
          findMany: {
            args: Prisma.ResponseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResponsePayload>[]
          }
          create: {
            args: Prisma.ResponseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResponsePayload>
          }
          createMany: {
            args: Prisma.ResponseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ResponseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResponsePayload>[]
          }
          delete: {
            args: Prisma.ResponseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResponsePayload>
          }
          update: {
            args: Prisma.ResponseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResponsePayload>
          }
          deleteMany: {
            args: Prisma.ResponseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ResponseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ResponseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResponsePayload>
          }
          aggregate: {
            args: Prisma.ResponseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateResponse>
          }
          groupBy: {
            args: Prisma.ResponseGroupByArgs<ExtArgs>
            result: $Utils.Optional<ResponseGroupByOutputType>[]
          }
          count: {
            args: Prisma.ResponseCountArgs<ExtArgs>
            result: $Utils.Optional<ResponseCountAggregateOutputType> | number
          }
        }
      }
      FeedbackLoop: {
        payload: Prisma.$FeedbackLoopPayload<ExtArgs>
        fields: Prisma.FeedbackLoopFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FeedbackLoopFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackLoopPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FeedbackLoopFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackLoopPayload>
          }
          findFirst: {
            args: Prisma.FeedbackLoopFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackLoopPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FeedbackLoopFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackLoopPayload>
          }
          findMany: {
            args: Prisma.FeedbackLoopFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackLoopPayload>[]
          }
          create: {
            args: Prisma.FeedbackLoopCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackLoopPayload>
          }
          createMany: {
            args: Prisma.FeedbackLoopCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FeedbackLoopCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackLoopPayload>[]
          }
          delete: {
            args: Prisma.FeedbackLoopDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackLoopPayload>
          }
          update: {
            args: Prisma.FeedbackLoopUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackLoopPayload>
          }
          deleteMany: {
            args: Prisma.FeedbackLoopDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FeedbackLoopUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.FeedbackLoopUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackLoopPayload>
          }
          aggregate: {
            args: Prisma.FeedbackLoopAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFeedbackLoop>
          }
          groupBy: {
            args: Prisma.FeedbackLoopGroupByArgs<ExtArgs>
            result: $Utils.Optional<FeedbackLoopGroupByOutputType>[]
          }
          count: {
            args: Prisma.FeedbackLoopCountArgs<ExtArgs>
            result: $Utils.Optional<FeedbackLoopCountAggregateOutputType> | number
          }
        }
      }
      AgentLog: {
        payload: Prisma.$AgentLogPayload<ExtArgs>
        fields: Prisma.AgentLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AgentLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AgentLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentLogPayload>
          }
          findFirst: {
            args: Prisma.AgentLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AgentLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentLogPayload>
          }
          findMany: {
            args: Prisma.AgentLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentLogPayload>[]
          }
          create: {
            args: Prisma.AgentLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentLogPayload>
          }
          createMany: {
            args: Prisma.AgentLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AgentLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentLogPayload>[]
          }
          delete: {
            args: Prisma.AgentLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentLogPayload>
          }
          update: {
            args: Prisma.AgentLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentLogPayload>
          }
          deleteMany: {
            args: Prisma.AgentLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AgentLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AgentLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentLogPayload>
          }
          aggregate: {
            args: Prisma.AgentLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAgentLog>
          }
          groupBy: {
            args: Prisma.AgentLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AgentLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AgentLogCountArgs<ExtArgs>
            result: $Utils.Optional<AgentLogCountAggregateOutputType> | number
          }
        }
      }
      ScoringModel: {
        payload: Prisma.$ScoringModelPayload<ExtArgs>
        fields: Prisma.ScoringModelFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ScoringModelFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScoringModelPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ScoringModelFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScoringModelPayload>
          }
          findFirst: {
            args: Prisma.ScoringModelFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScoringModelPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ScoringModelFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScoringModelPayload>
          }
          findMany: {
            args: Prisma.ScoringModelFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScoringModelPayload>[]
          }
          create: {
            args: Prisma.ScoringModelCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScoringModelPayload>
          }
          createMany: {
            args: Prisma.ScoringModelCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ScoringModelCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScoringModelPayload>[]
          }
          delete: {
            args: Prisma.ScoringModelDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScoringModelPayload>
          }
          update: {
            args: Prisma.ScoringModelUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScoringModelPayload>
          }
          deleteMany: {
            args: Prisma.ScoringModelDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ScoringModelUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ScoringModelUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScoringModelPayload>
          }
          aggregate: {
            args: Prisma.ScoringModelAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateScoringModel>
          }
          groupBy: {
            args: Prisma.ScoringModelGroupByArgs<ExtArgs>
            result: $Utils.Optional<ScoringModelGroupByOutputType>[]
          }
          count: {
            args: Prisma.ScoringModelCountArgs<ExtArgs>
            result: $Utils.Optional<ScoringModelCountAggregateOutputType> | number
          }
        }
      }
      Pattern: {
        payload: Prisma.$PatternPayload<ExtArgs>
        fields: Prisma.PatternFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PatternFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatternPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PatternFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatternPayload>
          }
          findFirst: {
            args: Prisma.PatternFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatternPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PatternFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatternPayload>
          }
          findMany: {
            args: Prisma.PatternFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatternPayload>[]
          }
          create: {
            args: Prisma.PatternCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatternPayload>
          }
          createMany: {
            args: Prisma.PatternCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PatternCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatternPayload>[]
          }
          delete: {
            args: Prisma.PatternDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatternPayload>
          }
          update: {
            args: Prisma.PatternUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatternPayload>
          }
          deleteMany: {
            args: Prisma.PatternDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PatternUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PatternUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatternPayload>
          }
          aggregate: {
            args: Prisma.PatternAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePattern>
          }
          groupBy: {
            args: Prisma.PatternGroupByArgs<ExtArgs>
            result: $Utils.Optional<PatternGroupByOutputType>[]
          }
          count: {
            args: Prisma.PatternCountArgs<ExtArgs>
            result: $Utils.Optional<PatternCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    interviews: number
    questions: number
    scoringModels: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    interviews?: boolean | UserCountOutputTypeCountInterviewsArgs
    questions?: boolean | UserCountOutputTypeCountQuestionsArgs
    scoringModels?: boolean | UserCountOutputTypeCountScoringModelsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountInterviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InterviewWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountQuestionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuestionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountScoringModelsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScoringModelWhereInput
  }


  /**
   * Count Type InterviewCountOutputType
   */

  export type InterviewCountOutputType = {
    responses: number
    feedbackLoops: number
    agentLogs: number
  }

  export type InterviewCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    responses?: boolean | InterviewCountOutputTypeCountResponsesArgs
    feedbackLoops?: boolean | InterviewCountOutputTypeCountFeedbackLoopsArgs
    agentLogs?: boolean | InterviewCountOutputTypeCountAgentLogsArgs
  }

  // Custom InputTypes
  /**
   * InterviewCountOutputType without action
   */
  export type InterviewCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewCountOutputType
     */
    select?: InterviewCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * InterviewCountOutputType without action
   */
  export type InterviewCountOutputTypeCountResponsesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResponseWhereInput
  }

  /**
   * InterviewCountOutputType without action
   */
  export type InterviewCountOutputTypeCountFeedbackLoopsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FeedbackLoopWhereInput
  }

  /**
   * InterviewCountOutputType without action
   */
  export type InterviewCountOutputTypeCountAgentLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AgentLogWhereInput
  }


  /**
   * Count Type QuestionCountOutputType
   */

  export type QuestionCountOutputType = {
    responses: number
    feedbackLoops: number
  }

  export type QuestionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    responses?: boolean | QuestionCountOutputTypeCountResponsesArgs
    feedbackLoops?: boolean | QuestionCountOutputTypeCountFeedbackLoopsArgs
  }

  // Custom InputTypes
  /**
   * QuestionCountOutputType without action
   */
  export type QuestionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionCountOutputType
     */
    select?: QuestionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * QuestionCountOutputType without action
   */
  export type QuestionCountOutputTypeCountResponsesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResponseWhereInput
  }

  /**
   * QuestionCountOutputType without action
   */
  export type QuestionCountOutputTypeCountFeedbackLoopsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FeedbackLoopWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    role: $Enums.UserRole | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    role: $Enums.UserRole | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    role: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    name: string | null
    role: $Enums.UserRole
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    interviews?: boolean | User$interviewsArgs<ExtArgs>
    questions?: boolean | User$questionsArgs<ExtArgs>
    scoringModels?: boolean | User$scoringModelsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    interviews?: boolean | User$interviewsArgs<ExtArgs>
    questions?: boolean | User$questionsArgs<ExtArgs>
    scoringModels?: boolean | User$scoringModelsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      interviews: Prisma.$InterviewPayload<ExtArgs>[]
      questions: Prisma.$QuestionPayload<ExtArgs>[]
      scoringModels: Prisma.$ScoringModelPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string | null
      role: $Enums.UserRole
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    interviews<T extends User$interviewsArgs<ExtArgs> = {}>(args?: Subset<T, User$interviewsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InterviewPayload<ExtArgs>, T, "findMany"> | Null>
    questions<T extends User$questionsArgs<ExtArgs> = {}>(args?: Subset<T, User$questionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findMany"> | Null>
    scoringModels<T extends User$scoringModelsArgs<ExtArgs> = {}>(args?: Subset<T, User$scoringModelsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScoringModelPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'UserRole'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.interviews
   */
  export type User$interviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Interview
     */
    select?: InterviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewInclude<ExtArgs> | null
    where?: InterviewWhereInput
    orderBy?: InterviewOrderByWithRelationInput | InterviewOrderByWithRelationInput[]
    cursor?: InterviewWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InterviewScalarFieldEnum | InterviewScalarFieldEnum[]
  }

  /**
   * User.questions
   */
  export type User$questionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    where?: QuestionWhereInput
    orderBy?: QuestionOrderByWithRelationInput | QuestionOrderByWithRelationInput[]
    cursor?: QuestionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: QuestionScalarFieldEnum | QuestionScalarFieldEnum[]
  }

  /**
   * User.scoringModels
   */
  export type User$scoringModelsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScoringModel
     */
    select?: ScoringModelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScoringModelInclude<ExtArgs> | null
    where?: ScoringModelWhereInput
    orderBy?: ScoringModelOrderByWithRelationInput | ScoringModelOrderByWithRelationInput[]
    cursor?: ScoringModelWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ScoringModelScalarFieldEnum | ScoringModelScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Interview
   */

  export type AggregateInterview = {
    _count: InterviewCountAggregateOutputType | null
    _avg: InterviewAvgAggregateOutputType | null
    _sum: InterviewSumAggregateOutputType | null
    _min: InterviewMinAggregateOutputType | null
    _max: InterviewMaxAggregateOutputType | null
  }

  export type InterviewAvgAggregateOutputType = {
    score: number | null
  }

  export type InterviewSumAggregateOutputType = {
    score: number | null
  }

  export type InterviewMinAggregateOutputType = {
    id: string | null
    candidateId: string | null
    candidateName: string | null
    candidateEmail: string | null
    position: string | null
    status: $Enums.InterviewStatus | null
    scheduledAt: Date | null
    startedAt: Date | null
    completedAt: Date | null
    score: number | null
    decision: $Enums.Decision | null
    recordingUrl: string | null
    transcriptUrl: string | null
    recruiterId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InterviewMaxAggregateOutputType = {
    id: string | null
    candidateId: string | null
    candidateName: string | null
    candidateEmail: string | null
    position: string | null
    status: $Enums.InterviewStatus | null
    scheduledAt: Date | null
    startedAt: Date | null
    completedAt: Date | null
    score: number | null
    decision: $Enums.Decision | null
    recordingUrl: string | null
    transcriptUrl: string | null
    recruiterId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InterviewCountAggregateOutputType = {
    id: number
    candidateId: number
    candidateName: number
    candidateEmail: number
    position: number
    status: number
    scheduledAt: number
    startedAt: number
    completedAt: number
    score: number
    decision: number
    explainability: number
    recordingUrl: number
    transcriptUrl: number
    proctoringData: number
    recruiterId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type InterviewAvgAggregateInputType = {
    score?: true
  }

  export type InterviewSumAggregateInputType = {
    score?: true
  }

  export type InterviewMinAggregateInputType = {
    id?: true
    candidateId?: true
    candidateName?: true
    candidateEmail?: true
    position?: true
    status?: true
    scheduledAt?: true
    startedAt?: true
    completedAt?: true
    score?: true
    decision?: true
    recordingUrl?: true
    transcriptUrl?: true
    recruiterId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InterviewMaxAggregateInputType = {
    id?: true
    candidateId?: true
    candidateName?: true
    candidateEmail?: true
    position?: true
    status?: true
    scheduledAt?: true
    startedAt?: true
    completedAt?: true
    score?: true
    decision?: true
    recordingUrl?: true
    transcriptUrl?: true
    recruiterId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InterviewCountAggregateInputType = {
    id?: true
    candidateId?: true
    candidateName?: true
    candidateEmail?: true
    position?: true
    status?: true
    scheduledAt?: true
    startedAt?: true
    completedAt?: true
    score?: true
    decision?: true
    explainability?: true
    recordingUrl?: true
    transcriptUrl?: true
    proctoringData?: true
    recruiterId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type InterviewAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Interview to aggregate.
     */
    where?: InterviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Interviews to fetch.
     */
    orderBy?: InterviewOrderByWithRelationInput | InterviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InterviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Interviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Interviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Interviews
    **/
    _count?: true | InterviewCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InterviewAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InterviewSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InterviewMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InterviewMaxAggregateInputType
  }

  export type GetInterviewAggregateType<T extends InterviewAggregateArgs> = {
        [P in keyof T & keyof AggregateInterview]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInterview[P]>
      : GetScalarType<T[P], AggregateInterview[P]>
  }




  export type InterviewGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InterviewWhereInput
    orderBy?: InterviewOrderByWithAggregationInput | InterviewOrderByWithAggregationInput[]
    by: InterviewScalarFieldEnum[] | InterviewScalarFieldEnum
    having?: InterviewScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InterviewCountAggregateInputType | true
    _avg?: InterviewAvgAggregateInputType
    _sum?: InterviewSumAggregateInputType
    _min?: InterviewMinAggregateInputType
    _max?: InterviewMaxAggregateInputType
  }

  export type InterviewGroupByOutputType = {
    id: string
    candidateId: string
    candidateName: string
    candidateEmail: string
    position: string
    status: $Enums.InterviewStatus
    scheduledAt: Date
    startedAt: Date | null
    completedAt: Date | null
    score: number | null
    decision: $Enums.Decision | null
    explainability: JsonValue | null
    recordingUrl: string | null
    transcriptUrl: string | null
    proctoringData: JsonValue | null
    recruiterId: string
    createdAt: Date
    updatedAt: Date
    _count: InterviewCountAggregateOutputType | null
    _avg: InterviewAvgAggregateOutputType | null
    _sum: InterviewSumAggregateOutputType | null
    _min: InterviewMinAggregateOutputType | null
    _max: InterviewMaxAggregateOutputType | null
  }

  type GetInterviewGroupByPayload<T extends InterviewGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InterviewGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InterviewGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InterviewGroupByOutputType[P]>
            : GetScalarType<T[P], InterviewGroupByOutputType[P]>
        }
      >
    >


  export type InterviewSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    candidateId?: boolean
    candidateName?: boolean
    candidateEmail?: boolean
    position?: boolean
    status?: boolean
    scheduledAt?: boolean
    startedAt?: boolean
    completedAt?: boolean
    score?: boolean
    decision?: boolean
    explainability?: boolean
    recordingUrl?: boolean
    transcriptUrl?: boolean
    proctoringData?: boolean
    recruiterId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    recruiter?: boolean | UserDefaultArgs<ExtArgs>
    responses?: boolean | Interview$responsesArgs<ExtArgs>
    feedbackLoops?: boolean | Interview$feedbackLoopsArgs<ExtArgs>
    agentLogs?: boolean | Interview$agentLogsArgs<ExtArgs>
    _count?: boolean | InterviewCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["interview"]>

  export type InterviewSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    candidateId?: boolean
    candidateName?: boolean
    candidateEmail?: boolean
    position?: boolean
    status?: boolean
    scheduledAt?: boolean
    startedAt?: boolean
    completedAt?: boolean
    score?: boolean
    decision?: boolean
    explainability?: boolean
    recordingUrl?: boolean
    transcriptUrl?: boolean
    proctoringData?: boolean
    recruiterId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    recruiter?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["interview"]>

  export type InterviewSelectScalar = {
    id?: boolean
    candidateId?: boolean
    candidateName?: boolean
    candidateEmail?: boolean
    position?: boolean
    status?: boolean
    scheduledAt?: boolean
    startedAt?: boolean
    completedAt?: boolean
    score?: boolean
    decision?: boolean
    explainability?: boolean
    recordingUrl?: boolean
    transcriptUrl?: boolean
    proctoringData?: boolean
    recruiterId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type InterviewInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    recruiter?: boolean | UserDefaultArgs<ExtArgs>
    responses?: boolean | Interview$responsesArgs<ExtArgs>
    feedbackLoops?: boolean | Interview$feedbackLoopsArgs<ExtArgs>
    agentLogs?: boolean | Interview$agentLogsArgs<ExtArgs>
    _count?: boolean | InterviewCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type InterviewIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    recruiter?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $InterviewPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Interview"
    objects: {
      recruiter: Prisma.$UserPayload<ExtArgs>
      responses: Prisma.$ResponsePayload<ExtArgs>[]
      feedbackLoops: Prisma.$FeedbackLoopPayload<ExtArgs>[]
      agentLogs: Prisma.$AgentLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      candidateId: string
      candidateName: string
      candidateEmail: string
      position: string
      status: $Enums.InterviewStatus
      scheduledAt: Date
      startedAt: Date | null
      completedAt: Date | null
      score: number | null
      decision: $Enums.Decision | null
      explainability: Prisma.JsonValue | null
      recordingUrl: string | null
      transcriptUrl: string | null
      proctoringData: Prisma.JsonValue | null
      recruiterId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["interview"]>
    composites: {}
  }

  type InterviewGetPayload<S extends boolean | null | undefined | InterviewDefaultArgs> = $Result.GetResult<Prisma.$InterviewPayload, S>

  type InterviewCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<InterviewFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: InterviewCountAggregateInputType | true
    }

  export interface InterviewDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Interview'], meta: { name: 'Interview' } }
    /**
     * Find zero or one Interview that matches the filter.
     * @param {InterviewFindUniqueArgs} args - Arguments to find a Interview
     * @example
     * // Get one Interview
     * const interview = await prisma.interview.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InterviewFindUniqueArgs>(args: SelectSubset<T, InterviewFindUniqueArgs<ExtArgs>>): Prisma__InterviewClient<$Result.GetResult<Prisma.$InterviewPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Interview that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {InterviewFindUniqueOrThrowArgs} args - Arguments to find a Interview
     * @example
     * // Get one Interview
     * const interview = await prisma.interview.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InterviewFindUniqueOrThrowArgs>(args: SelectSubset<T, InterviewFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InterviewClient<$Result.GetResult<Prisma.$InterviewPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Interview that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterviewFindFirstArgs} args - Arguments to find a Interview
     * @example
     * // Get one Interview
     * const interview = await prisma.interview.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InterviewFindFirstArgs>(args?: SelectSubset<T, InterviewFindFirstArgs<ExtArgs>>): Prisma__InterviewClient<$Result.GetResult<Prisma.$InterviewPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Interview that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterviewFindFirstOrThrowArgs} args - Arguments to find a Interview
     * @example
     * // Get one Interview
     * const interview = await prisma.interview.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InterviewFindFirstOrThrowArgs>(args?: SelectSubset<T, InterviewFindFirstOrThrowArgs<ExtArgs>>): Prisma__InterviewClient<$Result.GetResult<Prisma.$InterviewPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Interviews that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterviewFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Interviews
     * const interviews = await prisma.interview.findMany()
     * 
     * // Get first 10 Interviews
     * const interviews = await prisma.interview.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const interviewWithIdOnly = await prisma.interview.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InterviewFindManyArgs>(args?: SelectSubset<T, InterviewFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InterviewPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Interview.
     * @param {InterviewCreateArgs} args - Arguments to create a Interview.
     * @example
     * // Create one Interview
     * const Interview = await prisma.interview.create({
     *   data: {
     *     // ... data to create a Interview
     *   }
     * })
     * 
     */
    create<T extends InterviewCreateArgs>(args: SelectSubset<T, InterviewCreateArgs<ExtArgs>>): Prisma__InterviewClient<$Result.GetResult<Prisma.$InterviewPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Interviews.
     * @param {InterviewCreateManyArgs} args - Arguments to create many Interviews.
     * @example
     * // Create many Interviews
     * const interview = await prisma.interview.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InterviewCreateManyArgs>(args?: SelectSubset<T, InterviewCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Interviews and returns the data saved in the database.
     * @param {InterviewCreateManyAndReturnArgs} args - Arguments to create many Interviews.
     * @example
     * // Create many Interviews
     * const interview = await prisma.interview.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Interviews and only return the `id`
     * const interviewWithIdOnly = await prisma.interview.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InterviewCreateManyAndReturnArgs>(args?: SelectSubset<T, InterviewCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InterviewPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Interview.
     * @param {InterviewDeleteArgs} args - Arguments to delete one Interview.
     * @example
     * // Delete one Interview
     * const Interview = await prisma.interview.delete({
     *   where: {
     *     // ... filter to delete one Interview
     *   }
     * })
     * 
     */
    delete<T extends InterviewDeleteArgs>(args: SelectSubset<T, InterviewDeleteArgs<ExtArgs>>): Prisma__InterviewClient<$Result.GetResult<Prisma.$InterviewPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Interview.
     * @param {InterviewUpdateArgs} args - Arguments to update one Interview.
     * @example
     * // Update one Interview
     * const interview = await prisma.interview.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InterviewUpdateArgs>(args: SelectSubset<T, InterviewUpdateArgs<ExtArgs>>): Prisma__InterviewClient<$Result.GetResult<Prisma.$InterviewPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Interviews.
     * @param {InterviewDeleteManyArgs} args - Arguments to filter Interviews to delete.
     * @example
     * // Delete a few Interviews
     * const { count } = await prisma.interview.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InterviewDeleteManyArgs>(args?: SelectSubset<T, InterviewDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Interviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterviewUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Interviews
     * const interview = await prisma.interview.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InterviewUpdateManyArgs>(args: SelectSubset<T, InterviewUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Interview.
     * @param {InterviewUpsertArgs} args - Arguments to update or create a Interview.
     * @example
     * // Update or create a Interview
     * const interview = await prisma.interview.upsert({
     *   create: {
     *     // ... data to create a Interview
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Interview we want to update
     *   }
     * })
     */
    upsert<T extends InterviewUpsertArgs>(args: SelectSubset<T, InterviewUpsertArgs<ExtArgs>>): Prisma__InterviewClient<$Result.GetResult<Prisma.$InterviewPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Interviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterviewCountArgs} args - Arguments to filter Interviews to count.
     * @example
     * // Count the number of Interviews
     * const count = await prisma.interview.count({
     *   where: {
     *     // ... the filter for the Interviews we want to count
     *   }
     * })
    **/
    count<T extends InterviewCountArgs>(
      args?: Subset<T, InterviewCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InterviewCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Interview.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterviewAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InterviewAggregateArgs>(args: Subset<T, InterviewAggregateArgs>): Prisma.PrismaPromise<GetInterviewAggregateType<T>>

    /**
     * Group by Interview.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterviewGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InterviewGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InterviewGroupByArgs['orderBy'] }
        : { orderBy?: InterviewGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InterviewGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInterviewGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Interview model
   */
  readonly fields: InterviewFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Interview.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InterviewClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    recruiter<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    responses<T extends Interview$responsesArgs<ExtArgs> = {}>(args?: Subset<T, Interview$responsesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResponsePayload<ExtArgs>, T, "findMany"> | Null>
    feedbackLoops<T extends Interview$feedbackLoopsArgs<ExtArgs> = {}>(args?: Subset<T, Interview$feedbackLoopsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedbackLoopPayload<ExtArgs>, T, "findMany"> | Null>
    agentLogs<T extends Interview$agentLogsArgs<ExtArgs> = {}>(args?: Subset<T, Interview$agentLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentLogPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Interview model
   */ 
  interface InterviewFieldRefs {
    readonly id: FieldRef<"Interview", 'String'>
    readonly candidateId: FieldRef<"Interview", 'String'>
    readonly candidateName: FieldRef<"Interview", 'String'>
    readonly candidateEmail: FieldRef<"Interview", 'String'>
    readonly position: FieldRef<"Interview", 'String'>
    readonly status: FieldRef<"Interview", 'InterviewStatus'>
    readonly scheduledAt: FieldRef<"Interview", 'DateTime'>
    readonly startedAt: FieldRef<"Interview", 'DateTime'>
    readonly completedAt: FieldRef<"Interview", 'DateTime'>
    readonly score: FieldRef<"Interview", 'Float'>
    readonly decision: FieldRef<"Interview", 'Decision'>
    readonly explainability: FieldRef<"Interview", 'Json'>
    readonly recordingUrl: FieldRef<"Interview", 'String'>
    readonly transcriptUrl: FieldRef<"Interview", 'String'>
    readonly proctoringData: FieldRef<"Interview", 'Json'>
    readonly recruiterId: FieldRef<"Interview", 'String'>
    readonly createdAt: FieldRef<"Interview", 'DateTime'>
    readonly updatedAt: FieldRef<"Interview", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Interview findUnique
   */
  export type InterviewFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Interview
     */
    select?: InterviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewInclude<ExtArgs> | null
    /**
     * Filter, which Interview to fetch.
     */
    where: InterviewWhereUniqueInput
  }

  /**
   * Interview findUniqueOrThrow
   */
  export type InterviewFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Interview
     */
    select?: InterviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewInclude<ExtArgs> | null
    /**
     * Filter, which Interview to fetch.
     */
    where: InterviewWhereUniqueInput
  }

  /**
   * Interview findFirst
   */
  export type InterviewFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Interview
     */
    select?: InterviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewInclude<ExtArgs> | null
    /**
     * Filter, which Interview to fetch.
     */
    where?: InterviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Interviews to fetch.
     */
    orderBy?: InterviewOrderByWithRelationInput | InterviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Interviews.
     */
    cursor?: InterviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Interviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Interviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Interviews.
     */
    distinct?: InterviewScalarFieldEnum | InterviewScalarFieldEnum[]
  }

  /**
   * Interview findFirstOrThrow
   */
  export type InterviewFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Interview
     */
    select?: InterviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewInclude<ExtArgs> | null
    /**
     * Filter, which Interview to fetch.
     */
    where?: InterviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Interviews to fetch.
     */
    orderBy?: InterviewOrderByWithRelationInput | InterviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Interviews.
     */
    cursor?: InterviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Interviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Interviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Interviews.
     */
    distinct?: InterviewScalarFieldEnum | InterviewScalarFieldEnum[]
  }

  /**
   * Interview findMany
   */
  export type InterviewFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Interview
     */
    select?: InterviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewInclude<ExtArgs> | null
    /**
     * Filter, which Interviews to fetch.
     */
    where?: InterviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Interviews to fetch.
     */
    orderBy?: InterviewOrderByWithRelationInput | InterviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Interviews.
     */
    cursor?: InterviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Interviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Interviews.
     */
    skip?: number
    distinct?: InterviewScalarFieldEnum | InterviewScalarFieldEnum[]
  }

  /**
   * Interview create
   */
  export type InterviewCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Interview
     */
    select?: InterviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewInclude<ExtArgs> | null
    /**
     * The data needed to create a Interview.
     */
    data: XOR<InterviewCreateInput, InterviewUncheckedCreateInput>
  }

  /**
   * Interview createMany
   */
  export type InterviewCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Interviews.
     */
    data: InterviewCreateManyInput | InterviewCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Interview createManyAndReturn
   */
  export type InterviewCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Interview
     */
    select?: InterviewSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Interviews.
     */
    data: InterviewCreateManyInput | InterviewCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Interview update
   */
  export type InterviewUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Interview
     */
    select?: InterviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewInclude<ExtArgs> | null
    /**
     * The data needed to update a Interview.
     */
    data: XOR<InterviewUpdateInput, InterviewUncheckedUpdateInput>
    /**
     * Choose, which Interview to update.
     */
    where: InterviewWhereUniqueInput
  }

  /**
   * Interview updateMany
   */
  export type InterviewUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Interviews.
     */
    data: XOR<InterviewUpdateManyMutationInput, InterviewUncheckedUpdateManyInput>
    /**
     * Filter which Interviews to update
     */
    where?: InterviewWhereInput
  }

  /**
   * Interview upsert
   */
  export type InterviewUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Interview
     */
    select?: InterviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewInclude<ExtArgs> | null
    /**
     * The filter to search for the Interview to update in case it exists.
     */
    where: InterviewWhereUniqueInput
    /**
     * In case the Interview found by the `where` argument doesn't exist, create a new Interview with this data.
     */
    create: XOR<InterviewCreateInput, InterviewUncheckedCreateInput>
    /**
     * In case the Interview was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InterviewUpdateInput, InterviewUncheckedUpdateInput>
  }

  /**
   * Interview delete
   */
  export type InterviewDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Interview
     */
    select?: InterviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewInclude<ExtArgs> | null
    /**
     * Filter which Interview to delete.
     */
    where: InterviewWhereUniqueInput
  }

  /**
   * Interview deleteMany
   */
  export type InterviewDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Interviews to delete
     */
    where?: InterviewWhereInput
  }

  /**
   * Interview.responses
   */
  export type Interview$responsesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Response
     */
    select?: ResponseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResponseInclude<ExtArgs> | null
    where?: ResponseWhereInput
    orderBy?: ResponseOrderByWithRelationInput | ResponseOrderByWithRelationInput[]
    cursor?: ResponseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ResponseScalarFieldEnum | ResponseScalarFieldEnum[]
  }

  /**
   * Interview.feedbackLoops
   */
  export type Interview$feedbackLoopsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedbackLoop
     */
    select?: FeedbackLoopSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackLoopInclude<ExtArgs> | null
    where?: FeedbackLoopWhereInput
    orderBy?: FeedbackLoopOrderByWithRelationInput | FeedbackLoopOrderByWithRelationInput[]
    cursor?: FeedbackLoopWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FeedbackLoopScalarFieldEnum | FeedbackLoopScalarFieldEnum[]
  }

  /**
   * Interview.agentLogs
   */
  export type Interview$agentLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentLog
     */
    select?: AgentLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentLogInclude<ExtArgs> | null
    where?: AgentLogWhereInput
    orderBy?: AgentLogOrderByWithRelationInput | AgentLogOrderByWithRelationInput[]
    cursor?: AgentLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AgentLogScalarFieldEnum | AgentLogScalarFieldEnum[]
  }

  /**
   * Interview without action
   */
  export type InterviewDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Interview
     */
    select?: InterviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewInclude<ExtArgs> | null
  }


  /**
   * Model Question
   */

  export type AggregateQuestion = {
    _count: QuestionCountAggregateOutputType | null
    _avg: QuestionAvgAggregateOutputType | null
    _sum: QuestionSumAggregateOutputType | null
    _min: QuestionMinAggregateOutputType | null
    _max: QuestionMaxAggregateOutputType | null
  }

  export type QuestionAvgAggregateOutputType = {
    avgScore: number | null
    timesAsked: number | null
    correlationScore: number | null
  }

  export type QuestionSumAggregateOutputType = {
    avgScore: number | null
    timesAsked: number | null
    correlationScore: number | null
  }

  export type QuestionMinAggregateOutputType = {
    id: string | null
    content: string | null
    category: string | null
    difficulty: $Enums.Difficulty | null
    position: string | null
    avgScore: number | null
    timesAsked: number | null
    correlationScore: number | null
    lastUsed: Date | null
    generatedBy: string | null
    generationPrompt: string | null
    createdById: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type QuestionMaxAggregateOutputType = {
    id: string | null
    content: string | null
    category: string | null
    difficulty: $Enums.Difficulty | null
    position: string | null
    avgScore: number | null
    timesAsked: number | null
    correlationScore: number | null
    lastUsed: Date | null
    generatedBy: string | null
    generationPrompt: string | null
    createdById: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type QuestionCountAggregateOutputType = {
    id: number
    content: number
    category: number
    difficulty: number
    position: number
    skillTags: number
    avgScore: number
    timesAsked: number
    correlationScore: number
    lastUsed: number
    generatedBy: number
    generationPrompt: number
    createdById: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type QuestionAvgAggregateInputType = {
    avgScore?: true
    timesAsked?: true
    correlationScore?: true
  }

  export type QuestionSumAggregateInputType = {
    avgScore?: true
    timesAsked?: true
    correlationScore?: true
  }

  export type QuestionMinAggregateInputType = {
    id?: true
    content?: true
    category?: true
    difficulty?: true
    position?: true
    avgScore?: true
    timesAsked?: true
    correlationScore?: true
    lastUsed?: true
    generatedBy?: true
    generationPrompt?: true
    createdById?: true
    createdAt?: true
    updatedAt?: true
  }

  export type QuestionMaxAggregateInputType = {
    id?: true
    content?: true
    category?: true
    difficulty?: true
    position?: true
    avgScore?: true
    timesAsked?: true
    correlationScore?: true
    lastUsed?: true
    generatedBy?: true
    generationPrompt?: true
    createdById?: true
    createdAt?: true
    updatedAt?: true
  }

  export type QuestionCountAggregateInputType = {
    id?: true
    content?: true
    category?: true
    difficulty?: true
    position?: true
    skillTags?: true
    avgScore?: true
    timesAsked?: true
    correlationScore?: true
    lastUsed?: true
    generatedBy?: true
    generationPrompt?: true
    createdById?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type QuestionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Question to aggregate.
     */
    where?: QuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Questions to fetch.
     */
    orderBy?: QuestionOrderByWithRelationInput | QuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: QuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Questions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Questions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Questions
    **/
    _count?: true | QuestionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: QuestionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: QuestionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: QuestionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: QuestionMaxAggregateInputType
  }

  export type GetQuestionAggregateType<T extends QuestionAggregateArgs> = {
        [P in keyof T & keyof AggregateQuestion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQuestion[P]>
      : GetScalarType<T[P], AggregateQuestion[P]>
  }




  export type QuestionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuestionWhereInput
    orderBy?: QuestionOrderByWithAggregationInput | QuestionOrderByWithAggregationInput[]
    by: QuestionScalarFieldEnum[] | QuestionScalarFieldEnum
    having?: QuestionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: QuestionCountAggregateInputType | true
    _avg?: QuestionAvgAggregateInputType
    _sum?: QuestionSumAggregateInputType
    _min?: QuestionMinAggregateInputType
    _max?: QuestionMaxAggregateInputType
  }

  export type QuestionGroupByOutputType = {
    id: string
    content: string
    category: string
    difficulty: $Enums.Difficulty
    position: string
    skillTags: string[]
    avgScore: number
    timesAsked: number
    correlationScore: number
    lastUsed: Date | null
    generatedBy: string | null
    generationPrompt: string | null
    createdById: string
    createdAt: Date
    updatedAt: Date
    _count: QuestionCountAggregateOutputType | null
    _avg: QuestionAvgAggregateOutputType | null
    _sum: QuestionSumAggregateOutputType | null
    _min: QuestionMinAggregateOutputType | null
    _max: QuestionMaxAggregateOutputType | null
  }

  type GetQuestionGroupByPayload<T extends QuestionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<QuestionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof QuestionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], QuestionGroupByOutputType[P]>
            : GetScalarType<T[P], QuestionGroupByOutputType[P]>
        }
      >
    >


  export type QuestionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    category?: boolean
    difficulty?: boolean
    position?: boolean
    skillTags?: boolean
    avgScore?: boolean
    timesAsked?: boolean
    correlationScore?: boolean
    lastUsed?: boolean
    generatedBy?: boolean
    generationPrompt?: boolean
    createdById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    responses?: boolean | Question$responsesArgs<ExtArgs>
    feedbackLoops?: boolean | Question$feedbackLoopsArgs<ExtArgs>
    _count?: boolean | QuestionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["question"]>

  export type QuestionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    category?: boolean
    difficulty?: boolean
    position?: boolean
    skillTags?: boolean
    avgScore?: boolean
    timesAsked?: boolean
    correlationScore?: boolean
    lastUsed?: boolean
    generatedBy?: boolean
    generationPrompt?: boolean
    createdById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["question"]>

  export type QuestionSelectScalar = {
    id?: boolean
    content?: boolean
    category?: boolean
    difficulty?: boolean
    position?: boolean
    skillTags?: boolean
    avgScore?: boolean
    timesAsked?: boolean
    correlationScore?: boolean
    lastUsed?: boolean
    generatedBy?: boolean
    generationPrompt?: boolean
    createdById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type QuestionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    responses?: boolean | Question$responsesArgs<ExtArgs>
    feedbackLoops?: boolean | Question$feedbackLoopsArgs<ExtArgs>
    _count?: boolean | QuestionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type QuestionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $QuestionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Question"
    objects: {
      createdBy: Prisma.$UserPayload<ExtArgs>
      responses: Prisma.$ResponsePayload<ExtArgs>[]
      feedbackLoops: Prisma.$FeedbackLoopPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      content: string
      category: string
      difficulty: $Enums.Difficulty
      position: string
      skillTags: string[]
      avgScore: number
      timesAsked: number
      correlationScore: number
      lastUsed: Date | null
      generatedBy: string | null
      generationPrompt: string | null
      createdById: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["question"]>
    composites: {}
  }

  type QuestionGetPayload<S extends boolean | null | undefined | QuestionDefaultArgs> = $Result.GetResult<Prisma.$QuestionPayload, S>

  type QuestionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<QuestionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: QuestionCountAggregateInputType | true
    }

  export interface QuestionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Question'], meta: { name: 'Question' } }
    /**
     * Find zero or one Question that matches the filter.
     * @param {QuestionFindUniqueArgs} args - Arguments to find a Question
     * @example
     * // Get one Question
     * const question = await prisma.question.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends QuestionFindUniqueArgs>(args: SelectSubset<T, QuestionFindUniqueArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Question that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {QuestionFindUniqueOrThrowArgs} args - Arguments to find a Question
     * @example
     * // Get one Question
     * const question = await prisma.question.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends QuestionFindUniqueOrThrowArgs>(args: SelectSubset<T, QuestionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Question that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionFindFirstArgs} args - Arguments to find a Question
     * @example
     * // Get one Question
     * const question = await prisma.question.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends QuestionFindFirstArgs>(args?: SelectSubset<T, QuestionFindFirstArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Question that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionFindFirstOrThrowArgs} args - Arguments to find a Question
     * @example
     * // Get one Question
     * const question = await prisma.question.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends QuestionFindFirstOrThrowArgs>(args?: SelectSubset<T, QuestionFindFirstOrThrowArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Questions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Questions
     * const questions = await prisma.question.findMany()
     * 
     * // Get first 10 Questions
     * const questions = await prisma.question.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const questionWithIdOnly = await prisma.question.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends QuestionFindManyArgs>(args?: SelectSubset<T, QuestionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Question.
     * @param {QuestionCreateArgs} args - Arguments to create a Question.
     * @example
     * // Create one Question
     * const Question = await prisma.question.create({
     *   data: {
     *     // ... data to create a Question
     *   }
     * })
     * 
     */
    create<T extends QuestionCreateArgs>(args: SelectSubset<T, QuestionCreateArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Questions.
     * @param {QuestionCreateManyArgs} args - Arguments to create many Questions.
     * @example
     * // Create many Questions
     * const question = await prisma.question.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends QuestionCreateManyArgs>(args?: SelectSubset<T, QuestionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Questions and returns the data saved in the database.
     * @param {QuestionCreateManyAndReturnArgs} args - Arguments to create many Questions.
     * @example
     * // Create many Questions
     * const question = await prisma.question.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Questions and only return the `id`
     * const questionWithIdOnly = await prisma.question.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends QuestionCreateManyAndReturnArgs>(args?: SelectSubset<T, QuestionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Question.
     * @param {QuestionDeleteArgs} args - Arguments to delete one Question.
     * @example
     * // Delete one Question
     * const Question = await prisma.question.delete({
     *   where: {
     *     // ... filter to delete one Question
     *   }
     * })
     * 
     */
    delete<T extends QuestionDeleteArgs>(args: SelectSubset<T, QuestionDeleteArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Question.
     * @param {QuestionUpdateArgs} args - Arguments to update one Question.
     * @example
     * // Update one Question
     * const question = await prisma.question.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends QuestionUpdateArgs>(args: SelectSubset<T, QuestionUpdateArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Questions.
     * @param {QuestionDeleteManyArgs} args - Arguments to filter Questions to delete.
     * @example
     * // Delete a few Questions
     * const { count } = await prisma.question.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends QuestionDeleteManyArgs>(args?: SelectSubset<T, QuestionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Questions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Questions
     * const question = await prisma.question.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends QuestionUpdateManyArgs>(args: SelectSubset<T, QuestionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Question.
     * @param {QuestionUpsertArgs} args - Arguments to update or create a Question.
     * @example
     * // Update or create a Question
     * const question = await prisma.question.upsert({
     *   create: {
     *     // ... data to create a Question
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Question we want to update
     *   }
     * })
     */
    upsert<T extends QuestionUpsertArgs>(args: SelectSubset<T, QuestionUpsertArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Questions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionCountArgs} args - Arguments to filter Questions to count.
     * @example
     * // Count the number of Questions
     * const count = await prisma.question.count({
     *   where: {
     *     // ... the filter for the Questions we want to count
     *   }
     * })
    **/
    count<T extends QuestionCountArgs>(
      args?: Subset<T, QuestionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QuestionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Question.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends QuestionAggregateArgs>(args: Subset<T, QuestionAggregateArgs>): Prisma.PrismaPromise<GetQuestionAggregateType<T>>

    /**
     * Group by Question.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends QuestionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: QuestionGroupByArgs['orderBy'] }
        : { orderBy?: QuestionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, QuestionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQuestionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Question model
   */
  readonly fields: QuestionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Question.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__QuestionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    createdBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    responses<T extends Question$responsesArgs<ExtArgs> = {}>(args?: Subset<T, Question$responsesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResponsePayload<ExtArgs>, T, "findMany"> | Null>
    feedbackLoops<T extends Question$feedbackLoopsArgs<ExtArgs> = {}>(args?: Subset<T, Question$feedbackLoopsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedbackLoopPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Question model
   */ 
  interface QuestionFieldRefs {
    readonly id: FieldRef<"Question", 'String'>
    readonly content: FieldRef<"Question", 'String'>
    readonly category: FieldRef<"Question", 'String'>
    readonly difficulty: FieldRef<"Question", 'Difficulty'>
    readonly position: FieldRef<"Question", 'String'>
    readonly skillTags: FieldRef<"Question", 'String[]'>
    readonly avgScore: FieldRef<"Question", 'Float'>
    readonly timesAsked: FieldRef<"Question", 'Int'>
    readonly correlationScore: FieldRef<"Question", 'Float'>
    readonly lastUsed: FieldRef<"Question", 'DateTime'>
    readonly generatedBy: FieldRef<"Question", 'String'>
    readonly generationPrompt: FieldRef<"Question", 'String'>
    readonly createdById: FieldRef<"Question", 'String'>
    readonly createdAt: FieldRef<"Question", 'DateTime'>
    readonly updatedAt: FieldRef<"Question", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Question findUnique
   */
  export type QuestionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * Filter, which Question to fetch.
     */
    where: QuestionWhereUniqueInput
  }

  /**
   * Question findUniqueOrThrow
   */
  export type QuestionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * Filter, which Question to fetch.
     */
    where: QuestionWhereUniqueInput
  }

  /**
   * Question findFirst
   */
  export type QuestionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * Filter, which Question to fetch.
     */
    where?: QuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Questions to fetch.
     */
    orderBy?: QuestionOrderByWithRelationInput | QuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Questions.
     */
    cursor?: QuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Questions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Questions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Questions.
     */
    distinct?: QuestionScalarFieldEnum | QuestionScalarFieldEnum[]
  }

  /**
   * Question findFirstOrThrow
   */
  export type QuestionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * Filter, which Question to fetch.
     */
    where?: QuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Questions to fetch.
     */
    orderBy?: QuestionOrderByWithRelationInput | QuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Questions.
     */
    cursor?: QuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Questions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Questions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Questions.
     */
    distinct?: QuestionScalarFieldEnum | QuestionScalarFieldEnum[]
  }

  /**
   * Question findMany
   */
  export type QuestionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * Filter, which Questions to fetch.
     */
    where?: QuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Questions to fetch.
     */
    orderBy?: QuestionOrderByWithRelationInput | QuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Questions.
     */
    cursor?: QuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Questions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Questions.
     */
    skip?: number
    distinct?: QuestionScalarFieldEnum | QuestionScalarFieldEnum[]
  }

  /**
   * Question create
   */
  export type QuestionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * The data needed to create a Question.
     */
    data: XOR<QuestionCreateInput, QuestionUncheckedCreateInput>
  }

  /**
   * Question createMany
   */
  export type QuestionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Questions.
     */
    data: QuestionCreateManyInput | QuestionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Question createManyAndReturn
   */
  export type QuestionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Questions.
     */
    data: QuestionCreateManyInput | QuestionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Question update
   */
  export type QuestionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * The data needed to update a Question.
     */
    data: XOR<QuestionUpdateInput, QuestionUncheckedUpdateInput>
    /**
     * Choose, which Question to update.
     */
    where: QuestionWhereUniqueInput
  }

  /**
   * Question updateMany
   */
  export type QuestionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Questions.
     */
    data: XOR<QuestionUpdateManyMutationInput, QuestionUncheckedUpdateManyInput>
    /**
     * Filter which Questions to update
     */
    where?: QuestionWhereInput
  }

  /**
   * Question upsert
   */
  export type QuestionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * The filter to search for the Question to update in case it exists.
     */
    where: QuestionWhereUniqueInput
    /**
     * In case the Question found by the `where` argument doesn't exist, create a new Question with this data.
     */
    create: XOR<QuestionCreateInput, QuestionUncheckedCreateInput>
    /**
     * In case the Question was found with the provided `where` argument, update it with this data.
     */
    update: XOR<QuestionUpdateInput, QuestionUncheckedUpdateInput>
  }

  /**
   * Question delete
   */
  export type QuestionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * Filter which Question to delete.
     */
    where: QuestionWhereUniqueInput
  }

  /**
   * Question deleteMany
   */
  export type QuestionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Questions to delete
     */
    where?: QuestionWhereInput
  }

  /**
   * Question.responses
   */
  export type Question$responsesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Response
     */
    select?: ResponseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResponseInclude<ExtArgs> | null
    where?: ResponseWhereInput
    orderBy?: ResponseOrderByWithRelationInput | ResponseOrderByWithRelationInput[]
    cursor?: ResponseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ResponseScalarFieldEnum | ResponseScalarFieldEnum[]
  }

  /**
   * Question.feedbackLoops
   */
  export type Question$feedbackLoopsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedbackLoop
     */
    select?: FeedbackLoopSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackLoopInclude<ExtArgs> | null
    where?: FeedbackLoopWhereInput
    orderBy?: FeedbackLoopOrderByWithRelationInput | FeedbackLoopOrderByWithRelationInput[]
    cursor?: FeedbackLoopWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FeedbackLoopScalarFieldEnum | FeedbackLoopScalarFieldEnum[]
  }

  /**
   * Question without action
   */
  export type QuestionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
  }


  /**
   * Model Response
   */

  export type AggregateResponse = {
    _count: ResponseCountAggregateOutputType | null
    _avg: ResponseAvgAggregateOutputType | null
    _sum: ResponseSumAggregateOutputType | null
    _min: ResponseMinAggregateOutputType | null
    _max: ResponseMaxAggregateOutputType | null
  }

  export type ResponseAvgAggregateOutputType = {
    duration: number | null
    sentiment: number | null
    confidence: number | null
  }

  export type ResponseSumAggregateOutputType = {
    duration: number | null
    sentiment: number | null
    confidence: number | null
  }

  export type ResponseMinAggregateOutputType = {
    id: string | null
    interviewId: string | null
    questionId: string | null
    audioUrl: string | null
    transcript: string | null
    duration: number | null
    sentiment: number | null
    confidence: number | null
    createdAt: Date | null
  }

  export type ResponseMaxAggregateOutputType = {
    id: string | null
    interviewId: string | null
    questionId: string | null
    audioUrl: string | null
    transcript: string | null
    duration: number | null
    sentiment: number | null
    confidence: number | null
    createdAt: Date | null
  }

  export type ResponseCountAggregateOutputType = {
    id: number
    interviewId: number
    questionId: number
    audioUrl: number
    transcript: number
    duration: number
    scores: number
    tags: number
    sentiment: number
    confidence: number
    createdAt: number
    _all: number
  }


  export type ResponseAvgAggregateInputType = {
    duration?: true
    sentiment?: true
    confidence?: true
  }

  export type ResponseSumAggregateInputType = {
    duration?: true
    sentiment?: true
    confidence?: true
  }

  export type ResponseMinAggregateInputType = {
    id?: true
    interviewId?: true
    questionId?: true
    audioUrl?: true
    transcript?: true
    duration?: true
    sentiment?: true
    confidence?: true
    createdAt?: true
  }

  export type ResponseMaxAggregateInputType = {
    id?: true
    interviewId?: true
    questionId?: true
    audioUrl?: true
    transcript?: true
    duration?: true
    sentiment?: true
    confidence?: true
    createdAt?: true
  }

  export type ResponseCountAggregateInputType = {
    id?: true
    interviewId?: true
    questionId?: true
    audioUrl?: true
    transcript?: true
    duration?: true
    scores?: true
    tags?: true
    sentiment?: true
    confidence?: true
    createdAt?: true
    _all?: true
  }

  export type ResponseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Response to aggregate.
     */
    where?: ResponseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Responses to fetch.
     */
    orderBy?: ResponseOrderByWithRelationInput | ResponseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ResponseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Responses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Responses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Responses
    **/
    _count?: true | ResponseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ResponseAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ResponseSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ResponseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ResponseMaxAggregateInputType
  }

  export type GetResponseAggregateType<T extends ResponseAggregateArgs> = {
        [P in keyof T & keyof AggregateResponse]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateResponse[P]>
      : GetScalarType<T[P], AggregateResponse[P]>
  }




  export type ResponseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResponseWhereInput
    orderBy?: ResponseOrderByWithAggregationInput | ResponseOrderByWithAggregationInput[]
    by: ResponseScalarFieldEnum[] | ResponseScalarFieldEnum
    having?: ResponseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ResponseCountAggregateInputType | true
    _avg?: ResponseAvgAggregateInputType
    _sum?: ResponseSumAggregateInputType
    _min?: ResponseMinAggregateInputType
    _max?: ResponseMaxAggregateInputType
  }

  export type ResponseGroupByOutputType = {
    id: string
    interviewId: string
    questionId: string
    audioUrl: string | null
    transcript: string
    duration: number
    scores: JsonValue
    tags: string[]
    sentiment: number | null
    confidence: number | null
    createdAt: Date
    _count: ResponseCountAggregateOutputType | null
    _avg: ResponseAvgAggregateOutputType | null
    _sum: ResponseSumAggregateOutputType | null
    _min: ResponseMinAggregateOutputType | null
    _max: ResponseMaxAggregateOutputType | null
  }

  type GetResponseGroupByPayload<T extends ResponseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ResponseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ResponseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ResponseGroupByOutputType[P]>
            : GetScalarType<T[P], ResponseGroupByOutputType[P]>
        }
      >
    >


  export type ResponseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    interviewId?: boolean
    questionId?: boolean
    audioUrl?: boolean
    transcript?: boolean
    duration?: boolean
    scores?: boolean
    tags?: boolean
    sentiment?: boolean
    confidence?: boolean
    createdAt?: boolean
    interview?: boolean | InterviewDefaultArgs<ExtArgs>
    question?: boolean | QuestionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["response"]>

  export type ResponseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    interviewId?: boolean
    questionId?: boolean
    audioUrl?: boolean
    transcript?: boolean
    duration?: boolean
    scores?: boolean
    tags?: boolean
    sentiment?: boolean
    confidence?: boolean
    createdAt?: boolean
    interview?: boolean | InterviewDefaultArgs<ExtArgs>
    question?: boolean | QuestionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["response"]>

  export type ResponseSelectScalar = {
    id?: boolean
    interviewId?: boolean
    questionId?: boolean
    audioUrl?: boolean
    transcript?: boolean
    duration?: boolean
    scores?: boolean
    tags?: boolean
    sentiment?: boolean
    confidence?: boolean
    createdAt?: boolean
  }

  export type ResponseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    interview?: boolean | InterviewDefaultArgs<ExtArgs>
    question?: boolean | QuestionDefaultArgs<ExtArgs>
  }
  export type ResponseIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    interview?: boolean | InterviewDefaultArgs<ExtArgs>
    question?: boolean | QuestionDefaultArgs<ExtArgs>
  }

  export type $ResponsePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Response"
    objects: {
      interview: Prisma.$InterviewPayload<ExtArgs>
      question: Prisma.$QuestionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      interviewId: string
      questionId: string
      audioUrl: string | null
      transcript: string
      duration: number
      scores: Prisma.JsonValue
      tags: string[]
      sentiment: number | null
      confidence: number | null
      createdAt: Date
    }, ExtArgs["result"]["response"]>
    composites: {}
  }

  type ResponseGetPayload<S extends boolean | null | undefined | ResponseDefaultArgs> = $Result.GetResult<Prisma.$ResponsePayload, S>

  type ResponseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ResponseFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ResponseCountAggregateInputType | true
    }

  export interface ResponseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Response'], meta: { name: 'Response' } }
    /**
     * Find zero or one Response that matches the filter.
     * @param {ResponseFindUniqueArgs} args - Arguments to find a Response
     * @example
     * // Get one Response
     * const response = await prisma.response.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ResponseFindUniqueArgs>(args: SelectSubset<T, ResponseFindUniqueArgs<ExtArgs>>): Prisma__ResponseClient<$Result.GetResult<Prisma.$ResponsePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Response that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ResponseFindUniqueOrThrowArgs} args - Arguments to find a Response
     * @example
     * // Get one Response
     * const response = await prisma.response.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ResponseFindUniqueOrThrowArgs>(args: SelectSubset<T, ResponseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ResponseClient<$Result.GetResult<Prisma.$ResponsePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Response that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResponseFindFirstArgs} args - Arguments to find a Response
     * @example
     * // Get one Response
     * const response = await prisma.response.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ResponseFindFirstArgs>(args?: SelectSubset<T, ResponseFindFirstArgs<ExtArgs>>): Prisma__ResponseClient<$Result.GetResult<Prisma.$ResponsePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Response that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResponseFindFirstOrThrowArgs} args - Arguments to find a Response
     * @example
     * // Get one Response
     * const response = await prisma.response.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ResponseFindFirstOrThrowArgs>(args?: SelectSubset<T, ResponseFindFirstOrThrowArgs<ExtArgs>>): Prisma__ResponseClient<$Result.GetResult<Prisma.$ResponsePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Responses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResponseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Responses
     * const responses = await prisma.response.findMany()
     * 
     * // Get first 10 Responses
     * const responses = await prisma.response.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const responseWithIdOnly = await prisma.response.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ResponseFindManyArgs>(args?: SelectSubset<T, ResponseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResponsePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Response.
     * @param {ResponseCreateArgs} args - Arguments to create a Response.
     * @example
     * // Create one Response
     * const Response = await prisma.response.create({
     *   data: {
     *     // ... data to create a Response
     *   }
     * })
     * 
     */
    create<T extends ResponseCreateArgs>(args: SelectSubset<T, ResponseCreateArgs<ExtArgs>>): Prisma__ResponseClient<$Result.GetResult<Prisma.$ResponsePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Responses.
     * @param {ResponseCreateManyArgs} args - Arguments to create many Responses.
     * @example
     * // Create many Responses
     * const response = await prisma.response.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ResponseCreateManyArgs>(args?: SelectSubset<T, ResponseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Responses and returns the data saved in the database.
     * @param {ResponseCreateManyAndReturnArgs} args - Arguments to create many Responses.
     * @example
     * // Create many Responses
     * const response = await prisma.response.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Responses and only return the `id`
     * const responseWithIdOnly = await prisma.response.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ResponseCreateManyAndReturnArgs>(args?: SelectSubset<T, ResponseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResponsePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Response.
     * @param {ResponseDeleteArgs} args - Arguments to delete one Response.
     * @example
     * // Delete one Response
     * const Response = await prisma.response.delete({
     *   where: {
     *     // ... filter to delete one Response
     *   }
     * })
     * 
     */
    delete<T extends ResponseDeleteArgs>(args: SelectSubset<T, ResponseDeleteArgs<ExtArgs>>): Prisma__ResponseClient<$Result.GetResult<Prisma.$ResponsePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Response.
     * @param {ResponseUpdateArgs} args - Arguments to update one Response.
     * @example
     * // Update one Response
     * const response = await prisma.response.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ResponseUpdateArgs>(args: SelectSubset<T, ResponseUpdateArgs<ExtArgs>>): Prisma__ResponseClient<$Result.GetResult<Prisma.$ResponsePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Responses.
     * @param {ResponseDeleteManyArgs} args - Arguments to filter Responses to delete.
     * @example
     * // Delete a few Responses
     * const { count } = await prisma.response.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ResponseDeleteManyArgs>(args?: SelectSubset<T, ResponseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Responses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResponseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Responses
     * const response = await prisma.response.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ResponseUpdateManyArgs>(args: SelectSubset<T, ResponseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Response.
     * @param {ResponseUpsertArgs} args - Arguments to update or create a Response.
     * @example
     * // Update or create a Response
     * const response = await prisma.response.upsert({
     *   create: {
     *     // ... data to create a Response
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Response we want to update
     *   }
     * })
     */
    upsert<T extends ResponseUpsertArgs>(args: SelectSubset<T, ResponseUpsertArgs<ExtArgs>>): Prisma__ResponseClient<$Result.GetResult<Prisma.$ResponsePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Responses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResponseCountArgs} args - Arguments to filter Responses to count.
     * @example
     * // Count the number of Responses
     * const count = await prisma.response.count({
     *   where: {
     *     // ... the filter for the Responses we want to count
     *   }
     * })
    **/
    count<T extends ResponseCountArgs>(
      args?: Subset<T, ResponseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ResponseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Response.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResponseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ResponseAggregateArgs>(args: Subset<T, ResponseAggregateArgs>): Prisma.PrismaPromise<GetResponseAggregateType<T>>

    /**
     * Group by Response.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResponseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ResponseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ResponseGroupByArgs['orderBy'] }
        : { orderBy?: ResponseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ResponseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetResponseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Response model
   */
  readonly fields: ResponseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Response.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ResponseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    interview<T extends InterviewDefaultArgs<ExtArgs> = {}>(args?: Subset<T, InterviewDefaultArgs<ExtArgs>>): Prisma__InterviewClient<$Result.GetResult<Prisma.$InterviewPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    question<T extends QuestionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, QuestionDefaultArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Response model
   */ 
  interface ResponseFieldRefs {
    readonly id: FieldRef<"Response", 'String'>
    readonly interviewId: FieldRef<"Response", 'String'>
    readonly questionId: FieldRef<"Response", 'String'>
    readonly audioUrl: FieldRef<"Response", 'String'>
    readonly transcript: FieldRef<"Response", 'String'>
    readonly duration: FieldRef<"Response", 'Int'>
    readonly scores: FieldRef<"Response", 'Json'>
    readonly tags: FieldRef<"Response", 'String[]'>
    readonly sentiment: FieldRef<"Response", 'Float'>
    readonly confidence: FieldRef<"Response", 'Float'>
    readonly createdAt: FieldRef<"Response", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Response findUnique
   */
  export type ResponseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Response
     */
    select?: ResponseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResponseInclude<ExtArgs> | null
    /**
     * Filter, which Response to fetch.
     */
    where: ResponseWhereUniqueInput
  }

  /**
   * Response findUniqueOrThrow
   */
  export type ResponseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Response
     */
    select?: ResponseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResponseInclude<ExtArgs> | null
    /**
     * Filter, which Response to fetch.
     */
    where: ResponseWhereUniqueInput
  }

  /**
   * Response findFirst
   */
  export type ResponseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Response
     */
    select?: ResponseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResponseInclude<ExtArgs> | null
    /**
     * Filter, which Response to fetch.
     */
    where?: ResponseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Responses to fetch.
     */
    orderBy?: ResponseOrderByWithRelationInput | ResponseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Responses.
     */
    cursor?: ResponseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Responses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Responses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Responses.
     */
    distinct?: ResponseScalarFieldEnum | ResponseScalarFieldEnum[]
  }

  /**
   * Response findFirstOrThrow
   */
  export type ResponseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Response
     */
    select?: ResponseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResponseInclude<ExtArgs> | null
    /**
     * Filter, which Response to fetch.
     */
    where?: ResponseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Responses to fetch.
     */
    orderBy?: ResponseOrderByWithRelationInput | ResponseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Responses.
     */
    cursor?: ResponseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Responses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Responses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Responses.
     */
    distinct?: ResponseScalarFieldEnum | ResponseScalarFieldEnum[]
  }

  /**
   * Response findMany
   */
  export type ResponseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Response
     */
    select?: ResponseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResponseInclude<ExtArgs> | null
    /**
     * Filter, which Responses to fetch.
     */
    where?: ResponseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Responses to fetch.
     */
    orderBy?: ResponseOrderByWithRelationInput | ResponseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Responses.
     */
    cursor?: ResponseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Responses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Responses.
     */
    skip?: number
    distinct?: ResponseScalarFieldEnum | ResponseScalarFieldEnum[]
  }

  /**
   * Response create
   */
  export type ResponseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Response
     */
    select?: ResponseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResponseInclude<ExtArgs> | null
    /**
     * The data needed to create a Response.
     */
    data: XOR<ResponseCreateInput, ResponseUncheckedCreateInput>
  }

  /**
   * Response createMany
   */
  export type ResponseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Responses.
     */
    data: ResponseCreateManyInput | ResponseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Response createManyAndReturn
   */
  export type ResponseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Response
     */
    select?: ResponseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Responses.
     */
    data: ResponseCreateManyInput | ResponseCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResponseIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Response update
   */
  export type ResponseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Response
     */
    select?: ResponseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResponseInclude<ExtArgs> | null
    /**
     * The data needed to update a Response.
     */
    data: XOR<ResponseUpdateInput, ResponseUncheckedUpdateInput>
    /**
     * Choose, which Response to update.
     */
    where: ResponseWhereUniqueInput
  }

  /**
   * Response updateMany
   */
  export type ResponseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Responses.
     */
    data: XOR<ResponseUpdateManyMutationInput, ResponseUncheckedUpdateManyInput>
    /**
     * Filter which Responses to update
     */
    where?: ResponseWhereInput
  }

  /**
   * Response upsert
   */
  export type ResponseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Response
     */
    select?: ResponseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResponseInclude<ExtArgs> | null
    /**
     * The filter to search for the Response to update in case it exists.
     */
    where: ResponseWhereUniqueInput
    /**
     * In case the Response found by the `where` argument doesn't exist, create a new Response with this data.
     */
    create: XOR<ResponseCreateInput, ResponseUncheckedCreateInput>
    /**
     * In case the Response was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ResponseUpdateInput, ResponseUncheckedUpdateInput>
  }

  /**
   * Response delete
   */
  export type ResponseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Response
     */
    select?: ResponseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResponseInclude<ExtArgs> | null
    /**
     * Filter which Response to delete.
     */
    where: ResponseWhereUniqueInput
  }

  /**
   * Response deleteMany
   */
  export type ResponseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Responses to delete
     */
    where?: ResponseWhereInput
  }

  /**
   * Response without action
   */
  export type ResponseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Response
     */
    select?: ResponseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResponseInclude<ExtArgs> | null
  }


  /**
   * Model FeedbackLoop
   */

  export type AggregateFeedbackLoop = {
    _count: FeedbackLoopCountAggregateOutputType | null
    _min: FeedbackLoopMinAggregateOutputType | null
    _max: FeedbackLoopMaxAggregateOutputType | null
  }

  export type FeedbackLoopMinAggregateOutputType = {
    id: string | null
    interviewId: string | null
    questionId: string | null
    feedbackType: $Enums.FeedbackType | null
    actionTaken: string | null
    outcome: string | null
    createdAt: Date | null
  }

  export type FeedbackLoopMaxAggregateOutputType = {
    id: string | null
    interviewId: string | null
    questionId: string | null
    feedbackType: $Enums.FeedbackType | null
    actionTaken: string | null
    outcome: string | null
    createdAt: Date | null
  }

  export type FeedbackLoopCountAggregateOutputType = {
    id: number
    interviewId: number
    questionId: number
    feedbackType: number
    signal: number
    actionTaken: number
    outcome: number
    createdAt: number
    _all: number
  }


  export type FeedbackLoopMinAggregateInputType = {
    id?: true
    interviewId?: true
    questionId?: true
    feedbackType?: true
    actionTaken?: true
    outcome?: true
    createdAt?: true
  }

  export type FeedbackLoopMaxAggregateInputType = {
    id?: true
    interviewId?: true
    questionId?: true
    feedbackType?: true
    actionTaken?: true
    outcome?: true
    createdAt?: true
  }

  export type FeedbackLoopCountAggregateInputType = {
    id?: true
    interviewId?: true
    questionId?: true
    feedbackType?: true
    signal?: true
    actionTaken?: true
    outcome?: true
    createdAt?: true
    _all?: true
  }

  export type FeedbackLoopAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FeedbackLoop to aggregate.
     */
    where?: FeedbackLoopWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FeedbackLoops to fetch.
     */
    orderBy?: FeedbackLoopOrderByWithRelationInput | FeedbackLoopOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FeedbackLoopWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FeedbackLoops from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FeedbackLoops.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FeedbackLoops
    **/
    _count?: true | FeedbackLoopCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FeedbackLoopMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FeedbackLoopMaxAggregateInputType
  }

  export type GetFeedbackLoopAggregateType<T extends FeedbackLoopAggregateArgs> = {
        [P in keyof T & keyof AggregateFeedbackLoop]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFeedbackLoop[P]>
      : GetScalarType<T[P], AggregateFeedbackLoop[P]>
  }




  export type FeedbackLoopGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FeedbackLoopWhereInput
    orderBy?: FeedbackLoopOrderByWithAggregationInput | FeedbackLoopOrderByWithAggregationInput[]
    by: FeedbackLoopScalarFieldEnum[] | FeedbackLoopScalarFieldEnum
    having?: FeedbackLoopScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FeedbackLoopCountAggregateInputType | true
    _min?: FeedbackLoopMinAggregateInputType
    _max?: FeedbackLoopMaxAggregateInputType
  }

  export type FeedbackLoopGroupByOutputType = {
    id: string
    interviewId: string
    questionId: string | null
    feedbackType: $Enums.FeedbackType
    signal: JsonValue
    actionTaken: string | null
    outcome: string | null
    createdAt: Date
    _count: FeedbackLoopCountAggregateOutputType | null
    _min: FeedbackLoopMinAggregateOutputType | null
    _max: FeedbackLoopMaxAggregateOutputType | null
  }

  type GetFeedbackLoopGroupByPayload<T extends FeedbackLoopGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FeedbackLoopGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FeedbackLoopGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FeedbackLoopGroupByOutputType[P]>
            : GetScalarType<T[P], FeedbackLoopGroupByOutputType[P]>
        }
      >
    >


  export type FeedbackLoopSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    interviewId?: boolean
    questionId?: boolean
    feedbackType?: boolean
    signal?: boolean
    actionTaken?: boolean
    outcome?: boolean
    createdAt?: boolean
    interview?: boolean | InterviewDefaultArgs<ExtArgs>
    question?: boolean | FeedbackLoop$questionArgs<ExtArgs>
  }, ExtArgs["result"]["feedbackLoop"]>

  export type FeedbackLoopSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    interviewId?: boolean
    questionId?: boolean
    feedbackType?: boolean
    signal?: boolean
    actionTaken?: boolean
    outcome?: boolean
    createdAt?: boolean
    interview?: boolean | InterviewDefaultArgs<ExtArgs>
    question?: boolean | FeedbackLoop$questionArgs<ExtArgs>
  }, ExtArgs["result"]["feedbackLoop"]>

  export type FeedbackLoopSelectScalar = {
    id?: boolean
    interviewId?: boolean
    questionId?: boolean
    feedbackType?: boolean
    signal?: boolean
    actionTaken?: boolean
    outcome?: boolean
    createdAt?: boolean
  }

  export type FeedbackLoopInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    interview?: boolean | InterviewDefaultArgs<ExtArgs>
    question?: boolean | FeedbackLoop$questionArgs<ExtArgs>
  }
  export type FeedbackLoopIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    interview?: boolean | InterviewDefaultArgs<ExtArgs>
    question?: boolean | FeedbackLoop$questionArgs<ExtArgs>
  }

  export type $FeedbackLoopPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FeedbackLoop"
    objects: {
      interview: Prisma.$InterviewPayload<ExtArgs>
      question: Prisma.$QuestionPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      interviewId: string
      questionId: string | null
      feedbackType: $Enums.FeedbackType
      signal: Prisma.JsonValue
      actionTaken: string | null
      outcome: string | null
      createdAt: Date
    }, ExtArgs["result"]["feedbackLoop"]>
    composites: {}
  }

  type FeedbackLoopGetPayload<S extends boolean | null | undefined | FeedbackLoopDefaultArgs> = $Result.GetResult<Prisma.$FeedbackLoopPayload, S>

  type FeedbackLoopCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<FeedbackLoopFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: FeedbackLoopCountAggregateInputType | true
    }

  export interface FeedbackLoopDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FeedbackLoop'], meta: { name: 'FeedbackLoop' } }
    /**
     * Find zero or one FeedbackLoop that matches the filter.
     * @param {FeedbackLoopFindUniqueArgs} args - Arguments to find a FeedbackLoop
     * @example
     * // Get one FeedbackLoop
     * const feedbackLoop = await prisma.feedbackLoop.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FeedbackLoopFindUniqueArgs>(args: SelectSubset<T, FeedbackLoopFindUniqueArgs<ExtArgs>>): Prisma__FeedbackLoopClient<$Result.GetResult<Prisma.$FeedbackLoopPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one FeedbackLoop that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {FeedbackLoopFindUniqueOrThrowArgs} args - Arguments to find a FeedbackLoop
     * @example
     * // Get one FeedbackLoop
     * const feedbackLoop = await prisma.feedbackLoop.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FeedbackLoopFindUniqueOrThrowArgs>(args: SelectSubset<T, FeedbackLoopFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FeedbackLoopClient<$Result.GetResult<Prisma.$FeedbackLoopPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first FeedbackLoop that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackLoopFindFirstArgs} args - Arguments to find a FeedbackLoop
     * @example
     * // Get one FeedbackLoop
     * const feedbackLoop = await prisma.feedbackLoop.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FeedbackLoopFindFirstArgs>(args?: SelectSubset<T, FeedbackLoopFindFirstArgs<ExtArgs>>): Prisma__FeedbackLoopClient<$Result.GetResult<Prisma.$FeedbackLoopPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first FeedbackLoop that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackLoopFindFirstOrThrowArgs} args - Arguments to find a FeedbackLoop
     * @example
     * // Get one FeedbackLoop
     * const feedbackLoop = await prisma.feedbackLoop.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FeedbackLoopFindFirstOrThrowArgs>(args?: SelectSubset<T, FeedbackLoopFindFirstOrThrowArgs<ExtArgs>>): Prisma__FeedbackLoopClient<$Result.GetResult<Prisma.$FeedbackLoopPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more FeedbackLoops that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackLoopFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FeedbackLoops
     * const feedbackLoops = await prisma.feedbackLoop.findMany()
     * 
     * // Get first 10 FeedbackLoops
     * const feedbackLoops = await prisma.feedbackLoop.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const feedbackLoopWithIdOnly = await prisma.feedbackLoop.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FeedbackLoopFindManyArgs>(args?: SelectSubset<T, FeedbackLoopFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedbackLoopPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a FeedbackLoop.
     * @param {FeedbackLoopCreateArgs} args - Arguments to create a FeedbackLoop.
     * @example
     * // Create one FeedbackLoop
     * const FeedbackLoop = await prisma.feedbackLoop.create({
     *   data: {
     *     // ... data to create a FeedbackLoop
     *   }
     * })
     * 
     */
    create<T extends FeedbackLoopCreateArgs>(args: SelectSubset<T, FeedbackLoopCreateArgs<ExtArgs>>): Prisma__FeedbackLoopClient<$Result.GetResult<Prisma.$FeedbackLoopPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many FeedbackLoops.
     * @param {FeedbackLoopCreateManyArgs} args - Arguments to create many FeedbackLoops.
     * @example
     * // Create many FeedbackLoops
     * const feedbackLoop = await prisma.feedbackLoop.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FeedbackLoopCreateManyArgs>(args?: SelectSubset<T, FeedbackLoopCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FeedbackLoops and returns the data saved in the database.
     * @param {FeedbackLoopCreateManyAndReturnArgs} args - Arguments to create many FeedbackLoops.
     * @example
     * // Create many FeedbackLoops
     * const feedbackLoop = await prisma.feedbackLoop.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FeedbackLoops and only return the `id`
     * const feedbackLoopWithIdOnly = await prisma.feedbackLoop.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FeedbackLoopCreateManyAndReturnArgs>(args?: SelectSubset<T, FeedbackLoopCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedbackLoopPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a FeedbackLoop.
     * @param {FeedbackLoopDeleteArgs} args - Arguments to delete one FeedbackLoop.
     * @example
     * // Delete one FeedbackLoop
     * const FeedbackLoop = await prisma.feedbackLoop.delete({
     *   where: {
     *     // ... filter to delete one FeedbackLoop
     *   }
     * })
     * 
     */
    delete<T extends FeedbackLoopDeleteArgs>(args: SelectSubset<T, FeedbackLoopDeleteArgs<ExtArgs>>): Prisma__FeedbackLoopClient<$Result.GetResult<Prisma.$FeedbackLoopPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one FeedbackLoop.
     * @param {FeedbackLoopUpdateArgs} args - Arguments to update one FeedbackLoop.
     * @example
     * // Update one FeedbackLoop
     * const feedbackLoop = await prisma.feedbackLoop.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FeedbackLoopUpdateArgs>(args: SelectSubset<T, FeedbackLoopUpdateArgs<ExtArgs>>): Prisma__FeedbackLoopClient<$Result.GetResult<Prisma.$FeedbackLoopPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more FeedbackLoops.
     * @param {FeedbackLoopDeleteManyArgs} args - Arguments to filter FeedbackLoops to delete.
     * @example
     * // Delete a few FeedbackLoops
     * const { count } = await prisma.feedbackLoop.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FeedbackLoopDeleteManyArgs>(args?: SelectSubset<T, FeedbackLoopDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FeedbackLoops.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackLoopUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FeedbackLoops
     * const feedbackLoop = await prisma.feedbackLoop.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FeedbackLoopUpdateManyArgs>(args: SelectSubset<T, FeedbackLoopUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one FeedbackLoop.
     * @param {FeedbackLoopUpsertArgs} args - Arguments to update or create a FeedbackLoop.
     * @example
     * // Update or create a FeedbackLoop
     * const feedbackLoop = await prisma.feedbackLoop.upsert({
     *   create: {
     *     // ... data to create a FeedbackLoop
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FeedbackLoop we want to update
     *   }
     * })
     */
    upsert<T extends FeedbackLoopUpsertArgs>(args: SelectSubset<T, FeedbackLoopUpsertArgs<ExtArgs>>): Prisma__FeedbackLoopClient<$Result.GetResult<Prisma.$FeedbackLoopPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of FeedbackLoops.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackLoopCountArgs} args - Arguments to filter FeedbackLoops to count.
     * @example
     * // Count the number of FeedbackLoops
     * const count = await prisma.feedbackLoop.count({
     *   where: {
     *     // ... the filter for the FeedbackLoops we want to count
     *   }
     * })
    **/
    count<T extends FeedbackLoopCountArgs>(
      args?: Subset<T, FeedbackLoopCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FeedbackLoopCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FeedbackLoop.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackLoopAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FeedbackLoopAggregateArgs>(args: Subset<T, FeedbackLoopAggregateArgs>): Prisma.PrismaPromise<GetFeedbackLoopAggregateType<T>>

    /**
     * Group by FeedbackLoop.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackLoopGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FeedbackLoopGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FeedbackLoopGroupByArgs['orderBy'] }
        : { orderBy?: FeedbackLoopGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FeedbackLoopGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFeedbackLoopGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FeedbackLoop model
   */
  readonly fields: FeedbackLoopFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FeedbackLoop.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FeedbackLoopClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    interview<T extends InterviewDefaultArgs<ExtArgs> = {}>(args?: Subset<T, InterviewDefaultArgs<ExtArgs>>): Prisma__InterviewClient<$Result.GetResult<Prisma.$InterviewPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    question<T extends FeedbackLoop$questionArgs<ExtArgs> = {}>(args?: Subset<T, FeedbackLoop$questionArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FeedbackLoop model
   */ 
  interface FeedbackLoopFieldRefs {
    readonly id: FieldRef<"FeedbackLoop", 'String'>
    readonly interviewId: FieldRef<"FeedbackLoop", 'String'>
    readonly questionId: FieldRef<"FeedbackLoop", 'String'>
    readonly feedbackType: FieldRef<"FeedbackLoop", 'FeedbackType'>
    readonly signal: FieldRef<"FeedbackLoop", 'Json'>
    readonly actionTaken: FieldRef<"FeedbackLoop", 'String'>
    readonly outcome: FieldRef<"FeedbackLoop", 'String'>
    readonly createdAt: FieldRef<"FeedbackLoop", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FeedbackLoop findUnique
   */
  export type FeedbackLoopFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedbackLoop
     */
    select?: FeedbackLoopSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackLoopInclude<ExtArgs> | null
    /**
     * Filter, which FeedbackLoop to fetch.
     */
    where: FeedbackLoopWhereUniqueInput
  }

  /**
   * FeedbackLoop findUniqueOrThrow
   */
  export type FeedbackLoopFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedbackLoop
     */
    select?: FeedbackLoopSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackLoopInclude<ExtArgs> | null
    /**
     * Filter, which FeedbackLoop to fetch.
     */
    where: FeedbackLoopWhereUniqueInput
  }

  /**
   * FeedbackLoop findFirst
   */
  export type FeedbackLoopFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedbackLoop
     */
    select?: FeedbackLoopSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackLoopInclude<ExtArgs> | null
    /**
     * Filter, which FeedbackLoop to fetch.
     */
    where?: FeedbackLoopWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FeedbackLoops to fetch.
     */
    orderBy?: FeedbackLoopOrderByWithRelationInput | FeedbackLoopOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FeedbackLoops.
     */
    cursor?: FeedbackLoopWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FeedbackLoops from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FeedbackLoops.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FeedbackLoops.
     */
    distinct?: FeedbackLoopScalarFieldEnum | FeedbackLoopScalarFieldEnum[]
  }

  /**
   * FeedbackLoop findFirstOrThrow
   */
  export type FeedbackLoopFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedbackLoop
     */
    select?: FeedbackLoopSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackLoopInclude<ExtArgs> | null
    /**
     * Filter, which FeedbackLoop to fetch.
     */
    where?: FeedbackLoopWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FeedbackLoops to fetch.
     */
    orderBy?: FeedbackLoopOrderByWithRelationInput | FeedbackLoopOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FeedbackLoops.
     */
    cursor?: FeedbackLoopWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FeedbackLoops from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FeedbackLoops.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FeedbackLoops.
     */
    distinct?: FeedbackLoopScalarFieldEnum | FeedbackLoopScalarFieldEnum[]
  }

  /**
   * FeedbackLoop findMany
   */
  export type FeedbackLoopFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedbackLoop
     */
    select?: FeedbackLoopSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackLoopInclude<ExtArgs> | null
    /**
     * Filter, which FeedbackLoops to fetch.
     */
    where?: FeedbackLoopWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FeedbackLoops to fetch.
     */
    orderBy?: FeedbackLoopOrderByWithRelationInput | FeedbackLoopOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FeedbackLoops.
     */
    cursor?: FeedbackLoopWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FeedbackLoops from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FeedbackLoops.
     */
    skip?: number
    distinct?: FeedbackLoopScalarFieldEnum | FeedbackLoopScalarFieldEnum[]
  }

  /**
   * FeedbackLoop create
   */
  export type FeedbackLoopCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedbackLoop
     */
    select?: FeedbackLoopSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackLoopInclude<ExtArgs> | null
    /**
     * The data needed to create a FeedbackLoop.
     */
    data: XOR<FeedbackLoopCreateInput, FeedbackLoopUncheckedCreateInput>
  }

  /**
   * FeedbackLoop createMany
   */
  export type FeedbackLoopCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FeedbackLoops.
     */
    data: FeedbackLoopCreateManyInput | FeedbackLoopCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FeedbackLoop createManyAndReturn
   */
  export type FeedbackLoopCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedbackLoop
     */
    select?: FeedbackLoopSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many FeedbackLoops.
     */
    data: FeedbackLoopCreateManyInput | FeedbackLoopCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackLoopIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * FeedbackLoop update
   */
  export type FeedbackLoopUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedbackLoop
     */
    select?: FeedbackLoopSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackLoopInclude<ExtArgs> | null
    /**
     * The data needed to update a FeedbackLoop.
     */
    data: XOR<FeedbackLoopUpdateInput, FeedbackLoopUncheckedUpdateInput>
    /**
     * Choose, which FeedbackLoop to update.
     */
    where: FeedbackLoopWhereUniqueInput
  }

  /**
   * FeedbackLoop updateMany
   */
  export type FeedbackLoopUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FeedbackLoops.
     */
    data: XOR<FeedbackLoopUpdateManyMutationInput, FeedbackLoopUncheckedUpdateManyInput>
    /**
     * Filter which FeedbackLoops to update
     */
    where?: FeedbackLoopWhereInput
  }

  /**
   * FeedbackLoop upsert
   */
  export type FeedbackLoopUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedbackLoop
     */
    select?: FeedbackLoopSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackLoopInclude<ExtArgs> | null
    /**
     * The filter to search for the FeedbackLoop to update in case it exists.
     */
    where: FeedbackLoopWhereUniqueInput
    /**
     * In case the FeedbackLoop found by the `where` argument doesn't exist, create a new FeedbackLoop with this data.
     */
    create: XOR<FeedbackLoopCreateInput, FeedbackLoopUncheckedCreateInput>
    /**
     * In case the FeedbackLoop was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FeedbackLoopUpdateInput, FeedbackLoopUncheckedUpdateInput>
  }

  /**
   * FeedbackLoop delete
   */
  export type FeedbackLoopDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedbackLoop
     */
    select?: FeedbackLoopSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackLoopInclude<ExtArgs> | null
    /**
     * Filter which FeedbackLoop to delete.
     */
    where: FeedbackLoopWhereUniqueInput
  }

  /**
   * FeedbackLoop deleteMany
   */
  export type FeedbackLoopDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FeedbackLoops to delete
     */
    where?: FeedbackLoopWhereInput
  }

  /**
   * FeedbackLoop.question
   */
  export type FeedbackLoop$questionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    where?: QuestionWhereInput
  }

  /**
   * FeedbackLoop without action
   */
  export type FeedbackLoopDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedbackLoop
     */
    select?: FeedbackLoopSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackLoopInclude<ExtArgs> | null
  }


  /**
   * Model AgentLog
   */

  export type AggregateAgentLog = {
    _count: AgentLogCountAggregateOutputType | null
    _avg: AgentLogAvgAggregateOutputType | null
    _sum: AgentLogSumAggregateOutputType | null
    _min: AgentLogMinAggregateOutputType | null
    _max: AgentLogMaxAggregateOutputType | null
  }

  export type AgentLogAvgAggregateOutputType = {
    reflexionLoop: number | null
    performanceScore: number | null
  }

  export type AgentLogSumAggregateOutputType = {
    reflexionLoop: number | null
    performanceScore: number | null
  }

  export type AgentLogMinAggregateOutputType = {
    id: string | null
    interviewId: string | null
    agentType: $Enums.AgentType | null
    action: string | null
    reflexionLoop: number | null
    performanceScore: number | null
    createdAt: Date | null
  }

  export type AgentLogMaxAggregateOutputType = {
    id: string | null
    interviewId: string | null
    agentType: $Enums.AgentType | null
    action: string | null
    reflexionLoop: number | null
    performanceScore: number | null
    createdAt: Date | null
  }

  export type AgentLogCountAggregateOutputType = {
    id: number
    interviewId: number
    agentType: number
    action: number
    input: number
    output: number
    reflexionLoop: number
    performanceScore: number
    createdAt: number
    _all: number
  }


  export type AgentLogAvgAggregateInputType = {
    reflexionLoop?: true
    performanceScore?: true
  }

  export type AgentLogSumAggregateInputType = {
    reflexionLoop?: true
    performanceScore?: true
  }

  export type AgentLogMinAggregateInputType = {
    id?: true
    interviewId?: true
    agentType?: true
    action?: true
    reflexionLoop?: true
    performanceScore?: true
    createdAt?: true
  }

  export type AgentLogMaxAggregateInputType = {
    id?: true
    interviewId?: true
    agentType?: true
    action?: true
    reflexionLoop?: true
    performanceScore?: true
    createdAt?: true
  }

  export type AgentLogCountAggregateInputType = {
    id?: true
    interviewId?: true
    agentType?: true
    action?: true
    input?: true
    output?: true
    reflexionLoop?: true
    performanceScore?: true
    createdAt?: true
    _all?: true
  }

  export type AgentLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AgentLog to aggregate.
     */
    where?: AgentLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentLogs to fetch.
     */
    orderBy?: AgentLogOrderByWithRelationInput | AgentLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AgentLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AgentLogs
    **/
    _count?: true | AgentLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AgentLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AgentLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AgentLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AgentLogMaxAggregateInputType
  }

  export type GetAgentLogAggregateType<T extends AgentLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAgentLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAgentLog[P]>
      : GetScalarType<T[P], AggregateAgentLog[P]>
  }




  export type AgentLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AgentLogWhereInput
    orderBy?: AgentLogOrderByWithAggregationInput | AgentLogOrderByWithAggregationInput[]
    by: AgentLogScalarFieldEnum[] | AgentLogScalarFieldEnum
    having?: AgentLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AgentLogCountAggregateInputType | true
    _avg?: AgentLogAvgAggregateInputType
    _sum?: AgentLogSumAggregateInputType
    _min?: AgentLogMinAggregateInputType
    _max?: AgentLogMaxAggregateInputType
  }

  export type AgentLogGroupByOutputType = {
    id: string
    interviewId: string | null
    agentType: $Enums.AgentType
    action: string
    input: JsonValue
    output: JsonValue
    reflexionLoop: number
    performanceScore: number | null
    createdAt: Date
    _count: AgentLogCountAggregateOutputType | null
    _avg: AgentLogAvgAggregateOutputType | null
    _sum: AgentLogSumAggregateOutputType | null
    _min: AgentLogMinAggregateOutputType | null
    _max: AgentLogMaxAggregateOutputType | null
  }

  type GetAgentLogGroupByPayload<T extends AgentLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AgentLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AgentLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AgentLogGroupByOutputType[P]>
            : GetScalarType<T[P], AgentLogGroupByOutputType[P]>
        }
      >
    >


  export type AgentLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    interviewId?: boolean
    agentType?: boolean
    action?: boolean
    input?: boolean
    output?: boolean
    reflexionLoop?: boolean
    performanceScore?: boolean
    createdAt?: boolean
    interview?: boolean | AgentLog$interviewArgs<ExtArgs>
  }, ExtArgs["result"]["agentLog"]>

  export type AgentLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    interviewId?: boolean
    agentType?: boolean
    action?: boolean
    input?: boolean
    output?: boolean
    reflexionLoop?: boolean
    performanceScore?: boolean
    createdAt?: boolean
    interview?: boolean | AgentLog$interviewArgs<ExtArgs>
  }, ExtArgs["result"]["agentLog"]>

  export type AgentLogSelectScalar = {
    id?: boolean
    interviewId?: boolean
    agentType?: boolean
    action?: boolean
    input?: boolean
    output?: boolean
    reflexionLoop?: boolean
    performanceScore?: boolean
    createdAt?: boolean
  }

  export type AgentLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    interview?: boolean | AgentLog$interviewArgs<ExtArgs>
  }
  export type AgentLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    interview?: boolean | AgentLog$interviewArgs<ExtArgs>
  }

  export type $AgentLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AgentLog"
    objects: {
      interview: Prisma.$InterviewPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      interviewId: string | null
      agentType: $Enums.AgentType
      action: string
      input: Prisma.JsonValue
      output: Prisma.JsonValue
      reflexionLoop: number
      performanceScore: number | null
      createdAt: Date
    }, ExtArgs["result"]["agentLog"]>
    composites: {}
  }

  type AgentLogGetPayload<S extends boolean | null | undefined | AgentLogDefaultArgs> = $Result.GetResult<Prisma.$AgentLogPayload, S>

  type AgentLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AgentLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AgentLogCountAggregateInputType | true
    }

  export interface AgentLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AgentLog'], meta: { name: 'AgentLog' } }
    /**
     * Find zero or one AgentLog that matches the filter.
     * @param {AgentLogFindUniqueArgs} args - Arguments to find a AgentLog
     * @example
     * // Get one AgentLog
     * const agentLog = await prisma.agentLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AgentLogFindUniqueArgs>(args: SelectSubset<T, AgentLogFindUniqueArgs<ExtArgs>>): Prisma__AgentLogClient<$Result.GetResult<Prisma.$AgentLogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AgentLog that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AgentLogFindUniqueOrThrowArgs} args - Arguments to find a AgentLog
     * @example
     * // Get one AgentLog
     * const agentLog = await prisma.agentLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AgentLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AgentLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AgentLogClient<$Result.GetResult<Prisma.$AgentLogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AgentLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentLogFindFirstArgs} args - Arguments to find a AgentLog
     * @example
     * // Get one AgentLog
     * const agentLog = await prisma.agentLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AgentLogFindFirstArgs>(args?: SelectSubset<T, AgentLogFindFirstArgs<ExtArgs>>): Prisma__AgentLogClient<$Result.GetResult<Prisma.$AgentLogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AgentLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentLogFindFirstOrThrowArgs} args - Arguments to find a AgentLog
     * @example
     * // Get one AgentLog
     * const agentLog = await prisma.agentLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AgentLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AgentLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AgentLogClient<$Result.GetResult<Prisma.$AgentLogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AgentLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AgentLogs
     * const agentLogs = await prisma.agentLog.findMany()
     * 
     * // Get first 10 AgentLogs
     * const agentLogs = await prisma.agentLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const agentLogWithIdOnly = await prisma.agentLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AgentLogFindManyArgs>(args?: SelectSubset<T, AgentLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentLogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AgentLog.
     * @param {AgentLogCreateArgs} args - Arguments to create a AgentLog.
     * @example
     * // Create one AgentLog
     * const AgentLog = await prisma.agentLog.create({
     *   data: {
     *     // ... data to create a AgentLog
     *   }
     * })
     * 
     */
    create<T extends AgentLogCreateArgs>(args: SelectSubset<T, AgentLogCreateArgs<ExtArgs>>): Prisma__AgentLogClient<$Result.GetResult<Prisma.$AgentLogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AgentLogs.
     * @param {AgentLogCreateManyArgs} args - Arguments to create many AgentLogs.
     * @example
     * // Create many AgentLogs
     * const agentLog = await prisma.agentLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AgentLogCreateManyArgs>(args?: SelectSubset<T, AgentLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AgentLogs and returns the data saved in the database.
     * @param {AgentLogCreateManyAndReturnArgs} args - Arguments to create many AgentLogs.
     * @example
     * // Create many AgentLogs
     * const agentLog = await prisma.agentLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AgentLogs and only return the `id`
     * const agentLogWithIdOnly = await prisma.agentLog.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AgentLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AgentLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentLogPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AgentLog.
     * @param {AgentLogDeleteArgs} args - Arguments to delete one AgentLog.
     * @example
     * // Delete one AgentLog
     * const AgentLog = await prisma.agentLog.delete({
     *   where: {
     *     // ... filter to delete one AgentLog
     *   }
     * })
     * 
     */
    delete<T extends AgentLogDeleteArgs>(args: SelectSubset<T, AgentLogDeleteArgs<ExtArgs>>): Prisma__AgentLogClient<$Result.GetResult<Prisma.$AgentLogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AgentLog.
     * @param {AgentLogUpdateArgs} args - Arguments to update one AgentLog.
     * @example
     * // Update one AgentLog
     * const agentLog = await prisma.agentLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AgentLogUpdateArgs>(args: SelectSubset<T, AgentLogUpdateArgs<ExtArgs>>): Prisma__AgentLogClient<$Result.GetResult<Prisma.$AgentLogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AgentLogs.
     * @param {AgentLogDeleteManyArgs} args - Arguments to filter AgentLogs to delete.
     * @example
     * // Delete a few AgentLogs
     * const { count } = await prisma.agentLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AgentLogDeleteManyArgs>(args?: SelectSubset<T, AgentLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AgentLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AgentLogs
     * const agentLog = await prisma.agentLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AgentLogUpdateManyArgs>(args: SelectSubset<T, AgentLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AgentLog.
     * @param {AgentLogUpsertArgs} args - Arguments to update or create a AgentLog.
     * @example
     * // Update or create a AgentLog
     * const agentLog = await prisma.agentLog.upsert({
     *   create: {
     *     // ... data to create a AgentLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AgentLog we want to update
     *   }
     * })
     */
    upsert<T extends AgentLogUpsertArgs>(args: SelectSubset<T, AgentLogUpsertArgs<ExtArgs>>): Prisma__AgentLogClient<$Result.GetResult<Prisma.$AgentLogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AgentLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentLogCountArgs} args - Arguments to filter AgentLogs to count.
     * @example
     * // Count the number of AgentLogs
     * const count = await prisma.agentLog.count({
     *   where: {
     *     // ... the filter for the AgentLogs we want to count
     *   }
     * })
    **/
    count<T extends AgentLogCountArgs>(
      args?: Subset<T, AgentLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AgentLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AgentLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AgentLogAggregateArgs>(args: Subset<T, AgentLogAggregateArgs>): Prisma.PrismaPromise<GetAgentLogAggregateType<T>>

    /**
     * Group by AgentLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AgentLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AgentLogGroupByArgs['orderBy'] }
        : { orderBy?: AgentLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AgentLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAgentLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AgentLog model
   */
  readonly fields: AgentLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AgentLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AgentLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    interview<T extends AgentLog$interviewArgs<ExtArgs> = {}>(args?: Subset<T, AgentLog$interviewArgs<ExtArgs>>): Prisma__InterviewClient<$Result.GetResult<Prisma.$InterviewPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AgentLog model
   */ 
  interface AgentLogFieldRefs {
    readonly id: FieldRef<"AgentLog", 'String'>
    readonly interviewId: FieldRef<"AgentLog", 'String'>
    readonly agentType: FieldRef<"AgentLog", 'AgentType'>
    readonly action: FieldRef<"AgentLog", 'String'>
    readonly input: FieldRef<"AgentLog", 'Json'>
    readonly output: FieldRef<"AgentLog", 'Json'>
    readonly reflexionLoop: FieldRef<"AgentLog", 'Int'>
    readonly performanceScore: FieldRef<"AgentLog", 'Float'>
    readonly createdAt: FieldRef<"AgentLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AgentLog findUnique
   */
  export type AgentLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentLog
     */
    select?: AgentLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentLogInclude<ExtArgs> | null
    /**
     * Filter, which AgentLog to fetch.
     */
    where: AgentLogWhereUniqueInput
  }

  /**
   * AgentLog findUniqueOrThrow
   */
  export type AgentLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentLog
     */
    select?: AgentLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentLogInclude<ExtArgs> | null
    /**
     * Filter, which AgentLog to fetch.
     */
    where: AgentLogWhereUniqueInput
  }

  /**
   * AgentLog findFirst
   */
  export type AgentLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentLog
     */
    select?: AgentLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentLogInclude<ExtArgs> | null
    /**
     * Filter, which AgentLog to fetch.
     */
    where?: AgentLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentLogs to fetch.
     */
    orderBy?: AgentLogOrderByWithRelationInput | AgentLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AgentLogs.
     */
    cursor?: AgentLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AgentLogs.
     */
    distinct?: AgentLogScalarFieldEnum | AgentLogScalarFieldEnum[]
  }

  /**
   * AgentLog findFirstOrThrow
   */
  export type AgentLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentLog
     */
    select?: AgentLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentLogInclude<ExtArgs> | null
    /**
     * Filter, which AgentLog to fetch.
     */
    where?: AgentLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentLogs to fetch.
     */
    orderBy?: AgentLogOrderByWithRelationInput | AgentLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AgentLogs.
     */
    cursor?: AgentLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AgentLogs.
     */
    distinct?: AgentLogScalarFieldEnum | AgentLogScalarFieldEnum[]
  }

  /**
   * AgentLog findMany
   */
  export type AgentLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentLog
     */
    select?: AgentLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentLogInclude<ExtArgs> | null
    /**
     * Filter, which AgentLogs to fetch.
     */
    where?: AgentLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentLogs to fetch.
     */
    orderBy?: AgentLogOrderByWithRelationInput | AgentLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AgentLogs.
     */
    cursor?: AgentLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentLogs.
     */
    skip?: number
    distinct?: AgentLogScalarFieldEnum | AgentLogScalarFieldEnum[]
  }

  /**
   * AgentLog create
   */
  export type AgentLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentLog
     */
    select?: AgentLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentLogInclude<ExtArgs> | null
    /**
     * The data needed to create a AgentLog.
     */
    data: XOR<AgentLogCreateInput, AgentLogUncheckedCreateInput>
  }

  /**
   * AgentLog createMany
   */
  export type AgentLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AgentLogs.
     */
    data: AgentLogCreateManyInput | AgentLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AgentLog createManyAndReturn
   */
  export type AgentLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentLog
     */
    select?: AgentLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AgentLogs.
     */
    data: AgentLogCreateManyInput | AgentLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AgentLog update
   */
  export type AgentLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentLog
     */
    select?: AgentLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentLogInclude<ExtArgs> | null
    /**
     * The data needed to update a AgentLog.
     */
    data: XOR<AgentLogUpdateInput, AgentLogUncheckedUpdateInput>
    /**
     * Choose, which AgentLog to update.
     */
    where: AgentLogWhereUniqueInput
  }

  /**
   * AgentLog updateMany
   */
  export type AgentLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AgentLogs.
     */
    data: XOR<AgentLogUpdateManyMutationInput, AgentLogUncheckedUpdateManyInput>
    /**
     * Filter which AgentLogs to update
     */
    where?: AgentLogWhereInput
  }

  /**
   * AgentLog upsert
   */
  export type AgentLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentLog
     */
    select?: AgentLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentLogInclude<ExtArgs> | null
    /**
     * The filter to search for the AgentLog to update in case it exists.
     */
    where: AgentLogWhereUniqueInput
    /**
     * In case the AgentLog found by the `where` argument doesn't exist, create a new AgentLog with this data.
     */
    create: XOR<AgentLogCreateInput, AgentLogUncheckedCreateInput>
    /**
     * In case the AgentLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AgentLogUpdateInput, AgentLogUncheckedUpdateInput>
  }

  /**
   * AgentLog delete
   */
  export type AgentLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentLog
     */
    select?: AgentLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentLogInclude<ExtArgs> | null
    /**
     * Filter which AgentLog to delete.
     */
    where: AgentLogWhereUniqueInput
  }

  /**
   * AgentLog deleteMany
   */
  export type AgentLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AgentLogs to delete
     */
    where?: AgentLogWhereInput
  }

  /**
   * AgentLog.interview
   */
  export type AgentLog$interviewArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Interview
     */
    select?: InterviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewInclude<ExtArgs> | null
    where?: InterviewWhereInput
  }

  /**
   * AgentLog without action
   */
  export type AgentLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentLog
     */
    select?: AgentLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentLogInclude<ExtArgs> | null
  }


  /**
   * Model ScoringModel
   */

  export type AggregateScoringModel = {
    _count: ScoringModelCountAggregateOutputType | null
    _avg: ScoringModelAvgAggregateOutputType | null
    _sum: ScoringModelSumAggregateOutputType | null
    _min: ScoringModelMinAggregateOutputType | null
    _max: ScoringModelMaxAggregateOutputType | null
  }

  export type ScoringModelAvgAggregateOutputType = {
    version: number | null
    accuracy: number | null
    sampleSize: number | null
  }

  export type ScoringModelSumAggregateOutputType = {
    version: number | null
    accuracy: number | null
    sampleSize: number | null
  }

  export type ScoringModelMinAggregateOutputType = {
    id: string | null
    position: string | null
    version: number | null
    accuracy: number | null
    sampleSize: number | null
    isActive: boolean | null
    createdById: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ScoringModelMaxAggregateOutputType = {
    id: string | null
    position: string | null
    version: number | null
    accuracy: number | null
    sampleSize: number | null
    isActive: boolean | null
    createdById: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ScoringModelCountAggregateOutputType = {
    id: number
    position: number
    version: number
    weights: number
    thresholds: number
    accuracy: number
    sampleSize: number
    isActive: number
    createdById: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ScoringModelAvgAggregateInputType = {
    version?: true
    accuracy?: true
    sampleSize?: true
  }

  export type ScoringModelSumAggregateInputType = {
    version?: true
    accuracy?: true
    sampleSize?: true
  }

  export type ScoringModelMinAggregateInputType = {
    id?: true
    position?: true
    version?: true
    accuracy?: true
    sampleSize?: true
    isActive?: true
    createdById?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ScoringModelMaxAggregateInputType = {
    id?: true
    position?: true
    version?: true
    accuracy?: true
    sampleSize?: true
    isActive?: true
    createdById?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ScoringModelCountAggregateInputType = {
    id?: true
    position?: true
    version?: true
    weights?: true
    thresholds?: true
    accuracy?: true
    sampleSize?: true
    isActive?: true
    createdById?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ScoringModelAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ScoringModel to aggregate.
     */
    where?: ScoringModelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScoringModels to fetch.
     */
    orderBy?: ScoringModelOrderByWithRelationInput | ScoringModelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ScoringModelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScoringModels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScoringModels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ScoringModels
    **/
    _count?: true | ScoringModelCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ScoringModelAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ScoringModelSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ScoringModelMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ScoringModelMaxAggregateInputType
  }

  export type GetScoringModelAggregateType<T extends ScoringModelAggregateArgs> = {
        [P in keyof T & keyof AggregateScoringModel]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateScoringModel[P]>
      : GetScalarType<T[P], AggregateScoringModel[P]>
  }




  export type ScoringModelGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScoringModelWhereInput
    orderBy?: ScoringModelOrderByWithAggregationInput | ScoringModelOrderByWithAggregationInput[]
    by: ScoringModelScalarFieldEnum[] | ScoringModelScalarFieldEnum
    having?: ScoringModelScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ScoringModelCountAggregateInputType | true
    _avg?: ScoringModelAvgAggregateInputType
    _sum?: ScoringModelSumAggregateInputType
    _min?: ScoringModelMinAggregateInputType
    _max?: ScoringModelMaxAggregateInputType
  }

  export type ScoringModelGroupByOutputType = {
    id: string
    position: string
    version: number
    weights: JsonValue
    thresholds: JsonValue
    accuracy: number | null
    sampleSize: number
    isActive: boolean
    createdById: string
    createdAt: Date
    updatedAt: Date
    _count: ScoringModelCountAggregateOutputType | null
    _avg: ScoringModelAvgAggregateOutputType | null
    _sum: ScoringModelSumAggregateOutputType | null
    _min: ScoringModelMinAggregateOutputType | null
    _max: ScoringModelMaxAggregateOutputType | null
  }

  type GetScoringModelGroupByPayload<T extends ScoringModelGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ScoringModelGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ScoringModelGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ScoringModelGroupByOutputType[P]>
            : GetScalarType<T[P], ScoringModelGroupByOutputType[P]>
        }
      >
    >


  export type ScoringModelSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    position?: boolean
    version?: boolean
    weights?: boolean
    thresholds?: boolean
    accuracy?: boolean
    sampleSize?: boolean
    isActive?: boolean
    createdById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["scoringModel"]>

  export type ScoringModelSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    position?: boolean
    version?: boolean
    weights?: boolean
    thresholds?: boolean
    accuracy?: boolean
    sampleSize?: boolean
    isActive?: boolean
    createdById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["scoringModel"]>

  export type ScoringModelSelectScalar = {
    id?: boolean
    position?: boolean
    version?: boolean
    weights?: boolean
    thresholds?: boolean
    accuracy?: boolean
    sampleSize?: boolean
    isActive?: boolean
    createdById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ScoringModelInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ScoringModelIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ScoringModelPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ScoringModel"
    objects: {
      createdBy: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      position: string
      version: number
      weights: Prisma.JsonValue
      thresholds: Prisma.JsonValue
      accuracy: number | null
      sampleSize: number
      isActive: boolean
      createdById: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["scoringModel"]>
    composites: {}
  }

  type ScoringModelGetPayload<S extends boolean | null | undefined | ScoringModelDefaultArgs> = $Result.GetResult<Prisma.$ScoringModelPayload, S>

  type ScoringModelCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ScoringModelFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ScoringModelCountAggregateInputType | true
    }

  export interface ScoringModelDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ScoringModel'], meta: { name: 'ScoringModel' } }
    /**
     * Find zero or one ScoringModel that matches the filter.
     * @param {ScoringModelFindUniqueArgs} args - Arguments to find a ScoringModel
     * @example
     * // Get one ScoringModel
     * const scoringModel = await prisma.scoringModel.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ScoringModelFindUniqueArgs>(args: SelectSubset<T, ScoringModelFindUniqueArgs<ExtArgs>>): Prisma__ScoringModelClient<$Result.GetResult<Prisma.$ScoringModelPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ScoringModel that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ScoringModelFindUniqueOrThrowArgs} args - Arguments to find a ScoringModel
     * @example
     * // Get one ScoringModel
     * const scoringModel = await prisma.scoringModel.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ScoringModelFindUniqueOrThrowArgs>(args: SelectSubset<T, ScoringModelFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ScoringModelClient<$Result.GetResult<Prisma.$ScoringModelPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ScoringModel that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScoringModelFindFirstArgs} args - Arguments to find a ScoringModel
     * @example
     * // Get one ScoringModel
     * const scoringModel = await prisma.scoringModel.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ScoringModelFindFirstArgs>(args?: SelectSubset<T, ScoringModelFindFirstArgs<ExtArgs>>): Prisma__ScoringModelClient<$Result.GetResult<Prisma.$ScoringModelPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ScoringModel that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScoringModelFindFirstOrThrowArgs} args - Arguments to find a ScoringModel
     * @example
     * // Get one ScoringModel
     * const scoringModel = await prisma.scoringModel.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ScoringModelFindFirstOrThrowArgs>(args?: SelectSubset<T, ScoringModelFindFirstOrThrowArgs<ExtArgs>>): Prisma__ScoringModelClient<$Result.GetResult<Prisma.$ScoringModelPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ScoringModels that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScoringModelFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ScoringModels
     * const scoringModels = await prisma.scoringModel.findMany()
     * 
     * // Get first 10 ScoringModels
     * const scoringModels = await prisma.scoringModel.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const scoringModelWithIdOnly = await prisma.scoringModel.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ScoringModelFindManyArgs>(args?: SelectSubset<T, ScoringModelFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScoringModelPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ScoringModel.
     * @param {ScoringModelCreateArgs} args - Arguments to create a ScoringModel.
     * @example
     * // Create one ScoringModel
     * const ScoringModel = await prisma.scoringModel.create({
     *   data: {
     *     // ... data to create a ScoringModel
     *   }
     * })
     * 
     */
    create<T extends ScoringModelCreateArgs>(args: SelectSubset<T, ScoringModelCreateArgs<ExtArgs>>): Prisma__ScoringModelClient<$Result.GetResult<Prisma.$ScoringModelPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ScoringModels.
     * @param {ScoringModelCreateManyArgs} args - Arguments to create many ScoringModels.
     * @example
     * // Create many ScoringModels
     * const scoringModel = await prisma.scoringModel.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ScoringModelCreateManyArgs>(args?: SelectSubset<T, ScoringModelCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ScoringModels and returns the data saved in the database.
     * @param {ScoringModelCreateManyAndReturnArgs} args - Arguments to create many ScoringModels.
     * @example
     * // Create many ScoringModels
     * const scoringModel = await prisma.scoringModel.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ScoringModels and only return the `id`
     * const scoringModelWithIdOnly = await prisma.scoringModel.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ScoringModelCreateManyAndReturnArgs>(args?: SelectSubset<T, ScoringModelCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScoringModelPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ScoringModel.
     * @param {ScoringModelDeleteArgs} args - Arguments to delete one ScoringModel.
     * @example
     * // Delete one ScoringModel
     * const ScoringModel = await prisma.scoringModel.delete({
     *   where: {
     *     // ... filter to delete one ScoringModel
     *   }
     * })
     * 
     */
    delete<T extends ScoringModelDeleteArgs>(args: SelectSubset<T, ScoringModelDeleteArgs<ExtArgs>>): Prisma__ScoringModelClient<$Result.GetResult<Prisma.$ScoringModelPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ScoringModel.
     * @param {ScoringModelUpdateArgs} args - Arguments to update one ScoringModel.
     * @example
     * // Update one ScoringModel
     * const scoringModel = await prisma.scoringModel.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ScoringModelUpdateArgs>(args: SelectSubset<T, ScoringModelUpdateArgs<ExtArgs>>): Prisma__ScoringModelClient<$Result.GetResult<Prisma.$ScoringModelPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ScoringModels.
     * @param {ScoringModelDeleteManyArgs} args - Arguments to filter ScoringModels to delete.
     * @example
     * // Delete a few ScoringModels
     * const { count } = await prisma.scoringModel.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ScoringModelDeleteManyArgs>(args?: SelectSubset<T, ScoringModelDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ScoringModels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScoringModelUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ScoringModels
     * const scoringModel = await prisma.scoringModel.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ScoringModelUpdateManyArgs>(args: SelectSubset<T, ScoringModelUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ScoringModel.
     * @param {ScoringModelUpsertArgs} args - Arguments to update or create a ScoringModel.
     * @example
     * // Update or create a ScoringModel
     * const scoringModel = await prisma.scoringModel.upsert({
     *   create: {
     *     // ... data to create a ScoringModel
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ScoringModel we want to update
     *   }
     * })
     */
    upsert<T extends ScoringModelUpsertArgs>(args: SelectSubset<T, ScoringModelUpsertArgs<ExtArgs>>): Prisma__ScoringModelClient<$Result.GetResult<Prisma.$ScoringModelPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ScoringModels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScoringModelCountArgs} args - Arguments to filter ScoringModels to count.
     * @example
     * // Count the number of ScoringModels
     * const count = await prisma.scoringModel.count({
     *   where: {
     *     // ... the filter for the ScoringModels we want to count
     *   }
     * })
    **/
    count<T extends ScoringModelCountArgs>(
      args?: Subset<T, ScoringModelCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ScoringModelCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ScoringModel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScoringModelAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ScoringModelAggregateArgs>(args: Subset<T, ScoringModelAggregateArgs>): Prisma.PrismaPromise<GetScoringModelAggregateType<T>>

    /**
     * Group by ScoringModel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScoringModelGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ScoringModelGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ScoringModelGroupByArgs['orderBy'] }
        : { orderBy?: ScoringModelGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ScoringModelGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetScoringModelGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ScoringModel model
   */
  readonly fields: ScoringModelFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ScoringModel.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ScoringModelClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    createdBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ScoringModel model
   */ 
  interface ScoringModelFieldRefs {
    readonly id: FieldRef<"ScoringModel", 'String'>
    readonly position: FieldRef<"ScoringModel", 'String'>
    readonly version: FieldRef<"ScoringModel", 'Int'>
    readonly weights: FieldRef<"ScoringModel", 'Json'>
    readonly thresholds: FieldRef<"ScoringModel", 'Json'>
    readonly accuracy: FieldRef<"ScoringModel", 'Float'>
    readonly sampleSize: FieldRef<"ScoringModel", 'Int'>
    readonly isActive: FieldRef<"ScoringModel", 'Boolean'>
    readonly createdById: FieldRef<"ScoringModel", 'String'>
    readonly createdAt: FieldRef<"ScoringModel", 'DateTime'>
    readonly updatedAt: FieldRef<"ScoringModel", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ScoringModel findUnique
   */
  export type ScoringModelFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScoringModel
     */
    select?: ScoringModelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScoringModelInclude<ExtArgs> | null
    /**
     * Filter, which ScoringModel to fetch.
     */
    where: ScoringModelWhereUniqueInput
  }

  /**
   * ScoringModel findUniqueOrThrow
   */
  export type ScoringModelFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScoringModel
     */
    select?: ScoringModelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScoringModelInclude<ExtArgs> | null
    /**
     * Filter, which ScoringModel to fetch.
     */
    where: ScoringModelWhereUniqueInput
  }

  /**
   * ScoringModel findFirst
   */
  export type ScoringModelFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScoringModel
     */
    select?: ScoringModelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScoringModelInclude<ExtArgs> | null
    /**
     * Filter, which ScoringModel to fetch.
     */
    where?: ScoringModelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScoringModels to fetch.
     */
    orderBy?: ScoringModelOrderByWithRelationInput | ScoringModelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ScoringModels.
     */
    cursor?: ScoringModelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScoringModels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScoringModels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ScoringModels.
     */
    distinct?: ScoringModelScalarFieldEnum | ScoringModelScalarFieldEnum[]
  }

  /**
   * ScoringModel findFirstOrThrow
   */
  export type ScoringModelFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScoringModel
     */
    select?: ScoringModelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScoringModelInclude<ExtArgs> | null
    /**
     * Filter, which ScoringModel to fetch.
     */
    where?: ScoringModelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScoringModels to fetch.
     */
    orderBy?: ScoringModelOrderByWithRelationInput | ScoringModelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ScoringModels.
     */
    cursor?: ScoringModelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScoringModels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScoringModels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ScoringModels.
     */
    distinct?: ScoringModelScalarFieldEnum | ScoringModelScalarFieldEnum[]
  }

  /**
   * ScoringModel findMany
   */
  export type ScoringModelFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScoringModel
     */
    select?: ScoringModelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScoringModelInclude<ExtArgs> | null
    /**
     * Filter, which ScoringModels to fetch.
     */
    where?: ScoringModelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScoringModels to fetch.
     */
    orderBy?: ScoringModelOrderByWithRelationInput | ScoringModelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ScoringModels.
     */
    cursor?: ScoringModelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScoringModels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScoringModels.
     */
    skip?: number
    distinct?: ScoringModelScalarFieldEnum | ScoringModelScalarFieldEnum[]
  }

  /**
   * ScoringModel create
   */
  export type ScoringModelCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScoringModel
     */
    select?: ScoringModelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScoringModelInclude<ExtArgs> | null
    /**
     * The data needed to create a ScoringModel.
     */
    data: XOR<ScoringModelCreateInput, ScoringModelUncheckedCreateInput>
  }

  /**
   * ScoringModel createMany
   */
  export type ScoringModelCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ScoringModels.
     */
    data: ScoringModelCreateManyInput | ScoringModelCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ScoringModel createManyAndReturn
   */
  export type ScoringModelCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScoringModel
     */
    select?: ScoringModelSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ScoringModels.
     */
    data: ScoringModelCreateManyInput | ScoringModelCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScoringModelIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ScoringModel update
   */
  export type ScoringModelUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScoringModel
     */
    select?: ScoringModelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScoringModelInclude<ExtArgs> | null
    /**
     * The data needed to update a ScoringModel.
     */
    data: XOR<ScoringModelUpdateInput, ScoringModelUncheckedUpdateInput>
    /**
     * Choose, which ScoringModel to update.
     */
    where: ScoringModelWhereUniqueInput
  }

  /**
   * ScoringModel updateMany
   */
  export type ScoringModelUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ScoringModels.
     */
    data: XOR<ScoringModelUpdateManyMutationInput, ScoringModelUncheckedUpdateManyInput>
    /**
     * Filter which ScoringModels to update
     */
    where?: ScoringModelWhereInput
  }

  /**
   * ScoringModel upsert
   */
  export type ScoringModelUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScoringModel
     */
    select?: ScoringModelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScoringModelInclude<ExtArgs> | null
    /**
     * The filter to search for the ScoringModel to update in case it exists.
     */
    where: ScoringModelWhereUniqueInput
    /**
     * In case the ScoringModel found by the `where` argument doesn't exist, create a new ScoringModel with this data.
     */
    create: XOR<ScoringModelCreateInput, ScoringModelUncheckedCreateInput>
    /**
     * In case the ScoringModel was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ScoringModelUpdateInput, ScoringModelUncheckedUpdateInput>
  }

  /**
   * ScoringModel delete
   */
  export type ScoringModelDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScoringModel
     */
    select?: ScoringModelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScoringModelInclude<ExtArgs> | null
    /**
     * Filter which ScoringModel to delete.
     */
    where: ScoringModelWhereUniqueInput
  }

  /**
   * ScoringModel deleteMany
   */
  export type ScoringModelDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ScoringModels to delete
     */
    where?: ScoringModelWhereInput
  }

  /**
   * ScoringModel without action
   */
  export type ScoringModelDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScoringModel
     */
    select?: ScoringModelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScoringModelInclude<ExtArgs> | null
  }


  /**
   * Model Pattern
   */

  export type AggregatePattern = {
    _count: PatternCountAggregateOutputType | null
    _avg: PatternAvgAggregateOutputType | null
    _sum: PatternSumAggregateOutputType | null
    _min: PatternMinAggregateOutputType | null
    _max: PatternMaxAggregateOutputType | null
  }

  export type PatternAvgAggregateOutputType = {
    strength: number | null
    occurrences: number | null
    successRate: number | null
  }

  export type PatternSumAggregateOutputType = {
    strength: number | null
    occurrences: number | null
    successRate: number | null
  }

  export type PatternMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    category: string | null
    strength: number | null
    occurrences: number | null
    successRate: number | null
    isActive: boolean | null
    amplified: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PatternMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    category: string | null
    strength: number | null
    occurrences: number | null
    successRate: number | null
    isActive: boolean | null
    amplified: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PatternCountAggregateOutputType = {
    id: number
    name: number
    description: number
    category: number
    signal: number
    strength: number
    occurrences: number
    successRate: number
    isActive: number
    amplified: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PatternAvgAggregateInputType = {
    strength?: true
    occurrences?: true
    successRate?: true
  }

  export type PatternSumAggregateInputType = {
    strength?: true
    occurrences?: true
    successRate?: true
  }

  export type PatternMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    category?: true
    strength?: true
    occurrences?: true
    successRate?: true
    isActive?: true
    amplified?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PatternMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    category?: true
    strength?: true
    occurrences?: true
    successRate?: true
    isActive?: true
    amplified?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PatternCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    category?: true
    signal?: true
    strength?: true
    occurrences?: true
    successRate?: true
    isActive?: true
    amplified?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PatternAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pattern to aggregate.
     */
    where?: PatternWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Patterns to fetch.
     */
    orderBy?: PatternOrderByWithRelationInput | PatternOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PatternWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Patterns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Patterns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Patterns
    **/
    _count?: true | PatternCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PatternAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PatternSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PatternMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PatternMaxAggregateInputType
  }

  export type GetPatternAggregateType<T extends PatternAggregateArgs> = {
        [P in keyof T & keyof AggregatePattern]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePattern[P]>
      : GetScalarType<T[P], AggregatePattern[P]>
  }




  export type PatternGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PatternWhereInput
    orderBy?: PatternOrderByWithAggregationInput | PatternOrderByWithAggregationInput[]
    by: PatternScalarFieldEnum[] | PatternScalarFieldEnum
    having?: PatternScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PatternCountAggregateInputType | true
    _avg?: PatternAvgAggregateInputType
    _sum?: PatternSumAggregateInputType
    _min?: PatternMinAggregateInputType
    _max?: PatternMaxAggregateInputType
  }

  export type PatternGroupByOutputType = {
    id: string
    name: string
    description: string
    category: string
    signal: JsonValue
    strength: number
    occurrences: number
    successRate: number | null
    isActive: boolean
    amplified: boolean
    createdAt: Date
    updatedAt: Date
    _count: PatternCountAggregateOutputType | null
    _avg: PatternAvgAggregateOutputType | null
    _sum: PatternSumAggregateOutputType | null
    _min: PatternMinAggregateOutputType | null
    _max: PatternMaxAggregateOutputType | null
  }

  type GetPatternGroupByPayload<T extends PatternGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PatternGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PatternGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PatternGroupByOutputType[P]>
            : GetScalarType<T[P], PatternGroupByOutputType[P]>
        }
      >
    >


  export type PatternSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    category?: boolean
    signal?: boolean
    strength?: boolean
    occurrences?: boolean
    successRate?: boolean
    isActive?: boolean
    amplified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["pattern"]>

  export type PatternSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    category?: boolean
    signal?: boolean
    strength?: boolean
    occurrences?: boolean
    successRate?: boolean
    isActive?: boolean
    amplified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["pattern"]>

  export type PatternSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    category?: boolean
    signal?: boolean
    strength?: boolean
    occurrences?: boolean
    successRate?: boolean
    isActive?: boolean
    amplified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $PatternPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Pattern"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string
      category: string
      signal: Prisma.JsonValue
      strength: number
      occurrences: number
      successRate: number | null
      isActive: boolean
      amplified: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["pattern"]>
    composites: {}
  }

  type PatternGetPayload<S extends boolean | null | undefined | PatternDefaultArgs> = $Result.GetResult<Prisma.$PatternPayload, S>

  type PatternCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PatternFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PatternCountAggregateInputType | true
    }

  export interface PatternDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Pattern'], meta: { name: 'Pattern' } }
    /**
     * Find zero or one Pattern that matches the filter.
     * @param {PatternFindUniqueArgs} args - Arguments to find a Pattern
     * @example
     * // Get one Pattern
     * const pattern = await prisma.pattern.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PatternFindUniqueArgs>(args: SelectSubset<T, PatternFindUniqueArgs<ExtArgs>>): Prisma__PatternClient<$Result.GetResult<Prisma.$PatternPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Pattern that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PatternFindUniqueOrThrowArgs} args - Arguments to find a Pattern
     * @example
     * // Get one Pattern
     * const pattern = await prisma.pattern.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PatternFindUniqueOrThrowArgs>(args: SelectSubset<T, PatternFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PatternClient<$Result.GetResult<Prisma.$PatternPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Pattern that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatternFindFirstArgs} args - Arguments to find a Pattern
     * @example
     * // Get one Pattern
     * const pattern = await prisma.pattern.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PatternFindFirstArgs>(args?: SelectSubset<T, PatternFindFirstArgs<ExtArgs>>): Prisma__PatternClient<$Result.GetResult<Prisma.$PatternPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Pattern that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatternFindFirstOrThrowArgs} args - Arguments to find a Pattern
     * @example
     * // Get one Pattern
     * const pattern = await prisma.pattern.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PatternFindFirstOrThrowArgs>(args?: SelectSubset<T, PatternFindFirstOrThrowArgs<ExtArgs>>): Prisma__PatternClient<$Result.GetResult<Prisma.$PatternPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Patterns that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatternFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Patterns
     * const patterns = await prisma.pattern.findMany()
     * 
     * // Get first 10 Patterns
     * const patterns = await prisma.pattern.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const patternWithIdOnly = await prisma.pattern.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PatternFindManyArgs>(args?: SelectSubset<T, PatternFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatternPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Pattern.
     * @param {PatternCreateArgs} args - Arguments to create a Pattern.
     * @example
     * // Create one Pattern
     * const Pattern = await prisma.pattern.create({
     *   data: {
     *     // ... data to create a Pattern
     *   }
     * })
     * 
     */
    create<T extends PatternCreateArgs>(args: SelectSubset<T, PatternCreateArgs<ExtArgs>>): Prisma__PatternClient<$Result.GetResult<Prisma.$PatternPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Patterns.
     * @param {PatternCreateManyArgs} args - Arguments to create many Patterns.
     * @example
     * // Create many Patterns
     * const pattern = await prisma.pattern.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PatternCreateManyArgs>(args?: SelectSubset<T, PatternCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Patterns and returns the data saved in the database.
     * @param {PatternCreateManyAndReturnArgs} args - Arguments to create many Patterns.
     * @example
     * // Create many Patterns
     * const pattern = await prisma.pattern.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Patterns and only return the `id`
     * const patternWithIdOnly = await prisma.pattern.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PatternCreateManyAndReturnArgs>(args?: SelectSubset<T, PatternCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatternPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Pattern.
     * @param {PatternDeleteArgs} args - Arguments to delete one Pattern.
     * @example
     * // Delete one Pattern
     * const Pattern = await prisma.pattern.delete({
     *   where: {
     *     // ... filter to delete one Pattern
     *   }
     * })
     * 
     */
    delete<T extends PatternDeleteArgs>(args: SelectSubset<T, PatternDeleteArgs<ExtArgs>>): Prisma__PatternClient<$Result.GetResult<Prisma.$PatternPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Pattern.
     * @param {PatternUpdateArgs} args - Arguments to update one Pattern.
     * @example
     * // Update one Pattern
     * const pattern = await prisma.pattern.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PatternUpdateArgs>(args: SelectSubset<T, PatternUpdateArgs<ExtArgs>>): Prisma__PatternClient<$Result.GetResult<Prisma.$PatternPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Patterns.
     * @param {PatternDeleteManyArgs} args - Arguments to filter Patterns to delete.
     * @example
     * // Delete a few Patterns
     * const { count } = await prisma.pattern.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PatternDeleteManyArgs>(args?: SelectSubset<T, PatternDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Patterns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatternUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Patterns
     * const pattern = await prisma.pattern.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PatternUpdateManyArgs>(args: SelectSubset<T, PatternUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Pattern.
     * @param {PatternUpsertArgs} args - Arguments to update or create a Pattern.
     * @example
     * // Update or create a Pattern
     * const pattern = await prisma.pattern.upsert({
     *   create: {
     *     // ... data to create a Pattern
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Pattern we want to update
     *   }
     * })
     */
    upsert<T extends PatternUpsertArgs>(args: SelectSubset<T, PatternUpsertArgs<ExtArgs>>): Prisma__PatternClient<$Result.GetResult<Prisma.$PatternPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Patterns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatternCountArgs} args - Arguments to filter Patterns to count.
     * @example
     * // Count the number of Patterns
     * const count = await prisma.pattern.count({
     *   where: {
     *     // ... the filter for the Patterns we want to count
     *   }
     * })
    **/
    count<T extends PatternCountArgs>(
      args?: Subset<T, PatternCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PatternCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Pattern.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatternAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PatternAggregateArgs>(args: Subset<T, PatternAggregateArgs>): Prisma.PrismaPromise<GetPatternAggregateType<T>>

    /**
     * Group by Pattern.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatternGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PatternGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PatternGroupByArgs['orderBy'] }
        : { orderBy?: PatternGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PatternGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPatternGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Pattern model
   */
  readonly fields: PatternFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Pattern.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PatternClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Pattern model
   */ 
  interface PatternFieldRefs {
    readonly id: FieldRef<"Pattern", 'String'>
    readonly name: FieldRef<"Pattern", 'String'>
    readonly description: FieldRef<"Pattern", 'String'>
    readonly category: FieldRef<"Pattern", 'String'>
    readonly signal: FieldRef<"Pattern", 'Json'>
    readonly strength: FieldRef<"Pattern", 'Float'>
    readonly occurrences: FieldRef<"Pattern", 'Int'>
    readonly successRate: FieldRef<"Pattern", 'Float'>
    readonly isActive: FieldRef<"Pattern", 'Boolean'>
    readonly amplified: FieldRef<"Pattern", 'Boolean'>
    readonly createdAt: FieldRef<"Pattern", 'DateTime'>
    readonly updatedAt: FieldRef<"Pattern", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Pattern findUnique
   */
  export type PatternFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pattern
     */
    select?: PatternSelect<ExtArgs> | null
    /**
     * Filter, which Pattern to fetch.
     */
    where: PatternWhereUniqueInput
  }

  /**
   * Pattern findUniqueOrThrow
   */
  export type PatternFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pattern
     */
    select?: PatternSelect<ExtArgs> | null
    /**
     * Filter, which Pattern to fetch.
     */
    where: PatternWhereUniqueInput
  }

  /**
   * Pattern findFirst
   */
  export type PatternFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pattern
     */
    select?: PatternSelect<ExtArgs> | null
    /**
     * Filter, which Pattern to fetch.
     */
    where?: PatternWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Patterns to fetch.
     */
    orderBy?: PatternOrderByWithRelationInput | PatternOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Patterns.
     */
    cursor?: PatternWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Patterns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Patterns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Patterns.
     */
    distinct?: PatternScalarFieldEnum | PatternScalarFieldEnum[]
  }

  /**
   * Pattern findFirstOrThrow
   */
  export type PatternFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pattern
     */
    select?: PatternSelect<ExtArgs> | null
    /**
     * Filter, which Pattern to fetch.
     */
    where?: PatternWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Patterns to fetch.
     */
    orderBy?: PatternOrderByWithRelationInput | PatternOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Patterns.
     */
    cursor?: PatternWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Patterns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Patterns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Patterns.
     */
    distinct?: PatternScalarFieldEnum | PatternScalarFieldEnum[]
  }

  /**
   * Pattern findMany
   */
  export type PatternFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pattern
     */
    select?: PatternSelect<ExtArgs> | null
    /**
     * Filter, which Patterns to fetch.
     */
    where?: PatternWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Patterns to fetch.
     */
    orderBy?: PatternOrderByWithRelationInput | PatternOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Patterns.
     */
    cursor?: PatternWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Patterns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Patterns.
     */
    skip?: number
    distinct?: PatternScalarFieldEnum | PatternScalarFieldEnum[]
  }

  /**
   * Pattern create
   */
  export type PatternCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pattern
     */
    select?: PatternSelect<ExtArgs> | null
    /**
     * The data needed to create a Pattern.
     */
    data: XOR<PatternCreateInput, PatternUncheckedCreateInput>
  }

  /**
   * Pattern createMany
   */
  export type PatternCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Patterns.
     */
    data: PatternCreateManyInput | PatternCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Pattern createManyAndReturn
   */
  export type PatternCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pattern
     */
    select?: PatternSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Patterns.
     */
    data: PatternCreateManyInput | PatternCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Pattern update
   */
  export type PatternUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pattern
     */
    select?: PatternSelect<ExtArgs> | null
    /**
     * The data needed to update a Pattern.
     */
    data: XOR<PatternUpdateInput, PatternUncheckedUpdateInput>
    /**
     * Choose, which Pattern to update.
     */
    where: PatternWhereUniqueInput
  }

  /**
   * Pattern updateMany
   */
  export type PatternUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Patterns.
     */
    data: XOR<PatternUpdateManyMutationInput, PatternUncheckedUpdateManyInput>
    /**
     * Filter which Patterns to update
     */
    where?: PatternWhereInput
  }

  /**
   * Pattern upsert
   */
  export type PatternUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pattern
     */
    select?: PatternSelect<ExtArgs> | null
    /**
     * The filter to search for the Pattern to update in case it exists.
     */
    where: PatternWhereUniqueInput
    /**
     * In case the Pattern found by the `where` argument doesn't exist, create a new Pattern with this data.
     */
    create: XOR<PatternCreateInput, PatternUncheckedCreateInput>
    /**
     * In case the Pattern was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PatternUpdateInput, PatternUncheckedUpdateInput>
  }

  /**
   * Pattern delete
   */
  export type PatternDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pattern
     */
    select?: PatternSelect<ExtArgs> | null
    /**
     * Filter which Pattern to delete.
     */
    where: PatternWhereUniqueInput
  }

  /**
   * Pattern deleteMany
   */
  export type PatternDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Patterns to delete
     */
    where?: PatternWhereInput
  }

  /**
   * Pattern without action
   */
  export type PatternDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pattern
     */
    select?: PatternSelect<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const InterviewScalarFieldEnum: {
    id: 'id',
    candidateId: 'candidateId',
    candidateName: 'candidateName',
    candidateEmail: 'candidateEmail',
    position: 'position',
    status: 'status',
    scheduledAt: 'scheduledAt',
    startedAt: 'startedAt',
    completedAt: 'completedAt',
    score: 'score',
    decision: 'decision',
    explainability: 'explainability',
    recordingUrl: 'recordingUrl',
    transcriptUrl: 'transcriptUrl',
    proctoringData: 'proctoringData',
    recruiterId: 'recruiterId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type InterviewScalarFieldEnum = (typeof InterviewScalarFieldEnum)[keyof typeof InterviewScalarFieldEnum]


  export const QuestionScalarFieldEnum: {
    id: 'id',
    content: 'content',
    category: 'category',
    difficulty: 'difficulty',
    position: 'position',
    skillTags: 'skillTags',
    avgScore: 'avgScore',
    timesAsked: 'timesAsked',
    correlationScore: 'correlationScore',
    lastUsed: 'lastUsed',
    generatedBy: 'generatedBy',
    generationPrompt: 'generationPrompt',
    createdById: 'createdById',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type QuestionScalarFieldEnum = (typeof QuestionScalarFieldEnum)[keyof typeof QuestionScalarFieldEnum]


  export const ResponseScalarFieldEnum: {
    id: 'id',
    interviewId: 'interviewId',
    questionId: 'questionId',
    audioUrl: 'audioUrl',
    transcript: 'transcript',
    duration: 'duration',
    scores: 'scores',
    tags: 'tags',
    sentiment: 'sentiment',
    confidence: 'confidence',
    createdAt: 'createdAt'
  };

  export type ResponseScalarFieldEnum = (typeof ResponseScalarFieldEnum)[keyof typeof ResponseScalarFieldEnum]


  export const FeedbackLoopScalarFieldEnum: {
    id: 'id',
    interviewId: 'interviewId',
    questionId: 'questionId',
    feedbackType: 'feedbackType',
    signal: 'signal',
    actionTaken: 'actionTaken',
    outcome: 'outcome',
    createdAt: 'createdAt'
  };

  export type FeedbackLoopScalarFieldEnum = (typeof FeedbackLoopScalarFieldEnum)[keyof typeof FeedbackLoopScalarFieldEnum]


  export const AgentLogScalarFieldEnum: {
    id: 'id',
    interviewId: 'interviewId',
    agentType: 'agentType',
    action: 'action',
    input: 'input',
    output: 'output',
    reflexionLoop: 'reflexionLoop',
    performanceScore: 'performanceScore',
    createdAt: 'createdAt'
  };

  export type AgentLogScalarFieldEnum = (typeof AgentLogScalarFieldEnum)[keyof typeof AgentLogScalarFieldEnum]


  export const ScoringModelScalarFieldEnum: {
    id: 'id',
    position: 'position',
    version: 'version',
    weights: 'weights',
    thresholds: 'thresholds',
    accuracy: 'accuracy',
    sampleSize: 'sampleSize',
    isActive: 'isActive',
    createdById: 'createdById',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ScoringModelScalarFieldEnum = (typeof ScoringModelScalarFieldEnum)[keyof typeof ScoringModelScalarFieldEnum]


  export const PatternScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    category: 'category',
    signal: 'signal',
    strength: 'strength',
    occurrences: 'occurrences',
    successRate: 'successRate',
    isActive: 'isActive',
    amplified: 'amplified',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PatternScalarFieldEnum = (typeof PatternScalarFieldEnum)[keyof typeof PatternScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'InterviewStatus'
   */
  export type EnumInterviewStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'InterviewStatus'>
    


  /**
   * Reference to a field of type 'InterviewStatus[]'
   */
  export type ListEnumInterviewStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'InterviewStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Decision'
   */
  export type EnumDecisionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decision'>
    


  /**
   * Reference to a field of type 'Decision[]'
   */
  export type ListEnumDecisionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decision[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'Difficulty'
   */
  export type EnumDifficultyFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Difficulty'>
    


  /**
   * Reference to a field of type 'Difficulty[]'
   */
  export type ListEnumDifficultyFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Difficulty[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'FeedbackType'
   */
  export type EnumFeedbackTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FeedbackType'>
    


  /**
   * Reference to a field of type 'FeedbackType[]'
   */
  export type ListEnumFeedbackTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FeedbackType[]'>
    


  /**
   * Reference to a field of type 'AgentType'
   */
  export type EnumAgentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AgentType'>
    


  /**
   * Reference to a field of type 'AgentType[]'
   */
  export type ListEnumAgentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AgentType[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    interviews?: InterviewListRelationFilter
    questions?: QuestionListRelationFilter
    scoringModels?: ScoringModelListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    interviews?: InterviewOrderByRelationAggregateInput
    questions?: QuestionOrderByRelationAggregateInput
    scoringModels?: ScoringModelOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    interviews?: InterviewListRelationFilter
    questions?: QuestionListRelationFilter
    scoringModels?: ScoringModelListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type InterviewWhereInput = {
    AND?: InterviewWhereInput | InterviewWhereInput[]
    OR?: InterviewWhereInput[]
    NOT?: InterviewWhereInput | InterviewWhereInput[]
    id?: StringFilter<"Interview"> | string
    candidateId?: StringFilter<"Interview"> | string
    candidateName?: StringFilter<"Interview"> | string
    candidateEmail?: StringFilter<"Interview"> | string
    position?: StringFilter<"Interview"> | string
    status?: EnumInterviewStatusFilter<"Interview"> | $Enums.InterviewStatus
    scheduledAt?: DateTimeFilter<"Interview"> | Date | string
    startedAt?: DateTimeNullableFilter<"Interview"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"Interview"> | Date | string | null
    score?: FloatNullableFilter<"Interview"> | number | null
    decision?: EnumDecisionNullableFilter<"Interview"> | $Enums.Decision | null
    explainability?: JsonNullableFilter<"Interview">
    recordingUrl?: StringNullableFilter<"Interview"> | string | null
    transcriptUrl?: StringNullableFilter<"Interview"> | string | null
    proctoringData?: JsonNullableFilter<"Interview">
    recruiterId?: StringFilter<"Interview"> | string
    createdAt?: DateTimeFilter<"Interview"> | Date | string
    updatedAt?: DateTimeFilter<"Interview"> | Date | string
    recruiter?: XOR<UserRelationFilter, UserWhereInput>
    responses?: ResponseListRelationFilter
    feedbackLoops?: FeedbackLoopListRelationFilter
    agentLogs?: AgentLogListRelationFilter
  }

  export type InterviewOrderByWithRelationInput = {
    id?: SortOrder
    candidateId?: SortOrder
    candidateName?: SortOrder
    candidateEmail?: SortOrder
    position?: SortOrder
    status?: SortOrder
    scheduledAt?: SortOrder
    startedAt?: SortOrderInput | SortOrder
    completedAt?: SortOrderInput | SortOrder
    score?: SortOrderInput | SortOrder
    decision?: SortOrderInput | SortOrder
    explainability?: SortOrderInput | SortOrder
    recordingUrl?: SortOrderInput | SortOrder
    transcriptUrl?: SortOrderInput | SortOrder
    proctoringData?: SortOrderInput | SortOrder
    recruiterId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    recruiter?: UserOrderByWithRelationInput
    responses?: ResponseOrderByRelationAggregateInput
    feedbackLoops?: FeedbackLoopOrderByRelationAggregateInput
    agentLogs?: AgentLogOrderByRelationAggregateInput
  }

  export type InterviewWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: InterviewWhereInput | InterviewWhereInput[]
    OR?: InterviewWhereInput[]
    NOT?: InterviewWhereInput | InterviewWhereInput[]
    candidateId?: StringFilter<"Interview"> | string
    candidateName?: StringFilter<"Interview"> | string
    candidateEmail?: StringFilter<"Interview"> | string
    position?: StringFilter<"Interview"> | string
    status?: EnumInterviewStatusFilter<"Interview"> | $Enums.InterviewStatus
    scheduledAt?: DateTimeFilter<"Interview"> | Date | string
    startedAt?: DateTimeNullableFilter<"Interview"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"Interview"> | Date | string | null
    score?: FloatNullableFilter<"Interview"> | number | null
    decision?: EnumDecisionNullableFilter<"Interview"> | $Enums.Decision | null
    explainability?: JsonNullableFilter<"Interview">
    recordingUrl?: StringNullableFilter<"Interview"> | string | null
    transcriptUrl?: StringNullableFilter<"Interview"> | string | null
    proctoringData?: JsonNullableFilter<"Interview">
    recruiterId?: StringFilter<"Interview"> | string
    createdAt?: DateTimeFilter<"Interview"> | Date | string
    updatedAt?: DateTimeFilter<"Interview"> | Date | string
    recruiter?: XOR<UserRelationFilter, UserWhereInput>
    responses?: ResponseListRelationFilter
    feedbackLoops?: FeedbackLoopListRelationFilter
    agentLogs?: AgentLogListRelationFilter
  }, "id">

  export type InterviewOrderByWithAggregationInput = {
    id?: SortOrder
    candidateId?: SortOrder
    candidateName?: SortOrder
    candidateEmail?: SortOrder
    position?: SortOrder
    status?: SortOrder
    scheduledAt?: SortOrder
    startedAt?: SortOrderInput | SortOrder
    completedAt?: SortOrderInput | SortOrder
    score?: SortOrderInput | SortOrder
    decision?: SortOrderInput | SortOrder
    explainability?: SortOrderInput | SortOrder
    recordingUrl?: SortOrderInput | SortOrder
    transcriptUrl?: SortOrderInput | SortOrder
    proctoringData?: SortOrderInput | SortOrder
    recruiterId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: InterviewCountOrderByAggregateInput
    _avg?: InterviewAvgOrderByAggregateInput
    _max?: InterviewMaxOrderByAggregateInput
    _min?: InterviewMinOrderByAggregateInput
    _sum?: InterviewSumOrderByAggregateInput
  }

  export type InterviewScalarWhereWithAggregatesInput = {
    AND?: InterviewScalarWhereWithAggregatesInput | InterviewScalarWhereWithAggregatesInput[]
    OR?: InterviewScalarWhereWithAggregatesInput[]
    NOT?: InterviewScalarWhereWithAggregatesInput | InterviewScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Interview"> | string
    candidateId?: StringWithAggregatesFilter<"Interview"> | string
    candidateName?: StringWithAggregatesFilter<"Interview"> | string
    candidateEmail?: StringWithAggregatesFilter<"Interview"> | string
    position?: StringWithAggregatesFilter<"Interview"> | string
    status?: EnumInterviewStatusWithAggregatesFilter<"Interview"> | $Enums.InterviewStatus
    scheduledAt?: DateTimeWithAggregatesFilter<"Interview"> | Date | string
    startedAt?: DateTimeNullableWithAggregatesFilter<"Interview"> | Date | string | null
    completedAt?: DateTimeNullableWithAggregatesFilter<"Interview"> | Date | string | null
    score?: FloatNullableWithAggregatesFilter<"Interview"> | number | null
    decision?: EnumDecisionNullableWithAggregatesFilter<"Interview"> | $Enums.Decision | null
    explainability?: JsonNullableWithAggregatesFilter<"Interview">
    recordingUrl?: StringNullableWithAggregatesFilter<"Interview"> | string | null
    transcriptUrl?: StringNullableWithAggregatesFilter<"Interview"> | string | null
    proctoringData?: JsonNullableWithAggregatesFilter<"Interview">
    recruiterId?: StringWithAggregatesFilter<"Interview"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Interview"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Interview"> | Date | string
  }

  export type QuestionWhereInput = {
    AND?: QuestionWhereInput | QuestionWhereInput[]
    OR?: QuestionWhereInput[]
    NOT?: QuestionWhereInput | QuestionWhereInput[]
    id?: StringFilter<"Question"> | string
    content?: StringFilter<"Question"> | string
    category?: StringFilter<"Question"> | string
    difficulty?: EnumDifficultyFilter<"Question"> | $Enums.Difficulty
    position?: StringFilter<"Question"> | string
    skillTags?: StringNullableListFilter<"Question">
    avgScore?: FloatFilter<"Question"> | number
    timesAsked?: IntFilter<"Question"> | number
    correlationScore?: FloatFilter<"Question"> | number
    lastUsed?: DateTimeNullableFilter<"Question"> | Date | string | null
    generatedBy?: StringNullableFilter<"Question"> | string | null
    generationPrompt?: StringNullableFilter<"Question"> | string | null
    createdById?: StringFilter<"Question"> | string
    createdAt?: DateTimeFilter<"Question"> | Date | string
    updatedAt?: DateTimeFilter<"Question"> | Date | string
    createdBy?: XOR<UserRelationFilter, UserWhereInput>
    responses?: ResponseListRelationFilter
    feedbackLoops?: FeedbackLoopListRelationFilter
  }

  export type QuestionOrderByWithRelationInput = {
    id?: SortOrder
    content?: SortOrder
    category?: SortOrder
    difficulty?: SortOrder
    position?: SortOrder
    skillTags?: SortOrder
    avgScore?: SortOrder
    timesAsked?: SortOrder
    correlationScore?: SortOrder
    lastUsed?: SortOrderInput | SortOrder
    generatedBy?: SortOrderInput | SortOrder
    generationPrompt?: SortOrderInput | SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: UserOrderByWithRelationInput
    responses?: ResponseOrderByRelationAggregateInput
    feedbackLoops?: FeedbackLoopOrderByRelationAggregateInput
  }

  export type QuestionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: QuestionWhereInput | QuestionWhereInput[]
    OR?: QuestionWhereInput[]
    NOT?: QuestionWhereInput | QuestionWhereInput[]
    content?: StringFilter<"Question"> | string
    category?: StringFilter<"Question"> | string
    difficulty?: EnumDifficultyFilter<"Question"> | $Enums.Difficulty
    position?: StringFilter<"Question"> | string
    skillTags?: StringNullableListFilter<"Question">
    avgScore?: FloatFilter<"Question"> | number
    timesAsked?: IntFilter<"Question"> | number
    correlationScore?: FloatFilter<"Question"> | number
    lastUsed?: DateTimeNullableFilter<"Question"> | Date | string | null
    generatedBy?: StringNullableFilter<"Question"> | string | null
    generationPrompt?: StringNullableFilter<"Question"> | string | null
    createdById?: StringFilter<"Question"> | string
    createdAt?: DateTimeFilter<"Question"> | Date | string
    updatedAt?: DateTimeFilter<"Question"> | Date | string
    createdBy?: XOR<UserRelationFilter, UserWhereInput>
    responses?: ResponseListRelationFilter
    feedbackLoops?: FeedbackLoopListRelationFilter
  }, "id">

  export type QuestionOrderByWithAggregationInput = {
    id?: SortOrder
    content?: SortOrder
    category?: SortOrder
    difficulty?: SortOrder
    position?: SortOrder
    skillTags?: SortOrder
    avgScore?: SortOrder
    timesAsked?: SortOrder
    correlationScore?: SortOrder
    lastUsed?: SortOrderInput | SortOrder
    generatedBy?: SortOrderInput | SortOrder
    generationPrompt?: SortOrderInput | SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: QuestionCountOrderByAggregateInput
    _avg?: QuestionAvgOrderByAggregateInput
    _max?: QuestionMaxOrderByAggregateInput
    _min?: QuestionMinOrderByAggregateInput
    _sum?: QuestionSumOrderByAggregateInput
  }

  export type QuestionScalarWhereWithAggregatesInput = {
    AND?: QuestionScalarWhereWithAggregatesInput | QuestionScalarWhereWithAggregatesInput[]
    OR?: QuestionScalarWhereWithAggregatesInput[]
    NOT?: QuestionScalarWhereWithAggregatesInput | QuestionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Question"> | string
    content?: StringWithAggregatesFilter<"Question"> | string
    category?: StringWithAggregatesFilter<"Question"> | string
    difficulty?: EnumDifficultyWithAggregatesFilter<"Question"> | $Enums.Difficulty
    position?: StringWithAggregatesFilter<"Question"> | string
    skillTags?: StringNullableListFilter<"Question">
    avgScore?: FloatWithAggregatesFilter<"Question"> | number
    timesAsked?: IntWithAggregatesFilter<"Question"> | number
    correlationScore?: FloatWithAggregatesFilter<"Question"> | number
    lastUsed?: DateTimeNullableWithAggregatesFilter<"Question"> | Date | string | null
    generatedBy?: StringNullableWithAggregatesFilter<"Question"> | string | null
    generationPrompt?: StringNullableWithAggregatesFilter<"Question"> | string | null
    createdById?: StringWithAggregatesFilter<"Question"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Question"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Question"> | Date | string
  }

  export type ResponseWhereInput = {
    AND?: ResponseWhereInput | ResponseWhereInput[]
    OR?: ResponseWhereInput[]
    NOT?: ResponseWhereInput | ResponseWhereInput[]
    id?: StringFilter<"Response"> | string
    interviewId?: StringFilter<"Response"> | string
    questionId?: StringFilter<"Response"> | string
    audioUrl?: StringNullableFilter<"Response"> | string | null
    transcript?: StringFilter<"Response"> | string
    duration?: IntFilter<"Response"> | number
    scores?: JsonFilter<"Response">
    tags?: StringNullableListFilter<"Response">
    sentiment?: FloatNullableFilter<"Response"> | number | null
    confidence?: FloatNullableFilter<"Response"> | number | null
    createdAt?: DateTimeFilter<"Response"> | Date | string
    interview?: XOR<InterviewRelationFilter, InterviewWhereInput>
    question?: XOR<QuestionRelationFilter, QuestionWhereInput>
  }

  export type ResponseOrderByWithRelationInput = {
    id?: SortOrder
    interviewId?: SortOrder
    questionId?: SortOrder
    audioUrl?: SortOrderInput | SortOrder
    transcript?: SortOrder
    duration?: SortOrder
    scores?: SortOrder
    tags?: SortOrder
    sentiment?: SortOrderInput | SortOrder
    confidence?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    interview?: InterviewOrderByWithRelationInput
    question?: QuestionOrderByWithRelationInput
  }

  export type ResponseWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ResponseWhereInput | ResponseWhereInput[]
    OR?: ResponseWhereInput[]
    NOT?: ResponseWhereInput | ResponseWhereInput[]
    interviewId?: StringFilter<"Response"> | string
    questionId?: StringFilter<"Response"> | string
    audioUrl?: StringNullableFilter<"Response"> | string | null
    transcript?: StringFilter<"Response"> | string
    duration?: IntFilter<"Response"> | number
    scores?: JsonFilter<"Response">
    tags?: StringNullableListFilter<"Response">
    sentiment?: FloatNullableFilter<"Response"> | number | null
    confidence?: FloatNullableFilter<"Response"> | number | null
    createdAt?: DateTimeFilter<"Response"> | Date | string
    interview?: XOR<InterviewRelationFilter, InterviewWhereInput>
    question?: XOR<QuestionRelationFilter, QuestionWhereInput>
  }, "id">

  export type ResponseOrderByWithAggregationInput = {
    id?: SortOrder
    interviewId?: SortOrder
    questionId?: SortOrder
    audioUrl?: SortOrderInput | SortOrder
    transcript?: SortOrder
    duration?: SortOrder
    scores?: SortOrder
    tags?: SortOrder
    sentiment?: SortOrderInput | SortOrder
    confidence?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: ResponseCountOrderByAggregateInput
    _avg?: ResponseAvgOrderByAggregateInput
    _max?: ResponseMaxOrderByAggregateInput
    _min?: ResponseMinOrderByAggregateInput
    _sum?: ResponseSumOrderByAggregateInput
  }

  export type ResponseScalarWhereWithAggregatesInput = {
    AND?: ResponseScalarWhereWithAggregatesInput | ResponseScalarWhereWithAggregatesInput[]
    OR?: ResponseScalarWhereWithAggregatesInput[]
    NOT?: ResponseScalarWhereWithAggregatesInput | ResponseScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Response"> | string
    interviewId?: StringWithAggregatesFilter<"Response"> | string
    questionId?: StringWithAggregatesFilter<"Response"> | string
    audioUrl?: StringNullableWithAggregatesFilter<"Response"> | string | null
    transcript?: StringWithAggregatesFilter<"Response"> | string
    duration?: IntWithAggregatesFilter<"Response"> | number
    scores?: JsonWithAggregatesFilter<"Response">
    tags?: StringNullableListFilter<"Response">
    sentiment?: FloatNullableWithAggregatesFilter<"Response"> | number | null
    confidence?: FloatNullableWithAggregatesFilter<"Response"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"Response"> | Date | string
  }

  export type FeedbackLoopWhereInput = {
    AND?: FeedbackLoopWhereInput | FeedbackLoopWhereInput[]
    OR?: FeedbackLoopWhereInput[]
    NOT?: FeedbackLoopWhereInput | FeedbackLoopWhereInput[]
    id?: StringFilter<"FeedbackLoop"> | string
    interviewId?: StringFilter<"FeedbackLoop"> | string
    questionId?: StringNullableFilter<"FeedbackLoop"> | string | null
    feedbackType?: EnumFeedbackTypeFilter<"FeedbackLoop"> | $Enums.FeedbackType
    signal?: JsonFilter<"FeedbackLoop">
    actionTaken?: StringNullableFilter<"FeedbackLoop"> | string | null
    outcome?: StringNullableFilter<"FeedbackLoop"> | string | null
    createdAt?: DateTimeFilter<"FeedbackLoop"> | Date | string
    interview?: XOR<InterviewRelationFilter, InterviewWhereInput>
    question?: XOR<QuestionNullableRelationFilter, QuestionWhereInput> | null
  }

  export type FeedbackLoopOrderByWithRelationInput = {
    id?: SortOrder
    interviewId?: SortOrder
    questionId?: SortOrderInput | SortOrder
    feedbackType?: SortOrder
    signal?: SortOrder
    actionTaken?: SortOrderInput | SortOrder
    outcome?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    interview?: InterviewOrderByWithRelationInput
    question?: QuestionOrderByWithRelationInput
  }

  export type FeedbackLoopWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FeedbackLoopWhereInput | FeedbackLoopWhereInput[]
    OR?: FeedbackLoopWhereInput[]
    NOT?: FeedbackLoopWhereInput | FeedbackLoopWhereInput[]
    interviewId?: StringFilter<"FeedbackLoop"> | string
    questionId?: StringNullableFilter<"FeedbackLoop"> | string | null
    feedbackType?: EnumFeedbackTypeFilter<"FeedbackLoop"> | $Enums.FeedbackType
    signal?: JsonFilter<"FeedbackLoop">
    actionTaken?: StringNullableFilter<"FeedbackLoop"> | string | null
    outcome?: StringNullableFilter<"FeedbackLoop"> | string | null
    createdAt?: DateTimeFilter<"FeedbackLoop"> | Date | string
    interview?: XOR<InterviewRelationFilter, InterviewWhereInput>
    question?: XOR<QuestionNullableRelationFilter, QuestionWhereInput> | null
  }, "id">

  export type FeedbackLoopOrderByWithAggregationInput = {
    id?: SortOrder
    interviewId?: SortOrder
    questionId?: SortOrderInput | SortOrder
    feedbackType?: SortOrder
    signal?: SortOrder
    actionTaken?: SortOrderInput | SortOrder
    outcome?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: FeedbackLoopCountOrderByAggregateInput
    _max?: FeedbackLoopMaxOrderByAggregateInput
    _min?: FeedbackLoopMinOrderByAggregateInput
  }

  export type FeedbackLoopScalarWhereWithAggregatesInput = {
    AND?: FeedbackLoopScalarWhereWithAggregatesInput | FeedbackLoopScalarWhereWithAggregatesInput[]
    OR?: FeedbackLoopScalarWhereWithAggregatesInput[]
    NOT?: FeedbackLoopScalarWhereWithAggregatesInput | FeedbackLoopScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FeedbackLoop"> | string
    interviewId?: StringWithAggregatesFilter<"FeedbackLoop"> | string
    questionId?: StringNullableWithAggregatesFilter<"FeedbackLoop"> | string | null
    feedbackType?: EnumFeedbackTypeWithAggregatesFilter<"FeedbackLoop"> | $Enums.FeedbackType
    signal?: JsonWithAggregatesFilter<"FeedbackLoop">
    actionTaken?: StringNullableWithAggregatesFilter<"FeedbackLoop"> | string | null
    outcome?: StringNullableWithAggregatesFilter<"FeedbackLoop"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"FeedbackLoop"> | Date | string
  }

  export type AgentLogWhereInput = {
    AND?: AgentLogWhereInput | AgentLogWhereInput[]
    OR?: AgentLogWhereInput[]
    NOT?: AgentLogWhereInput | AgentLogWhereInput[]
    id?: StringFilter<"AgentLog"> | string
    interviewId?: StringNullableFilter<"AgentLog"> | string | null
    agentType?: EnumAgentTypeFilter<"AgentLog"> | $Enums.AgentType
    action?: StringFilter<"AgentLog"> | string
    input?: JsonFilter<"AgentLog">
    output?: JsonFilter<"AgentLog">
    reflexionLoop?: IntFilter<"AgentLog"> | number
    performanceScore?: FloatNullableFilter<"AgentLog"> | number | null
    createdAt?: DateTimeFilter<"AgentLog"> | Date | string
    interview?: XOR<InterviewNullableRelationFilter, InterviewWhereInput> | null
  }

  export type AgentLogOrderByWithRelationInput = {
    id?: SortOrder
    interviewId?: SortOrderInput | SortOrder
    agentType?: SortOrder
    action?: SortOrder
    input?: SortOrder
    output?: SortOrder
    reflexionLoop?: SortOrder
    performanceScore?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    interview?: InterviewOrderByWithRelationInput
  }

  export type AgentLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AgentLogWhereInput | AgentLogWhereInput[]
    OR?: AgentLogWhereInput[]
    NOT?: AgentLogWhereInput | AgentLogWhereInput[]
    interviewId?: StringNullableFilter<"AgentLog"> | string | null
    agentType?: EnumAgentTypeFilter<"AgentLog"> | $Enums.AgentType
    action?: StringFilter<"AgentLog"> | string
    input?: JsonFilter<"AgentLog">
    output?: JsonFilter<"AgentLog">
    reflexionLoop?: IntFilter<"AgentLog"> | number
    performanceScore?: FloatNullableFilter<"AgentLog"> | number | null
    createdAt?: DateTimeFilter<"AgentLog"> | Date | string
    interview?: XOR<InterviewNullableRelationFilter, InterviewWhereInput> | null
  }, "id">

  export type AgentLogOrderByWithAggregationInput = {
    id?: SortOrder
    interviewId?: SortOrderInput | SortOrder
    agentType?: SortOrder
    action?: SortOrder
    input?: SortOrder
    output?: SortOrder
    reflexionLoop?: SortOrder
    performanceScore?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AgentLogCountOrderByAggregateInput
    _avg?: AgentLogAvgOrderByAggregateInput
    _max?: AgentLogMaxOrderByAggregateInput
    _min?: AgentLogMinOrderByAggregateInput
    _sum?: AgentLogSumOrderByAggregateInput
  }

  export type AgentLogScalarWhereWithAggregatesInput = {
    AND?: AgentLogScalarWhereWithAggregatesInput | AgentLogScalarWhereWithAggregatesInput[]
    OR?: AgentLogScalarWhereWithAggregatesInput[]
    NOT?: AgentLogScalarWhereWithAggregatesInput | AgentLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AgentLog"> | string
    interviewId?: StringNullableWithAggregatesFilter<"AgentLog"> | string | null
    agentType?: EnumAgentTypeWithAggregatesFilter<"AgentLog"> | $Enums.AgentType
    action?: StringWithAggregatesFilter<"AgentLog"> | string
    input?: JsonWithAggregatesFilter<"AgentLog">
    output?: JsonWithAggregatesFilter<"AgentLog">
    reflexionLoop?: IntWithAggregatesFilter<"AgentLog"> | number
    performanceScore?: FloatNullableWithAggregatesFilter<"AgentLog"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"AgentLog"> | Date | string
  }

  export type ScoringModelWhereInput = {
    AND?: ScoringModelWhereInput | ScoringModelWhereInput[]
    OR?: ScoringModelWhereInput[]
    NOT?: ScoringModelWhereInput | ScoringModelWhereInput[]
    id?: StringFilter<"ScoringModel"> | string
    position?: StringFilter<"ScoringModel"> | string
    version?: IntFilter<"ScoringModel"> | number
    weights?: JsonFilter<"ScoringModel">
    thresholds?: JsonFilter<"ScoringModel">
    accuracy?: FloatNullableFilter<"ScoringModel"> | number | null
    sampleSize?: IntFilter<"ScoringModel"> | number
    isActive?: BoolFilter<"ScoringModel"> | boolean
    createdById?: StringFilter<"ScoringModel"> | string
    createdAt?: DateTimeFilter<"ScoringModel"> | Date | string
    updatedAt?: DateTimeFilter<"ScoringModel"> | Date | string
    createdBy?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type ScoringModelOrderByWithRelationInput = {
    id?: SortOrder
    position?: SortOrder
    version?: SortOrder
    weights?: SortOrder
    thresholds?: SortOrder
    accuracy?: SortOrderInput | SortOrder
    sampleSize?: SortOrder
    isActive?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: UserOrderByWithRelationInput
  }

  export type ScoringModelWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ScoringModelWhereInput | ScoringModelWhereInput[]
    OR?: ScoringModelWhereInput[]
    NOT?: ScoringModelWhereInput | ScoringModelWhereInput[]
    position?: StringFilter<"ScoringModel"> | string
    version?: IntFilter<"ScoringModel"> | number
    weights?: JsonFilter<"ScoringModel">
    thresholds?: JsonFilter<"ScoringModel">
    accuracy?: FloatNullableFilter<"ScoringModel"> | number | null
    sampleSize?: IntFilter<"ScoringModel"> | number
    isActive?: BoolFilter<"ScoringModel"> | boolean
    createdById?: StringFilter<"ScoringModel"> | string
    createdAt?: DateTimeFilter<"ScoringModel"> | Date | string
    updatedAt?: DateTimeFilter<"ScoringModel"> | Date | string
    createdBy?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type ScoringModelOrderByWithAggregationInput = {
    id?: SortOrder
    position?: SortOrder
    version?: SortOrder
    weights?: SortOrder
    thresholds?: SortOrder
    accuracy?: SortOrderInput | SortOrder
    sampleSize?: SortOrder
    isActive?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ScoringModelCountOrderByAggregateInput
    _avg?: ScoringModelAvgOrderByAggregateInput
    _max?: ScoringModelMaxOrderByAggregateInput
    _min?: ScoringModelMinOrderByAggregateInput
    _sum?: ScoringModelSumOrderByAggregateInput
  }

  export type ScoringModelScalarWhereWithAggregatesInput = {
    AND?: ScoringModelScalarWhereWithAggregatesInput | ScoringModelScalarWhereWithAggregatesInput[]
    OR?: ScoringModelScalarWhereWithAggregatesInput[]
    NOT?: ScoringModelScalarWhereWithAggregatesInput | ScoringModelScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ScoringModel"> | string
    position?: StringWithAggregatesFilter<"ScoringModel"> | string
    version?: IntWithAggregatesFilter<"ScoringModel"> | number
    weights?: JsonWithAggregatesFilter<"ScoringModel">
    thresholds?: JsonWithAggregatesFilter<"ScoringModel">
    accuracy?: FloatNullableWithAggregatesFilter<"ScoringModel"> | number | null
    sampleSize?: IntWithAggregatesFilter<"ScoringModel"> | number
    isActive?: BoolWithAggregatesFilter<"ScoringModel"> | boolean
    createdById?: StringWithAggregatesFilter<"ScoringModel"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ScoringModel"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ScoringModel"> | Date | string
  }

  export type PatternWhereInput = {
    AND?: PatternWhereInput | PatternWhereInput[]
    OR?: PatternWhereInput[]
    NOT?: PatternWhereInput | PatternWhereInput[]
    id?: StringFilter<"Pattern"> | string
    name?: StringFilter<"Pattern"> | string
    description?: StringFilter<"Pattern"> | string
    category?: StringFilter<"Pattern"> | string
    signal?: JsonFilter<"Pattern">
    strength?: FloatFilter<"Pattern"> | number
    occurrences?: IntFilter<"Pattern"> | number
    successRate?: FloatNullableFilter<"Pattern"> | number | null
    isActive?: BoolFilter<"Pattern"> | boolean
    amplified?: BoolFilter<"Pattern"> | boolean
    createdAt?: DateTimeFilter<"Pattern"> | Date | string
    updatedAt?: DateTimeFilter<"Pattern"> | Date | string
  }

  export type PatternOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    category?: SortOrder
    signal?: SortOrder
    strength?: SortOrder
    occurrences?: SortOrder
    successRate?: SortOrderInput | SortOrder
    isActive?: SortOrder
    amplified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PatternWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PatternWhereInput | PatternWhereInput[]
    OR?: PatternWhereInput[]
    NOT?: PatternWhereInput | PatternWhereInput[]
    name?: StringFilter<"Pattern"> | string
    description?: StringFilter<"Pattern"> | string
    category?: StringFilter<"Pattern"> | string
    signal?: JsonFilter<"Pattern">
    strength?: FloatFilter<"Pattern"> | number
    occurrences?: IntFilter<"Pattern"> | number
    successRate?: FloatNullableFilter<"Pattern"> | number | null
    isActive?: BoolFilter<"Pattern"> | boolean
    amplified?: BoolFilter<"Pattern"> | boolean
    createdAt?: DateTimeFilter<"Pattern"> | Date | string
    updatedAt?: DateTimeFilter<"Pattern"> | Date | string
  }, "id">

  export type PatternOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    category?: SortOrder
    signal?: SortOrder
    strength?: SortOrder
    occurrences?: SortOrder
    successRate?: SortOrderInput | SortOrder
    isActive?: SortOrder
    amplified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PatternCountOrderByAggregateInput
    _avg?: PatternAvgOrderByAggregateInput
    _max?: PatternMaxOrderByAggregateInput
    _min?: PatternMinOrderByAggregateInput
    _sum?: PatternSumOrderByAggregateInput
  }

  export type PatternScalarWhereWithAggregatesInput = {
    AND?: PatternScalarWhereWithAggregatesInput | PatternScalarWhereWithAggregatesInput[]
    OR?: PatternScalarWhereWithAggregatesInput[]
    NOT?: PatternScalarWhereWithAggregatesInput | PatternScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Pattern"> | string
    name?: StringWithAggregatesFilter<"Pattern"> | string
    description?: StringWithAggregatesFilter<"Pattern"> | string
    category?: StringWithAggregatesFilter<"Pattern"> | string
    signal?: JsonWithAggregatesFilter<"Pattern">
    strength?: FloatWithAggregatesFilter<"Pattern"> | number
    occurrences?: IntWithAggregatesFilter<"Pattern"> | number
    successRate?: FloatNullableWithAggregatesFilter<"Pattern"> | number | null
    isActive?: BoolWithAggregatesFilter<"Pattern"> | boolean
    amplified?: BoolWithAggregatesFilter<"Pattern"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Pattern"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Pattern"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    name?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    interviews?: InterviewCreateNestedManyWithoutRecruiterInput
    questions?: QuestionCreateNestedManyWithoutCreatedByInput
    scoringModels?: ScoringModelCreateNestedManyWithoutCreatedByInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    name?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    interviews?: InterviewUncheckedCreateNestedManyWithoutRecruiterInput
    questions?: QuestionUncheckedCreateNestedManyWithoutCreatedByInput
    scoringModels?: ScoringModelUncheckedCreateNestedManyWithoutCreatedByInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    interviews?: InterviewUpdateManyWithoutRecruiterNestedInput
    questions?: QuestionUpdateManyWithoutCreatedByNestedInput
    scoringModels?: ScoringModelUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    interviews?: InterviewUncheckedUpdateManyWithoutRecruiterNestedInput
    questions?: QuestionUncheckedUpdateManyWithoutCreatedByNestedInput
    scoringModels?: ScoringModelUncheckedUpdateManyWithoutCreatedByNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    name?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InterviewCreateInput = {
    id?: string
    candidateId: string
    candidateName: string
    candidateEmail: string
    position: string
    status?: $Enums.InterviewStatus
    scheduledAt: Date | string
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    score?: number | null
    decision?: $Enums.Decision | null
    explainability?: NullableJsonNullValueInput | InputJsonValue
    recordingUrl?: string | null
    transcriptUrl?: string | null
    proctoringData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    recruiter: UserCreateNestedOneWithoutInterviewsInput
    responses?: ResponseCreateNestedManyWithoutInterviewInput
    feedbackLoops?: FeedbackLoopCreateNestedManyWithoutInterviewInput
    agentLogs?: AgentLogCreateNestedManyWithoutInterviewInput
  }

  export type InterviewUncheckedCreateInput = {
    id?: string
    candidateId: string
    candidateName: string
    candidateEmail: string
    position: string
    status?: $Enums.InterviewStatus
    scheduledAt: Date | string
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    score?: number | null
    decision?: $Enums.Decision | null
    explainability?: NullableJsonNullValueInput | InputJsonValue
    recordingUrl?: string | null
    transcriptUrl?: string | null
    proctoringData?: NullableJsonNullValueInput | InputJsonValue
    recruiterId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    responses?: ResponseUncheckedCreateNestedManyWithoutInterviewInput
    feedbackLoops?: FeedbackLoopUncheckedCreateNestedManyWithoutInterviewInput
    agentLogs?: AgentLogUncheckedCreateNestedManyWithoutInterviewInput
  }

  export type InterviewUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    candidateId?: StringFieldUpdateOperationsInput | string
    candidateName?: StringFieldUpdateOperationsInput | string
    candidateEmail?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    status?: EnumInterviewStatusFieldUpdateOperationsInput | $Enums.InterviewStatus
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    decision?: NullableEnumDecisionFieldUpdateOperationsInput | $Enums.Decision | null
    explainability?: NullableJsonNullValueInput | InputJsonValue
    recordingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    transcriptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    proctoringData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recruiter?: UserUpdateOneRequiredWithoutInterviewsNestedInput
    responses?: ResponseUpdateManyWithoutInterviewNestedInput
    feedbackLoops?: FeedbackLoopUpdateManyWithoutInterviewNestedInput
    agentLogs?: AgentLogUpdateManyWithoutInterviewNestedInput
  }

  export type InterviewUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    candidateId?: StringFieldUpdateOperationsInput | string
    candidateName?: StringFieldUpdateOperationsInput | string
    candidateEmail?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    status?: EnumInterviewStatusFieldUpdateOperationsInput | $Enums.InterviewStatus
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    decision?: NullableEnumDecisionFieldUpdateOperationsInput | $Enums.Decision | null
    explainability?: NullableJsonNullValueInput | InputJsonValue
    recordingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    transcriptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    proctoringData?: NullableJsonNullValueInput | InputJsonValue
    recruiterId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    responses?: ResponseUncheckedUpdateManyWithoutInterviewNestedInput
    feedbackLoops?: FeedbackLoopUncheckedUpdateManyWithoutInterviewNestedInput
    agentLogs?: AgentLogUncheckedUpdateManyWithoutInterviewNestedInput
  }

  export type InterviewCreateManyInput = {
    id?: string
    candidateId: string
    candidateName: string
    candidateEmail: string
    position: string
    status?: $Enums.InterviewStatus
    scheduledAt: Date | string
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    score?: number | null
    decision?: $Enums.Decision | null
    explainability?: NullableJsonNullValueInput | InputJsonValue
    recordingUrl?: string | null
    transcriptUrl?: string | null
    proctoringData?: NullableJsonNullValueInput | InputJsonValue
    recruiterId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InterviewUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    candidateId?: StringFieldUpdateOperationsInput | string
    candidateName?: StringFieldUpdateOperationsInput | string
    candidateEmail?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    status?: EnumInterviewStatusFieldUpdateOperationsInput | $Enums.InterviewStatus
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    decision?: NullableEnumDecisionFieldUpdateOperationsInput | $Enums.Decision | null
    explainability?: NullableJsonNullValueInput | InputJsonValue
    recordingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    transcriptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    proctoringData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InterviewUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    candidateId?: StringFieldUpdateOperationsInput | string
    candidateName?: StringFieldUpdateOperationsInput | string
    candidateEmail?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    status?: EnumInterviewStatusFieldUpdateOperationsInput | $Enums.InterviewStatus
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    decision?: NullableEnumDecisionFieldUpdateOperationsInput | $Enums.Decision | null
    explainability?: NullableJsonNullValueInput | InputJsonValue
    recordingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    transcriptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    proctoringData?: NullableJsonNullValueInput | InputJsonValue
    recruiterId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuestionCreateInput = {
    id?: string
    content: string
    category: string
    difficulty: $Enums.Difficulty
    position: string
    skillTags?: QuestionCreateskillTagsInput | string[]
    avgScore?: number
    timesAsked?: number
    correlationScore?: number
    lastUsed?: Date | string | null
    generatedBy?: string | null
    generationPrompt?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: UserCreateNestedOneWithoutQuestionsInput
    responses?: ResponseCreateNestedManyWithoutQuestionInput
    feedbackLoops?: FeedbackLoopCreateNestedManyWithoutQuestionInput
  }

  export type QuestionUncheckedCreateInput = {
    id?: string
    content: string
    category: string
    difficulty: $Enums.Difficulty
    position: string
    skillTags?: QuestionCreateskillTagsInput | string[]
    avgScore?: number
    timesAsked?: number
    correlationScore?: number
    lastUsed?: Date | string | null
    generatedBy?: string | null
    generationPrompt?: string | null
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
    responses?: ResponseUncheckedCreateNestedManyWithoutQuestionInput
    feedbackLoops?: FeedbackLoopUncheckedCreateNestedManyWithoutQuestionInput
  }

  export type QuestionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    difficulty?: EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty
    position?: StringFieldUpdateOperationsInput | string
    skillTags?: QuestionUpdateskillTagsInput | string[]
    avgScore?: FloatFieldUpdateOperationsInput | number
    timesAsked?: IntFieldUpdateOperationsInput | number
    correlationScore?: FloatFieldUpdateOperationsInput | number
    lastUsed?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    generatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    generationPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutQuestionsNestedInput
    responses?: ResponseUpdateManyWithoutQuestionNestedInput
    feedbackLoops?: FeedbackLoopUpdateManyWithoutQuestionNestedInput
  }

  export type QuestionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    difficulty?: EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty
    position?: StringFieldUpdateOperationsInput | string
    skillTags?: QuestionUpdateskillTagsInput | string[]
    avgScore?: FloatFieldUpdateOperationsInput | number
    timesAsked?: IntFieldUpdateOperationsInput | number
    correlationScore?: FloatFieldUpdateOperationsInput | number
    lastUsed?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    generatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    generationPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    responses?: ResponseUncheckedUpdateManyWithoutQuestionNestedInput
    feedbackLoops?: FeedbackLoopUncheckedUpdateManyWithoutQuestionNestedInput
  }

  export type QuestionCreateManyInput = {
    id?: string
    content: string
    category: string
    difficulty: $Enums.Difficulty
    position: string
    skillTags?: QuestionCreateskillTagsInput | string[]
    avgScore?: number
    timesAsked?: number
    correlationScore?: number
    lastUsed?: Date | string | null
    generatedBy?: string | null
    generationPrompt?: string | null
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type QuestionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    difficulty?: EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty
    position?: StringFieldUpdateOperationsInput | string
    skillTags?: QuestionUpdateskillTagsInput | string[]
    avgScore?: FloatFieldUpdateOperationsInput | number
    timesAsked?: IntFieldUpdateOperationsInput | number
    correlationScore?: FloatFieldUpdateOperationsInput | number
    lastUsed?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    generatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    generationPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuestionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    difficulty?: EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty
    position?: StringFieldUpdateOperationsInput | string
    skillTags?: QuestionUpdateskillTagsInput | string[]
    avgScore?: FloatFieldUpdateOperationsInput | number
    timesAsked?: IntFieldUpdateOperationsInput | number
    correlationScore?: FloatFieldUpdateOperationsInput | number
    lastUsed?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    generatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    generationPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResponseCreateInput = {
    id?: string
    audioUrl?: string | null
    transcript: string
    duration: number
    scores: JsonNullValueInput | InputJsonValue
    tags?: ResponseCreatetagsInput | string[]
    sentiment?: number | null
    confidence?: number | null
    createdAt?: Date | string
    interview: InterviewCreateNestedOneWithoutResponsesInput
    question: QuestionCreateNestedOneWithoutResponsesInput
  }

  export type ResponseUncheckedCreateInput = {
    id?: string
    interviewId: string
    questionId: string
    audioUrl?: string | null
    transcript: string
    duration: number
    scores: JsonNullValueInput | InputJsonValue
    tags?: ResponseCreatetagsInput | string[]
    sentiment?: number | null
    confidence?: number | null
    createdAt?: Date | string
  }

  export type ResponseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    transcript?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    scores?: JsonNullValueInput | InputJsonValue
    tags?: ResponseUpdatetagsInput | string[]
    sentiment?: NullableFloatFieldUpdateOperationsInput | number | null
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    interview?: InterviewUpdateOneRequiredWithoutResponsesNestedInput
    question?: QuestionUpdateOneRequiredWithoutResponsesNestedInput
  }

  export type ResponseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    interviewId?: StringFieldUpdateOperationsInput | string
    questionId?: StringFieldUpdateOperationsInput | string
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    transcript?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    scores?: JsonNullValueInput | InputJsonValue
    tags?: ResponseUpdatetagsInput | string[]
    sentiment?: NullableFloatFieldUpdateOperationsInput | number | null
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResponseCreateManyInput = {
    id?: string
    interviewId: string
    questionId: string
    audioUrl?: string | null
    transcript: string
    duration: number
    scores: JsonNullValueInput | InputJsonValue
    tags?: ResponseCreatetagsInput | string[]
    sentiment?: number | null
    confidence?: number | null
    createdAt?: Date | string
  }

  export type ResponseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    transcript?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    scores?: JsonNullValueInput | InputJsonValue
    tags?: ResponseUpdatetagsInput | string[]
    sentiment?: NullableFloatFieldUpdateOperationsInput | number | null
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResponseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    interviewId?: StringFieldUpdateOperationsInput | string
    questionId?: StringFieldUpdateOperationsInput | string
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    transcript?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    scores?: JsonNullValueInput | InputJsonValue
    tags?: ResponseUpdatetagsInput | string[]
    sentiment?: NullableFloatFieldUpdateOperationsInput | number | null
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedbackLoopCreateInput = {
    id?: string
    feedbackType: $Enums.FeedbackType
    signal: JsonNullValueInput | InputJsonValue
    actionTaken?: string | null
    outcome?: string | null
    createdAt?: Date | string
    interview: InterviewCreateNestedOneWithoutFeedbackLoopsInput
    question?: QuestionCreateNestedOneWithoutFeedbackLoopsInput
  }

  export type FeedbackLoopUncheckedCreateInput = {
    id?: string
    interviewId: string
    questionId?: string | null
    feedbackType: $Enums.FeedbackType
    signal: JsonNullValueInput | InputJsonValue
    actionTaken?: string | null
    outcome?: string | null
    createdAt?: Date | string
  }

  export type FeedbackLoopUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    feedbackType?: EnumFeedbackTypeFieldUpdateOperationsInput | $Enums.FeedbackType
    signal?: JsonNullValueInput | InputJsonValue
    actionTaken?: NullableStringFieldUpdateOperationsInput | string | null
    outcome?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    interview?: InterviewUpdateOneRequiredWithoutFeedbackLoopsNestedInput
    question?: QuestionUpdateOneWithoutFeedbackLoopsNestedInput
  }

  export type FeedbackLoopUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    interviewId?: StringFieldUpdateOperationsInput | string
    questionId?: NullableStringFieldUpdateOperationsInput | string | null
    feedbackType?: EnumFeedbackTypeFieldUpdateOperationsInput | $Enums.FeedbackType
    signal?: JsonNullValueInput | InputJsonValue
    actionTaken?: NullableStringFieldUpdateOperationsInput | string | null
    outcome?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedbackLoopCreateManyInput = {
    id?: string
    interviewId: string
    questionId?: string | null
    feedbackType: $Enums.FeedbackType
    signal: JsonNullValueInput | InputJsonValue
    actionTaken?: string | null
    outcome?: string | null
    createdAt?: Date | string
  }

  export type FeedbackLoopUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    feedbackType?: EnumFeedbackTypeFieldUpdateOperationsInput | $Enums.FeedbackType
    signal?: JsonNullValueInput | InputJsonValue
    actionTaken?: NullableStringFieldUpdateOperationsInput | string | null
    outcome?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedbackLoopUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    interviewId?: StringFieldUpdateOperationsInput | string
    questionId?: NullableStringFieldUpdateOperationsInput | string | null
    feedbackType?: EnumFeedbackTypeFieldUpdateOperationsInput | $Enums.FeedbackType
    signal?: JsonNullValueInput | InputJsonValue
    actionTaken?: NullableStringFieldUpdateOperationsInput | string | null
    outcome?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentLogCreateInput = {
    id?: string
    agentType: $Enums.AgentType
    action: string
    input: JsonNullValueInput | InputJsonValue
    output: JsonNullValueInput | InputJsonValue
    reflexionLoop?: number
    performanceScore?: number | null
    createdAt?: Date | string
    interview?: InterviewCreateNestedOneWithoutAgentLogsInput
  }

  export type AgentLogUncheckedCreateInput = {
    id?: string
    interviewId?: string | null
    agentType: $Enums.AgentType
    action: string
    input: JsonNullValueInput | InputJsonValue
    output: JsonNullValueInput | InputJsonValue
    reflexionLoop?: number
    performanceScore?: number | null
    createdAt?: Date | string
  }

  export type AgentLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentType?: EnumAgentTypeFieldUpdateOperationsInput | $Enums.AgentType
    action?: StringFieldUpdateOperationsInput | string
    input?: JsonNullValueInput | InputJsonValue
    output?: JsonNullValueInput | InputJsonValue
    reflexionLoop?: IntFieldUpdateOperationsInput | number
    performanceScore?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    interview?: InterviewUpdateOneWithoutAgentLogsNestedInput
  }

  export type AgentLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    interviewId?: NullableStringFieldUpdateOperationsInput | string | null
    agentType?: EnumAgentTypeFieldUpdateOperationsInput | $Enums.AgentType
    action?: StringFieldUpdateOperationsInput | string
    input?: JsonNullValueInput | InputJsonValue
    output?: JsonNullValueInput | InputJsonValue
    reflexionLoop?: IntFieldUpdateOperationsInput | number
    performanceScore?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentLogCreateManyInput = {
    id?: string
    interviewId?: string | null
    agentType: $Enums.AgentType
    action: string
    input: JsonNullValueInput | InputJsonValue
    output: JsonNullValueInput | InputJsonValue
    reflexionLoop?: number
    performanceScore?: number | null
    createdAt?: Date | string
  }

  export type AgentLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentType?: EnumAgentTypeFieldUpdateOperationsInput | $Enums.AgentType
    action?: StringFieldUpdateOperationsInput | string
    input?: JsonNullValueInput | InputJsonValue
    output?: JsonNullValueInput | InputJsonValue
    reflexionLoop?: IntFieldUpdateOperationsInput | number
    performanceScore?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    interviewId?: NullableStringFieldUpdateOperationsInput | string | null
    agentType?: EnumAgentTypeFieldUpdateOperationsInput | $Enums.AgentType
    action?: StringFieldUpdateOperationsInput | string
    input?: JsonNullValueInput | InputJsonValue
    output?: JsonNullValueInput | InputJsonValue
    reflexionLoop?: IntFieldUpdateOperationsInput | number
    performanceScore?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScoringModelCreateInput = {
    id?: string
    position: string
    version?: number
    weights: JsonNullValueInput | InputJsonValue
    thresholds: JsonNullValueInput | InputJsonValue
    accuracy?: number | null
    sampleSize?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: UserCreateNestedOneWithoutScoringModelsInput
  }

  export type ScoringModelUncheckedCreateInput = {
    id?: string
    position: string
    version?: number
    weights: JsonNullValueInput | InputJsonValue
    thresholds: JsonNullValueInput | InputJsonValue
    accuracy?: number | null
    sampleSize?: number
    isActive?: boolean
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ScoringModelUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    weights?: JsonNullValueInput | InputJsonValue
    thresholds?: JsonNullValueInput | InputJsonValue
    accuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    sampleSize?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutScoringModelsNestedInput
  }

  export type ScoringModelUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    weights?: JsonNullValueInput | InputJsonValue
    thresholds?: JsonNullValueInput | InputJsonValue
    accuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    sampleSize?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScoringModelCreateManyInput = {
    id?: string
    position: string
    version?: number
    weights: JsonNullValueInput | InputJsonValue
    thresholds: JsonNullValueInput | InputJsonValue
    accuracy?: number | null
    sampleSize?: number
    isActive?: boolean
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ScoringModelUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    weights?: JsonNullValueInput | InputJsonValue
    thresholds?: JsonNullValueInput | InputJsonValue
    accuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    sampleSize?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScoringModelUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    weights?: JsonNullValueInput | InputJsonValue
    thresholds?: JsonNullValueInput | InputJsonValue
    accuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    sampleSize?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PatternCreateInput = {
    id?: string
    name: string
    description: string
    category: string
    signal: JsonNullValueInput | InputJsonValue
    strength: number
    occurrences?: number
    successRate?: number | null
    isActive?: boolean
    amplified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PatternUncheckedCreateInput = {
    id?: string
    name: string
    description: string
    category: string
    signal: JsonNullValueInput | InputJsonValue
    strength: number
    occurrences?: number
    successRate?: number | null
    isActive?: boolean
    amplified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PatternUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    signal?: JsonNullValueInput | InputJsonValue
    strength?: FloatFieldUpdateOperationsInput | number
    occurrences?: IntFieldUpdateOperationsInput | number
    successRate?: NullableFloatFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    amplified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PatternUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    signal?: JsonNullValueInput | InputJsonValue
    strength?: FloatFieldUpdateOperationsInput | number
    occurrences?: IntFieldUpdateOperationsInput | number
    successRate?: NullableFloatFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    amplified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PatternCreateManyInput = {
    id?: string
    name: string
    description: string
    category: string
    signal: JsonNullValueInput | InputJsonValue
    strength: number
    occurrences?: number
    successRate?: number | null
    isActive?: boolean
    amplified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PatternUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    signal?: JsonNullValueInput | InputJsonValue
    strength?: FloatFieldUpdateOperationsInput | number
    occurrences?: IntFieldUpdateOperationsInput | number
    successRate?: NullableFloatFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    amplified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PatternUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    signal?: JsonNullValueInput | InputJsonValue
    strength?: FloatFieldUpdateOperationsInput | number
    occurrences?: IntFieldUpdateOperationsInput | number
    successRate?: NullableFloatFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    amplified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type InterviewListRelationFilter = {
    every?: InterviewWhereInput
    some?: InterviewWhereInput
    none?: InterviewWhereInput
  }

  export type QuestionListRelationFilter = {
    every?: QuestionWhereInput
    some?: QuestionWhereInput
    none?: QuestionWhereInput
  }

  export type ScoringModelListRelationFilter = {
    every?: ScoringModelWhereInput
    some?: ScoringModelWhereInput
    none?: ScoringModelWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type InterviewOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type QuestionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ScoringModelOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumInterviewStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.InterviewStatus | EnumInterviewStatusFieldRefInput<$PrismaModel>
    in?: $Enums.InterviewStatus[] | ListEnumInterviewStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.InterviewStatus[] | ListEnumInterviewStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumInterviewStatusFilter<$PrismaModel> | $Enums.InterviewStatus
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type EnumDecisionNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.Decision | EnumDecisionFieldRefInput<$PrismaModel> | null
    in?: $Enums.Decision[] | ListEnumDecisionFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Decision[] | ListEnumDecisionFieldRefInput<$PrismaModel> | null
    not?: NestedEnumDecisionNullableFilter<$PrismaModel> | $Enums.Decision | null
  }
  export type JsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ResponseListRelationFilter = {
    every?: ResponseWhereInput
    some?: ResponseWhereInput
    none?: ResponseWhereInput
  }

  export type FeedbackLoopListRelationFilter = {
    every?: FeedbackLoopWhereInput
    some?: FeedbackLoopWhereInput
    none?: FeedbackLoopWhereInput
  }

  export type AgentLogListRelationFilter = {
    every?: AgentLogWhereInput
    some?: AgentLogWhereInput
    none?: AgentLogWhereInput
  }

  export type ResponseOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FeedbackLoopOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AgentLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type InterviewCountOrderByAggregateInput = {
    id?: SortOrder
    candidateId?: SortOrder
    candidateName?: SortOrder
    candidateEmail?: SortOrder
    position?: SortOrder
    status?: SortOrder
    scheduledAt?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
    score?: SortOrder
    decision?: SortOrder
    explainability?: SortOrder
    recordingUrl?: SortOrder
    transcriptUrl?: SortOrder
    proctoringData?: SortOrder
    recruiterId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InterviewAvgOrderByAggregateInput = {
    score?: SortOrder
  }

  export type InterviewMaxOrderByAggregateInput = {
    id?: SortOrder
    candidateId?: SortOrder
    candidateName?: SortOrder
    candidateEmail?: SortOrder
    position?: SortOrder
    status?: SortOrder
    scheduledAt?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
    score?: SortOrder
    decision?: SortOrder
    recordingUrl?: SortOrder
    transcriptUrl?: SortOrder
    recruiterId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InterviewMinOrderByAggregateInput = {
    id?: SortOrder
    candidateId?: SortOrder
    candidateName?: SortOrder
    candidateEmail?: SortOrder
    position?: SortOrder
    status?: SortOrder
    scheduledAt?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
    score?: SortOrder
    decision?: SortOrder
    recordingUrl?: SortOrder
    transcriptUrl?: SortOrder
    recruiterId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InterviewSumOrderByAggregateInput = {
    score?: SortOrder
  }

  export type EnumInterviewStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InterviewStatus | EnumInterviewStatusFieldRefInput<$PrismaModel>
    in?: $Enums.InterviewStatus[] | ListEnumInterviewStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.InterviewStatus[] | ListEnumInterviewStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumInterviewStatusWithAggregatesFilter<$PrismaModel> | $Enums.InterviewStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumInterviewStatusFilter<$PrismaModel>
    _max?: NestedEnumInterviewStatusFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type EnumDecisionNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Decision | EnumDecisionFieldRefInput<$PrismaModel> | null
    in?: $Enums.Decision[] | ListEnumDecisionFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Decision[] | ListEnumDecisionFieldRefInput<$PrismaModel> | null
    not?: NestedEnumDecisionNullableWithAggregatesFilter<$PrismaModel> | $Enums.Decision | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumDecisionNullableFilter<$PrismaModel>
    _max?: NestedEnumDecisionNullableFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type EnumDifficultyFilter<$PrismaModel = never> = {
    equals?: $Enums.Difficulty | EnumDifficultyFieldRefInput<$PrismaModel>
    in?: $Enums.Difficulty[] | ListEnumDifficultyFieldRefInput<$PrismaModel>
    notIn?: $Enums.Difficulty[] | ListEnumDifficultyFieldRefInput<$PrismaModel>
    not?: NestedEnumDifficultyFilter<$PrismaModel> | $Enums.Difficulty
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type QuestionCountOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    category?: SortOrder
    difficulty?: SortOrder
    position?: SortOrder
    skillTags?: SortOrder
    avgScore?: SortOrder
    timesAsked?: SortOrder
    correlationScore?: SortOrder
    lastUsed?: SortOrder
    generatedBy?: SortOrder
    generationPrompt?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type QuestionAvgOrderByAggregateInput = {
    avgScore?: SortOrder
    timesAsked?: SortOrder
    correlationScore?: SortOrder
  }

  export type QuestionMaxOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    category?: SortOrder
    difficulty?: SortOrder
    position?: SortOrder
    avgScore?: SortOrder
    timesAsked?: SortOrder
    correlationScore?: SortOrder
    lastUsed?: SortOrder
    generatedBy?: SortOrder
    generationPrompt?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type QuestionMinOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    category?: SortOrder
    difficulty?: SortOrder
    position?: SortOrder
    avgScore?: SortOrder
    timesAsked?: SortOrder
    correlationScore?: SortOrder
    lastUsed?: SortOrder
    generatedBy?: SortOrder
    generationPrompt?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type QuestionSumOrderByAggregateInput = {
    avgScore?: SortOrder
    timesAsked?: SortOrder
    correlationScore?: SortOrder
  }

  export type EnumDifficultyWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Difficulty | EnumDifficultyFieldRefInput<$PrismaModel>
    in?: $Enums.Difficulty[] | ListEnumDifficultyFieldRefInput<$PrismaModel>
    notIn?: $Enums.Difficulty[] | ListEnumDifficultyFieldRefInput<$PrismaModel>
    not?: NestedEnumDifficultyWithAggregatesFilter<$PrismaModel> | $Enums.Difficulty
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDifficultyFilter<$PrismaModel>
    _max?: NestedEnumDifficultyFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }
  export type JsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type InterviewRelationFilter = {
    is?: InterviewWhereInput
    isNot?: InterviewWhereInput
  }

  export type QuestionRelationFilter = {
    is?: QuestionWhereInput
    isNot?: QuestionWhereInput
  }

  export type ResponseCountOrderByAggregateInput = {
    id?: SortOrder
    interviewId?: SortOrder
    questionId?: SortOrder
    audioUrl?: SortOrder
    transcript?: SortOrder
    duration?: SortOrder
    scores?: SortOrder
    tags?: SortOrder
    sentiment?: SortOrder
    confidence?: SortOrder
    createdAt?: SortOrder
  }

  export type ResponseAvgOrderByAggregateInput = {
    duration?: SortOrder
    sentiment?: SortOrder
    confidence?: SortOrder
  }

  export type ResponseMaxOrderByAggregateInput = {
    id?: SortOrder
    interviewId?: SortOrder
    questionId?: SortOrder
    audioUrl?: SortOrder
    transcript?: SortOrder
    duration?: SortOrder
    sentiment?: SortOrder
    confidence?: SortOrder
    createdAt?: SortOrder
  }

  export type ResponseMinOrderByAggregateInput = {
    id?: SortOrder
    interviewId?: SortOrder
    questionId?: SortOrder
    audioUrl?: SortOrder
    transcript?: SortOrder
    duration?: SortOrder
    sentiment?: SortOrder
    confidence?: SortOrder
    createdAt?: SortOrder
  }

  export type ResponseSumOrderByAggregateInput = {
    duration?: SortOrder
    sentiment?: SortOrder
    confidence?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type EnumFeedbackTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.FeedbackType | EnumFeedbackTypeFieldRefInput<$PrismaModel>
    in?: $Enums.FeedbackType[] | ListEnumFeedbackTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.FeedbackType[] | ListEnumFeedbackTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumFeedbackTypeFilter<$PrismaModel> | $Enums.FeedbackType
  }

  export type QuestionNullableRelationFilter = {
    is?: QuestionWhereInput | null
    isNot?: QuestionWhereInput | null
  }

  export type FeedbackLoopCountOrderByAggregateInput = {
    id?: SortOrder
    interviewId?: SortOrder
    questionId?: SortOrder
    feedbackType?: SortOrder
    signal?: SortOrder
    actionTaken?: SortOrder
    outcome?: SortOrder
    createdAt?: SortOrder
  }

  export type FeedbackLoopMaxOrderByAggregateInput = {
    id?: SortOrder
    interviewId?: SortOrder
    questionId?: SortOrder
    feedbackType?: SortOrder
    actionTaken?: SortOrder
    outcome?: SortOrder
    createdAt?: SortOrder
  }

  export type FeedbackLoopMinOrderByAggregateInput = {
    id?: SortOrder
    interviewId?: SortOrder
    questionId?: SortOrder
    feedbackType?: SortOrder
    actionTaken?: SortOrder
    outcome?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumFeedbackTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FeedbackType | EnumFeedbackTypeFieldRefInput<$PrismaModel>
    in?: $Enums.FeedbackType[] | ListEnumFeedbackTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.FeedbackType[] | ListEnumFeedbackTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumFeedbackTypeWithAggregatesFilter<$PrismaModel> | $Enums.FeedbackType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFeedbackTypeFilter<$PrismaModel>
    _max?: NestedEnumFeedbackTypeFilter<$PrismaModel>
  }

  export type EnumAgentTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AgentType | EnumAgentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AgentType[] | ListEnumAgentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AgentType[] | ListEnumAgentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAgentTypeFilter<$PrismaModel> | $Enums.AgentType
  }

  export type InterviewNullableRelationFilter = {
    is?: InterviewWhereInput | null
    isNot?: InterviewWhereInput | null
  }

  export type AgentLogCountOrderByAggregateInput = {
    id?: SortOrder
    interviewId?: SortOrder
    agentType?: SortOrder
    action?: SortOrder
    input?: SortOrder
    output?: SortOrder
    reflexionLoop?: SortOrder
    performanceScore?: SortOrder
    createdAt?: SortOrder
  }

  export type AgentLogAvgOrderByAggregateInput = {
    reflexionLoop?: SortOrder
    performanceScore?: SortOrder
  }

  export type AgentLogMaxOrderByAggregateInput = {
    id?: SortOrder
    interviewId?: SortOrder
    agentType?: SortOrder
    action?: SortOrder
    reflexionLoop?: SortOrder
    performanceScore?: SortOrder
    createdAt?: SortOrder
  }

  export type AgentLogMinOrderByAggregateInput = {
    id?: SortOrder
    interviewId?: SortOrder
    agentType?: SortOrder
    action?: SortOrder
    reflexionLoop?: SortOrder
    performanceScore?: SortOrder
    createdAt?: SortOrder
  }

  export type AgentLogSumOrderByAggregateInput = {
    reflexionLoop?: SortOrder
    performanceScore?: SortOrder
  }

  export type EnumAgentTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AgentType | EnumAgentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AgentType[] | ListEnumAgentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AgentType[] | ListEnumAgentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAgentTypeWithAggregatesFilter<$PrismaModel> | $Enums.AgentType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAgentTypeFilter<$PrismaModel>
    _max?: NestedEnumAgentTypeFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type ScoringModelCountOrderByAggregateInput = {
    id?: SortOrder
    position?: SortOrder
    version?: SortOrder
    weights?: SortOrder
    thresholds?: SortOrder
    accuracy?: SortOrder
    sampleSize?: SortOrder
    isActive?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ScoringModelAvgOrderByAggregateInput = {
    version?: SortOrder
    accuracy?: SortOrder
    sampleSize?: SortOrder
  }

  export type ScoringModelMaxOrderByAggregateInput = {
    id?: SortOrder
    position?: SortOrder
    version?: SortOrder
    accuracy?: SortOrder
    sampleSize?: SortOrder
    isActive?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ScoringModelMinOrderByAggregateInput = {
    id?: SortOrder
    position?: SortOrder
    version?: SortOrder
    accuracy?: SortOrder
    sampleSize?: SortOrder
    isActive?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ScoringModelSumOrderByAggregateInput = {
    version?: SortOrder
    accuracy?: SortOrder
    sampleSize?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type PatternCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    category?: SortOrder
    signal?: SortOrder
    strength?: SortOrder
    occurrences?: SortOrder
    successRate?: SortOrder
    isActive?: SortOrder
    amplified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PatternAvgOrderByAggregateInput = {
    strength?: SortOrder
    occurrences?: SortOrder
    successRate?: SortOrder
  }

  export type PatternMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    category?: SortOrder
    strength?: SortOrder
    occurrences?: SortOrder
    successRate?: SortOrder
    isActive?: SortOrder
    amplified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PatternMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    category?: SortOrder
    strength?: SortOrder
    occurrences?: SortOrder
    successRate?: SortOrder
    isActive?: SortOrder
    amplified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PatternSumOrderByAggregateInput = {
    strength?: SortOrder
    occurrences?: SortOrder
    successRate?: SortOrder
  }

  export type InterviewCreateNestedManyWithoutRecruiterInput = {
    create?: XOR<InterviewCreateWithoutRecruiterInput, InterviewUncheckedCreateWithoutRecruiterInput> | InterviewCreateWithoutRecruiterInput[] | InterviewUncheckedCreateWithoutRecruiterInput[]
    connectOrCreate?: InterviewCreateOrConnectWithoutRecruiterInput | InterviewCreateOrConnectWithoutRecruiterInput[]
    createMany?: InterviewCreateManyRecruiterInputEnvelope
    connect?: InterviewWhereUniqueInput | InterviewWhereUniqueInput[]
  }

  export type QuestionCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<QuestionCreateWithoutCreatedByInput, QuestionUncheckedCreateWithoutCreatedByInput> | QuestionCreateWithoutCreatedByInput[] | QuestionUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: QuestionCreateOrConnectWithoutCreatedByInput | QuestionCreateOrConnectWithoutCreatedByInput[]
    createMany?: QuestionCreateManyCreatedByInputEnvelope
    connect?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
  }

  export type ScoringModelCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<ScoringModelCreateWithoutCreatedByInput, ScoringModelUncheckedCreateWithoutCreatedByInput> | ScoringModelCreateWithoutCreatedByInput[] | ScoringModelUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: ScoringModelCreateOrConnectWithoutCreatedByInput | ScoringModelCreateOrConnectWithoutCreatedByInput[]
    createMany?: ScoringModelCreateManyCreatedByInputEnvelope
    connect?: ScoringModelWhereUniqueInput | ScoringModelWhereUniqueInput[]
  }

  export type InterviewUncheckedCreateNestedManyWithoutRecruiterInput = {
    create?: XOR<InterviewCreateWithoutRecruiterInput, InterviewUncheckedCreateWithoutRecruiterInput> | InterviewCreateWithoutRecruiterInput[] | InterviewUncheckedCreateWithoutRecruiterInput[]
    connectOrCreate?: InterviewCreateOrConnectWithoutRecruiterInput | InterviewCreateOrConnectWithoutRecruiterInput[]
    createMany?: InterviewCreateManyRecruiterInputEnvelope
    connect?: InterviewWhereUniqueInput | InterviewWhereUniqueInput[]
  }

  export type QuestionUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<QuestionCreateWithoutCreatedByInput, QuestionUncheckedCreateWithoutCreatedByInput> | QuestionCreateWithoutCreatedByInput[] | QuestionUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: QuestionCreateOrConnectWithoutCreatedByInput | QuestionCreateOrConnectWithoutCreatedByInput[]
    createMany?: QuestionCreateManyCreatedByInputEnvelope
    connect?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
  }

  export type ScoringModelUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<ScoringModelCreateWithoutCreatedByInput, ScoringModelUncheckedCreateWithoutCreatedByInput> | ScoringModelCreateWithoutCreatedByInput[] | ScoringModelUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: ScoringModelCreateOrConnectWithoutCreatedByInput | ScoringModelCreateOrConnectWithoutCreatedByInput[]
    createMany?: ScoringModelCreateManyCreatedByInputEnvelope
    connect?: ScoringModelWhereUniqueInput | ScoringModelWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type InterviewUpdateManyWithoutRecruiterNestedInput = {
    create?: XOR<InterviewCreateWithoutRecruiterInput, InterviewUncheckedCreateWithoutRecruiterInput> | InterviewCreateWithoutRecruiterInput[] | InterviewUncheckedCreateWithoutRecruiterInput[]
    connectOrCreate?: InterviewCreateOrConnectWithoutRecruiterInput | InterviewCreateOrConnectWithoutRecruiterInput[]
    upsert?: InterviewUpsertWithWhereUniqueWithoutRecruiterInput | InterviewUpsertWithWhereUniqueWithoutRecruiterInput[]
    createMany?: InterviewCreateManyRecruiterInputEnvelope
    set?: InterviewWhereUniqueInput | InterviewWhereUniqueInput[]
    disconnect?: InterviewWhereUniqueInput | InterviewWhereUniqueInput[]
    delete?: InterviewWhereUniqueInput | InterviewWhereUniqueInput[]
    connect?: InterviewWhereUniqueInput | InterviewWhereUniqueInput[]
    update?: InterviewUpdateWithWhereUniqueWithoutRecruiterInput | InterviewUpdateWithWhereUniqueWithoutRecruiterInput[]
    updateMany?: InterviewUpdateManyWithWhereWithoutRecruiterInput | InterviewUpdateManyWithWhereWithoutRecruiterInput[]
    deleteMany?: InterviewScalarWhereInput | InterviewScalarWhereInput[]
  }

  export type QuestionUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<QuestionCreateWithoutCreatedByInput, QuestionUncheckedCreateWithoutCreatedByInput> | QuestionCreateWithoutCreatedByInput[] | QuestionUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: QuestionCreateOrConnectWithoutCreatedByInput | QuestionCreateOrConnectWithoutCreatedByInput[]
    upsert?: QuestionUpsertWithWhereUniqueWithoutCreatedByInput | QuestionUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: QuestionCreateManyCreatedByInputEnvelope
    set?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    disconnect?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    delete?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    connect?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    update?: QuestionUpdateWithWhereUniqueWithoutCreatedByInput | QuestionUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: QuestionUpdateManyWithWhereWithoutCreatedByInput | QuestionUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: QuestionScalarWhereInput | QuestionScalarWhereInput[]
  }

  export type ScoringModelUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<ScoringModelCreateWithoutCreatedByInput, ScoringModelUncheckedCreateWithoutCreatedByInput> | ScoringModelCreateWithoutCreatedByInput[] | ScoringModelUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: ScoringModelCreateOrConnectWithoutCreatedByInput | ScoringModelCreateOrConnectWithoutCreatedByInput[]
    upsert?: ScoringModelUpsertWithWhereUniqueWithoutCreatedByInput | ScoringModelUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: ScoringModelCreateManyCreatedByInputEnvelope
    set?: ScoringModelWhereUniqueInput | ScoringModelWhereUniqueInput[]
    disconnect?: ScoringModelWhereUniqueInput | ScoringModelWhereUniqueInput[]
    delete?: ScoringModelWhereUniqueInput | ScoringModelWhereUniqueInput[]
    connect?: ScoringModelWhereUniqueInput | ScoringModelWhereUniqueInput[]
    update?: ScoringModelUpdateWithWhereUniqueWithoutCreatedByInput | ScoringModelUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: ScoringModelUpdateManyWithWhereWithoutCreatedByInput | ScoringModelUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: ScoringModelScalarWhereInput | ScoringModelScalarWhereInput[]
  }

  export type InterviewUncheckedUpdateManyWithoutRecruiterNestedInput = {
    create?: XOR<InterviewCreateWithoutRecruiterInput, InterviewUncheckedCreateWithoutRecruiterInput> | InterviewCreateWithoutRecruiterInput[] | InterviewUncheckedCreateWithoutRecruiterInput[]
    connectOrCreate?: InterviewCreateOrConnectWithoutRecruiterInput | InterviewCreateOrConnectWithoutRecruiterInput[]
    upsert?: InterviewUpsertWithWhereUniqueWithoutRecruiterInput | InterviewUpsertWithWhereUniqueWithoutRecruiterInput[]
    createMany?: InterviewCreateManyRecruiterInputEnvelope
    set?: InterviewWhereUniqueInput | InterviewWhereUniqueInput[]
    disconnect?: InterviewWhereUniqueInput | InterviewWhereUniqueInput[]
    delete?: InterviewWhereUniqueInput | InterviewWhereUniqueInput[]
    connect?: InterviewWhereUniqueInput | InterviewWhereUniqueInput[]
    update?: InterviewUpdateWithWhereUniqueWithoutRecruiterInput | InterviewUpdateWithWhereUniqueWithoutRecruiterInput[]
    updateMany?: InterviewUpdateManyWithWhereWithoutRecruiterInput | InterviewUpdateManyWithWhereWithoutRecruiterInput[]
    deleteMany?: InterviewScalarWhereInput | InterviewScalarWhereInput[]
  }

  export type QuestionUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<QuestionCreateWithoutCreatedByInput, QuestionUncheckedCreateWithoutCreatedByInput> | QuestionCreateWithoutCreatedByInput[] | QuestionUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: QuestionCreateOrConnectWithoutCreatedByInput | QuestionCreateOrConnectWithoutCreatedByInput[]
    upsert?: QuestionUpsertWithWhereUniqueWithoutCreatedByInput | QuestionUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: QuestionCreateManyCreatedByInputEnvelope
    set?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    disconnect?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    delete?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    connect?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    update?: QuestionUpdateWithWhereUniqueWithoutCreatedByInput | QuestionUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: QuestionUpdateManyWithWhereWithoutCreatedByInput | QuestionUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: QuestionScalarWhereInput | QuestionScalarWhereInput[]
  }

  export type ScoringModelUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<ScoringModelCreateWithoutCreatedByInput, ScoringModelUncheckedCreateWithoutCreatedByInput> | ScoringModelCreateWithoutCreatedByInput[] | ScoringModelUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: ScoringModelCreateOrConnectWithoutCreatedByInput | ScoringModelCreateOrConnectWithoutCreatedByInput[]
    upsert?: ScoringModelUpsertWithWhereUniqueWithoutCreatedByInput | ScoringModelUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: ScoringModelCreateManyCreatedByInputEnvelope
    set?: ScoringModelWhereUniqueInput | ScoringModelWhereUniqueInput[]
    disconnect?: ScoringModelWhereUniqueInput | ScoringModelWhereUniqueInput[]
    delete?: ScoringModelWhereUniqueInput | ScoringModelWhereUniqueInput[]
    connect?: ScoringModelWhereUniqueInput | ScoringModelWhereUniqueInput[]
    update?: ScoringModelUpdateWithWhereUniqueWithoutCreatedByInput | ScoringModelUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: ScoringModelUpdateManyWithWhereWithoutCreatedByInput | ScoringModelUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: ScoringModelScalarWhereInput | ScoringModelScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutInterviewsInput = {
    create?: XOR<UserCreateWithoutInterviewsInput, UserUncheckedCreateWithoutInterviewsInput>
    connectOrCreate?: UserCreateOrConnectWithoutInterviewsInput
    connect?: UserWhereUniqueInput
  }

  export type ResponseCreateNestedManyWithoutInterviewInput = {
    create?: XOR<ResponseCreateWithoutInterviewInput, ResponseUncheckedCreateWithoutInterviewInput> | ResponseCreateWithoutInterviewInput[] | ResponseUncheckedCreateWithoutInterviewInput[]
    connectOrCreate?: ResponseCreateOrConnectWithoutInterviewInput | ResponseCreateOrConnectWithoutInterviewInput[]
    createMany?: ResponseCreateManyInterviewInputEnvelope
    connect?: ResponseWhereUniqueInput | ResponseWhereUniqueInput[]
  }

  export type FeedbackLoopCreateNestedManyWithoutInterviewInput = {
    create?: XOR<FeedbackLoopCreateWithoutInterviewInput, FeedbackLoopUncheckedCreateWithoutInterviewInput> | FeedbackLoopCreateWithoutInterviewInput[] | FeedbackLoopUncheckedCreateWithoutInterviewInput[]
    connectOrCreate?: FeedbackLoopCreateOrConnectWithoutInterviewInput | FeedbackLoopCreateOrConnectWithoutInterviewInput[]
    createMany?: FeedbackLoopCreateManyInterviewInputEnvelope
    connect?: FeedbackLoopWhereUniqueInput | FeedbackLoopWhereUniqueInput[]
  }

  export type AgentLogCreateNestedManyWithoutInterviewInput = {
    create?: XOR<AgentLogCreateWithoutInterviewInput, AgentLogUncheckedCreateWithoutInterviewInput> | AgentLogCreateWithoutInterviewInput[] | AgentLogUncheckedCreateWithoutInterviewInput[]
    connectOrCreate?: AgentLogCreateOrConnectWithoutInterviewInput | AgentLogCreateOrConnectWithoutInterviewInput[]
    createMany?: AgentLogCreateManyInterviewInputEnvelope
    connect?: AgentLogWhereUniqueInput | AgentLogWhereUniqueInput[]
  }

  export type ResponseUncheckedCreateNestedManyWithoutInterviewInput = {
    create?: XOR<ResponseCreateWithoutInterviewInput, ResponseUncheckedCreateWithoutInterviewInput> | ResponseCreateWithoutInterviewInput[] | ResponseUncheckedCreateWithoutInterviewInput[]
    connectOrCreate?: ResponseCreateOrConnectWithoutInterviewInput | ResponseCreateOrConnectWithoutInterviewInput[]
    createMany?: ResponseCreateManyInterviewInputEnvelope
    connect?: ResponseWhereUniqueInput | ResponseWhereUniqueInput[]
  }

  export type FeedbackLoopUncheckedCreateNestedManyWithoutInterviewInput = {
    create?: XOR<FeedbackLoopCreateWithoutInterviewInput, FeedbackLoopUncheckedCreateWithoutInterviewInput> | FeedbackLoopCreateWithoutInterviewInput[] | FeedbackLoopUncheckedCreateWithoutInterviewInput[]
    connectOrCreate?: FeedbackLoopCreateOrConnectWithoutInterviewInput | FeedbackLoopCreateOrConnectWithoutInterviewInput[]
    createMany?: FeedbackLoopCreateManyInterviewInputEnvelope
    connect?: FeedbackLoopWhereUniqueInput | FeedbackLoopWhereUniqueInput[]
  }

  export type AgentLogUncheckedCreateNestedManyWithoutInterviewInput = {
    create?: XOR<AgentLogCreateWithoutInterviewInput, AgentLogUncheckedCreateWithoutInterviewInput> | AgentLogCreateWithoutInterviewInput[] | AgentLogUncheckedCreateWithoutInterviewInput[]
    connectOrCreate?: AgentLogCreateOrConnectWithoutInterviewInput | AgentLogCreateOrConnectWithoutInterviewInput[]
    createMany?: AgentLogCreateManyInterviewInputEnvelope
    connect?: AgentLogWhereUniqueInput | AgentLogWhereUniqueInput[]
  }

  export type EnumInterviewStatusFieldUpdateOperationsInput = {
    set?: $Enums.InterviewStatus
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableEnumDecisionFieldUpdateOperationsInput = {
    set?: $Enums.Decision | null
  }

  export type UserUpdateOneRequiredWithoutInterviewsNestedInput = {
    create?: XOR<UserCreateWithoutInterviewsInput, UserUncheckedCreateWithoutInterviewsInput>
    connectOrCreate?: UserCreateOrConnectWithoutInterviewsInput
    upsert?: UserUpsertWithoutInterviewsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutInterviewsInput, UserUpdateWithoutInterviewsInput>, UserUncheckedUpdateWithoutInterviewsInput>
  }

  export type ResponseUpdateManyWithoutInterviewNestedInput = {
    create?: XOR<ResponseCreateWithoutInterviewInput, ResponseUncheckedCreateWithoutInterviewInput> | ResponseCreateWithoutInterviewInput[] | ResponseUncheckedCreateWithoutInterviewInput[]
    connectOrCreate?: ResponseCreateOrConnectWithoutInterviewInput | ResponseCreateOrConnectWithoutInterviewInput[]
    upsert?: ResponseUpsertWithWhereUniqueWithoutInterviewInput | ResponseUpsertWithWhereUniqueWithoutInterviewInput[]
    createMany?: ResponseCreateManyInterviewInputEnvelope
    set?: ResponseWhereUniqueInput | ResponseWhereUniqueInput[]
    disconnect?: ResponseWhereUniqueInput | ResponseWhereUniqueInput[]
    delete?: ResponseWhereUniqueInput | ResponseWhereUniqueInput[]
    connect?: ResponseWhereUniqueInput | ResponseWhereUniqueInput[]
    update?: ResponseUpdateWithWhereUniqueWithoutInterviewInput | ResponseUpdateWithWhereUniqueWithoutInterviewInput[]
    updateMany?: ResponseUpdateManyWithWhereWithoutInterviewInput | ResponseUpdateManyWithWhereWithoutInterviewInput[]
    deleteMany?: ResponseScalarWhereInput | ResponseScalarWhereInput[]
  }

  export type FeedbackLoopUpdateManyWithoutInterviewNestedInput = {
    create?: XOR<FeedbackLoopCreateWithoutInterviewInput, FeedbackLoopUncheckedCreateWithoutInterviewInput> | FeedbackLoopCreateWithoutInterviewInput[] | FeedbackLoopUncheckedCreateWithoutInterviewInput[]
    connectOrCreate?: FeedbackLoopCreateOrConnectWithoutInterviewInput | FeedbackLoopCreateOrConnectWithoutInterviewInput[]
    upsert?: FeedbackLoopUpsertWithWhereUniqueWithoutInterviewInput | FeedbackLoopUpsertWithWhereUniqueWithoutInterviewInput[]
    createMany?: FeedbackLoopCreateManyInterviewInputEnvelope
    set?: FeedbackLoopWhereUniqueInput | FeedbackLoopWhereUniqueInput[]
    disconnect?: FeedbackLoopWhereUniqueInput | FeedbackLoopWhereUniqueInput[]
    delete?: FeedbackLoopWhereUniqueInput | FeedbackLoopWhereUniqueInput[]
    connect?: FeedbackLoopWhereUniqueInput | FeedbackLoopWhereUniqueInput[]
    update?: FeedbackLoopUpdateWithWhereUniqueWithoutInterviewInput | FeedbackLoopUpdateWithWhereUniqueWithoutInterviewInput[]
    updateMany?: FeedbackLoopUpdateManyWithWhereWithoutInterviewInput | FeedbackLoopUpdateManyWithWhereWithoutInterviewInput[]
    deleteMany?: FeedbackLoopScalarWhereInput | FeedbackLoopScalarWhereInput[]
  }

  export type AgentLogUpdateManyWithoutInterviewNestedInput = {
    create?: XOR<AgentLogCreateWithoutInterviewInput, AgentLogUncheckedCreateWithoutInterviewInput> | AgentLogCreateWithoutInterviewInput[] | AgentLogUncheckedCreateWithoutInterviewInput[]
    connectOrCreate?: AgentLogCreateOrConnectWithoutInterviewInput | AgentLogCreateOrConnectWithoutInterviewInput[]
    upsert?: AgentLogUpsertWithWhereUniqueWithoutInterviewInput | AgentLogUpsertWithWhereUniqueWithoutInterviewInput[]
    createMany?: AgentLogCreateManyInterviewInputEnvelope
    set?: AgentLogWhereUniqueInput | AgentLogWhereUniqueInput[]
    disconnect?: AgentLogWhereUniqueInput | AgentLogWhereUniqueInput[]
    delete?: AgentLogWhereUniqueInput | AgentLogWhereUniqueInput[]
    connect?: AgentLogWhereUniqueInput | AgentLogWhereUniqueInput[]
    update?: AgentLogUpdateWithWhereUniqueWithoutInterviewInput | AgentLogUpdateWithWhereUniqueWithoutInterviewInput[]
    updateMany?: AgentLogUpdateManyWithWhereWithoutInterviewInput | AgentLogUpdateManyWithWhereWithoutInterviewInput[]
    deleteMany?: AgentLogScalarWhereInput | AgentLogScalarWhereInput[]
  }

  export type ResponseUncheckedUpdateManyWithoutInterviewNestedInput = {
    create?: XOR<ResponseCreateWithoutInterviewInput, ResponseUncheckedCreateWithoutInterviewInput> | ResponseCreateWithoutInterviewInput[] | ResponseUncheckedCreateWithoutInterviewInput[]
    connectOrCreate?: ResponseCreateOrConnectWithoutInterviewInput | ResponseCreateOrConnectWithoutInterviewInput[]
    upsert?: ResponseUpsertWithWhereUniqueWithoutInterviewInput | ResponseUpsertWithWhereUniqueWithoutInterviewInput[]
    createMany?: ResponseCreateManyInterviewInputEnvelope
    set?: ResponseWhereUniqueInput | ResponseWhereUniqueInput[]
    disconnect?: ResponseWhereUniqueInput | ResponseWhereUniqueInput[]
    delete?: ResponseWhereUniqueInput | ResponseWhereUniqueInput[]
    connect?: ResponseWhereUniqueInput | ResponseWhereUniqueInput[]
    update?: ResponseUpdateWithWhereUniqueWithoutInterviewInput | ResponseUpdateWithWhereUniqueWithoutInterviewInput[]
    updateMany?: ResponseUpdateManyWithWhereWithoutInterviewInput | ResponseUpdateManyWithWhereWithoutInterviewInput[]
    deleteMany?: ResponseScalarWhereInput | ResponseScalarWhereInput[]
  }

  export type FeedbackLoopUncheckedUpdateManyWithoutInterviewNestedInput = {
    create?: XOR<FeedbackLoopCreateWithoutInterviewInput, FeedbackLoopUncheckedCreateWithoutInterviewInput> | FeedbackLoopCreateWithoutInterviewInput[] | FeedbackLoopUncheckedCreateWithoutInterviewInput[]
    connectOrCreate?: FeedbackLoopCreateOrConnectWithoutInterviewInput | FeedbackLoopCreateOrConnectWithoutInterviewInput[]
    upsert?: FeedbackLoopUpsertWithWhereUniqueWithoutInterviewInput | FeedbackLoopUpsertWithWhereUniqueWithoutInterviewInput[]
    createMany?: FeedbackLoopCreateManyInterviewInputEnvelope
    set?: FeedbackLoopWhereUniqueInput | FeedbackLoopWhereUniqueInput[]
    disconnect?: FeedbackLoopWhereUniqueInput | FeedbackLoopWhereUniqueInput[]
    delete?: FeedbackLoopWhereUniqueInput | FeedbackLoopWhereUniqueInput[]
    connect?: FeedbackLoopWhereUniqueInput | FeedbackLoopWhereUniqueInput[]
    update?: FeedbackLoopUpdateWithWhereUniqueWithoutInterviewInput | FeedbackLoopUpdateWithWhereUniqueWithoutInterviewInput[]
    updateMany?: FeedbackLoopUpdateManyWithWhereWithoutInterviewInput | FeedbackLoopUpdateManyWithWhereWithoutInterviewInput[]
    deleteMany?: FeedbackLoopScalarWhereInput | FeedbackLoopScalarWhereInput[]
  }

  export type AgentLogUncheckedUpdateManyWithoutInterviewNestedInput = {
    create?: XOR<AgentLogCreateWithoutInterviewInput, AgentLogUncheckedCreateWithoutInterviewInput> | AgentLogCreateWithoutInterviewInput[] | AgentLogUncheckedCreateWithoutInterviewInput[]
    connectOrCreate?: AgentLogCreateOrConnectWithoutInterviewInput | AgentLogCreateOrConnectWithoutInterviewInput[]
    upsert?: AgentLogUpsertWithWhereUniqueWithoutInterviewInput | AgentLogUpsertWithWhereUniqueWithoutInterviewInput[]
    createMany?: AgentLogCreateManyInterviewInputEnvelope
    set?: AgentLogWhereUniqueInput | AgentLogWhereUniqueInput[]
    disconnect?: AgentLogWhereUniqueInput | AgentLogWhereUniqueInput[]
    delete?: AgentLogWhereUniqueInput | AgentLogWhereUniqueInput[]
    connect?: AgentLogWhereUniqueInput | AgentLogWhereUniqueInput[]
    update?: AgentLogUpdateWithWhereUniqueWithoutInterviewInput | AgentLogUpdateWithWhereUniqueWithoutInterviewInput[]
    updateMany?: AgentLogUpdateManyWithWhereWithoutInterviewInput | AgentLogUpdateManyWithWhereWithoutInterviewInput[]
    deleteMany?: AgentLogScalarWhereInput | AgentLogScalarWhereInput[]
  }

  export type QuestionCreateskillTagsInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutQuestionsInput = {
    create?: XOR<UserCreateWithoutQuestionsInput, UserUncheckedCreateWithoutQuestionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutQuestionsInput
    connect?: UserWhereUniqueInput
  }

  export type ResponseCreateNestedManyWithoutQuestionInput = {
    create?: XOR<ResponseCreateWithoutQuestionInput, ResponseUncheckedCreateWithoutQuestionInput> | ResponseCreateWithoutQuestionInput[] | ResponseUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: ResponseCreateOrConnectWithoutQuestionInput | ResponseCreateOrConnectWithoutQuestionInput[]
    createMany?: ResponseCreateManyQuestionInputEnvelope
    connect?: ResponseWhereUniqueInput | ResponseWhereUniqueInput[]
  }

  export type FeedbackLoopCreateNestedManyWithoutQuestionInput = {
    create?: XOR<FeedbackLoopCreateWithoutQuestionInput, FeedbackLoopUncheckedCreateWithoutQuestionInput> | FeedbackLoopCreateWithoutQuestionInput[] | FeedbackLoopUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: FeedbackLoopCreateOrConnectWithoutQuestionInput | FeedbackLoopCreateOrConnectWithoutQuestionInput[]
    createMany?: FeedbackLoopCreateManyQuestionInputEnvelope
    connect?: FeedbackLoopWhereUniqueInput | FeedbackLoopWhereUniqueInput[]
  }

  export type ResponseUncheckedCreateNestedManyWithoutQuestionInput = {
    create?: XOR<ResponseCreateWithoutQuestionInput, ResponseUncheckedCreateWithoutQuestionInput> | ResponseCreateWithoutQuestionInput[] | ResponseUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: ResponseCreateOrConnectWithoutQuestionInput | ResponseCreateOrConnectWithoutQuestionInput[]
    createMany?: ResponseCreateManyQuestionInputEnvelope
    connect?: ResponseWhereUniqueInput | ResponseWhereUniqueInput[]
  }

  export type FeedbackLoopUncheckedCreateNestedManyWithoutQuestionInput = {
    create?: XOR<FeedbackLoopCreateWithoutQuestionInput, FeedbackLoopUncheckedCreateWithoutQuestionInput> | FeedbackLoopCreateWithoutQuestionInput[] | FeedbackLoopUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: FeedbackLoopCreateOrConnectWithoutQuestionInput | FeedbackLoopCreateOrConnectWithoutQuestionInput[]
    createMany?: FeedbackLoopCreateManyQuestionInputEnvelope
    connect?: FeedbackLoopWhereUniqueInput | FeedbackLoopWhereUniqueInput[]
  }

  export type EnumDifficultyFieldUpdateOperationsInput = {
    set?: $Enums.Difficulty
  }

  export type QuestionUpdateskillTagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutQuestionsNestedInput = {
    create?: XOR<UserCreateWithoutQuestionsInput, UserUncheckedCreateWithoutQuestionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutQuestionsInput
    upsert?: UserUpsertWithoutQuestionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutQuestionsInput, UserUpdateWithoutQuestionsInput>, UserUncheckedUpdateWithoutQuestionsInput>
  }

  export type ResponseUpdateManyWithoutQuestionNestedInput = {
    create?: XOR<ResponseCreateWithoutQuestionInput, ResponseUncheckedCreateWithoutQuestionInput> | ResponseCreateWithoutQuestionInput[] | ResponseUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: ResponseCreateOrConnectWithoutQuestionInput | ResponseCreateOrConnectWithoutQuestionInput[]
    upsert?: ResponseUpsertWithWhereUniqueWithoutQuestionInput | ResponseUpsertWithWhereUniqueWithoutQuestionInput[]
    createMany?: ResponseCreateManyQuestionInputEnvelope
    set?: ResponseWhereUniqueInput | ResponseWhereUniqueInput[]
    disconnect?: ResponseWhereUniqueInput | ResponseWhereUniqueInput[]
    delete?: ResponseWhereUniqueInput | ResponseWhereUniqueInput[]
    connect?: ResponseWhereUniqueInput | ResponseWhereUniqueInput[]
    update?: ResponseUpdateWithWhereUniqueWithoutQuestionInput | ResponseUpdateWithWhereUniqueWithoutQuestionInput[]
    updateMany?: ResponseUpdateManyWithWhereWithoutQuestionInput | ResponseUpdateManyWithWhereWithoutQuestionInput[]
    deleteMany?: ResponseScalarWhereInput | ResponseScalarWhereInput[]
  }

  export type FeedbackLoopUpdateManyWithoutQuestionNestedInput = {
    create?: XOR<FeedbackLoopCreateWithoutQuestionInput, FeedbackLoopUncheckedCreateWithoutQuestionInput> | FeedbackLoopCreateWithoutQuestionInput[] | FeedbackLoopUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: FeedbackLoopCreateOrConnectWithoutQuestionInput | FeedbackLoopCreateOrConnectWithoutQuestionInput[]
    upsert?: FeedbackLoopUpsertWithWhereUniqueWithoutQuestionInput | FeedbackLoopUpsertWithWhereUniqueWithoutQuestionInput[]
    createMany?: FeedbackLoopCreateManyQuestionInputEnvelope
    set?: FeedbackLoopWhereUniqueInput | FeedbackLoopWhereUniqueInput[]
    disconnect?: FeedbackLoopWhereUniqueInput | FeedbackLoopWhereUniqueInput[]
    delete?: FeedbackLoopWhereUniqueInput | FeedbackLoopWhereUniqueInput[]
    connect?: FeedbackLoopWhereUniqueInput | FeedbackLoopWhereUniqueInput[]
    update?: FeedbackLoopUpdateWithWhereUniqueWithoutQuestionInput | FeedbackLoopUpdateWithWhereUniqueWithoutQuestionInput[]
    updateMany?: FeedbackLoopUpdateManyWithWhereWithoutQuestionInput | FeedbackLoopUpdateManyWithWhereWithoutQuestionInput[]
    deleteMany?: FeedbackLoopScalarWhereInput | FeedbackLoopScalarWhereInput[]
  }

  export type ResponseUncheckedUpdateManyWithoutQuestionNestedInput = {
    create?: XOR<ResponseCreateWithoutQuestionInput, ResponseUncheckedCreateWithoutQuestionInput> | ResponseCreateWithoutQuestionInput[] | ResponseUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: ResponseCreateOrConnectWithoutQuestionInput | ResponseCreateOrConnectWithoutQuestionInput[]
    upsert?: ResponseUpsertWithWhereUniqueWithoutQuestionInput | ResponseUpsertWithWhereUniqueWithoutQuestionInput[]
    createMany?: ResponseCreateManyQuestionInputEnvelope
    set?: ResponseWhereUniqueInput | ResponseWhereUniqueInput[]
    disconnect?: ResponseWhereUniqueInput | ResponseWhereUniqueInput[]
    delete?: ResponseWhereUniqueInput | ResponseWhereUniqueInput[]
    connect?: ResponseWhereUniqueInput | ResponseWhereUniqueInput[]
    update?: ResponseUpdateWithWhereUniqueWithoutQuestionInput | ResponseUpdateWithWhereUniqueWithoutQuestionInput[]
    updateMany?: ResponseUpdateManyWithWhereWithoutQuestionInput | ResponseUpdateManyWithWhereWithoutQuestionInput[]
    deleteMany?: ResponseScalarWhereInput | ResponseScalarWhereInput[]
  }

  export type FeedbackLoopUncheckedUpdateManyWithoutQuestionNestedInput = {
    create?: XOR<FeedbackLoopCreateWithoutQuestionInput, FeedbackLoopUncheckedCreateWithoutQuestionInput> | FeedbackLoopCreateWithoutQuestionInput[] | FeedbackLoopUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: FeedbackLoopCreateOrConnectWithoutQuestionInput | FeedbackLoopCreateOrConnectWithoutQuestionInput[]
    upsert?: FeedbackLoopUpsertWithWhereUniqueWithoutQuestionInput | FeedbackLoopUpsertWithWhereUniqueWithoutQuestionInput[]
    createMany?: FeedbackLoopCreateManyQuestionInputEnvelope
    set?: FeedbackLoopWhereUniqueInput | FeedbackLoopWhereUniqueInput[]
    disconnect?: FeedbackLoopWhereUniqueInput | FeedbackLoopWhereUniqueInput[]
    delete?: FeedbackLoopWhereUniqueInput | FeedbackLoopWhereUniqueInput[]
    connect?: FeedbackLoopWhereUniqueInput | FeedbackLoopWhereUniqueInput[]
    update?: FeedbackLoopUpdateWithWhereUniqueWithoutQuestionInput | FeedbackLoopUpdateWithWhereUniqueWithoutQuestionInput[]
    updateMany?: FeedbackLoopUpdateManyWithWhereWithoutQuestionInput | FeedbackLoopUpdateManyWithWhereWithoutQuestionInput[]
    deleteMany?: FeedbackLoopScalarWhereInput | FeedbackLoopScalarWhereInput[]
  }

  export type ResponseCreatetagsInput = {
    set: string[]
  }

  export type InterviewCreateNestedOneWithoutResponsesInput = {
    create?: XOR<InterviewCreateWithoutResponsesInput, InterviewUncheckedCreateWithoutResponsesInput>
    connectOrCreate?: InterviewCreateOrConnectWithoutResponsesInput
    connect?: InterviewWhereUniqueInput
  }

  export type QuestionCreateNestedOneWithoutResponsesInput = {
    create?: XOR<QuestionCreateWithoutResponsesInput, QuestionUncheckedCreateWithoutResponsesInput>
    connectOrCreate?: QuestionCreateOrConnectWithoutResponsesInput
    connect?: QuestionWhereUniqueInput
  }

  export type ResponseUpdatetagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type InterviewUpdateOneRequiredWithoutResponsesNestedInput = {
    create?: XOR<InterviewCreateWithoutResponsesInput, InterviewUncheckedCreateWithoutResponsesInput>
    connectOrCreate?: InterviewCreateOrConnectWithoutResponsesInput
    upsert?: InterviewUpsertWithoutResponsesInput
    connect?: InterviewWhereUniqueInput
    update?: XOR<XOR<InterviewUpdateToOneWithWhereWithoutResponsesInput, InterviewUpdateWithoutResponsesInput>, InterviewUncheckedUpdateWithoutResponsesInput>
  }

  export type QuestionUpdateOneRequiredWithoutResponsesNestedInput = {
    create?: XOR<QuestionCreateWithoutResponsesInput, QuestionUncheckedCreateWithoutResponsesInput>
    connectOrCreate?: QuestionCreateOrConnectWithoutResponsesInput
    upsert?: QuestionUpsertWithoutResponsesInput
    connect?: QuestionWhereUniqueInput
    update?: XOR<XOR<QuestionUpdateToOneWithWhereWithoutResponsesInput, QuestionUpdateWithoutResponsesInput>, QuestionUncheckedUpdateWithoutResponsesInput>
  }

  export type InterviewCreateNestedOneWithoutFeedbackLoopsInput = {
    create?: XOR<InterviewCreateWithoutFeedbackLoopsInput, InterviewUncheckedCreateWithoutFeedbackLoopsInput>
    connectOrCreate?: InterviewCreateOrConnectWithoutFeedbackLoopsInput
    connect?: InterviewWhereUniqueInput
  }

  export type QuestionCreateNestedOneWithoutFeedbackLoopsInput = {
    create?: XOR<QuestionCreateWithoutFeedbackLoopsInput, QuestionUncheckedCreateWithoutFeedbackLoopsInput>
    connectOrCreate?: QuestionCreateOrConnectWithoutFeedbackLoopsInput
    connect?: QuestionWhereUniqueInput
  }

  export type EnumFeedbackTypeFieldUpdateOperationsInput = {
    set?: $Enums.FeedbackType
  }

  export type InterviewUpdateOneRequiredWithoutFeedbackLoopsNestedInput = {
    create?: XOR<InterviewCreateWithoutFeedbackLoopsInput, InterviewUncheckedCreateWithoutFeedbackLoopsInput>
    connectOrCreate?: InterviewCreateOrConnectWithoutFeedbackLoopsInput
    upsert?: InterviewUpsertWithoutFeedbackLoopsInput
    connect?: InterviewWhereUniqueInput
    update?: XOR<XOR<InterviewUpdateToOneWithWhereWithoutFeedbackLoopsInput, InterviewUpdateWithoutFeedbackLoopsInput>, InterviewUncheckedUpdateWithoutFeedbackLoopsInput>
  }

  export type QuestionUpdateOneWithoutFeedbackLoopsNestedInput = {
    create?: XOR<QuestionCreateWithoutFeedbackLoopsInput, QuestionUncheckedCreateWithoutFeedbackLoopsInput>
    connectOrCreate?: QuestionCreateOrConnectWithoutFeedbackLoopsInput
    upsert?: QuestionUpsertWithoutFeedbackLoopsInput
    disconnect?: QuestionWhereInput | boolean
    delete?: QuestionWhereInput | boolean
    connect?: QuestionWhereUniqueInput
    update?: XOR<XOR<QuestionUpdateToOneWithWhereWithoutFeedbackLoopsInput, QuestionUpdateWithoutFeedbackLoopsInput>, QuestionUncheckedUpdateWithoutFeedbackLoopsInput>
  }

  export type InterviewCreateNestedOneWithoutAgentLogsInput = {
    create?: XOR<InterviewCreateWithoutAgentLogsInput, InterviewUncheckedCreateWithoutAgentLogsInput>
    connectOrCreate?: InterviewCreateOrConnectWithoutAgentLogsInput
    connect?: InterviewWhereUniqueInput
  }

  export type EnumAgentTypeFieldUpdateOperationsInput = {
    set?: $Enums.AgentType
  }

  export type InterviewUpdateOneWithoutAgentLogsNestedInput = {
    create?: XOR<InterviewCreateWithoutAgentLogsInput, InterviewUncheckedCreateWithoutAgentLogsInput>
    connectOrCreate?: InterviewCreateOrConnectWithoutAgentLogsInput
    upsert?: InterviewUpsertWithoutAgentLogsInput
    disconnect?: InterviewWhereInput | boolean
    delete?: InterviewWhereInput | boolean
    connect?: InterviewWhereUniqueInput
    update?: XOR<XOR<InterviewUpdateToOneWithWhereWithoutAgentLogsInput, InterviewUpdateWithoutAgentLogsInput>, InterviewUncheckedUpdateWithoutAgentLogsInput>
  }

  export type UserCreateNestedOneWithoutScoringModelsInput = {
    create?: XOR<UserCreateWithoutScoringModelsInput, UserUncheckedCreateWithoutScoringModelsInput>
    connectOrCreate?: UserCreateOrConnectWithoutScoringModelsInput
    connect?: UserWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutScoringModelsNestedInput = {
    create?: XOR<UserCreateWithoutScoringModelsInput, UserUncheckedCreateWithoutScoringModelsInput>
    connectOrCreate?: UserCreateOrConnectWithoutScoringModelsInput
    upsert?: UserUpsertWithoutScoringModelsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutScoringModelsInput, UserUpdateWithoutScoringModelsInput>, UserUncheckedUpdateWithoutScoringModelsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumInterviewStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.InterviewStatus | EnumInterviewStatusFieldRefInput<$PrismaModel>
    in?: $Enums.InterviewStatus[] | ListEnumInterviewStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.InterviewStatus[] | ListEnumInterviewStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumInterviewStatusFilter<$PrismaModel> | $Enums.InterviewStatus
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumDecisionNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.Decision | EnumDecisionFieldRefInput<$PrismaModel> | null
    in?: $Enums.Decision[] | ListEnumDecisionFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Decision[] | ListEnumDecisionFieldRefInput<$PrismaModel> | null
    not?: NestedEnumDecisionNullableFilter<$PrismaModel> | $Enums.Decision | null
  }

  export type NestedEnumInterviewStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InterviewStatus | EnumInterviewStatusFieldRefInput<$PrismaModel>
    in?: $Enums.InterviewStatus[] | ListEnumInterviewStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.InterviewStatus[] | ListEnumInterviewStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumInterviewStatusWithAggregatesFilter<$PrismaModel> | $Enums.InterviewStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumInterviewStatusFilter<$PrismaModel>
    _max?: NestedEnumInterviewStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedEnumDecisionNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Decision | EnumDecisionFieldRefInput<$PrismaModel> | null
    in?: $Enums.Decision[] | ListEnumDecisionFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Decision[] | ListEnumDecisionFieldRefInput<$PrismaModel> | null
    not?: NestedEnumDecisionNullableWithAggregatesFilter<$PrismaModel> | $Enums.Decision | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumDecisionNullableFilter<$PrismaModel>
    _max?: NestedEnumDecisionNullableFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumDifficultyFilter<$PrismaModel = never> = {
    equals?: $Enums.Difficulty | EnumDifficultyFieldRefInput<$PrismaModel>
    in?: $Enums.Difficulty[] | ListEnumDifficultyFieldRefInput<$PrismaModel>
    notIn?: $Enums.Difficulty[] | ListEnumDifficultyFieldRefInput<$PrismaModel>
    not?: NestedEnumDifficultyFilter<$PrismaModel> | $Enums.Difficulty
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumDifficultyWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Difficulty | EnumDifficultyFieldRefInput<$PrismaModel>
    in?: $Enums.Difficulty[] | ListEnumDifficultyFieldRefInput<$PrismaModel>
    notIn?: $Enums.Difficulty[] | ListEnumDifficultyFieldRefInput<$PrismaModel>
    not?: NestedEnumDifficultyWithAggregatesFilter<$PrismaModel> | $Enums.Difficulty
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDifficultyFilter<$PrismaModel>
    _max?: NestedEnumDifficultyFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumFeedbackTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.FeedbackType | EnumFeedbackTypeFieldRefInput<$PrismaModel>
    in?: $Enums.FeedbackType[] | ListEnumFeedbackTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.FeedbackType[] | ListEnumFeedbackTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumFeedbackTypeFilter<$PrismaModel> | $Enums.FeedbackType
  }

  export type NestedEnumFeedbackTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FeedbackType | EnumFeedbackTypeFieldRefInput<$PrismaModel>
    in?: $Enums.FeedbackType[] | ListEnumFeedbackTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.FeedbackType[] | ListEnumFeedbackTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumFeedbackTypeWithAggregatesFilter<$PrismaModel> | $Enums.FeedbackType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFeedbackTypeFilter<$PrismaModel>
    _max?: NestedEnumFeedbackTypeFilter<$PrismaModel>
  }

  export type NestedEnumAgentTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AgentType | EnumAgentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AgentType[] | ListEnumAgentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AgentType[] | ListEnumAgentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAgentTypeFilter<$PrismaModel> | $Enums.AgentType
  }

  export type NestedEnumAgentTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AgentType | EnumAgentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AgentType[] | ListEnumAgentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AgentType[] | ListEnumAgentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAgentTypeWithAggregatesFilter<$PrismaModel> | $Enums.AgentType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAgentTypeFilter<$PrismaModel>
    _max?: NestedEnumAgentTypeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type InterviewCreateWithoutRecruiterInput = {
    id?: string
    candidateId: string
    candidateName: string
    candidateEmail: string
    position: string
    status?: $Enums.InterviewStatus
    scheduledAt: Date | string
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    score?: number | null
    decision?: $Enums.Decision | null
    explainability?: NullableJsonNullValueInput | InputJsonValue
    recordingUrl?: string | null
    transcriptUrl?: string | null
    proctoringData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    responses?: ResponseCreateNestedManyWithoutInterviewInput
    feedbackLoops?: FeedbackLoopCreateNestedManyWithoutInterviewInput
    agentLogs?: AgentLogCreateNestedManyWithoutInterviewInput
  }

  export type InterviewUncheckedCreateWithoutRecruiterInput = {
    id?: string
    candidateId: string
    candidateName: string
    candidateEmail: string
    position: string
    status?: $Enums.InterviewStatus
    scheduledAt: Date | string
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    score?: number | null
    decision?: $Enums.Decision | null
    explainability?: NullableJsonNullValueInput | InputJsonValue
    recordingUrl?: string | null
    transcriptUrl?: string | null
    proctoringData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    responses?: ResponseUncheckedCreateNestedManyWithoutInterviewInput
    feedbackLoops?: FeedbackLoopUncheckedCreateNestedManyWithoutInterviewInput
    agentLogs?: AgentLogUncheckedCreateNestedManyWithoutInterviewInput
  }

  export type InterviewCreateOrConnectWithoutRecruiterInput = {
    where: InterviewWhereUniqueInput
    create: XOR<InterviewCreateWithoutRecruiterInput, InterviewUncheckedCreateWithoutRecruiterInput>
  }

  export type InterviewCreateManyRecruiterInputEnvelope = {
    data: InterviewCreateManyRecruiterInput | InterviewCreateManyRecruiterInput[]
    skipDuplicates?: boolean
  }

  export type QuestionCreateWithoutCreatedByInput = {
    id?: string
    content: string
    category: string
    difficulty: $Enums.Difficulty
    position: string
    skillTags?: QuestionCreateskillTagsInput | string[]
    avgScore?: number
    timesAsked?: number
    correlationScore?: number
    lastUsed?: Date | string | null
    generatedBy?: string | null
    generationPrompt?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    responses?: ResponseCreateNestedManyWithoutQuestionInput
    feedbackLoops?: FeedbackLoopCreateNestedManyWithoutQuestionInput
  }

  export type QuestionUncheckedCreateWithoutCreatedByInput = {
    id?: string
    content: string
    category: string
    difficulty: $Enums.Difficulty
    position: string
    skillTags?: QuestionCreateskillTagsInput | string[]
    avgScore?: number
    timesAsked?: number
    correlationScore?: number
    lastUsed?: Date | string | null
    generatedBy?: string | null
    generationPrompt?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    responses?: ResponseUncheckedCreateNestedManyWithoutQuestionInput
    feedbackLoops?: FeedbackLoopUncheckedCreateNestedManyWithoutQuestionInput
  }

  export type QuestionCreateOrConnectWithoutCreatedByInput = {
    where: QuestionWhereUniqueInput
    create: XOR<QuestionCreateWithoutCreatedByInput, QuestionUncheckedCreateWithoutCreatedByInput>
  }

  export type QuestionCreateManyCreatedByInputEnvelope = {
    data: QuestionCreateManyCreatedByInput | QuestionCreateManyCreatedByInput[]
    skipDuplicates?: boolean
  }

  export type ScoringModelCreateWithoutCreatedByInput = {
    id?: string
    position: string
    version?: number
    weights: JsonNullValueInput | InputJsonValue
    thresholds: JsonNullValueInput | InputJsonValue
    accuracy?: number | null
    sampleSize?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ScoringModelUncheckedCreateWithoutCreatedByInput = {
    id?: string
    position: string
    version?: number
    weights: JsonNullValueInput | InputJsonValue
    thresholds: JsonNullValueInput | InputJsonValue
    accuracy?: number | null
    sampleSize?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ScoringModelCreateOrConnectWithoutCreatedByInput = {
    where: ScoringModelWhereUniqueInput
    create: XOR<ScoringModelCreateWithoutCreatedByInput, ScoringModelUncheckedCreateWithoutCreatedByInput>
  }

  export type ScoringModelCreateManyCreatedByInputEnvelope = {
    data: ScoringModelCreateManyCreatedByInput | ScoringModelCreateManyCreatedByInput[]
    skipDuplicates?: boolean
  }

  export type InterviewUpsertWithWhereUniqueWithoutRecruiterInput = {
    where: InterviewWhereUniqueInput
    update: XOR<InterviewUpdateWithoutRecruiterInput, InterviewUncheckedUpdateWithoutRecruiterInput>
    create: XOR<InterviewCreateWithoutRecruiterInput, InterviewUncheckedCreateWithoutRecruiterInput>
  }

  export type InterviewUpdateWithWhereUniqueWithoutRecruiterInput = {
    where: InterviewWhereUniqueInput
    data: XOR<InterviewUpdateWithoutRecruiterInput, InterviewUncheckedUpdateWithoutRecruiterInput>
  }

  export type InterviewUpdateManyWithWhereWithoutRecruiterInput = {
    where: InterviewScalarWhereInput
    data: XOR<InterviewUpdateManyMutationInput, InterviewUncheckedUpdateManyWithoutRecruiterInput>
  }

  export type InterviewScalarWhereInput = {
    AND?: InterviewScalarWhereInput | InterviewScalarWhereInput[]
    OR?: InterviewScalarWhereInput[]
    NOT?: InterviewScalarWhereInput | InterviewScalarWhereInput[]
    id?: StringFilter<"Interview"> | string
    candidateId?: StringFilter<"Interview"> | string
    candidateName?: StringFilter<"Interview"> | string
    candidateEmail?: StringFilter<"Interview"> | string
    position?: StringFilter<"Interview"> | string
    status?: EnumInterviewStatusFilter<"Interview"> | $Enums.InterviewStatus
    scheduledAt?: DateTimeFilter<"Interview"> | Date | string
    startedAt?: DateTimeNullableFilter<"Interview"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"Interview"> | Date | string | null
    score?: FloatNullableFilter<"Interview"> | number | null
    decision?: EnumDecisionNullableFilter<"Interview"> | $Enums.Decision | null
    explainability?: JsonNullableFilter<"Interview">
    recordingUrl?: StringNullableFilter<"Interview"> | string | null
    transcriptUrl?: StringNullableFilter<"Interview"> | string | null
    proctoringData?: JsonNullableFilter<"Interview">
    recruiterId?: StringFilter<"Interview"> | string
    createdAt?: DateTimeFilter<"Interview"> | Date | string
    updatedAt?: DateTimeFilter<"Interview"> | Date | string
  }

  export type QuestionUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: QuestionWhereUniqueInput
    update: XOR<QuestionUpdateWithoutCreatedByInput, QuestionUncheckedUpdateWithoutCreatedByInput>
    create: XOR<QuestionCreateWithoutCreatedByInput, QuestionUncheckedCreateWithoutCreatedByInput>
  }

  export type QuestionUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: QuestionWhereUniqueInput
    data: XOR<QuestionUpdateWithoutCreatedByInput, QuestionUncheckedUpdateWithoutCreatedByInput>
  }

  export type QuestionUpdateManyWithWhereWithoutCreatedByInput = {
    where: QuestionScalarWhereInput
    data: XOR<QuestionUpdateManyMutationInput, QuestionUncheckedUpdateManyWithoutCreatedByInput>
  }

  export type QuestionScalarWhereInput = {
    AND?: QuestionScalarWhereInput | QuestionScalarWhereInput[]
    OR?: QuestionScalarWhereInput[]
    NOT?: QuestionScalarWhereInput | QuestionScalarWhereInput[]
    id?: StringFilter<"Question"> | string
    content?: StringFilter<"Question"> | string
    category?: StringFilter<"Question"> | string
    difficulty?: EnumDifficultyFilter<"Question"> | $Enums.Difficulty
    position?: StringFilter<"Question"> | string
    skillTags?: StringNullableListFilter<"Question">
    avgScore?: FloatFilter<"Question"> | number
    timesAsked?: IntFilter<"Question"> | number
    correlationScore?: FloatFilter<"Question"> | number
    lastUsed?: DateTimeNullableFilter<"Question"> | Date | string | null
    generatedBy?: StringNullableFilter<"Question"> | string | null
    generationPrompt?: StringNullableFilter<"Question"> | string | null
    createdById?: StringFilter<"Question"> | string
    createdAt?: DateTimeFilter<"Question"> | Date | string
    updatedAt?: DateTimeFilter<"Question"> | Date | string
  }

  export type ScoringModelUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: ScoringModelWhereUniqueInput
    update: XOR<ScoringModelUpdateWithoutCreatedByInput, ScoringModelUncheckedUpdateWithoutCreatedByInput>
    create: XOR<ScoringModelCreateWithoutCreatedByInput, ScoringModelUncheckedCreateWithoutCreatedByInput>
  }

  export type ScoringModelUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: ScoringModelWhereUniqueInput
    data: XOR<ScoringModelUpdateWithoutCreatedByInput, ScoringModelUncheckedUpdateWithoutCreatedByInput>
  }

  export type ScoringModelUpdateManyWithWhereWithoutCreatedByInput = {
    where: ScoringModelScalarWhereInput
    data: XOR<ScoringModelUpdateManyMutationInput, ScoringModelUncheckedUpdateManyWithoutCreatedByInput>
  }

  export type ScoringModelScalarWhereInput = {
    AND?: ScoringModelScalarWhereInput | ScoringModelScalarWhereInput[]
    OR?: ScoringModelScalarWhereInput[]
    NOT?: ScoringModelScalarWhereInput | ScoringModelScalarWhereInput[]
    id?: StringFilter<"ScoringModel"> | string
    position?: StringFilter<"ScoringModel"> | string
    version?: IntFilter<"ScoringModel"> | number
    weights?: JsonFilter<"ScoringModel">
    thresholds?: JsonFilter<"ScoringModel">
    accuracy?: FloatNullableFilter<"ScoringModel"> | number | null
    sampleSize?: IntFilter<"ScoringModel"> | number
    isActive?: BoolFilter<"ScoringModel"> | boolean
    createdById?: StringFilter<"ScoringModel"> | string
    createdAt?: DateTimeFilter<"ScoringModel"> | Date | string
    updatedAt?: DateTimeFilter<"ScoringModel"> | Date | string
  }

  export type UserCreateWithoutInterviewsInput = {
    id?: string
    email: string
    name?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    questions?: QuestionCreateNestedManyWithoutCreatedByInput
    scoringModels?: ScoringModelCreateNestedManyWithoutCreatedByInput
  }

  export type UserUncheckedCreateWithoutInterviewsInput = {
    id?: string
    email: string
    name?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    questions?: QuestionUncheckedCreateNestedManyWithoutCreatedByInput
    scoringModels?: ScoringModelUncheckedCreateNestedManyWithoutCreatedByInput
  }

  export type UserCreateOrConnectWithoutInterviewsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutInterviewsInput, UserUncheckedCreateWithoutInterviewsInput>
  }

  export type ResponseCreateWithoutInterviewInput = {
    id?: string
    audioUrl?: string | null
    transcript: string
    duration: number
    scores: JsonNullValueInput | InputJsonValue
    tags?: ResponseCreatetagsInput | string[]
    sentiment?: number | null
    confidence?: number | null
    createdAt?: Date | string
    question: QuestionCreateNestedOneWithoutResponsesInput
  }

  export type ResponseUncheckedCreateWithoutInterviewInput = {
    id?: string
    questionId: string
    audioUrl?: string | null
    transcript: string
    duration: number
    scores: JsonNullValueInput | InputJsonValue
    tags?: ResponseCreatetagsInput | string[]
    sentiment?: number | null
    confidence?: number | null
    createdAt?: Date | string
  }

  export type ResponseCreateOrConnectWithoutInterviewInput = {
    where: ResponseWhereUniqueInput
    create: XOR<ResponseCreateWithoutInterviewInput, ResponseUncheckedCreateWithoutInterviewInput>
  }

  export type ResponseCreateManyInterviewInputEnvelope = {
    data: ResponseCreateManyInterviewInput | ResponseCreateManyInterviewInput[]
    skipDuplicates?: boolean
  }

  export type FeedbackLoopCreateWithoutInterviewInput = {
    id?: string
    feedbackType: $Enums.FeedbackType
    signal: JsonNullValueInput | InputJsonValue
    actionTaken?: string | null
    outcome?: string | null
    createdAt?: Date | string
    question?: QuestionCreateNestedOneWithoutFeedbackLoopsInput
  }

  export type FeedbackLoopUncheckedCreateWithoutInterviewInput = {
    id?: string
    questionId?: string | null
    feedbackType: $Enums.FeedbackType
    signal: JsonNullValueInput | InputJsonValue
    actionTaken?: string | null
    outcome?: string | null
    createdAt?: Date | string
  }

  export type FeedbackLoopCreateOrConnectWithoutInterviewInput = {
    where: FeedbackLoopWhereUniqueInput
    create: XOR<FeedbackLoopCreateWithoutInterviewInput, FeedbackLoopUncheckedCreateWithoutInterviewInput>
  }

  export type FeedbackLoopCreateManyInterviewInputEnvelope = {
    data: FeedbackLoopCreateManyInterviewInput | FeedbackLoopCreateManyInterviewInput[]
    skipDuplicates?: boolean
  }

  export type AgentLogCreateWithoutInterviewInput = {
    id?: string
    agentType: $Enums.AgentType
    action: string
    input: JsonNullValueInput | InputJsonValue
    output: JsonNullValueInput | InputJsonValue
    reflexionLoop?: number
    performanceScore?: number | null
    createdAt?: Date | string
  }

  export type AgentLogUncheckedCreateWithoutInterviewInput = {
    id?: string
    agentType: $Enums.AgentType
    action: string
    input: JsonNullValueInput | InputJsonValue
    output: JsonNullValueInput | InputJsonValue
    reflexionLoop?: number
    performanceScore?: number | null
    createdAt?: Date | string
  }

  export type AgentLogCreateOrConnectWithoutInterviewInput = {
    where: AgentLogWhereUniqueInput
    create: XOR<AgentLogCreateWithoutInterviewInput, AgentLogUncheckedCreateWithoutInterviewInput>
  }

  export type AgentLogCreateManyInterviewInputEnvelope = {
    data: AgentLogCreateManyInterviewInput | AgentLogCreateManyInterviewInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutInterviewsInput = {
    update: XOR<UserUpdateWithoutInterviewsInput, UserUncheckedUpdateWithoutInterviewsInput>
    create: XOR<UserCreateWithoutInterviewsInput, UserUncheckedCreateWithoutInterviewsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutInterviewsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutInterviewsInput, UserUncheckedUpdateWithoutInterviewsInput>
  }

  export type UserUpdateWithoutInterviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    questions?: QuestionUpdateManyWithoutCreatedByNestedInput
    scoringModels?: ScoringModelUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutInterviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    questions?: QuestionUncheckedUpdateManyWithoutCreatedByNestedInput
    scoringModels?: ScoringModelUncheckedUpdateManyWithoutCreatedByNestedInput
  }

  export type ResponseUpsertWithWhereUniqueWithoutInterviewInput = {
    where: ResponseWhereUniqueInput
    update: XOR<ResponseUpdateWithoutInterviewInput, ResponseUncheckedUpdateWithoutInterviewInput>
    create: XOR<ResponseCreateWithoutInterviewInput, ResponseUncheckedCreateWithoutInterviewInput>
  }

  export type ResponseUpdateWithWhereUniqueWithoutInterviewInput = {
    where: ResponseWhereUniqueInput
    data: XOR<ResponseUpdateWithoutInterviewInput, ResponseUncheckedUpdateWithoutInterviewInput>
  }

  export type ResponseUpdateManyWithWhereWithoutInterviewInput = {
    where: ResponseScalarWhereInput
    data: XOR<ResponseUpdateManyMutationInput, ResponseUncheckedUpdateManyWithoutInterviewInput>
  }

  export type ResponseScalarWhereInput = {
    AND?: ResponseScalarWhereInput | ResponseScalarWhereInput[]
    OR?: ResponseScalarWhereInput[]
    NOT?: ResponseScalarWhereInput | ResponseScalarWhereInput[]
    id?: StringFilter<"Response"> | string
    interviewId?: StringFilter<"Response"> | string
    questionId?: StringFilter<"Response"> | string
    audioUrl?: StringNullableFilter<"Response"> | string | null
    transcript?: StringFilter<"Response"> | string
    duration?: IntFilter<"Response"> | number
    scores?: JsonFilter<"Response">
    tags?: StringNullableListFilter<"Response">
    sentiment?: FloatNullableFilter<"Response"> | number | null
    confidence?: FloatNullableFilter<"Response"> | number | null
    createdAt?: DateTimeFilter<"Response"> | Date | string
  }

  export type FeedbackLoopUpsertWithWhereUniqueWithoutInterviewInput = {
    where: FeedbackLoopWhereUniqueInput
    update: XOR<FeedbackLoopUpdateWithoutInterviewInput, FeedbackLoopUncheckedUpdateWithoutInterviewInput>
    create: XOR<FeedbackLoopCreateWithoutInterviewInput, FeedbackLoopUncheckedCreateWithoutInterviewInput>
  }

  export type FeedbackLoopUpdateWithWhereUniqueWithoutInterviewInput = {
    where: FeedbackLoopWhereUniqueInput
    data: XOR<FeedbackLoopUpdateWithoutInterviewInput, FeedbackLoopUncheckedUpdateWithoutInterviewInput>
  }

  export type FeedbackLoopUpdateManyWithWhereWithoutInterviewInput = {
    where: FeedbackLoopScalarWhereInput
    data: XOR<FeedbackLoopUpdateManyMutationInput, FeedbackLoopUncheckedUpdateManyWithoutInterviewInput>
  }

  export type FeedbackLoopScalarWhereInput = {
    AND?: FeedbackLoopScalarWhereInput | FeedbackLoopScalarWhereInput[]
    OR?: FeedbackLoopScalarWhereInput[]
    NOT?: FeedbackLoopScalarWhereInput | FeedbackLoopScalarWhereInput[]
    id?: StringFilter<"FeedbackLoop"> | string
    interviewId?: StringFilter<"FeedbackLoop"> | string
    questionId?: StringNullableFilter<"FeedbackLoop"> | string | null
    feedbackType?: EnumFeedbackTypeFilter<"FeedbackLoop"> | $Enums.FeedbackType
    signal?: JsonFilter<"FeedbackLoop">
    actionTaken?: StringNullableFilter<"FeedbackLoop"> | string | null
    outcome?: StringNullableFilter<"FeedbackLoop"> | string | null
    createdAt?: DateTimeFilter<"FeedbackLoop"> | Date | string
  }

  export type AgentLogUpsertWithWhereUniqueWithoutInterviewInput = {
    where: AgentLogWhereUniqueInput
    update: XOR<AgentLogUpdateWithoutInterviewInput, AgentLogUncheckedUpdateWithoutInterviewInput>
    create: XOR<AgentLogCreateWithoutInterviewInput, AgentLogUncheckedCreateWithoutInterviewInput>
  }

  export type AgentLogUpdateWithWhereUniqueWithoutInterviewInput = {
    where: AgentLogWhereUniqueInput
    data: XOR<AgentLogUpdateWithoutInterviewInput, AgentLogUncheckedUpdateWithoutInterviewInput>
  }

  export type AgentLogUpdateManyWithWhereWithoutInterviewInput = {
    where: AgentLogScalarWhereInput
    data: XOR<AgentLogUpdateManyMutationInput, AgentLogUncheckedUpdateManyWithoutInterviewInput>
  }

  export type AgentLogScalarWhereInput = {
    AND?: AgentLogScalarWhereInput | AgentLogScalarWhereInput[]
    OR?: AgentLogScalarWhereInput[]
    NOT?: AgentLogScalarWhereInput | AgentLogScalarWhereInput[]
    id?: StringFilter<"AgentLog"> | string
    interviewId?: StringNullableFilter<"AgentLog"> | string | null
    agentType?: EnumAgentTypeFilter<"AgentLog"> | $Enums.AgentType
    action?: StringFilter<"AgentLog"> | string
    input?: JsonFilter<"AgentLog">
    output?: JsonFilter<"AgentLog">
    reflexionLoop?: IntFilter<"AgentLog"> | number
    performanceScore?: FloatNullableFilter<"AgentLog"> | number | null
    createdAt?: DateTimeFilter<"AgentLog"> | Date | string
  }

  export type UserCreateWithoutQuestionsInput = {
    id?: string
    email: string
    name?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    interviews?: InterviewCreateNestedManyWithoutRecruiterInput
    scoringModels?: ScoringModelCreateNestedManyWithoutCreatedByInput
  }

  export type UserUncheckedCreateWithoutQuestionsInput = {
    id?: string
    email: string
    name?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    interviews?: InterviewUncheckedCreateNestedManyWithoutRecruiterInput
    scoringModels?: ScoringModelUncheckedCreateNestedManyWithoutCreatedByInput
  }

  export type UserCreateOrConnectWithoutQuestionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutQuestionsInput, UserUncheckedCreateWithoutQuestionsInput>
  }

  export type ResponseCreateWithoutQuestionInput = {
    id?: string
    audioUrl?: string | null
    transcript: string
    duration: number
    scores: JsonNullValueInput | InputJsonValue
    tags?: ResponseCreatetagsInput | string[]
    sentiment?: number | null
    confidence?: number | null
    createdAt?: Date | string
    interview: InterviewCreateNestedOneWithoutResponsesInput
  }

  export type ResponseUncheckedCreateWithoutQuestionInput = {
    id?: string
    interviewId: string
    audioUrl?: string | null
    transcript: string
    duration: number
    scores: JsonNullValueInput | InputJsonValue
    tags?: ResponseCreatetagsInput | string[]
    sentiment?: number | null
    confidence?: number | null
    createdAt?: Date | string
  }

  export type ResponseCreateOrConnectWithoutQuestionInput = {
    where: ResponseWhereUniqueInput
    create: XOR<ResponseCreateWithoutQuestionInput, ResponseUncheckedCreateWithoutQuestionInput>
  }

  export type ResponseCreateManyQuestionInputEnvelope = {
    data: ResponseCreateManyQuestionInput | ResponseCreateManyQuestionInput[]
    skipDuplicates?: boolean
  }

  export type FeedbackLoopCreateWithoutQuestionInput = {
    id?: string
    feedbackType: $Enums.FeedbackType
    signal: JsonNullValueInput | InputJsonValue
    actionTaken?: string | null
    outcome?: string | null
    createdAt?: Date | string
    interview: InterviewCreateNestedOneWithoutFeedbackLoopsInput
  }

  export type FeedbackLoopUncheckedCreateWithoutQuestionInput = {
    id?: string
    interviewId: string
    feedbackType: $Enums.FeedbackType
    signal: JsonNullValueInput | InputJsonValue
    actionTaken?: string | null
    outcome?: string | null
    createdAt?: Date | string
  }

  export type FeedbackLoopCreateOrConnectWithoutQuestionInput = {
    where: FeedbackLoopWhereUniqueInput
    create: XOR<FeedbackLoopCreateWithoutQuestionInput, FeedbackLoopUncheckedCreateWithoutQuestionInput>
  }

  export type FeedbackLoopCreateManyQuestionInputEnvelope = {
    data: FeedbackLoopCreateManyQuestionInput | FeedbackLoopCreateManyQuestionInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutQuestionsInput = {
    update: XOR<UserUpdateWithoutQuestionsInput, UserUncheckedUpdateWithoutQuestionsInput>
    create: XOR<UserCreateWithoutQuestionsInput, UserUncheckedCreateWithoutQuestionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutQuestionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutQuestionsInput, UserUncheckedUpdateWithoutQuestionsInput>
  }

  export type UserUpdateWithoutQuestionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    interviews?: InterviewUpdateManyWithoutRecruiterNestedInput
    scoringModels?: ScoringModelUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutQuestionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    interviews?: InterviewUncheckedUpdateManyWithoutRecruiterNestedInput
    scoringModels?: ScoringModelUncheckedUpdateManyWithoutCreatedByNestedInput
  }

  export type ResponseUpsertWithWhereUniqueWithoutQuestionInput = {
    where: ResponseWhereUniqueInput
    update: XOR<ResponseUpdateWithoutQuestionInput, ResponseUncheckedUpdateWithoutQuestionInput>
    create: XOR<ResponseCreateWithoutQuestionInput, ResponseUncheckedCreateWithoutQuestionInput>
  }

  export type ResponseUpdateWithWhereUniqueWithoutQuestionInput = {
    where: ResponseWhereUniqueInput
    data: XOR<ResponseUpdateWithoutQuestionInput, ResponseUncheckedUpdateWithoutQuestionInput>
  }

  export type ResponseUpdateManyWithWhereWithoutQuestionInput = {
    where: ResponseScalarWhereInput
    data: XOR<ResponseUpdateManyMutationInput, ResponseUncheckedUpdateManyWithoutQuestionInput>
  }

  export type FeedbackLoopUpsertWithWhereUniqueWithoutQuestionInput = {
    where: FeedbackLoopWhereUniqueInput
    update: XOR<FeedbackLoopUpdateWithoutQuestionInput, FeedbackLoopUncheckedUpdateWithoutQuestionInput>
    create: XOR<FeedbackLoopCreateWithoutQuestionInput, FeedbackLoopUncheckedCreateWithoutQuestionInput>
  }

  export type FeedbackLoopUpdateWithWhereUniqueWithoutQuestionInput = {
    where: FeedbackLoopWhereUniqueInput
    data: XOR<FeedbackLoopUpdateWithoutQuestionInput, FeedbackLoopUncheckedUpdateWithoutQuestionInput>
  }

  export type FeedbackLoopUpdateManyWithWhereWithoutQuestionInput = {
    where: FeedbackLoopScalarWhereInput
    data: XOR<FeedbackLoopUpdateManyMutationInput, FeedbackLoopUncheckedUpdateManyWithoutQuestionInput>
  }

  export type InterviewCreateWithoutResponsesInput = {
    id?: string
    candidateId: string
    candidateName: string
    candidateEmail: string
    position: string
    status?: $Enums.InterviewStatus
    scheduledAt: Date | string
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    score?: number | null
    decision?: $Enums.Decision | null
    explainability?: NullableJsonNullValueInput | InputJsonValue
    recordingUrl?: string | null
    transcriptUrl?: string | null
    proctoringData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    recruiter: UserCreateNestedOneWithoutInterviewsInput
    feedbackLoops?: FeedbackLoopCreateNestedManyWithoutInterviewInput
    agentLogs?: AgentLogCreateNestedManyWithoutInterviewInput
  }

  export type InterviewUncheckedCreateWithoutResponsesInput = {
    id?: string
    candidateId: string
    candidateName: string
    candidateEmail: string
    position: string
    status?: $Enums.InterviewStatus
    scheduledAt: Date | string
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    score?: number | null
    decision?: $Enums.Decision | null
    explainability?: NullableJsonNullValueInput | InputJsonValue
    recordingUrl?: string | null
    transcriptUrl?: string | null
    proctoringData?: NullableJsonNullValueInput | InputJsonValue
    recruiterId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    feedbackLoops?: FeedbackLoopUncheckedCreateNestedManyWithoutInterviewInput
    agentLogs?: AgentLogUncheckedCreateNestedManyWithoutInterviewInput
  }

  export type InterviewCreateOrConnectWithoutResponsesInput = {
    where: InterviewWhereUniqueInput
    create: XOR<InterviewCreateWithoutResponsesInput, InterviewUncheckedCreateWithoutResponsesInput>
  }

  export type QuestionCreateWithoutResponsesInput = {
    id?: string
    content: string
    category: string
    difficulty: $Enums.Difficulty
    position: string
    skillTags?: QuestionCreateskillTagsInput | string[]
    avgScore?: number
    timesAsked?: number
    correlationScore?: number
    lastUsed?: Date | string | null
    generatedBy?: string | null
    generationPrompt?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: UserCreateNestedOneWithoutQuestionsInput
    feedbackLoops?: FeedbackLoopCreateNestedManyWithoutQuestionInput
  }

  export type QuestionUncheckedCreateWithoutResponsesInput = {
    id?: string
    content: string
    category: string
    difficulty: $Enums.Difficulty
    position: string
    skillTags?: QuestionCreateskillTagsInput | string[]
    avgScore?: number
    timesAsked?: number
    correlationScore?: number
    lastUsed?: Date | string | null
    generatedBy?: string | null
    generationPrompt?: string | null
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
    feedbackLoops?: FeedbackLoopUncheckedCreateNestedManyWithoutQuestionInput
  }

  export type QuestionCreateOrConnectWithoutResponsesInput = {
    where: QuestionWhereUniqueInput
    create: XOR<QuestionCreateWithoutResponsesInput, QuestionUncheckedCreateWithoutResponsesInput>
  }

  export type InterviewUpsertWithoutResponsesInput = {
    update: XOR<InterviewUpdateWithoutResponsesInput, InterviewUncheckedUpdateWithoutResponsesInput>
    create: XOR<InterviewCreateWithoutResponsesInput, InterviewUncheckedCreateWithoutResponsesInput>
    where?: InterviewWhereInput
  }

  export type InterviewUpdateToOneWithWhereWithoutResponsesInput = {
    where?: InterviewWhereInput
    data: XOR<InterviewUpdateWithoutResponsesInput, InterviewUncheckedUpdateWithoutResponsesInput>
  }

  export type InterviewUpdateWithoutResponsesInput = {
    id?: StringFieldUpdateOperationsInput | string
    candidateId?: StringFieldUpdateOperationsInput | string
    candidateName?: StringFieldUpdateOperationsInput | string
    candidateEmail?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    status?: EnumInterviewStatusFieldUpdateOperationsInput | $Enums.InterviewStatus
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    decision?: NullableEnumDecisionFieldUpdateOperationsInput | $Enums.Decision | null
    explainability?: NullableJsonNullValueInput | InputJsonValue
    recordingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    transcriptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    proctoringData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recruiter?: UserUpdateOneRequiredWithoutInterviewsNestedInput
    feedbackLoops?: FeedbackLoopUpdateManyWithoutInterviewNestedInput
    agentLogs?: AgentLogUpdateManyWithoutInterviewNestedInput
  }

  export type InterviewUncheckedUpdateWithoutResponsesInput = {
    id?: StringFieldUpdateOperationsInput | string
    candidateId?: StringFieldUpdateOperationsInput | string
    candidateName?: StringFieldUpdateOperationsInput | string
    candidateEmail?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    status?: EnumInterviewStatusFieldUpdateOperationsInput | $Enums.InterviewStatus
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    decision?: NullableEnumDecisionFieldUpdateOperationsInput | $Enums.Decision | null
    explainability?: NullableJsonNullValueInput | InputJsonValue
    recordingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    transcriptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    proctoringData?: NullableJsonNullValueInput | InputJsonValue
    recruiterId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    feedbackLoops?: FeedbackLoopUncheckedUpdateManyWithoutInterviewNestedInput
    agentLogs?: AgentLogUncheckedUpdateManyWithoutInterviewNestedInput
  }

  export type QuestionUpsertWithoutResponsesInput = {
    update: XOR<QuestionUpdateWithoutResponsesInput, QuestionUncheckedUpdateWithoutResponsesInput>
    create: XOR<QuestionCreateWithoutResponsesInput, QuestionUncheckedCreateWithoutResponsesInput>
    where?: QuestionWhereInput
  }

  export type QuestionUpdateToOneWithWhereWithoutResponsesInput = {
    where?: QuestionWhereInput
    data: XOR<QuestionUpdateWithoutResponsesInput, QuestionUncheckedUpdateWithoutResponsesInput>
  }

  export type QuestionUpdateWithoutResponsesInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    difficulty?: EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty
    position?: StringFieldUpdateOperationsInput | string
    skillTags?: QuestionUpdateskillTagsInput | string[]
    avgScore?: FloatFieldUpdateOperationsInput | number
    timesAsked?: IntFieldUpdateOperationsInput | number
    correlationScore?: FloatFieldUpdateOperationsInput | number
    lastUsed?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    generatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    generationPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutQuestionsNestedInput
    feedbackLoops?: FeedbackLoopUpdateManyWithoutQuestionNestedInput
  }

  export type QuestionUncheckedUpdateWithoutResponsesInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    difficulty?: EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty
    position?: StringFieldUpdateOperationsInput | string
    skillTags?: QuestionUpdateskillTagsInput | string[]
    avgScore?: FloatFieldUpdateOperationsInput | number
    timesAsked?: IntFieldUpdateOperationsInput | number
    correlationScore?: FloatFieldUpdateOperationsInput | number
    lastUsed?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    generatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    generationPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    feedbackLoops?: FeedbackLoopUncheckedUpdateManyWithoutQuestionNestedInput
  }

  export type InterviewCreateWithoutFeedbackLoopsInput = {
    id?: string
    candidateId: string
    candidateName: string
    candidateEmail: string
    position: string
    status?: $Enums.InterviewStatus
    scheduledAt: Date | string
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    score?: number | null
    decision?: $Enums.Decision | null
    explainability?: NullableJsonNullValueInput | InputJsonValue
    recordingUrl?: string | null
    transcriptUrl?: string | null
    proctoringData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    recruiter: UserCreateNestedOneWithoutInterviewsInput
    responses?: ResponseCreateNestedManyWithoutInterviewInput
    agentLogs?: AgentLogCreateNestedManyWithoutInterviewInput
  }

  export type InterviewUncheckedCreateWithoutFeedbackLoopsInput = {
    id?: string
    candidateId: string
    candidateName: string
    candidateEmail: string
    position: string
    status?: $Enums.InterviewStatus
    scheduledAt: Date | string
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    score?: number | null
    decision?: $Enums.Decision | null
    explainability?: NullableJsonNullValueInput | InputJsonValue
    recordingUrl?: string | null
    transcriptUrl?: string | null
    proctoringData?: NullableJsonNullValueInput | InputJsonValue
    recruiterId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    responses?: ResponseUncheckedCreateNestedManyWithoutInterviewInput
    agentLogs?: AgentLogUncheckedCreateNestedManyWithoutInterviewInput
  }

  export type InterviewCreateOrConnectWithoutFeedbackLoopsInput = {
    where: InterviewWhereUniqueInput
    create: XOR<InterviewCreateWithoutFeedbackLoopsInput, InterviewUncheckedCreateWithoutFeedbackLoopsInput>
  }

  export type QuestionCreateWithoutFeedbackLoopsInput = {
    id?: string
    content: string
    category: string
    difficulty: $Enums.Difficulty
    position: string
    skillTags?: QuestionCreateskillTagsInput | string[]
    avgScore?: number
    timesAsked?: number
    correlationScore?: number
    lastUsed?: Date | string | null
    generatedBy?: string | null
    generationPrompt?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: UserCreateNestedOneWithoutQuestionsInput
    responses?: ResponseCreateNestedManyWithoutQuestionInput
  }

  export type QuestionUncheckedCreateWithoutFeedbackLoopsInput = {
    id?: string
    content: string
    category: string
    difficulty: $Enums.Difficulty
    position: string
    skillTags?: QuestionCreateskillTagsInput | string[]
    avgScore?: number
    timesAsked?: number
    correlationScore?: number
    lastUsed?: Date | string | null
    generatedBy?: string | null
    generationPrompt?: string | null
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
    responses?: ResponseUncheckedCreateNestedManyWithoutQuestionInput
  }

  export type QuestionCreateOrConnectWithoutFeedbackLoopsInput = {
    where: QuestionWhereUniqueInput
    create: XOR<QuestionCreateWithoutFeedbackLoopsInput, QuestionUncheckedCreateWithoutFeedbackLoopsInput>
  }

  export type InterviewUpsertWithoutFeedbackLoopsInput = {
    update: XOR<InterviewUpdateWithoutFeedbackLoopsInput, InterviewUncheckedUpdateWithoutFeedbackLoopsInput>
    create: XOR<InterviewCreateWithoutFeedbackLoopsInput, InterviewUncheckedCreateWithoutFeedbackLoopsInput>
    where?: InterviewWhereInput
  }

  export type InterviewUpdateToOneWithWhereWithoutFeedbackLoopsInput = {
    where?: InterviewWhereInput
    data: XOR<InterviewUpdateWithoutFeedbackLoopsInput, InterviewUncheckedUpdateWithoutFeedbackLoopsInput>
  }

  export type InterviewUpdateWithoutFeedbackLoopsInput = {
    id?: StringFieldUpdateOperationsInput | string
    candidateId?: StringFieldUpdateOperationsInput | string
    candidateName?: StringFieldUpdateOperationsInput | string
    candidateEmail?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    status?: EnumInterviewStatusFieldUpdateOperationsInput | $Enums.InterviewStatus
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    decision?: NullableEnumDecisionFieldUpdateOperationsInput | $Enums.Decision | null
    explainability?: NullableJsonNullValueInput | InputJsonValue
    recordingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    transcriptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    proctoringData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recruiter?: UserUpdateOneRequiredWithoutInterviewsNestedInput
    responses?: ResponseUpdateManyWithoutInterviewNestedInput
    agentLogs?: AgentLogUpdateManyWithoutInterviewNestedInput
  }

  export type InterviewUncheckedUpdateWithoutFeedbackLoopsInput = {
    id?: StringFieldUpdateOperationsInput | string
    candidateId?: StringFieldUpdateOperationsInput | string
    candidateName?: StringFieldUpdateOperationsInput | string
    candidateEmail?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    status?: EnumInterviewStatusFieldUpdateOperationsInput | $Enums.InterviewStatus
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    decision?: NullableEnumDecisionFieldUpdateOperationsInput | $Enums.Decision | null
    explainability?: NullableJsonNullValueInput | InputJsonValue
    recordingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    transcriptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    proctoringData?: NullableJsonNullValueInput | InputJsonValue
    recruiterId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    responses?: ResponseUncheckedUpdateManyWithoutInterviewNestedInput
    agentLogs?: AgentLogUncheckedUpdateManyWithoutInterviewNestedInput
  }

  export type QuestionUpsertWithoutFeedbackLoopsInput = {
    update: XOR<QuestionUpdateWithoutFeedbackLoopsInput, QuestionUncheckedUpdateWithoutFeedbackLoopsInput>
    create: XOR<QuestionCreateWithoutFeedbackLoopsInput, QuestionUncheckedCreateWithoutFeedbackLoopsInput>
    where?: QuestionWhereInput
  }

  export type QuestionUpdateToOneWithWhereWithoutFeedbackLoopsInput = {
    where?: QuestionWhereInput
    data: XOR<QuestionUpdateWithoutFeedbackLoopsInput, QuestionUncheckedUpdateWithoutFeedbackLoopsInput>
  }

  export type QuestionUpdateWithoutFeedbackLoopsInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    difficulty?: EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty
    position?: StringFieldUpdateOperationsInput | string
    skillTags?: QuestionUpdateskillTagsInput | string[]
    avgScore?: FloatFieldUpdateOperationsInput | number
    timesAsked?: IntFieldUpdateOperationsInput | number
    correlationScore?: FloatFieldUpdateOperationsInput | number
    lastUsed?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    generatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    generationPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutQuestionsNestedInput
    responses?: ResponseUpdateManyWithoutQuestionNestedInput
  }

  export type QuestionUncheckedUpdateWithoutFeedbackLoopsInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    difficulty?: EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty
    position?: StringFieldUpdateOperationsInput | string
    skillTags?: QuestionUpdateskillTagsInput | string[]
    avgScore?: FloatFieldUpdateOperationsInput | number
    timesAsked?: IntFieldUpdateOperationsInput | number
    correlationScore?: FloatFieldUpdateOperationsInput | number
    lastUsed?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    generatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    generationPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    responses?: ResponseUncheckedUpdateManyWithoutQuestionNestedInput
  }

  export type InterviewCreateWithoutAgentLogsInput = {
    id?: string
    candidateId: string
    candidateName: string
    candidateEmail: string
    position: string
    status?: $Enums.InterviewStatus
    scheduledAt: Date | string
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    score?: number | null
    decision?: $Enums.Decision | null
    explainability?: NullableJsonNullValueInput | InputJsonValue
    recordingUrl?: string | null
    transcriptUrl?: string | null
    proctoringData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    recruiter: UserCreateNestedOneWithoutInterviewsInput
    responses?: ResponseCreateNestedManyWithoutInterviewInput
    feedbackLoops?: FeedbackLoopCreateNestedManyWithoutInterviewInput
  }

  export type InterviewUncheckedCreateWithoutAgentLogsInput = {
    id?: string
    candidateId: string
    candidateName: string
    candidateEmail: string
    position: string
    status?: $Enums.InterviewStatus
    scheduledAt: Date | string
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    score?: number | null
    decision?: $Enums.Decision | null
    explainability?: NullableJsonNullValueInput | InputJsonValue
    recordingUrl?: string | null
    transcriptUrl?: string | null
    proctoringData?: NullableJsonNullValueInput | InputJsonValue
    recruiterId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    responses?: ResponseUncheckedCreateNestedManyWithoutInterviewInput
    feedbackLoops?: FeedbackLoopUncheckedCreateNestedManyWithoutInterviewInput
  }

  export type InterviewCreateOrConnectWithoutAgentLogsInput = {
    where: InterviewWhereUniqueInput
    create: XOR<InterviewCreateWithoutAgentLogsInput, InterviewUncheckedCreateWithoutAgentLogsInput>
  }

  export type InterviewUpsertWithoutAgentLogsInput = {
    update: XOR<InterviewUpdateWithoutAgentLogsInput, InterviewUncheckedUpdateWithoutAgentLogsInput>
    create: XOR<InterviewCreateWithoutAgentLogsInput, InterviewUncheckedCreateWithoutAgentLogsInput>
    where?: InterviewWhereInput
  }

  export type InterviewUpdateToOneWithWhereWithoutAgentLogsInput = {
    where?: InterviewWhereInput
    data: XOR<InterviewUpdateWithoutAgentLogsInput, InterviewUncheckedUpdateWithoutAgentLogsInput>
  }

  export type InterviewUpdateWithoutAgentLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    candidateId?: StringFieldUpdateOperationsInput | string
    candidateName?: StringFieldUpdateOperationsInput | string
    candidateEmail?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    status?: EnumInterviewStatusFieldUpdateOperationsInput | $Enums.InterviewStatus
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    decision?: NullableEnumDecisionFieldUpdateOperationsInput | $Enums.Decision | null
    explainability?: NullableJsonNullValueInput | InputJsonValue
    recordingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    transcriptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    proctoringData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recruiter?: UserUpdateOneRequiredWithoutInterviewsNestedInput
    responses?: ResponseUpdateManyWithoutInterviewNestedInput
    feedbackLoops?: FeedbackLoopUpdateManyWithoutInterviewNestedInput
  }

  export type InterviewUncheckedUpdateWithoutAgentLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    candidateId?: StringFieldUpdateOperationsInput | string
    candidateName?: StringFieldUpdateOperationsInput | string
    candidateEmail?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    status?: EnumInterviewStatusFieldUpdateOperationsInput | $Enums.InterviewStatus
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    decision?: NullableEnumDecisionFieldUpdateOperationsInput | $Enums.Decision | null
    explainability?: NullableJsonNullValueInput | InputJsonValue
    recordingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    transcriptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    proctoringData?: NullableJsonNullValueInput | InputJsonValue
    recruiterId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    responses?: ResponseUncheckedUpdateManyWithoutInterviewNestedInput
    feedbackLoops?: FeedbackLoopUncheckedUpdateManyWithoutInterviewNestedInput
  }

  export type UserCreateWithoutScoringModelsInput = {
    id?: string
    email: string
    name?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    interviews?: InterviewCreateNestedManyWithoutRecruiterInput
    questions?: QuestionCreateNestedManyWithoutCreatedByInput
  }

  export type UserUncheckedCreateWithoutScoringModelsInput = {
    id?: string
    email: string
    name?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    interviews?: InterviewUncheckedCreateNestedManyWithoutRecruiterInput
    questions?: QuestionUncheckedCreateNestedManyWithoutCreatedByInput
  }

  export type UserCreateOrConnectWithoutScoringModelsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutScoringModelsInput, UserUncheckedCreateWithoutScoringModelsInput>
  }

  export type UserUpsertWithoutScoringModelsInput = {
    update: XOR<UserUpdateWithoutScoringModelsInput, UserUncheckedUpdateWithoutScoringModelsInput>
    create: XOR<UserCreateWithoutScoringModelsInput, UserUncheckedCreateWithoutScoringModelsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutScoringModelsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutScoringModelsInput, UserUncheckedUpdateWithoutScoringModelsInput>
  }

  export type UserUpdateWithoutScoringModelsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    interviews?: InterviewUpdateManyWithoutRecruiterNestedInput
    questions?: QuestionUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutScoringModelsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    interviews?: InterviewUncheckedUpdateManyWithoutRecruiterNestedInput
    questions?: QuestionUncheckedUpdateManyWithoutCreatedByNestedInput
  }

  export type InterviewCreateManyRecruiterInput = {
    id?: string
    candidateId: string
    candidateName: string
    candidateEmail: string
    position: string
    status?: $Enums.InterviewStatus
    scheduledAt: Date | string
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    score?: number | null
    decision?: $Enums.Decision | null
    explainability?: NullableJsonNullValueInput | InputJsonValue
    recordingUrl?: string | null
    transcriptUrl?: string | null
    proctoringData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type QuestionCreateManyCreatedByInput = {
    id?: string
    content: string
    category: string
    difficulty: $Enums.Difficulty
    position: string
    skillTags?: QuestionCreateskillTagsInput | string[]
    avgScore?: number
    timesAsked?: number
    correlationScore?: number
    lastUsed?: Date | string | null
    generatedBy?: string | null
    generationPrompt?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ScoringModelCreateManyCreatedByInput = {
    id?: string
    position: string
    version?: number
    weights: JsonNullValueInput | InputJsonValue
    thresholds: JsonNullValueInput | InputJsonValue
    accuracy?: number | null
    sampleSize?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InterviewUpdateWithoutRecruiterInput = {
    id?: StringFieldUpdateOperationsInput | string
    candidateId?: StringFieldUpdateOperationsInput | string
    candidateName?: StringFieldUpdateOperationsInput | string
    candidateEmail?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    status?: EnumInterviewStatusFieldUpdateOperationsInput | $Enums.InterviewStatus
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    decision?: NullableEnumDecisionFieldUpdateOperationsInput | $Enums.Decision | null
    explainability?: NullableJsonNullValueInput | InputJsonValue
    recordingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    transcriptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    proctoringData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    responses?: ResponseUpdateManyWithoutInterviewNestedInput
    feedbackLoops?: FeedbackLoopUpdateManyWithoutInterviewNestedInput
    agentLogs?: AgentLogUpdateManyWithoutInterviewNestedInput
  }

  export type InterviewUncheckedUpdateWithoutRecruiterInput = {
    id?: StringFieldUpdateOperationsInput | string
    candidateId?: StringFieldUpdateOperationsInput | string
    candidateName?: StringFieldUpdateOperationsInput | string
    candidateEmail?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    status?: EnumInterviewStatusFieldUpdateOperationsInput | $Enums.InterviewStatus
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    decision?: NullableEnumDecisionFieldUpdateOperationsInput | $Enums.Decision | null
    explainability?: NullableJsonNullValueInput | InputJsonValue
    recordingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    transcriptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    proctoringData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    responses?: ResponseUncheckedUpdateManyWithoutInterviewNestedInput
    feedbackLoops?: FeedbackLoopUncheckedUpdateManyWithoutInterviewNestedInput
    agentLogs?: AgentLogUncheckedUpdateManyWithoutInterviewNestedInput
  }

  export type InterviewUncheckedUpdateManyWithoutRecruiterInput = {
    id?: StringFieldUpdateOperationsInput | string
    candidateId?: StringFieldUpdateOperationsInput | string
    candidateName?: StringFieldUpdateOperationsInput | string
    candidateEmail?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    status?: EnumInterviewStatusFieldUpdateOperationsInput | $Enums.InterviewStatus
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    decision?: NullableEnumDecisionFieldUpdateOperationsInput | $Enums.Decision | null
    explainability?: NullableJsonNullValueInput | InputJsonValue
    recordingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    transcriptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    proctoringData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuestionUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    difficulty?: EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty
    position?: StringFieldUpdateOperationsInput | string
    skillTags?: QuestionUpdateskillTagsInput | string[]
    avgScore?: FloatFieldUpdateOperationsInput | number
    timesAsked?: IntFieldUpdateOperationsInput | number
    correlationScore?: FloatFieldUpdateOperationsInput | number
    lastUsed?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    generatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    generationPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    responses?: ResponseUpdateManyWithoutQuestionNestedInput
    feedbackLoops?: FeedbackLoopUpdateManyWithoutQuestionNestedInput
  }

  export type QuestionUncheckedUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    difficulty?: EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty
    position?: StringFieldUpdateOperationsInput | string
    skillTags?: QuestionUpdateskillTagsInput | string[]
    avgScore?: FloatFieldUpdateOperationsInput | number
    timesAsked?: IntFieldUpdateOperationsInput | number
    correlationScore?: FloatFieldUpdateOperationsInput | number
    lastUsed?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    generatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    generationPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    responses?: ResponseUncheckedUpdateManyWithoutQuestionNestedInput
    feedbackLoops?: FeedbackLoopUncheckedUpdateManyWithoutQuestionNestedInput
  }

  export type QuestionUncheckedUpdateManyWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    difficulty?: EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty
    position?: StringFieldUpdateOperationsInput | string
    skillTags?: QuestionUpdateskillTagsInput | string[]
    avgScore?: FloatFieldUpdateOperationsInput | number
    timesAsked?: IntFieldUpdateOperationsInput | number
    correlationScore?: FloatFieldUpdateOperationsInput | number
    lastUsed?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    generatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    generationPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScoringModelUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    weights?: JsonNullValueInput | InputJsonValue
    thresholds?: JsonNullValueInput | InputJsonValue
    accuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    sampleSize?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScoringModelUncheckedUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    weights?: JsonNullValueInput | InputJsonValue
    thresholds?: JsonNullValueInput | InputJsonValue
    accuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    sampleSize?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScoringModelUncheckedUpdateManyWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    weights?: JsonNullValueInput | InputJsonValue
    thresholds?: JsonNullValueInput | InputJsonValue
    accuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    sampleSize?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResponseCreateManyInterviewInput = {
    id?: string
    questionId: string
    audioUrl?: string | null
    transcript: string
    duration: number
    scores: JsonNullValueInput | InputJsonValue
    tags?: ResponseCreatetagsInput | string[]
    sentiment?: number | null
    confidence?: number | null
    createdAt?: Date | string
  }

  export type FeedbackLoopCreateManyInterviewInput = {
    id?: string
    questionId?: string | null
    feedbackType: $Enums.FeedbackType
    signal: JsonNullValueInput | InputJsonValue
    actionTaken?: string | null
    outcome?: string | null
    createdAt?: Date | string
  }

  export type AgentLogCreateManyInterviewInput = {
    id?: string
    agentType: $Enums.AgentType
    action: string
    input: JsonNullValueInput | InputJsonValue
    output: JsonNullValueInput | InputJsonValue
    reflexionLoop?: number
    performanceScore?: number | null
    createdAt?: Date | string
  }

  export type ResponseUpdateWithoutInterviewInput = {
    id?: StringFieldUpdateOperationsInput | string
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    transcript?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    scores?: JsonNullValueInput | InputJsonValue
    tags?: ResponseUpdatetagsInput | string[]
    sentiment?: NullableFloatFieldUpdateOperationsInput | number | null
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    question?: QuestionUpdateOneRequiredWithoutResponsesNestedInput
  }

  export type ResponseUncheckedUpdateWithoutInterviewInput = {
    id?: StringFieldUpdateOperationsInput | string
    questionId?: StringFieldUpdateOperationsInput | string
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    transcript?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    scores?: JsonNullValueInput | InputJsonValue
    tags?: ResponseUpdatetagsInput | string[]
    sentiment?: NullableFloatFieldUpdateOperationsInput | number | null
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResponseUncheckedUpdateManyWithoutInterviewInput = {
    id?: StringFieldUpdateOperationsInput | string
    questionId?: StringFieldUpdateOperationsInput | string
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    transcript?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    scores?: JsonNullValueInput | InputJsonValue
    tags?: ResponseUpdatetagsInput | string[]
    sentiment?: NullableFloatFieldUpdateOperationsInput | number | null
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedbackLoopUpdateWithoutInterviewInput = {
    id?: StringFieldUpdateOperationsInput | string
    feedbackType?: EnumFeedbackTypeFieldUpdateOperationsInput | $Enums.FeedbackType
    signal?: JsonNullValueInput | InputJsonValue
    actionTaken?: NullableStringFieldUpdateOperationsInput | string | null
    outcome?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    question?: QuestionUpdateOneWithoutFeedbackLoopsNestedInput
  }

  export type FeedbackLoopUncheckedUpdateWithoutInterviewInput = {
    id?: StringFieldUpdateOperationsInput | string
    questionId?: NullableStringFieldUpdateOperationsInput | string | null
    feedbackType?: EnumFeedbackTypeFieldUpdateOperationsInput | $Enums.FeedbackType
    signal?: JsonNullValueInput | InputJsonValue
    actionTaken?: NullableStringFieldUpdateOperationsInput | string | null
    outcome?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedbackLoopUncheckedUpdateManyWithoutInterviewInput = {
    id?: StringFieldUpdateOperationsInput | string
    questionId?: NullableStringFieldUpdateOperationsInput | string | null
    feedbackType?: EnumFeedbackTypeFieldUpdateOperationsInput | $Enums.FeedbackType
    signal?: JsonNullValueInput | InputJsonValue
    actionTaken?: NullableStringFieldUpdateOperationsInput | string | null
    outcome?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentLogUpdateWithoutInterviewInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentType?: EnumAgentTypeFieldUpdateOperationsInput | $Enums.AgentType
    action?: StringFieldUpdateOperationsInput | string
    input?: JsonNullValueInput | InputJsonValue
    output?: JsonNullValueInput | InputJsonValue
    reflexionLoop?: IntFieldUpdateOperationsInput | number
    performanceScore?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentLogUncheckedUpdateWithoutInterviewInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentType?: EnumAgentTypeFieldUpdateOperationsInput | $Enums.AgentType
    action?: StringFieldUpdateOperationsInput | string
    input?: JsonNullValueInput | InputJsonValue
    output?: JsonNullValueInput | InputJsonValue
    reflexionLoop?: IntFieldUpdateOperationsInput | number
    performanceScore?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentLogUncheckedUpdateManyWithoutInterviewInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentType?: EnumAgentTypeFieldUpdateOperationsInput | $Enums.AgentType
    action?: StringFieldUpdateOperationsInput | string
    input?: JsonNullValueInput | InputJsonValue
    output?: JsonNullValueInput | InputJsonValue
    reflexionLoop?: IntFieldUpdateOperationsInput | number
    performanceScore?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResponseCreateManyQuestionInput = {
    id?: string
    interviewId: string
    audioUrl?: string | null
    transcript: string
    duration: number
    scores: JsonNullValueInput | InputJsonValue
    tags?: ResponseCreatetagsInput | string[]
    sentiment?: number | null
    confidence?: number | null
    createdAt?: Date | string
  }

  export type FeedbackLoopCreateManyQuestionInput = {
    id?: string
    interviewId: string
    feedbackType: $Enums.FeedbackType
    signal: JsonNullValueInput | InputJsonValue
    actionTaken?: string | null
    outcome?: string | null
    createdAt?: Date | string
  }

  export type ResponseUpdateWithoutQuestionInput = {
    id?: StringFieldUpdateOperationsInput | string
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    transcript?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    scores?: JsonNullValueInput | InputJsonValue
    tags?: ResponseUpdatetagsInput | string[]
    sentiment?: NullableFloatFieldUpdateOperationsInput | number | null
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    interview?: InterviewUpdateOneRequiredWithoutResponsesNestedInput
  }

  export type ResponseUncheckedUpdateWithoutQuestionInput = {
    id?: StringFieldUpdateOperationsInput | string
    interviewId?: StringFieldUpdateOperationsInput | string
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    transcript?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    scores?: JsonNullValueInput | InputJsonValue
    tags?: ResponseUpdatetagsInput | string[]
    sentiment?: NullableFloatFieldUpdateOperationsInput | number | null
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResponseUncheckedUpdateManyWithoutQuestionInput = {
    id?: StringFieldUpdateOperationsInput | string
    interviewId?: StringFieldUpdateOperationsInput | string
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    transcript?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    scores?: JsonNullValueInput | InputJsonValue
    tags?: ResponseUpdatetagsInput | string[]
    sentiment?: NullableFloatFieldUpdateOperationsInput | number | null
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedbackLoopUpdateWithoutQuestionInput = {
    id?: StringFieldUpdateOperationsInput | string
    feedbackType?: EnumFeedbackTypeFieldUpdateOperationsInput | $Enums.FeedbackType
    signal?: JsonNullValueInput | InputJsonValue
    actionTaken?: NullableStringFieldUpdateOperationsInput | string | null
    outcome?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    interview?: InterviewUpdateOneRequiredWithoutFeedbackLoopsNestedInput
  }

  export type FeedbackLoopUncheckedUpdateWithoutQuestionInput = {
    id?: StringFieldUpdateOperationsInput | string
    interviewId?: StringFieldUpdateOperationsInput | string
    feedbackType?: EnumFeedbackTypeFieldUpdateOperationsInput | $Enums.FeedbackType
    signal?: JsonNullValueInput | InputJsonValue
    actionTaken?: NullableStringFieldUpdateOperationsInput | string | null
    outcome?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedbackLoopUncheckedUpdateManyWithoutQuestionInput = {
    id?: StringFieldUpdateOperationsInput | string
    interviewId?: StringFieldUpdateOperationsInput | string
    feedbackType?: EnumFeedbackTypeFieldUpdateOperationsInput | $Enums.FeedbackType
    signal?: JsonNullValueInput | InputJsonValue
    actionTaken?: NullableStringFieldUpdateOperationsInput | string | null
    outcome?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use InterviewCountOutputTypeDefaultArgs instead
     */
    export type InterviewCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = InterviewCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use QuestionCountOutputTypeDefaultArgs instead
     */
    export type QuestionCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = QuestionCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use InterviewDefaultArgs instead
     */
    export type InterviewArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = InterviewDefaultArgs<ExtArgs>
    /**
     * @deprecated Use QuestionDefaultArgs instead
     */
    export type QuestionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = QuestionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ResponseDefaultArgs instead
     */
    export type ResponseArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ResponseDefaultArgs<ExtArgs>
    /**
     * @deprecated Use FeedbackLoopDefaultArgs instead
     */
    export type FeedbackLoopArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = FeedbackLoopDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AgentLogDefaultArgs instead
     */
    export type AgentLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AgentLogDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ScoringModelDefaultArgs instead
     */
    export type ScoringModelArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ScoringModelDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PatternDefaultArgs instead
     */
    export type PatternArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PatternDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}