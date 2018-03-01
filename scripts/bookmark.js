/* global $ */
'use strict';
const bookmark = (function() {

  function renderAddForm() {
    const form = `
    <form class="add-form">
      <label for="title-entry">Title</label>
      <input type="text" name="title-entry" class="title-entry" placeholder="google">
      <label for="url-entry">URL</label>
      <input type="url" name="url-entry" class="url-entry" placeholder="google.com">
      <label for="desc-entry">Description</label>
      <input type="text" name="desc-entry" class="desc-entry" placeholder="google's home page">
      <label for="star-entry">Stars</label>
      <input type="text" name="star-entry" class="star-entry" placeholder="5">
      <button class="submit-bookmark" type="submit">Submit</button>
  </form>
    `;
    return form;
  }

  function renderAddBtn() {
    const btn = '<button class="add-btn" type="submit">Add Bookmark</button>';
  }
  
  function addBookMarkBtnHandler() {
    $('.add-btn').on('click', function() {
      $('.add-btn-holder').html(renderAddForm());
    });
  }

  function submitNewBookmarkHandler() {
    $('.submit-bookmark').submit(function(event) {
      event.preventDefault();
      const title = $('.title-entry').val();
      const url = $('.url-entry').val();
      const desc = $('.desc-entry').val();
      const stars = $('.star-entry').val();
      api.createBookmark(title, url, desc, stars, function(bookmark) {
        store.addBookmark(bookmark);
      });
      $('.add-btn-holder').html(renderAddBtn());
    });
  }

  function render(htmlToRender) {
    $('.bookmark-list').html = htmlToRender;
  }

  return {
    render, addBookMarkBtnHandler, submitNewBookmarkHandler
  };
})();