async function getAllBookmarks(username, reformat) {
  const bookmarks = [];
  let bookmarkPage = 1;
  const maxPages = 1000;

  async function getBookmarks(page) {
    console.log('getting page', page);

    // Prevent running more than the max pages limit
    if (page > maxPages) return bookmarks;

    try {
      const response = await fetch(`https://www.bible.com/users/${username}/_cards.json?kind=bookmark&page=${page}`);
      const data = await response.json();
      
      if (data.error) {
        return bookmarks; // No more pages
      }

      data.forEach((bookmark) => {
        if (reformat) {
          bookmarks.push({
            id: bookmark.object.id,
            created: bookmark.object.created_dt,
            labels: bookmark.object.labels,
            title: bookmark.object.moment_title,
            verses: bookmark.object.references[0].usfm,
            verse: bookmark.object.references[0].human,
          });
        } else {
          bookmarks.push(bookmark);
        }
      });

      // Recursive call to get the next page
      return getBookmarks(page + 1);

    } catch (error) {
      console.error('Error fetching bookmarks:', error);
      return bookmarks; // Return what we have so far on error
    }
  }

  // Start fetching pages
  return await getBookmarks(bookmarkPage);
}
