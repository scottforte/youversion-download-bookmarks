let requestBody = {
    query: `
      query GetUserData {
        getMeData {
          firstName
          id
        }
      }
    `
    };

let test = {
query: `{
      __type(name: "User") {
        fields {
          name
        }
      }
    }`
};


let colors = {
    query: `
      query GetVerseColors($usfm: String!, $versionId: Int!) {
        getVerseColors(usfm: $usfm, versionId: $versionId) {
          response {
            data
            code
          }
        }
      }
    `,
    variables: {
      usfm: "MAT.7",
      versionId: 100
    }
  };

  let token = "";

fetch("https://presentation.youversionapi.com/graphql", {
"headers": {
    "accept": "*/*",
    "accept-language": "en",
    "authorization": `Bearer ${token}`,
    "content-type": "application/json",
    "priority": "u=1, i",
    "x-youversion-app-platform": "web",
    "x-youversion-client": "youversion",
    "Referer": "https://www.bible.com/",
    "Referrer-Policy": "no-referrer-when-downgrade"
},
"body":  JSON.stringify(colors),
"method": "POST"
})
.then(response => response.json())
.then(data => {
  console.log(data.data);
})
.catch(err => console.error("Error:", err));