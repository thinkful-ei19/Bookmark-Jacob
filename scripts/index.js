/* global bookmark, api, store $*/
'use strict';
$(function(){
  api.getBookmarks((bookmarks) => {
    bookmarks.forEach((bookmark) => store.addBookmark(bookmark));
    bookmark.render();
  });
  bookmark.bindHandlers();
  bookmark.render();
});