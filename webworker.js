self.onmessage = function(event) {
    const { startX, startY, tileX, tileY, tileWidth, tileHeight } = event.data;

    const tileCanvas = new OffscreenCanvas(tileWidth, tileHeight);
    const tileCtx = tileCanvas.getContext('2d');

    for (let y = 0; y < tileHeight; y++) {
        for (let x = 0; x < tileWidth; x++) {
            const worldX = startX + tileX + x;
            const worldY = startY + tileY + y;
            const color = OWOP.world.getPixel(worldX, worldY);
            if (color) {
                tileCtx.fillStyle = `rgb(${color[0]},${color[1]},${color[2]})`;
                tileCtx.fillRect(x, y, 1, 1);
            }
        }
    }

    self.postMessage({
        tileX,
        tileY,
        imageData: tileCtx.getImageData(0, 0, tileWidth, tileHeight)
    });
};
