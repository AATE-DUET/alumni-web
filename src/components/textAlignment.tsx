import React from 'react';
import { Typography } from 'antd';

const { Text } = Typography;

// Define the props interface
interface TextAlignmentProps {
  responsibilities?: string; // Optional string for responsibilities
  title?: string; // Optional string for the title
}

// Functional component
const TextAlignment: React.FC<TextAlignmentProps> = ({ responsibilities, title }) => {
  // Split the responsibilities text by newline characters
  const lines = responsibilities?.split('\n') || [];

  return (
    <>
      {/* Render the title if provided */}
      {title && (
        <Text>
          <b>{title}:</b>{' '}
        </Text>
      )}

      {/* Render the responsibilities text with line breaks */}
      <Text>
        {lines.map((line, index) => (
          <React.Fragment key={index}>
            {line}
            {index < lines.length - 1 && <br />} {/* Add <br /> after each line except the last */}
          </React.Fragment>
        ))}
      </Text>
    </>
  );
};

export default TextAlignment;