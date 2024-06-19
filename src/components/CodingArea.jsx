import React, { useRef, useState, useEffect } from 'react';
import Editor from '@monaco-editor/react'; // Assuming you're using Monaco Editor
import defaultUserImage from '../assets/images/users/default.jpg'; // Replace with actual user image
import { languageOptions } from "../custom/languageOptions";
import { ThemeOptions, getThemeList } from "../custom/themesOptions";
import axios from 'axios';
import { encode, decode } from 'he';


const CodingArea = () => {
    const [code, setCode] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const iframeRef = useRef(null); //"// your results will appear here"
    const [editorKey, setEditorKey] = useState(0); // Initialize with 0 or any unique value
    const [inputKey, setInputKey] = useState(0); // Initialize with 0 or any unique value
    const [currentUser, setCurrentUser] = useState({
        
        username: 'John Doe', // Replace with actual user data
        imageUrl: defaultUserImage, // Replace with actual user image URL or import
    });
    const [loading, setLoading] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState(languageOptions[37].value || 'python'); // Default language
    const [selectedTheme, setSelectedTheme] = useState('vs-dark'); // Default theme
    const [themes, setThemes] = useState([]);
    const [output, setOutput] = useState('');
    const [customInput, setCustomInput] = useState("");
    // changes editor themes
    useEffect(() => {
        setThemes(getThemeList());
        setEditorKey((prevKey) => prevKey + 1);
    }, []);

    const handleThemeChange = async (event) => {
        const newTheme = event.target.value;
        await ThemeOptions(newTheme);
        setSelectedTheme(newTheme);
    };

    // changes editor languges
    const handleLanguageChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedLanguage(selectedValue);
        setEditorKey((prevKey) => prevKey + 1); // Update key to force re-mount of Editor
    };

    const handleCodeChange = (newValue) => {
        setCode(newValue);
        console.log(code)
    };

    const handleCustomeInput = (newInput) => {
        setCustomInput(newInput);
        setInputKey((prevKey) => prevKey + 1);
    };

    const showHint = () => {
        // Implement logic for showing hints
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    
   
    const logout = () => {
        // Implement logout logic (clear user data, redirect, etc.)
        setCurrentUser(null); // For example, clear user state
    };
    const updatePreview = () => {
        try {
            setLoading(true)
            const sourceCode = encodeURIComponent(code);

            // this version of judge0 only has support for 26 languages
            const languageId = languageOptions.find(lang => lang.value === selectedLanguage)?.jIdid || 26; 

            const requestBody = {
                source_code: sourceCode,
                language_id: languageId,
                stdin: customInput, // Optional: Input for the program
            };

            axios.post('https://judge0-extra-ce.p.rapidapi.com/submissions?wait=false&fields=*', requestBody, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-rapidapi-host': 'judge0-extra-ce.p.rapidapi.com',
                    'x-rapidapi-key': '80aa51d9f5msh75d7ca13d4adbe8p14e97bjsn3ed890634ac4', // Replace with your RapidAPI key
                    'useQueryString': true

                },
                withCredentials: true,
            })
            .then(response => {
                const submissionId = response.data.token;
                const executedCode = pollSubmission(submissionId);
                const iframeDocument = iframeRef.current.contentDocument;
                const style = document.createElement('style');
                style.textContent = 'body { color: red; }'; // Set the text color to red
                iframeDocument.head.appendChild(executedCode);
                iframeDocument.open();
                iframeDocument.write(code);
                iframeDocument.close();
            })
            .catch(error => {
                console.error('Error running code:', error);
            });

    

        } catch (error) {
            let errorMessage = 'Judge0 CE our compiler has no support for this language, it only has support for 20 languages.';

            console.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const pollSubmission = (submissionId) => {
        const pollInterval = setInterval(() => {
            axios.get(`https://judge0-extra-ce.p.rapidapi.com/submissions/${submissionId}?base64_encoded=true&fields=*`, {
                headers: {
                    'x-rapidapi-host': 'judge0-extra-ce.p.rapidapi.com',
                    'x-rapidapi-key': '80aa51d9f5msh75d7ca13d4adbe8p14e97bjsn3ed890634ac4', // Replace with your RapidAPI key, // Replace with your RapidAPI key
                    'useQueryString': true
                },
                withCredentials: true,
            })
            .then(response => {
                if (response.data.status.id === 3) { // 3 means Judgement done
                    const outputData = response.data.stdout || response.data.stderr;
                    setOutput(outputData);
                    clearInterval(pollInterval);
                }
            })
            .catch(error => {
                console.error('Error polling submission:', error);
                clearInterval(pollInterval);
            });
        }, 1000); // Poll every second
    };

    const lang = () => {
        const pollInterval = setInterval(() => {
            axios.get(`https://judge0-extra-ce.p.rapidapi.com/languages`, {
                headers: {
                    'x-rapidapi-host': 'judge0-extra-ce.p.rapidapi.com',
                    'x-rapidapi-key': '80aa51d9f5msh75d7ca13d4adbe8p14e97bjsn3ed890634ac4', // Replace with your RapidAPI key, // Replace with your RapidAPI key
                    'useQueryString': true
                },
                withCredentials: true,
            })
                .then(response => {
                    console.log(response)
                    // if (response.data.status.id === 3) { // 3 means Judgement done
                    //     const outputData = response.data.stdout || response.data.stderr;
                    //     setOutput(outputData);
                    //     clearInterval(pollInterval);
                    // }
                })
                .catch(error => {
                    console.error('Error polling submission:', error);
                    clearInterval(pollInterval);
                });
        }, 1000); // Poll every second
    };
    

    return (
        <div className="container-fluid" style={{ height: "100vh", padding: "0" }}>
            <div className="navbar navbar-dark bg-dark">
                <div className="container-fluid">
                    <span className="navbar-brand mb-0 h1">Coding Space</span>
                    {currentUser && (
                        <div className="dropdown ml-auto">
                            <button
                                className="btn btn-secondary dropdown-toggle"
                                type="button"
                                id="dropdownUser"
                                onClick={toggleDropdown}
                            >
                                <img
                                    src={currentUser.imageUrl}
                                    alt="User"
                                    className="rounded-circle"
                                    style={{ width: "30px", height: "30px", marginRight: "5px" }}
                                />
                                {currentUser.username}
                            </button>
                            <ul className={`dropdown-menu dropdown-menu-end ${dropdownOpen ? 'show' : ''}`}>
                                <li><a className="dropdown-item" href="#">Profile</a></li>
                                <li><a className="dropdown-item" href="#">Settings</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><button className="dropdown-item" onClick={logout}>Logout</button></li>
                            </ul>
                        </div>
                    )}
                    <form className="form-inline ml-auto">
                        <label className="my-1 mr-2" htmlFor="selectLanguage">Language:</label>
                        <select
                            className="custom-select my-1 mr-sm-2"
                            id="selectLanguage"
                            value={selectedLanguage}
                            onChange={handleLanguageChange}
                        >
                            {languageOptions.map((option) => (
                                <option key={option.id} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>

                        <label className="my-1 mr-2" htmlFor="selectTheme">Theme:</label>
                        <select
                            className="custom-select my-1 mr-sm-2"
                            id="selectTheme"
                            value={selectedTheme}
                            onChange={handleThemeChange}
                            style={{ minWidth: '150px' }}
                        >
                            {themes.map((theme) => (
                                <option key={theme.value} value={theme.value}>
                                    {theme.label}
                                </option>
                            ))}
                        </select>
                    </form>
                </div>
            </div>
            <div className="row" style={{ height: "calc(100% - 56px)" }}>
                <div
                    className="col-md-4"
                    style={{
                        background: "#d3d3d3",
                        padding: "20px",
                        overflowY: "auto",
                        borderRight: "1px solid #333",
                    }}
                >
                    <h4>Task Description</h4>
                    <p>
                        Write a simple HTML page with a heading and a paragraph. Style it
                        using inline CSS and add some interactivity with inline JavaScript.
                    </p>
                </div>
                <div
                    className="col-md-4"
                    style={{
                        background: "#2c2c2c",
                        padding: "20px",
                        color: "#ff5555",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        borderRight: "1px solid #333",
                    }}
                >
                    <div style={{ flexGrow: 1 }}>
                        <Editor
                            key={editorKey}
                            height="calc(100vh - 155px)" // Adjust the height as per your requirement
                            defaultLanguage={selectedLanguage}
                            theme={selectedTheme}
                            value={code}
                            onChange={handleCodeChange}
                            
                            
                        />

                    </div>
                    <div style={{ marginTop: "10px", textAlign: "center" }}>
                        <button
                            className="btn btn-primary"
                            onClick={updatePreview} // Trigger updatePreview on button click
                            style={{ marginRight: "10px" }}
                        >
                            Run
                        </button>
                        <button className="btn btn-secondary" onClick={showHint}>
                            Review
                        </button>
                        <div className="dropdown d-inline-block ml-auto" style={{ display: "inline-block" }}>
                            <button
                                className="btn btn-secondary dropdown-toggle"
                                type="button"
                                onClick={toggleDropdown}
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                Options
                            </button>
                            
                        </div>
                    </div>
                </div>
                <div className="col-md-4" style={{
                    background: "#d3d3d3",
                    padding: "0px",
                    overflowY: "auto",
                }}>
                    <div
                        className="d-block"
                        style={{
                            background: "#d3d3d3",
                            paddingTop: "2px",
                            overflowY: "auto",
                        }}
                    >
                        <iframe
                            ref={iframeRef}
                            title="Preview"
                            style={{
                                width: "100%",
                                height: "calc(100vh - 60vh)",
                                border: "none",
                                background:"#d3d3d3"
                            }}
                        />
                    </div>
                    <div className="d-block" >
                        <textarea
                            key={inputKey}
                            value={customInput}
                            onChange={(e) => handleCodeChange(e.target.value)}
                            style={{ width: "100%", height: "45vh", padding: "10px" }}
                        />
                    </div>
                </div>
                
            </div>
            {loading && (
                <div className="loading-overlay">
                    <img src="https://i.gifer.com/yy3.gif" alt="Loading..." />
                </div>
            )}
        </div>
    );
};

export default CodingArea;
