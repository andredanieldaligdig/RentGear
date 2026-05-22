const fs = require("fs");
const path = require("path");

let loaded = false;

function stripWrappingQuotes(value) {
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        return value.slice(1, -1);
    }

    return value;
}

function loadEnvFile(filePath) {
    if (!fs.existsSync(filePath)) {
        return;
    }

    const content = fs.readFileSync(filePath, "utf8");
    for (const rawLine of content.split(/\r?\n/)) {
        const line = rawLine.trim();
        if (!line || line.startsWith("#")) {
            continue;
        }

        const separatorIndex = line.indexOf("=");
        if (separatorIndex === -1) {
            continue;
        }

        const key = line.slice(0, separatorIndex).trim();
        if (!key || process.env[key] !== undefined) {
            continue;
        }

        const value = stripWrappingQuotes(line.slice(separatorIndex + 1).trim());
        process.env[key] = value;
    }
}

function loadLocalEnv() {
    if (loaded) {
        return;
    }

    loaded = true;
    const projectRoot = path.resolve(__dirname, "..", "..");
    loadEnvFile(path.join(projectRoot, ".env"));
}

loadLocalEnv();

module.exports = {
    loadLocalEnv
};
