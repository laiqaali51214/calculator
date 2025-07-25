import { useState, useEffect } from "react";
import Display from "./Display";

function Calculator() {
    const [input, setInput] = useState("");

    const handleClick = (value) => {
        if (value === "C") {
            setInput("");
        } else if (value === "=") {
            try {
                const result = eval(input); // Use mathjs for safer parsing in production
                setInput(result.toString());
            } catch {
                setInput("Error");
            }
        } else {
            setInput((prev) => prev + value);
        }
    };

    // Enable keyboard input
    useEffect(() => {
        const handleKeyDown = (e) => {
            const key = e.key;

            if (/^[0-9]$/.test(key)) {
                // Number keys
                setInput((prev) => prev + key);
            } else if (["+", "-", "*", "/"].includes(key)) {
                // Operators
                setInput((prev) => prev + key);
            } else if (key === "Enter" || key === "=") {
                e.preventDefault();
                try {
                    const result = eval(input);
                    setInput(result.toString());
                } catch {
                    setInput("Error");
                }
            } else if (key === "Backspace") {
                setInput((prev) => prev.slice(0, -1));
            } else if (key === "Escape" || key.toLowerCase() === "c") {
                setInput("");
            } else if (key === ".") {
                setInput((prev) => prev + ".");
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [input]);

    const buttons = [
        "7", "8", "9", "/",
        "4", "5", "6", "*",
        "1", "2", "3", "-",
        "0", ".", "C", "+",
    ];

    return (
        <div style={{
            position: 'absolute', left: '50%', top: '30%',
            transform: 'translate(-50%, -25%)', color: '#fff',
            border: '2px solid #fff', borderRadius: '10px', padding: '20px',
            width: '400px', height: '420px', backgroundColor: 'rgba(0, 0, 0, 0.8)'
        }}>
            <h1 style={{ textAlign: 'center', font: '30px Arial, sans-serif' }}>Basic Calculator</h1>

            <div style={{
                position: 'relative', color: '#fff', border: '2px solid #fff',
                borderRadius: '10px', padding: '20px'
            }}>
                <Display value={input} />
            </div>

            <div style={{
                height: '240px', marginTop: '10px',
                position: 'relative', color: '#fff', border: '2px solid #fff',
                borderRadius: '10px', padding: '20px'
            }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px' }}>
                    {buttons.map((btn) => (
                        <button
                            key={btn}
                            onClick={() => handleClick(btn)}
                            style={{
                                padding: '10px',
                                borderRadius: '5px',
                                border: '1px solid #fff',
                                backgroundColor: btn === "C" ? "#99063A"
                                    : ["/", "*", "-", "+"].includes(btn) ? "#4F0DCB"
                                        : "rgba(0,0,0,0.8)",
                                color: '#fff'
                            }}
                        >
                            {btn}
                        </button>
                    ))}
                    <button
                        onClick={() => handleClick("=")}
                        style={{
                            gridColumn: 'span 4',
                            padding: '10px',
                            borderRadius: '5px',
                            border: '1px solid #fff',
                            backgroundColor: '#1E8449',
                            color: '#fff'
                        }}
                    >
                        =
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Calculator;
