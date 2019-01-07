var extern = function() {
    var intervl = 0;
    var active = false;
    
    function activate(event) {
        event.preventDefault();
        if (event.keyCode === 16 && !active) {
            active = true;
            intervl = setInterval(aimClosestPlayer, 10);
        }
    }

    function deactivate(event) {
        event.preventDefault();
        if (event.keyCode === 16) {
            active = false;
            clearInterval(intervl);
            intervl = 0;
        }
    }
    
    function aimClosestPlayer(){
        var distance = 1000;
        var cloestPlayer;
        var player;
        var d;
        for(var i = 0; i < players.length; i++){
            player = players[i];
            if(player && player.playing){
            if (player !=  me){
                d = Math.sqrt(Math.pow(me.x - player.x, 2) + Math.pow(me.y - player.y, 2) + Math.pow(me.z - player.z, 2));
                if (d < distance){
                    distance = d;
                    cloestPlayer = player;
                }
            }
            }
        }
   
        var dX = cloestPlayer.x - me.x;
        var dY = cloestPlayer.y - me.y;
        var dZ = cloestPlayer.z - me.z;

        var yaw = Math.atan2(dX,dZ);
        var pitch = Math.sin(dY/distance);

        var theta =(yaw)*180/Math.PI;
        if (theta < 0.0) {
            theta += 360.0;
        }
        theta = theta * Math.PI/180;
        yaw = theta;
        
        me.yaw = yaw;
        me.pitch = -pitch;
    }
    
    window.addEventListener("keydown", activate, false);
    window.addEventListener("keyup", deactivate, false);