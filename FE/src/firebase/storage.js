import {storage} from './config';

class Storage{
    constructor(){

    }
    async putFile(url,setTransferred, keyImage){
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                console.log(e);
                reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", url, true);
            xhr.send(null);
        });
        let filename = url.substring(url.lastIndexOf('/') + 1);

        // Add timestamp to File Name
        const extension = filename.split('.').pop();
        const name = filename.split('.').slice(0, -1).join('.');
        filename = name + Date.now() + '.' + extension;
        const uploadTask = storage.ref(`Product/P-${keyImage}-${filename}`).put(blob);
        uploadTask.on('state_changed', (taskSnapshot) => {
            console.log(
                `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
            );
            setTransferred(
                Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
                100,
            );
        });
        try {
            await uploadTask;
            const image_url = uploadTask.snapshot.ref.getDownloadURL();
            return image_url;
        } catch (e) {
            console.log(e);
            return null;
        }
    }
}
export default new Storage();
