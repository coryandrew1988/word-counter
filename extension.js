const {
    window,
    Disposable,
    StatusBarAlignment
} = require('vscode');

const countWords = (text) => {
    const matches = text.match(/\S+/g);
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

            const { document } = editor;

            if (document.languageId !== 'markdown') {
                statusBarItem.hide();
                return;
            }

            const wordCount = countWords(document.getText());
            statusBarItem.text = (
                wordCount === 1 ?
                '$(pencil) 1 Word' :
                `$(pencil) ${wordCount} Words`
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
