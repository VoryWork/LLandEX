"use strict";
function drawLine(startPos, direction, length, color) {
    var ps = mc.newParticleSpawner();
    ps.drawAxialLine(startPos, direction, length, color);
}
function drawSurfaceY(x, z, dx, dz, y, dimid, color) {
    //画四条线
    drawLine(mc.newFloatPos(x, y, z, dimid), Direction.POS_X, dx, color);
    drawLine(mc.newFloatPos(x, y, z, dimid), Direction.POS_Z, dz, color);
    drawLine(mc.newFloatPos(x, y, z + dz, dimid), Direction.POS_X, dx, color);
    drawLine(mc.newFloatPos(x + dx, y, z, dimid), Direction.POS_Z, dz, color);
}
function drawSurfaceX(y, z, dy, dz, x, dimid, color) {
    //画四条线
    drawLine(mc.newFloatPos(x, y, z, dimid), Direction.POS_Y, dy, color);
    drawLine(mc.newFloatPos(x, y, z, dimid), Direction.POS_Z, dz, color);
    drawLine(mc.newFloatPos(x, y, z + dz, dimid), Direction.POS_Y, dy, color);
    drawLine(mc.newFloatPos(x, y + dy, z, dimid), Direction.POS_Z, dz, color);
}
function drawSurfaceZ(x, y, dx, dy, z, dimid, color) {
    //画四条线
    drawLine(mc.newFloatPos(x, y, z, dimid), Direction.POS_X, dx, color);
    drawLine(mc.newFloatPos(x, y, z, dimid), Direction.POS_Y, dy, color);
    drawLine(mc.newFloatPos(x, y + dy, z, dimid), Direction.POS_X, dx, color);
    drawLine(mc.newFloatPos(x + dx, y, z, dimid), Direction.POS_Y, dy, color);
}
function drawCube(x, y, z, dx, dy, dz, dimid, color) {
    drawSurfaceY(x, z, dx, dz, y, dimid, color);
    drawSurfaceY(x, z, dx, dz, y + dy, dimid, color);
    drawSurfaceX(y, z, dy, dz, x, dimid, color);
    drawSurfaceX(y, z, dy, dz, x + dx, dimid, color);
    drawSurfaceZ(x, y, dx, dy, z, dimid, color);
    drawSurfaceZ(x, y, dx, dy, z + dz, dimid, color);
}
ll.export(drawCube, "xmmppsjs_drawCube");
