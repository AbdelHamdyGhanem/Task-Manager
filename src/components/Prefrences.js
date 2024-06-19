import React, { useState } from 'react';

const Preferences = ({ onSavePreferences }) => {
  const [layout, setLayout] = useState('columns'); // Default layout is columns

  const handleChangeLayout = (newLayout) => {
    setLayout(newLayout);
  };

  const handleSavePreferences = () => {
    onSavePreferences(layout); // Call parent component function to save preferences
  };

  return (
    <div>
      <h2>Preferences</h2>
      <div>
        <label>
          <input
            type="radio"
            value="columns"
            checked={layout === 'columns'}
            onChange={() => handleChangeLayout('columns')}
          />
          Columns Layout
        </label>
        <label>
          <input
            type="radio"
            value="rows"
            checked={layout === 'rows'}
            onChange={() => handleChangeLayout('rows')}
          />
          Rows Layout
        </label>
      </div>
      <button onClick={handleSavePreferences}>Save Preferences</button>
    </div>
  );
};

export default Preferences;