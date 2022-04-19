const lineType = {
    "px": {
        plustime: [1, 0, 0, 0],
        facing: {
            "pz": "c",
            "nz": "d",
            "py": "e",
            "ny": "f",
        }
    },
    "py": {
        plustime: [0, 1, 0, 0],
        facing: {
            "px": "g",
            "nx": "h",
            "pz": "i",
            "nz": "j",
        }
    },
    "pz": {
        plustime: [0, 0, 1, 0],
        facing: {
            "ny": "k",
            "py": "l",
            "px": "n",
            "nx": "m",
        }
    },
    "nx": {
        plustime: [-1, 0, 0, 0],
        facing: {
            "pz": "o",
            "nz": "p",
            "py": "q",
            "ny": "r",
        }
    },
    "ny": {
        plustime: [0, -1, 0, 0],
        facing: {
            "pz": "o",
            "nz": "p",
            "py": "q",
            "ny": "r",
        }
    },
    "nz": {
        plustime: [0, 0, -1, 0],
        facing: {
            "ny": "w",
            "py": "x",
            "nx": "y",
            "px": "z",
        }
    }
}
function drawLine(startPos, direction, facing, length, color) {
    var drawType = lineType[direction]
    var senondChar = drawType.facing[facing]
    var residuelength = length; //剩余要绘制的长度
    var currentLength = 1024; //最开始绘制的长度
    var currentPosX = startPos.x;
    var currentPosY = startPos.y;
    var currentPosZ = startPos.z; //每次绘制的起点
    while (residuelength > 0) {
        if (currentLength > residuelength) {//大于剩余长度，进行除法
            currentLength = currentLength / 2;
        } else {
            mc.spawnParticle(currentPosX, currentPosY, currentPosZ, startPos.dimid, "pf:L" + senondChar + String(Math.floor(currentLength)) + "L" + color + "b");//绘制粒子
            residuelength -= currentLength;
            currentPosX+=drawType.plustime[0]*currentLength;
            currentPosY+=drawType.plustime[1]*currentLength;
            currentPosZ+=drawType.plustime[2]*currentLength;
        }
    }

}
function drawSurfaceY(x,z,dx,dz,y,dimid,color,offset=0.02,facingTop=true,playerPos=null){
    if(playerPos===null){
        //画四条线
        drawLine({x:x-offset,y:y,z:z-offset,dimid:dimid},"px",facingTop?"py":"ny",dx,color);
        drawLine({x:x-offset,y:y,z:z-offset,dimid:dimid},"pz",facingTop?"py":"ny",dz,color);
        drawLine({x:x-offset,y:y,z:z+dz+offset,dimid:dimid},"px",facingTop?"py":"ny",dx,color);
        drawLine({x:x+dx+offset,y:y,z:z-offset,dimid:dimid},"pz",facingTop?"py":"ny",dz,color);
    }
}
function drawSurfaceX(y,z,dy,dz,x,dimid,color,offset=0.02,facingEast=true,playerPos=null){
    if(playerPos===null){
        //画四条线
        drawLine({x:x,y:y-offset,z:z-offset,dimid:dimid},"py",facingEast?"px":"nx",dy,color);
        drawLine({x:x,y:y-offset,z:z-offset,dimid:dimid},"pz",facingEast?"px":"nx",dz,color);
        drawLine({x:x,y:y-offset,z:z+dz+offset,dimid:dimid},"py",facingEast?"px":"nx",dy,color);
        drawLine({x:x,y:y+dy+offset,z:z-offset,dimid:dimid},"pz",facingEast?"px":"nx",dz,color);

    }
}
function drawSurfaceZ(x,y,dx,dy,z,dimid,color,offset=0.02,facingSouth=true,playerPos=null){
    if(playerPos===null){
        //画四条线
        drawLine({x:x-offset,y:y-offset,z:z,dimid:dimid},"px",facingSouth?"pz":"nz",dx,color);
        drawLine({x:x-offset,y:y-offset,z:z,dimid:dimid},"py",facingSouth?"pz":"nz",dy,color);
        drawLine({x:x-offset,y:y+dy+offset,z:z,dimid:dimid},"px",facingSouth?"pz":"nz",dx,color);
        drawLine({x:x+dx+offset,y:y-offset,z:z,dimid:dimid},"py",facingSouth?"pz":"nz",dy,color);

    }
}
function drawCube(x,y,z,dx,dy,dz,dimid,color,offset=0.02,doubleSence=false){
    drawSurfaceY(x,z,dx,dz,y-offset,dimid,color,offset,false);
    drawSurfaceY(x,z,dx,dz,y+dy+offset,dimid,color,offset,true);
    drawSurfaceX(y,z,dy,dz,x-offset,dimid,color,offset,false);
    drawSurfaceX(y,z,dy,dz,x+dx+offset,dimid,color,offset,true);
    drawSurfaceZ(x,y,dx,dy,z-offset,dimid,color,offset,false);
    drawSurfaceZ(x,y,dx,dy,z+dz+offset,dimid,color,offset,true);
    if(doubleSence){
        drawSurfaceY(x,z,dx,dz,y-offset,dimid,color,offset,true);
        drawSurfaceY(x,z,dx,dz,y+dy+offset,dimid,color,offset,false);
        drawSurfaceX(y,z,dy,dz,x-offset,dimid,color,offset,true);
        drawSurfaceX(y,z,dy,dz,x+dx+offset,dimid,color,offset,false);
        drawSurfaceZ(x,y,dx,dy,z-offset,dimid,color,offset,true);
        drawSurfaceZ(x,y,dx,dy,z+dz+offset,dimid,color,offset,false);
    }
}
lxl.export(drawCube,"xmmppsjs_drawCube")