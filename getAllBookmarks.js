function getAllBookmarks(username, reformat){
  return new Promise(function(resolve, reject){
    var bookmarks = [];
    var bookmarkPage = 1;
    function getBookmarks(page){
      console.log('getting page', page);
      if(page > 1000){ reject(bookmarks); }
      $.getJSON('https://my.bible.com/users/'+username+'/_cards.json?kind=bookmark&page='+page)
        .done((data)=>{
          console.log('page', page, data);
          if(data.error){ resolve(bookmarks); return; }
          $.each(data, (k,bookmark)=>{

            if(reformat){
              bookmarks.push({
                'id':bookmark.object.id,
                'created':bookmark.object.created_dt,
                'labels':bookmark.object.labels,
                'title':bookmark.object.moment_title,
                'verses':bookmark.object.references[0].usfm,
                'verse':bookmark.object.references[0].human,
              });
            } else {
              bookmarks.push(bookmark);
            }

          });
          bookmarkPage++
          getBookmarks(bookmarkPage);
        });
    };

    // start it
    getBookmarks(bookmarkPage);

  });
}
