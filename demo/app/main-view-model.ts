import { Observable } from 'tns-core-modules/data/observable';
import { shareInstagram } from 'nativescript-instagram-share';
import { getFile,getImage} from "tns-core-modules/http";
export class HelloWorldModel extends Observable {
  public message: string;
  public imageUrl="http://www.daycomsolutions.com/Support/BatchImage/HPIM0050w300.JPG";
  constructor() {
    super();
    
    // setTimeout(()=>{
      this.share();
    // },5000)
  }
  share(){
    let url=this.imageUrl;
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
