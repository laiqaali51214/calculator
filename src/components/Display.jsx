// src/components/Display.jsx
const Display = ({ value }) => {
    return (
        <div className={`mb-4 px-4 py-3 text-right text-2xl font-mono select-none 
    rounded-xl border border-white/20 backdrop-blur-sm `}>
            {value || '0'}
        </div>
    );
};

export default Display;
