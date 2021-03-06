import { ExtendedComponentSchema } from "formiojs";

export type FormSchema = {
  _id?: string;
  title?: string;
  name?: string;
  machineName?: string;
  components: ExtendedComponentSchema[];
  tags?: string[];
  action?: string;
  properties?: Record<string, any>;
  [key: string]: any;
};
