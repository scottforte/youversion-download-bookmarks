# youversion-download-bookmarks
A way to download all your YouVersion bookmarks in JSON format

## description
getAllBookmarks is a function stored on the window that returns a promise.

## How to Use
1) Log into `https://my.bible.com/`
2) Paste the `getAllBookmarks` function into the console log
3) Do something with the data

## example usage with download of JSON data
getAllBookmarks('scottmforte', true).then((bookmarks)=>{
  console.log('bookmarks', bookmarks);
  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(bookmarks));
  var dlAnchorElem = document.createElement("a");
  dlAnchorElem.setAttribute("href",     dataStr     );
  dlAnchorElem.setAttribute("download", "bookmarks.json");
  dlAnchorElem.click();
});
