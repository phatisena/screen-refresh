//%block="AutoRefesh"
//%color="#357cf0"
//%icon="\uf26c"
namespace srcRefesh {

    let cursrcimg: Image = null

    export function createRenderable(index: number, handler: (screen: Image) => void) {
        scene.createRenderable(index, handler);
    }

    export function drawTransparentImage(src: Image, to: Image, x: number, y: number) {
        if (!src || !to) { return; }
        to.drawTransparentImage(src, x, y);
    }

    export function CheckSrcImg(Simg: Image = image.create(scene.screenWidth(), scene.screenHeight())) {
        if ((cursrcimg) && (Simg.equals(cursrcimg) && !(Simg.equals(image.create(scene.screenWidth(), scene.screenHeight()))))) {
            return cursrcimg.clone()
        }
        cursrcimg = (Simg.clone())
        return Simg.clone()
    }

    //%blockid=autosrc_autorefeshsrc
    //%block="Get auto screen refesh $Auto in frame $Fimg || in Z-index $Zidx"
    //%group="auto screen refesh"
    export function SetAutoRefesh (Auto: boolean = false, Fimg: number = 0, Zidx: number = 0) {
        let srcimg = image.create(scene.screenWidth(), scene.screenHeight())
        let uimg = image.create(scene.screenWidth(), scene.screenHeight())
        let Sidx = 999999999999
        let Flimg = Math.floor(1000 / Fimg)
        if (Zidx > 0) { Sidx = Zidx}
        createRenderable(Sidx, function(srcimg) {
            if (Auto) {
                if (Fimg <= 0 || (Fimg > 0 && game.runtime() % Flimg == 0)) {
                    uimg = CheckSrcImg(srcimg)
                }
                drawTransparentImage(uimg, srcimg, 0, 0)
            }
        })
    }
}
