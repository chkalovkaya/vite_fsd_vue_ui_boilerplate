export type ISelectOption<T = any, K = string | undefined> = K extends string
    ? {
          name: string
          value: T
          group: K
      }
    : {
          name: string
          value: T
      }
