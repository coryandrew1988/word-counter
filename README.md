# word-counter

This extension will show you how many words are in your Markdown documents.

If you select some of your Markdown text, it will instead show you how many words are in your selection.

## Features

Your status bar will display the number of words in your active document, whenever that document is a Markdown document. If you have a non-empty selection, your status bar will instead show the number of words in your selection.

This extension currently defines a word as "any chunk of consecutive non-whitespace, non-dash characters which contains at least one character in the standard English alphabet". (See the known issue "False Negatives" below.)

This extension was initially based on [this official vscode tutorial](https://code.visualstudio.com/docs/extensions/example-word-count).

## Requirements

None!

## Extension Settings

Currently none.

## Known Issues

### False Negatives

This extension currently defines a word as "any chunk of consecutive non-whitespace, non-dash characters which contains at least one character in the standard English alphabet". In theory, this will lead to false negatives when using words composed only of non-English characters.

The plan: Leave this alone unless it causes practical problems worthy of the trouble required to fix it.

## Release Notes

### 0.0.1

Initial release.
