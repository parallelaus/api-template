interface Environment {
  [key: string]:
    | any
    | {
        [key: string]: any | { [key: string]: any }
      }
}
