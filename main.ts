//%block="AutoRefesh"
//%color="#357cf0"
//%icon="\uf26c"
namespace srcRefesh {

    let cursrcimg: Image = image.create(scene.screenWidth(), scene.screenHeight())

    export function createRenderable(index: number, handler: (screen: Image) => void) {
        scene.createRenderable(index, handler);
    }

    export function drawTransparentImage(src: Image, to: Image, x: number, y: number) {
        if (!src || !to) { return; }
        to.drawTransparentImage(src, x, y);
    }

    export function CheckSrcImg(Simg: Image = image.create(scene.screenWidth(), scene.screenHeight())) {
        if (Simg.equals(cursrcimg) && !(Simg.equals(image.create(scene.screenWidth(), scene.screenHeight())))) {
            return false
        }
        cursrcimg = (Simg.clone())
        return true
    }

    //%blockid=autosrc_autorefeshsrc
    //%block="Get auto screen refesh $Auto || in Z-index $Zidx"
    //%group="auto screen refesh"
    export function SetAutoRefesh (Auto: boolean = false, Zidx: number = 0) {
        let srcimg = image.create(scene.screenWidth(), scene.screenHeight())
        let uimg = image.create(scene.screenWidth(), scene.screenHeight())
        let Sidx = 999999999999
        if (Zidx > 0) { Sidx = Zidx}
        createRenderable(Sidx, function(srcimg) {
            uimg = image.create(scene.screenWidth(), scene.screenHeight())
            if (Auto) {
                if (CheckSrcImg(srcimg)) {
                    uimg = image.screenImage()
                    drawTransparentImage(uimg, srcimg, 0, 0)
                }
            }
        })
    }
}
