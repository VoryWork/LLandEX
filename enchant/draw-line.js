function drawLine(startPos, direction, length, color) {
    var ps = mc.newParticleSpawner();
    ps.drawAxialLine(startPos, direction, length, color);
}
function drawSurfaceY(
    x,
    z,
    dx,
    dz,
    y,
    dimid,
    color,
    offset = 0.02,
    facingTop = true
) {
    //画四条线
    drawLine(
        mc.newFloatPos(x - offset, y, z - offset, dimid),
        Direction.POS_X,
        facingTop ? Direction.POS_Y : Direction.NEG_Y,
        dx,
        color
    );
    drawLine(
        mc.newFloatPos(x - offset, y, z - offset, dimid),
        Direction.POS_Z,
        facingTop ? Direction.POS_Y : Direction.NEG_Y,
        dz,
        color
    );
    drawLine(
        mc.newFloatPos(x - offset, y, z + dz + offset, dimid),
        Direction.POS_X,
        facingTop ? Direction.POS_Y : Direction.NEG_Y,
        dx,
        color
    );
    drawLine(
        mc.newFloatPos(x + dx + offset, y, z - offset, dimid),
        Direction.POS_Z,
        facingTop ? Direction.POS_Y : Direction.NEG_Y,
        dz,
        color
    );
}
function drawSurfaceX(
    y,
    z,
    dy,
    dz,
    x,
    dimid,
    color,
    offset = 0.02,
    facingEast = true
) {
    //画四条线
    drawLine(
        mc.newFloatPos(x, y - offset, z - offset, dimid),
        Direction.POS_Y,
        facingEast ? Direction.POS_X : Direction.NEG_X,
        dy,
        color
    );
    drawLine(
        mc.newFloatPos(x, y - offset, z - offset, dimid),
        Direction.POS_Z,
        facingEast ? Direction.POS_X : Direction.NEG_X,
        dz,
        color
    );
    drawLine(
        mc.newFloatPos(x, y - offset, z + dz + offset, dimid),
        Direction.POS_Y,
        facingEast ? Direction.POS_X : Direction.NEG_X,
        dy,
        color
    );
    drawLine(
        mc.newFloatPos(x, y + dy + offset, z - offset, dimid),
        Direction.POS_Z,
        facingEast ? Direction.POS_X : Direction.NEG_X,
        dz,
        color
    );
}
function drawSurfaceZ(
    x,
    y,
    dx,
    dy,
    z,
    dimid,
    color,
    offset = 0.02,
    facingSouth = true
) {
    //画四条线
    drawLine(
        mc.newFloatPos(x - offset, y - offset, z, dimid),
        Direction.POS_X,
        facingSouth ? Direction.POS_Z : Direction.NEG_Z,
        dx,
        color
    );
    drawLine(
        mc.newFloatPos(x - offset, y - offset, z, dimid),
        Direction.POS_Y,
        facingSouth ? Direction.POS_Z : Direction.NEG_Z,
        dy,
        color
    );
    drawLine(
        mc.newFloatPos(x - offset, y + dy + offset, z, dimid),
        Direction.POS_X,
        facingSouth ? Direction.POS_Z : Direction.NEG_Z,
        dx,
        color
    );
    drawLine(
        mc.newFloatPos(x + dx + offset, y - offset, z, dimid),
        Direction.POS_Y,
        facingSouth ? Direction.POS_Z : Direction.NEG_Z,
        dy,
        color
    );
}
function drawCube(
    x,
    y,
    z,
    dx,
    dy,
    dz,
    dimid,
    color,
    offset = 0.02,
    doubleSence = false
) {
    drawSurfaceY(x, z, dx, dz, y - offset, dimid, color, offset, false);
    drawSurfaceY(x, z, dx, dz, y + dy + offset, dimid, color, offset, true);
    drawSurfaceX(y, z, dy, dz, x - offset, dimid, color, offset, false);
    drawSurfaceX(y, z, dy, dz, x + dx + offset, dimid, color, offset, true);
    drawSurfaceZ(x, y, dx, dy, z - offset, dimid, color, offset, false);
    drawSurfaceZ(x, y, dx, dy, z + dz + offset, dimid, color, offset, true);
    if (doubleSence) {
        drawSurfaceY(x, z, dx, dz, y - offset, dimid, color, offset, true);
        drawSurfaceY(
            x,
            z,
            dx,
            dz,
            y + dy + offset,
            dimid,
            color,
            offset,
            false
        );
        drawSurfaceX(y, z, dy, dz, x - offset, dimid, color, offset, true);
        drawSurfaceX(
            y,
            z,
            dy,
            dz,
            x + dx + offset,
            dimid,
            color,
            offset,
            false
        );
        drawSurfaceZ(x, y, dx, dy, z - offset, dimid, color, offset, true);
        drawSurfaceZ(
            x,
            y,
            dx,
            dy,
            z + dz + offset,
            dimid,
            color,
            offset,
            false
        );
    }
}
lxl.export(drawCube, "xmmppsjs_drawCube");
