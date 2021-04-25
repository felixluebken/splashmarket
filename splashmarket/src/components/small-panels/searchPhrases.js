import React from 'react';
import './small-panels.css';

/*
searchTerm              -str
*/

const SearchPhrasePanel = (props) => {
  const { searchTerm, removeSearchParameter } = props;

  console.log('REMOVE SEARCH PARAMETER: ', removeSearchParameter);
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
          removeSearchParameter();
        }}
      />
    </div>
  );
};

export default SearchPhrasePanel;
