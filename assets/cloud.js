var myWidget = cloudinary.createUploadWidget({
    cloudName: "dc8tvoofm",
    uploadPreset: "ml_default",
    sources: [
        "url",
        "google_drive",
        "facebook",
        "dropbox",
        "instagram",
        "shutterstock",
        "local",
        "image_search"
    ],
    googleApiKey: "<image_search_google_api_key>",
    showAdvancedOptions: false,
    cropping: false,
    multiple: false,
    defaultSource: "local",
    styles: {
        palette: {
            window: "#FFFFFF",
            sourceBg: "#FFFFFF",
            windowBorder: "#90a0b3",
            tabIcon: "#5EDE53",
            inactiveTabIcon: "#000000",
            menuIcons: "#000000",
            link: "#21E037",
            action: "#13FF09",
            inProgress: "#0194c7",
            complete: "#53ad9d",
            error: "#c43737",
            textDark: "#000000",
            textLight: "#FFFFFF"
        },
        fonts: {
            default: null,
            "'IBM Plex Sans', sans-serif": {
                url: "https://fonts.googleapis.com/css?family=IBM+Plex+Sans",
                active: true
            }
        }
    }
  
  
  }, (error, result) => { 
      if (!error && result && result.event === "success") { 
        console.log('Done! Here is the image info: ', result.info); 
        console.log(document.getElementById('imageUrl').value);
        document.getElementById('imageUrl').value = result.info.url;
        document.getElementById('userImage').src = result.info.url;
      }
    }
  )
  
  document.getElementById("upload_widget").addEventListener("click", function(){
      myWidget.open();
    }, false);
