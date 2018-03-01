/* global $ */
'use strict';
const api = (function () {

  const baseUrl = 'https://thinkful-list-api.herokuapp.com/jacobz';

  function updateBookmark(id, updateData, callback) {
    const jsonData = JSON.stringify(updateData);
    $.ajax({
      'url':`${baseUrl}/bookmarks/${id}`,
      'method':'PATCH',
      'contentType':'application/json',
      'data':jsonData,
      'success':callback
    });
  }

  function deleteBookmark(id, callback) {
    $.ajax({
      'url':`${baseUrl}/bookmarks/${id}`,
      'method':'DELETE',
      'success':callback
    });
  }

  function getBookmarks(callback) {
    $.getJSON(`${baseUrl}/bookmarks`, callback);
  }

  function createBookmark(title, url, desc, rating, callback) {
    const bookmark = {
      title,
      url,
      desc,
      rating
    };
    const bookmarkData = JSON.stringify(bookmark);
    $.ajax({
      'url':`${baseUrl}/bookmarks`,
      'method':'POST',
      'contentType':'application/json',
      'data':bookmarkData,
      'success':callback
    });
  }

  return {
    getBookmarks,
    createBookmark,
    deleteBookmark,
    updateBookmark
  };
})();