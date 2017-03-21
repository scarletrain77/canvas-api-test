namespace engine {
    export namespace RES {
        var RESOURCE_PATH = "././Resources/";
        export function getRes(path: string) {
            let image = document.createElement("img");
            image.src = RESOURCE_PATH + path;
            return image;
           /* return new Promise(function (resolve, reject) {
                var result = new Image();
                result.src = RESOURCE_PATH + path;
                result.onload = () => {
                    resolve(result);
                }
            });*/
        }
    }
}