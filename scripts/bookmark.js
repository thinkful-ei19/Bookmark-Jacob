/* global $, api, store*/
'use strict';
const bookmark = (function() {

  function editHandler() {
    $('.bookmark-list').on('click', '.edit-btn', event => {
      event.stopPropagation();
      const id = getBookmarkIdFromElement(event.currentTarget);
      store.toggleBookmarktoEdit(store.findById(id));
      render();
    });
  }

  function submitEditHandler() {
    $('.bookmark-list').on('click', '.submit-bookmark', event => {
      event.preventDefault();
      const bookmarkId = $(event.currentTarget).closest('.edit-form').closest('.bookmark-container').data('bookmark-id');
      const title = $('.title-entry').val();
      const url = $('.url-entry').val();
      const desc = $('.desc-entry').val();
      const stars = store.editStar;
      let ourData = {};
      if (desc === '') ourData = {title, url, rating:stars};
      else ourData = {title, url, desc, rating:stars};
      api.updateBookmark(bookmarkId, ourData, function() {
        store.findAndUpdate(bookmarkId, {title, url, desc, rating:stars, edit:false});
        render();
      });
    });
  }

  function generateBookmark(bookmark) {
    if ('edit' in bookmark) {
      if (bookmark.edit) {
        return `
        <div class="bookmark-container" data-bookmark-id="${bookmark.id}">
        <form class="edit-form">
          <label for="title-entry">Title</label>
          <input type="text" name="title-entry" class="title-entry" placeholder="${bookmark.title}" value="${bookmark.title}">
          <label for="url-entry">URL</label>
          <input type="url" name="url-entry" class="url-entry" placeholder="${bookmark.url}" value="${bookmark.url}">
          <label for="desc-entry">Description</label>
          <input type="text" name="desc-entry" class="desc-entry" placeholder="${bookmark.desc}" value="${bookmark.desc}">
          <section class="edit-ratings">
            <span class="edit-rating-wrapper" id="1">
              <i class="far fa-star star twoStars"></i>
              </span>
              <span class="edit-rating-wrapper" id="2">
              <i class="far fa-star star twoStars"></i>
              </span>
              <span class="edit-rating-wrapper" id="3">
              <i class="far fa-star star threeStars"></i>
              </span>
              <span class="edit-rating-wrapper" id="4">
              <i class="far fa-star star fourStars"></i>
              </span>
              <span class="edit-rating-wrapper" id="5">
              <i class="far fa-star star fiveStars"></i>
              </span>
          </section>
          <button class="submit-bookmark">Submit</button>
        </form>
        </div>
        `;
      }
    }
    if ('visible' in bookmark) {
      if (!bookmark.visible) return '';
    }
    if (bookmark.expand) {
      const generatedHTML = `
        <div class="bookmark-container expanded" data-bookmark-id="${bookmark.id}">
          <h2 class="bookmark-title">${bookmark.title}</h2>
          <p>${bookmark.rating}</p>
          <p>${bookmark.desc}</p>
          <a href="${bookmark.url}">${bookmark.title} link</a>
          <button class="delete-btn">-</button>
          <button class="edit-btn">edit</button>
        </div>
    `;
      return generatedHTML;
    }
    else if (!bookmark.expand) {
      const generatedHTML = `
        <div class="bookmark-container" data-bookmark-id="${bookmark.id}">
        <h2 class="bookmark-title">${bookmark.title}</h2>
        <p class="bookmark-rating">${bookmark.rating}</p>
        <button class="delete-btn">-</button>
        <button class="edit-btn">edit</button>
        </div>
    `;
      return generatedHTML;
    }
  }

  function getBookmarkIdFromElement(target) {
    return $(target).closest('.bookmark-container').data('bookmark-id');
  }

  function generateAddForm() {
    const form = `
    <form class="add-form">
    <div class="add-container">
      <label for="title-entry">Title</label>
      <input type="text" name="title-entry" class="title-entry" placeholder="google" required>
      <label for="url-entry">URL</label>
      <input type="url" name="url-entry" class="url-entry" placeholder="http://www.google.com">
      <label for="desc-entry">Description</label>
      <input type="text" name="desc-entry" class="desc-entry" placeholder="google's home page">
      <section class="add-ratings">
      <span class="add-rating-wrapper" id="1">
        <i class="fas fa-star star oneStar"></i>
        </span>
        <span class="add-rating-wrapper" id="2">
        <i class="fas fa-star star twoStars"></i>
        </span>
        <span class="add-rating-wrapper" id="3">
        <i class="fas fa-star star threeStars"></i>
        </span>
        <span class="add-rating-wrapper" id="4">
        <i class="fas fa-star star fourStars"></i>
        </span>
        <span class="add-rating-wrapper" id="5">
        <i class="fas fa-star star fiveStars"></i>
        </span>
      </section>
      <button class="submit-bookmark">Submit</button>
    </div>
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
      const title = $('.title-entry').val();
      if (title === '') return alert('Please enter a title for the bookmark');
      const url = $('.url-entry').val();
      if (!(url.startsWith('http://') || url.startsWith('https://'))) return alert('Please enter a complete url ie: http(s)://www.example.com');
      const desc = $('.desc-entry').val();
      const stars = store.addStar;
      $('.add-btn-holder').html(generateAddBtn());
      addBookMarkBtnHandler();
      api.createBookmark(title, url, desc, stars, function(bookmark) {
        store.addBookmark(bookmark);
        render();
      });
    });
  }

  function expandBookmarkHandler() {
    $('.bookmark-list').on('click', '.bookmark-container', event => {
      const id = $(event.currentTarget).data('bookmark-id');
      const bookmark = store.bookmarks.find(bookmark => bookmark.id === id);
      if (bookmark.edit) return;
      bookmark.expand = !bookmark.expand;
      render();
    });
  }

  function ratingHandler() {
    $('.rating-wrapper').on('click', event => {
      $(event.currentTarget).siblings().html('<i class="far fa-star star"></i>'); //clear others
      const minRating = $(event.currentTarget).attr('id');
      store.filter = minRating;
      store.setBookmarkstoHidden(minRating);
      $(event.currentTarget).prevAll().each(function() {
        $(this).html('<i class="fas fa-star star"></i>');
      });
      $(event.currentTarget).html('<i class="fas fa-star star"></i>');
      render();
    });
  }

  function addRatingHandler() {
    $('.add-btn-holder').on('click', '.add-rating-wrapper', event => {
      console.log('got to rating');
      $(event.currentTarget).siblings().html('<i class="far fa-star star"></i>'); //clear others
      $(event.currentTarget).prevAll().each(function() {
        $(this).html('<i class="fas fa-star star"></i>');
      });
      $(event.currentTarget).html('<i class="fas fa-star star"></i>');
      store.addStar = ($(event.currentTarget).attr('id'));
      render();
    });
  }

  function editRatingHandler() {
    $('.bookmark-list').on('click', '.edit-rating-wrapper', event => {
      console.log('got to rating');
      store.editStar = ($(event.currentTarget).attr('id'));
      $(event.currentTarget).siblings().html('<i class="far fa-star star"></i>'); //clear others
      $(event.currentTarget).prevAll().each(function() {
        $(this).html('<i class="fas fa-star star"></i>');
      });
      $(event.currentTarget).html('<i class="fas fa-star star"></i>');
      console.log($(event.currentTarget).html());
    });
  }

  function deleteBookmarkHandler() {
    $('.bookmark-list').on('click', '.delete-btn', event => {
      event.stopPropagation();
      const id = getBookmarkIdFromElement(event.currentTarget);
      api.deleteBookmark(id, function() {
        store.findAndDelete(id);
        render();
      });
    });
  }

  function generateBookmarks(bookmarks) {
    const generatedBookmarks = bookmarks.map(bookmark => generateBookmark(bookmark));
    return generatedBookmarks.join('');
  }

  function render() {
    const bookmarkHTML = generateBookmarks(store.bookmarks);
    $('.bookmark-list').html(bookmarkHTML);
  }

  function bindHandlers() {
    addBookMarkBtnHandler();
    addRatingHandler();
    submitNewBookmarkHandler();
    expandBookmarkHandler();
    deleteBookmarkHandler();
    ratingHandler();
    editHandler();
    submitEditHandler();
    editRatingHandler();
  }

  return {
    render, bindHandlers, generateBookmark
  };
})();