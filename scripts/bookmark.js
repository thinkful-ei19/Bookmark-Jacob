/* global $, api, store*/
'use strict';
const bookmark = (function() {

  function generateBookmark(bookmark) {
    console.log('generating a bookmark');
    if (bookmark.expand) {
      const generatedHTML = `
        <div class="bookmark-container">
          <h2 class="bookmark-title">${bookmark.title}</h2>
          <p>${bookmark.rating}</p>
          <p>${bookmark.desc}</p>
          <a href="${bookmark.url}">${bookmark.title} link</a>
        </div>
    `;
      return generatedHTML;
    }
    else if (!bookmark.expand) { 
      console.log("got to decorate conditional");
      const generatedHTML = `
        <div class="bookmark-container">
        <h2 class="bookmark-title">${bookmark.title}</h2>
        <p>${bookmark.rating}</p>
        </div>
    `;
      return generatedHTML;
    }
  }

  function generateAddForm() {
    const form = `
    <form class="add-form">
      <label for="title-entry">Title</label>
      <input type="text" name="title-entry" class="title-entry" placeholder="google" value="google">
      <label for="url-entry">URL</label>
      <input type="url" name="url-entry" class="url-entry" placeholder="google.com" value="http://www.google.com">
      <label for="desc-entry">Description</label>
      <input type="text" name="desc-entry" class="desc-entry" placeholder="google's home page" value="google's home page">
      <label for="star-entry">Stars</label>
      <input type="text" name="star-entry" class="star-entry" placeholder="5" value="5">
      <button class="submit-bookmark">Submit</button>
  </form>
    `;
    return form;
  }

  function generateAddBtn() {
    const btn = '<button class="add-btn" type="submit">Add Bookmark</button>';
    return btn;
  }
  
  function addBookMarkBtnHandler() {
    $('.add-btn').on('click', function(event) {
      event.preventDefault();
      $('.add-btn-holder').html(generateAddForm());
    });
  }

  function submitNewBookmarkHandler() {
    $('.add-btn-holder').on('click', '.submit-bookmark', function(event) {
      event.preventDefault();
      console.log('submitted');
      const title = $('.title-entry').val();
      const url = $('.url-entry').val();
      const desc = $('.desc-entry').val();
      const stars = $('.star-entry').val();
      $('.add-btn-holder').html(generateAddBtn());
      addBookMarkBtnHandler();
      api.createBookmark(title, url, desc, stars, function(bookmark) {
        store.addBookmark(bookmark);
        render();
      });
    });
  }

  function generateBookmarks(bookmarks) {
    console.log('generating bookmarks...');
    const generatedBookmarks = bookmarks.map(bookmark => generateBookmark(bookmark));
    return generatedBookmarks.join('');
  }

  function render() {
    console.log(store.bookmarks);
    const bookmarkHTML = generateBookmarks(store.bookmarks);
    console.log(bookmarkHTML);
    $('.bookmark-list').html(bookmarkHTML);
  }

  return {
    render, addBookMarkBtnHandler, submitNewBookmarkHandler, generateBookmark
  };
})();