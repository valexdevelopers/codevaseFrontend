import { loader } from '@monaco-editor/react';
import monacoThemes from 'monaco-themes/themes/themelist.json';

const monacoThemesList = monacoThemes;

export const ThemeOptions = async (theme) => {
    if (!monacoThemesList[theme]) {
        throw new Error(`Theme ${theme} not found`);
    }

    const [monaco, themeData] = await Promise.all([
        loader.init(),
        import(`monaco-themes/themes/${monacoThemesList[theme]}.json`)
    ]);

    monaco.editor.defineTheme(theme, themeData);
};

export const getThemeList = () => {
    return Object.entries(monacoThemesList).map(([themeId, themeName]) => ({
        label: themeName,
        value: themeId,
    }));
};


