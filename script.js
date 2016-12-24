	var canvas = document.getElementById('myCanvas');
	var context = canvas.getContext('2d');
	var canvasWidth = canvas.width;
	var canvasHeight = canvas.height;

	var Circle = function(centerX, centerY, radius){
		this.center = {x: centerX, y: centerY};
		this.radius = radius;
		this.incrementX = true;
		this.incrementY = false;
	}

	Circle.prototype.drawCircle = function(){
		console.log('circle created')
		context.beginPath();
		context.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI, false);
		context.fillStyle = 'green';
		context.fill();
		context.lineWidth = 3;
		context.strokeStyle = '#003300';
		context.stroke();	
	};

	Circle.prototype.removeCircle = function(){
		context.beginPath();
		context.arc(this.center.x, this.center.y, this.radius*2, 0, 2 * Math.PI, false);
		context.fillStyle = 'white';
		context.fill();
		context.lineWidth = 3;
		context.strokeStyle = '#ffffff';
		context.stroke();
	};

	Circle.prototype.detectCollision = function(){
		if( (this.center.x + this.radius) > canvasWidth){
			this.incrementX = false;
		}
		if( (this.center.x - this.radius) < 0){
			this.incrementX = true;
		}
		if( (this.center.y + this.radius) > canvasHeight){
			this.incrementY = false;		
		}
		if( (this.center.y - this.radius) < 0){
			this.incrementY = true;
		}
	}

	Circle.prototype.calculateNewCenter = function(){
		if(this.incrementX){
			++this.center.x;
		}else {
			--this.center.x;
		}

		if(this.incrementY){
			this.center.y++;
		}else {
			this.center.y--;
		}
	};

	Circle.prototype.moveCircle = function(){
		this.removeCircle();
		this.detectCollision();
		this.calculateNewCenter()
		this.drawCircle();	
	};

	centerX = Math.floor(Math.random()*canvasWidth);
	centerY = Math.floor(Math.random()*canvasHeight);
	radius = 15;

	var circle = new Circle(centerX, centerY, radius);
	circle.drawCircle();

	var c = new Circle(0,canvasHeight,5);
	c.drawCircle();

	setInterval(function(){ circle.moveCircle(); }, 15);