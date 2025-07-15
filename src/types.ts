export type SEOCategory = "SEO" | "Accessibility" | "Performance" | "Structure";
export type CategorizedErrors = Record<string, Record<string, number>>;

export type CheckResult = {
  message: string;
  category: SEOCategory;
};

export type CheckOptions = {
  failOnError?: boolean;
  basePath?: string;
  limit?: number;
  verbose?: boolean;
  json?: boolean;
};

export type FileError = {
  file: string;
  messages: CheckResult[];
};
