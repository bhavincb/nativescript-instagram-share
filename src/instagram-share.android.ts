
import * as application from "tns-core-modules/application";
import * as imageSource from "tns-core-modules/image-source";
import * as platform from "tns-core-modules/platform";
export function shareInstagram(image:imageSource.ImageSource):Promise<any>{
    return new Promise((resolve,reject)=>{
        // let uri= android.net.Uri.parse("file://"+path);
        // console.log(uri.toString())
        // // Uri resimUri = Uri.parse(path_str);
        // let imgFile = new java.io.File(uri.getPath());
        // console.log(uri.toString())
        // if (imgFile.exists()) {
        // // file exists
        //     console.log("file 6")
        // }else {
        // // file is not there
        //     console.log("file nathi")
        // }

        let context = application.android.context;
        
        try{
            let info=context.getPackageManager().getApplicationInfo("com.instagram.android", 0);
        }catch(e){
            reject("instagram not installed");
        }

        let stream = new java.io.ByteArrayOutputStream();
        image.android.compress(android.graphics.Bitmap.CompressFormat.JPEG, 100, stream);

        let imageFileName = "bunkersharing" + "0" + ".jpg";
        let newFile = new java.io.File(context.getExternalFilesDir(null), imageFileName);
        
        
        let fos = new java.io.FileOutputStream(newFile);
        fos.write(stream.toByteArray());

        fos.flush();
        fos.close();
        let uri= android.net.Uri.parse(newFile.toURI().toString());
        // console.log(uri.toString());
        // let imgFile = new java.io.File(uri.getPath());
        // if (imgFile.exists()) {
        // // file exists
        //     console.log("file 6")
        // }else {
        // // file is not there
        //     console.log("file nathi")
        // }

        // let sdkVersionInt = parseInt(platform.device.sdkVersion);
        // let uri;
        // if (sdkVersionInt >= 21) {
        //     uri = android.support.v4.content.FileProvider.getUriForFile(context, application.android.nativeApp.getPackageName() + ".provider", newFile);
        //     } else {
        //     uri = android.net.Uri.fromFile(newFile);
        // }
        //method 1(for some reasons not working trying to solve the problem)
        // let shareIntent = new android.content.Intent(android.content.Intent.ACTION_SEND);
        // shareIntent.setType("image/*"); // set mime type 
        // shareIntent.putExtra(android.content.Intent.EXTRA_TEXT,uri); // set uri 
        // shareIntent.setPackage("com.instagram.android");
        // context.startActivity(shareIntent);

        //to open as a file chooser
        // let shareInten = android.content.Intent.createChooser(shareIntent, "choose");
        // shareInten.setFlags(android.content.Intent.FLAG_ACTIVITY_NEW_TASK);
        // context.startActivity(shareInten);

        //method 2

        let shareIntent = new android.content.Intent(android.content.Intent.ACTION_SEND);
        shareIntent.setType("image/*"); // set mime type 
        shareIntent.putExtra(android.content.Intent.EXTRA_STREAM,uri); // set uri 
        
        //following logic is to avoide option menu, If you remove following logic then android will display list of application which support image/* mime type
        let pm:android.content.pm.PackageManager  = context.getPackageManager();
        
        let activityList = pm.queryIntentActivities(shareIntent, 0);
        for ( let i=0;i<activityList.size();i++) {
            let app=activityList.get(i);
            if (app.activityInfo.name.indexOf("instagram")!=-1) { // search for instagram from app list
                let activity = app.activityInfo;
                let name = new android.content.ComponentName(activity.applicationInfo.packageName, activity.name); 
                shareIntent.addCategory(android.content.Intent.CATEGORY_LAUNCHER);
                shareIntent.setFlags(android.content.Intent.FLAG_ACTIVITY_NEW_TASK |android.content.Intent.FLAG_ACTIVITY_RESET_TASK_IF_NEEDED);
                shareIntent.setComponent(name); // set component 
                context.startActivity(shareIntent);
                resolve(true);
                break;
            }
        }
        reject("instagram not installed");
    });
    
}
