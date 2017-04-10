# word-counter

You can see how many words are in your Markdown documents.

## Features

Your status bar will show the number of words in your active document, whenever that document is a Markdown document.

This extension currently defines a word as "any chunk of consecutive non-whitespace characters". (See the known issue "False Positives" below.)

This extension is based on [this official vscode tutorial](https://code.visualstudio.com/docs/extensions/example-word-count).

## Requirements

None!

## Extension Settings

Currently none.

## Known Issues

### False Positives

This extension currently defines a word as "any chunk of consecutive non-whitespace characters". This can lead to false positives when using ordered lists, unordered lists, headers, block comments, etc.

The plan: Redefine word as "any chunk of consecutive non-whitespace characters which contains at least one character from the standard English alphabet". This will create some false negatives, but eliminate the false positives.

The irony: I could have enacted this plan in less time than it took to write about this known issue. I even knew what my plan would be before I started writing all this. The fact that I'm going to commit this known issue in the first README update can only be interpreted as a self-deprecating joke, with no audience.

## Release Notes

### 0.0.1

Initial release.
