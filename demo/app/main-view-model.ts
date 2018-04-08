import { Observable } from 'tns-core-modules/data/observable';
import { InstagramShare } from 'nativescript-instagram-share';

export class HelloWorldModel extends Observable {
  public message: string;
  private instagramShare: InstagramShare;

  constructor() {
    super();

    this.instagramShare = new InstagramShare();
    this.message = this.instagramShare.message;
  }
}
