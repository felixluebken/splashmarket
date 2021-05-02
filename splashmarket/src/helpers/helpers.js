import moment from 'moment';

export const getLocalTime = () => {
  const localTime = moment.utc().local().format('HH');
  let greeting = 'Morning';
  const afternoon = 12; // 24hr time to split the afternoon
  const evening = 17; // 24hr time to split the evening
  if (localTime >= evening) {
    greeting = 'Evening';
  } else if (localTime >= afternoon && localTime <= evening) {
    greeting = 'Afternoon';
  }
  return `Good ${greeting}`;
};

const isNumericInput = (event) => {
  const key = event.keyCode;
  return (
    (key >= 48 && key <= 57) // Allow number line
    || (key >= 96 && key <= 105) // Allow number pad
  );
};

const isModifierKey = (event) => {
  const key = event.keyCode;
  return (
    event.shiftKey === true
    || key === 35
    || key === 36 // Allow Shift, Home, End
    || key === 8
    || key === 9
    || key === 13
    || key === 46 // Allow Backspace, Tab, Enter, Delete
    || (key > 36 && key < 41) // Allow left, up, right, down
    // Allow Ctrl/Command + A,C,V,X,Z
    || ((event.ctrlKey === true || event.metaKey === true)
      && (key === 65 || key === 67 || key === 86 || key === 88 || key === 90))
  );
};

export const enforceNumber = (event) => {
  // Input must be of a valid number format or a modifier key, and not longer than ten digits
  if (!isNumericInput(event) && !isModifierKey(event)) {
    event.preventDefault();
  }
};

export const verifyAdmin = (role, isLoggedIn) => {
  if (role === 'admin' && isLoggedIn) {
    return true;
  }
  return false;
};
