  // Drawing stuff

  //Red Square
    ctx.beginPath();
	ctx.rect(20, 40, 50, 50);
	ctx.fillStyle = "#FF0000";
	ctx.fill();
	ctx.closePath();
	//Green Circle
	ctx.beginPath();
	ctx.arc(240, 160, 20, 0, Math.PI*2, false);
	ctx.fillStyle = "green";
	ctx.fill();
	ctx.closePath();
	//Transparent Rectangle
	ctx.beginPath();
	ctx.rect(160, 10, 100, 40);
	ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
	ctx.stroke();
	ctx.closePath();