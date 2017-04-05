# Cut Wood
Another logger, but this one is aimed at devs. Not for production but for a simple daily developer life.

## Status
Under development - not usable

## Aims
1. Transform a stream of dense unintelligible logging (from stdout) into something that a dev currently cares about (that might be different per day)
2. Parse historic dense unintelligible log files into searchable form
3. Using the parse logs, easily find via the cli a line of logging that is of interest

## Current Usage
**This is under development and is likely to change**
Instal globally
```
npm install -g cutwood
```
Then pipe into it
```
ping www.rankida.com | cutwood
```
by default it will just echo what you give it, but more coming soon!

## Implementation thoughts
There are a few stages
```
Input: _Get the logs_
  `-> stdout
  `-> single log file
  `-> single folder with log files
  `-> single folder with many sub-folders with logs somewhere in and about there
Parsing: _Turn log lines into objects_
  `-> For now simple transform of one log line to one object
     `-> In the future there could be places where multiple log lines make up an object eg stack traces
  `-> string splits, regexes, JSON parsing etc
Filtering: _Throw it away_
  `-> exclude an entry permanently from progressing
  `-> regex or simple javascript func
  `-> could come before and after parsing
Output format: _Send it to where it needs to go_
  `-> For consoles that will be pretty printing etc
    `-> conditions should be placed on it because some lines may be just raw log, others might be pretty formats
  `-> For search indexes we might need to prepare the object with what is searchable/keywords/untokenized etc
```

# References
- `through` - https://github.com/dominictarr/through
- `transform-stream` - https://github.com/Raynos/transform-stream

# Possible Usages
```JavaScript
cutwoood
    .stdin()
    .remove()
    .transform(//)
```
