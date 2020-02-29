import { Category } from "../helpers/helper";

export interface Font {
  id: number;
  family: string;
  url: string;
  category: Category;
  num_liked: number;
}
