import React from 'react';
import './small-panels.css';

const SearchPhrasePanel = (props) => {
  const { searchTerm, removeSearchParameter } = props;

  return (
    <div className="search_phrase-panel">
      <p className="text-normal-small" style={{ margin: '4px 10px', maxWidth: '200' }}>{searchTerm}</p>
      <div
        className="close_icon"
        role="button"
        tabIndex={0}
        aria-label="Home page header"
        aria-hidden="true"
        style={{ cursor: 'pointer' }}
        onClick={() => {
          if (removeSearchParameter) {
            removeSearchParameter(searchTerm);
          }
        }}
      />
    </div>
  );
};

export default SearchPhrasePanel;
