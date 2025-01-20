import React from 'react';

// Define the type for the props
interface HighlightTextProps {
  text: string; // Specify that 'text' is of type 'string'
}

const HighlightText: React.FC<HighlightTextProps> = ({ text }) => {
  return (
    <span className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold">
      {text}
    </span>
  );
};

export default HighlightText;
