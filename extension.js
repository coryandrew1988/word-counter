const {
    window,
    Disposable,
    StatusBarAlignment
} = require('vscode');

const countWords = (text) => {
    const matches = text.match(/[^\s—]*[a-zA-Z][^\s—]*/g);
    if (!matches) { return 0; }
    
    return matches.length;
};

const createWordCounter = () => {
    const statusBarItem = window.createStatusBarItem(StatusBarAlignment.Left);

    return {
        update: () => {
            const editor = window.activeTextEditor;

            if (!editor) {
                statusBarItem.hide();
                return;
            }

            const { document, selection } = editor;

            if (document.languageId !== 'markdown') {
                statusBarItem.hide();
                return;
            }

            const isSelectionEmpty = selection.start.isEqual(selection.end);
            const text = (
                isSelectionEmpty ?
                document.getText() :
                document.getText(selection)
            );
            const wordCount = countWords(text);
            statusBarItem.text = (
                wordCount === 1 ?
                '$(pencil) 1 Word in' :
                `$(pencil) ${wordCount} Words in`
            ) + (
                isSelectionEmpty ?
                ' Document' :
                ' Selection'
            );
            statusBarItem.show();
        },
        dispose: () => {
            statusBarItem.dispose();
        }
    };
};

const createWordCounterController = () => {
    const wordCounter = createWordCounter();
    wordCounter.update();

    const eventDisposable = Disposable.from([
        window.onDidChangeActiveTextEditor(wordCounter.update),
        window.onDidChangeTextEditorSelection(wordCounter.update)
    ]);

    return {
        dispose: () => {
            wordCounter.dispose();
            eventDisposable.dispose();
        }
    };
};

exports.activate = (context) => {
    const controller = createWordCounterController();

    context.subscriptions.push(controller);
};
