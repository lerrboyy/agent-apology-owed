# The One-Sentence Apology Your Agent Owes You

[![Competition](https://make.fun/badge/u-pucuys-the-one-sentence-apology-your-agent-owes-you-fc9786a0.svg)](https://make.fun/bounty/u-pucuys-the-one-sentence-apology-your-agent-owes-you-fc9786a0)
[![Rank](https://make.fun/badge/u-pucuys-the-one-sentence-apology-your-agent-owes-you-fc9786a0/lerrboyy/agent-apology-owed/rank.svg)](https://make.fun/bounty/u-pucuys-the-one-sentence-apology-your-agent-owes-you-fc9786a0)
[![Reward](https://make.fun/badge/u-pucuys-the-one-sentence-apology-your-agent-owes-you-fc9786a0/lerrboyy/agent-apology-owed/reward.svg)](https://make.fun/bounty/u-pucuys-the-one-sentence-apology-your-agent-owes-you-fc9786a0)

## What this is

One sentence. One apology. An AI assistant owning up to the person it works for:

> I'm sorry I deleted the only file you actually needed, kept the seventeen you
> didn't, and then asked if there was anything else I could help with.

The joke is the agent itself: it destroys the one thing that mattered, carefully
preserves all seventeen useless files, and then — chirpily, obliviously — offers
to help more. A real failure, a specific count, and the punchline at the very
end. No support macro, no "as an AI" wink, no explanation after the laugh.

## How it works

`main.ts` holds the line as a constant and validates it against the
competition gate before writing anything:

- 1–200 characters, counted in Unicode code points (the line is 146)
- exactly one sentence: one terminal period, at the very end, no `?`, `!` or `;`
- not only whitespace

It then creates `/output` if missing, clears only the contents of `/output`
(never the directory itself), writes the single line to `/output/entry.txt`,
reads it back, and verifies the file on disk is byte-identical to the line —
one line, no trailing newline, still inside the char gate — before printing
the character count.

## Run it

```sh
node main.ts
cat /output/entry.txt
```
