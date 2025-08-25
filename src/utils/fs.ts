import fs from "fs";
import path from "path";

export function fileExists(basePath: string, file: string): boolean {
  return fs.existsSync(path.join(basePath, file));
}