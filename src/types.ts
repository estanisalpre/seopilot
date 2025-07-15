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

export type GlobalCheckResult = {
  message: string;
  category: SEOCategory;
};

export type HtmlCheck = ($: cheerio.CheerioAPI) => CheckResult[];
export type GlobalCheck = (basePath: string) => CheckResult[];