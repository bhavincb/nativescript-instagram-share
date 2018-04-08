# Nativescript Instagram Share(Currently for Android)

Instagram share plugin will allow you to directly share image to instagram app.

## Requirements

working only for android

## Installation


```javascript
tns plugin add nativescript-instagram-share
```

#### TypeScript support
And do yourself a favor by adding TypeScript support to your nativeScript app:

```bash
tns install typescript
```

Now you can import the plugin as an object into your `.ts` file as follows:

```typescript
import { shareInstagram } from 'nativescript-instagram-share';
```

## Usage 

	
	```
        import * as imageSource from "tns-core-modules/image-source";
        let url=imageUrl; //image url if you want to share remote image
        let imageSrc:imageSource.ImageSource;
        getImage(url).then((r)=> {
            //// Argument (r) is ImageSource!
            console.log("Image download  complete")
            imageSrc=r;
        }, (e)=> {
            //// Argument (e) is Error!
        });
        shareInstagram(r).then((r)=>{
            console.log("instagram open succcessfully");
        }).catch((e)=>{
            console.log("instagram is not installed");
        });
    ```

##  ToDo
implement IOS version.

## License

Apache License Version 2.0, January 2004
