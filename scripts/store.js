'use strict';
const store = (function() {
  const state = {
    bookmarks:[],
    filter:false
  };

  function addBookmark(bookmark) {
    state.bookmarks.push(bookmark);
  }

  return {
    addBookmark, state
  };
})();