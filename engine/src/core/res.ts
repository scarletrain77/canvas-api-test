namespace engine {
    export namespace RES {
        export function getRes(path: string) {
            return new Promise(resolve => {
                var result = new Image();
                result.src = "../resource/assets/" + path;
                result.onload = () => {
                    result.width = result.width;
                    result.height = result.height;
                    resolve(result);
                }
            });
        }
    }
}