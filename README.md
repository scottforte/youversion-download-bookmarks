# youversion-download-bookmarks
A way to download all your YouVersion bookmarks in JSON format

## Background
I wanted a way to download my +1,000 bookmarks with tags.
The dev team said they couldn't do it for me...
So I did it myself.

## How it works
[`getAllBookmarks`](https://github.com/zmilkman/youversion-download-bookmarks/blob/main/getAllBookmarks.js) is a promise that returns all bookmarks

## How to Use
1) Log into [`https://my.bible.com/`](https://my.bible.com/)
2) Paste the [`getAllBookmarks`](https://github.com/zmilkman/youversion-download-bookmarks/blob/main/getAllBookmarks.js) function into the console log
3) Do something with the data

## example usage with download of JSON data
```js
getAllBookmarks('scottmforte', true).then((bookmarks)=>{
  
  // explore the data in the console log
  console.log('bookmarks', bookmarks);
  
  // download the data in JSON format
  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(bookmarks));
  var dlAnchorElem = document.createElement("a");
  dlAnchorElem.setAttribute("href",     dataStr     );
  dlAnchorElem.setAttribute("download", "bookmarks.json");
  dlAnchorElem.click();

});
```

# TODO
Eventually it would be cool to do this progromatically with cURL and sessions,
but I don't really want to spend more time on this. I have what I need.
If you want to do it, happy to merge it here.
