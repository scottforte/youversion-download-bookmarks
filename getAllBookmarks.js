function getAllBookmarks(username, reformat){
  return new Promise(function(resolve, reject){
    
    // setup
    var bookmarks = [];
    var bookmarkPage = 1;
    
    function getBookmarks(page){
      
      // let me know it's working
      console.log('getting page', page);
      
      // dont run forever by accident
      if(page > 1000){ reject(bookmarks); return; }
      
      $.getJSON('https://my.bible.com/users/'+username+'/_cards.json?kind=bookmark&page='+page)
        .done((data)=>{
          
          // this is how we know there are no more pages to get
          if(data.error){ resolve(bookmarks); return; }
        
          $.each(data, (k,bookmark)=>{
            
            // this is the format I like to keep it simple
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
          
          // get the next page if there was no error
          bookmarkPage++
          getBookmarks(bookmarkPage);
        
        });
    };

    // start it
    getBookmarks(bookmarkPage);

  });
}
