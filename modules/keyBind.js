const keyBinds = {
    KeyW: "up1",
    KeyA: "left1",
    KeyS: "down1",
    KeyD: "right1",
    ControlLeft:"bomb1",
    ArrowUp: "up2",
    ArrowLeft: "left2",
    ArrowDown: "down2",
    ArrowRight: "right2",
    ControlRight:"bomb2"
};

export function getKeyBind(key) {
    if (keyBinds[key]) {
        return keyBinds[key];
    }
}