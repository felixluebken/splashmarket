import React, { useState, useEffect } from 'react';
import './PageSwitch.css';
import { useHistory } from 'react-router-dom';
import PageSwitchIndicator from '../small-panels/pageSwitchIndicator';
import useQuery from '../../helpers/useQuery';

function PageSwitch(props) {
  const { totalPages, currentPage } = props;
  const pageQuery = useQuery().get('page') || 1;
  const [canDecrement, setCanDecrement] = useState(false);
  const [canIncrement, setCanIncrement] = useState(false);

  const history = useHistory();

  console.log('TOTAL PAGES: ', totalPages);
  console.log('CAN INCREMENT: ', canIncrement);
  useEffect(() => {
    if (pageQuery) {
      const parsedPageQuery = parseInt(pageQuery, 10);
      setCanDecrement(parsedPageQuery - 1 !== 0);
      setCanIncrement(parsedPageQuery + 1 <= totalPages);
    } else {
      setCanDecrement(false);
      setCanIncrement(true);
    }
  }, [pageQuery, totalPages, currentPage]);

  const handlePageSwitch = (incrementBy) => {
    // console.log("SWITCHING PAGE: ")
    const parsedPageQuery = parseInt(pageQuery, 10) || 1;
    const nextPage = parsedPageQuery + incrementBy;
    const pageRegex = /(page=\d)/gmi;
    let newSearch;
    if (history.location.search && pageRegex.test(history.location.search)) {
      newSearch = history.location.search.replace(pageRegex, `page=${nextPage}`);
    } else if (history.location.search) {
      newSearch = history.location.search.concat(`&page=${nextPage}`);
    } else {
      newSearch = `?page=${nextPage}`;
    }
    history.push({
      location: history.location.pathname,
      search: newSearch,
    });
  };

  return (
    <div className="page_switch-container">
      <div
        className="page_switch-left"
        role="button"
        tabIndex={0}
        aria-label="Home page header"
        aria-hidden="true"
        style={{ cursor: 'pointer', opacity: canDecrement ? '1' : '0.5' }}
        onClick={() => {
          if (canDecrement) {
            handlePageSwitch(-1);
          }
        }}
      >
        <div className="page_switch-left_icon" />
      </div>

      {/* NO MORE THAN 8 PageSwitchIndicators */}
      {currentPage && [...Array(totalPages)].map((_, index) => {
        const page = index + 1;
        const isActive = page === currentPage;
        return (
          <PageSwitchIndicator active={isActive} number={page} />
        );
      })}

      <div
        className="page_switch-right"
        role="button"
        tabIndex={0}
        aria-label="Home page header"
        aria-hidden="true"
        style={{ cursor: 'pointer', opacity: canIncrement ? '1' : '0.5' }}
        onClick={() => {
          if (canIncrement) {
            handlePageSwitch(1);
          }
        }}
      >
        <div className="page_switch-right_icon" />
      </div>
    </div>
  );
}

export default PageSwitch;
