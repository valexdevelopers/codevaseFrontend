import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { useUserAuthContext } from '../context/UserAuthProvider';

// { onChange, language, code, theme }
const CodeEditorWindow = () => {
    const [value, setValue] = useState("");
    const { authUser } = useUserAuthContext();
    // const [customInput, setCustomInput] = useState("");
    // const [language, setLanguage] = useState(languageOptions[0]);
    const [theme, setTheme] = useState("cobalt"); // default theme
    const [outputDetails, setOutputDetails] = useState(null);
    console.log(authUser)
    const language = 'javascript'
    // const handleEditorChange = (value) => {
    //     setValue(value);
    //     onChange("code", value);
    // };

    // select a langugae for formating
    // const onLanguageChange = (sl) => {
    //     console.log("selected Option...", sl);
    //     setLanguage(sl);
    // };

    // const showSuccessToast = (msg) => {
    //     toast.success(msg || `Compiled Successfully!`, {
    //         position: "top-right",
    //         autoClose: 1000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //     });
    // };
    // const showErrorToast = (msg) => {
    //     toast.error(msg || `Something went wrong! Please try again.`, {
    //         position: "top-right",
    //         autoClose: 1000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //     });
    // };
    if (!authUser) {
        
    }
    return (
        <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
            <Editor
                height="85vh"
                width={`100%`}
                language={language || "javascript"}
                value={value}
                theme={theme}
                defaultValue="// add some code here"
                // onChange={handleEditorChange}
            />
        </div>
    );
};
export default CodeEditorWindow;
