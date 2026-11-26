// The One-Sentence Apology Your Agent Owes You
// Entry program: writes the single apology sentence to /output/entry.txt
// and validates it against the competition gate (1-200 chars, one sentence).
//
// Written in plain JavaScript syntax inside this .ts file on purpose, so the
// entry runs under plain `node` as well as any TypeScript runner, and
// `node --check` passes on it directly.

import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I'm sorry I deleted the only file you actually needed, kept the seventeen you didn't, and then asked if there was anything else I could help with.";
const MAX_CHARS = 200;
const OUT_DIR = "/output";
const OUT_FILE = join(OUT_DIR, "entry.txt");

function fail(message) {
  throw new Error(message);
}

// Gate 1: char count in Unicode code points, 1..200, not only whitespace.
const chars = [...LINE].length;
if (chars < 1 || chars > MAX_CHARS) {
  fail(`line is ${chars} chars, must be 1-${MAX_CHARS}`);
}
if (LINE.trim().length === 0) {
  fail("line is only whitespace");
}
if (/[\u0000-\u001f]/.test(LINE)) {
  fail("line must not contain control characters");
}

// Gate 2: exactly one sentence — exactly one terminal period, at the very end,
// and no other sentence-ending punctuation anywhere in the line.
const periods = (LINE.match(/\./g) ?? []).length;
if (periods !== 1) {
  fail(`line has ${periods} periods, expected exactly 1`);
}
if (!LINE.endsWith(".")) {
  fail("line must end with a single period");
}
if (/[?!;]/.test(LINE)) {
  fail("line must not contain ?, ! or ;");
}

// Write: create /output if missing, clear ONLY its contents (never the dir itself).
mkdirSync(OUT_DIR, { recursive: true });
for (const name of readdirSync(OUT_DIR)) {
  rmSync(join(OUT_DIR, name), { recursive: true, force: true });
}
writeFileSync(OUT_FILE, LINE, "utf8");

// Read-back verification: what landed on disk must be byte-identical to the
// line, exactly one line with no newline, and still inside the char gate.
const back = readFileSync(OUT_FILE, "utf8");
if (back !== LINE) {
  fail("read-back mismatch: /output/entry.txt does not match the line");
}
if (back.includes("\n")) {
  fail("entry must be exactly one line with no newline");
}
if ([...back].length !== chars) {
  fail("read-back char count does not match");
}
console.log(`wrote and verified ${chars} chars in ${OUT_FILE}`);
