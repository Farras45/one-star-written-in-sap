// One Star, Written in Sap — a one-line 1-star review by a houseplant.
//
// The program writes a single original review line to /output/entry.txt.
// The gate requires UTF-8 text of 1 to 279 characters, not only whitespace,
// so the program checks its own line against that rule before writing it.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const REVIEW =
  "One star. He repotted me into a mug with no drainage, then told his guests I'm 'low maintenance' while I slowly drown in my own bathwater.";

// The gate counts characters, not bytes, and rejects blank-only text.
const MAX_CHARS = 279;

function checkLine(line: string): void {
  const chars = [...line].length;
  if (chars < 1 || chars > MAX_CHARS) {
    throw new Error(`Review is ${chars} characters; gate needs 1 to ${MAX_CHARS}.`);
  }
  if (line.trim().length === 0) {
    throw new Error("Review must not be only whitespace.");
  }
  if (line.includes("\n")) {
    throw new Error("Review must be a single line.");
  }
}

function main(): void {
  checkLine(REVIEW);
  const outPath = process.env.OUTPUT_PATH ?? "/output/entry.txt";
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, REVIEW, "utf8");
  console.log(`Wrote ${[...REVIEW].length} characters to ${outPath}`);
}

main();
