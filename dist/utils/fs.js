import fs from "fs";
import path from "path";
export function fileExists(basePath, file) {
    return fs.existsSync(path.join(basePath, file));
}
