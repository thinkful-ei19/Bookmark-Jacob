'use strict';
const store = (function() {

  function findById(id) {
    return this.bookmarks.find(bookmark => bookmark.id === id);
  }

  function findAndDelete(id) {
    this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== id);
  }

  function findAndUpdate(id, newData) {
    Object.assign(findById(id), newData);
  }

  function addBookmark(bookmark) {
    this.bookmarks.unshift(decorateBookmark(bookmark));
  }

  function decorateBookmark(bookmark) {
    bookmark.expand = false;
    return bookmark;
  }

  function setBookmarkstoHidden(minRating) {
    this.bookmarks
      .filter(bookmark => bookmark.rating < minRating)
      .forEach(bookmark => bookmark.visible = false);
    this.bookmarks.filter(bookmark => bookmark.rating >= minRating).forEach(bookmark => bookmark.visible = true);
  }

  function toggleBookmarktoEdit(bookmarktoEdit) {
    if (bookmarktoEdit.edit) {
      bookmarktoEdit.edit = false;
    } else {
      bookmarktoEdit.edit = true;
    }
  }

  function decorateBookmarks(bookmarks) {
    return bookmarks.forEach(bookmark => decorateBookmark(bookmark));
  }

  function setFilter(minStars) {
    this.filter = minStars;
  }

  function setFilterOff() {
    this.filter = false;
  }

  return {
    addBookmark,
    bookmarks: [],
    filter: false,
    findById,
    findAndDelete,
    findAndUpdate,
    decorateBookmarks,
    decorateBookmark,
    setFilter,
    setFilterOff,
    setBookmarkstoHidden,
    toggleBookmarktoEdit
  };
})();