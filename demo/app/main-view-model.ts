import { Observable } from 'tns-core-modules/data/observable';
import { shareInstagram } from 'nativescript-instagram-share';
import { getFile,getImage} from "tns-core-modules/http";
export class HelloWorldModel extends Observable {
  public message: string;

  constructor() {
    super();
    let imageUrl="http://www.daycomsolutions.com/Support/BatchImage/HPIM0050w300.JPG";
    setTimeout(()=>{
      this.share(imageUrl);
    },5000)
  }
  share(url){
    console.log("getting file")
    getImage(url).then((r)=> {
        //// Argument (r) is File!
        console.log("file  complete")
        shareInstagram(r);
    }, (e)=> {
        //// Argument (e) is Error!
    });
  }
}
