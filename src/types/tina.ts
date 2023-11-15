import { type Exact } from "tina/__generated__/types";

export interface Query<Type> {
  data: Type;
  errors?:
    | {
        message: string;
        locations: {
          line: number;
          column: number;
        }[];
        path: string[];
      }[]
    | undefined;
  variables: Exact<{
    relativePath: string;
  }>;
  query: string;
}
