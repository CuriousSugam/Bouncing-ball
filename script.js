	var canvas = document.getElementById('myCanvas');
	var context = canvas.getContext('2d');
	var canvasWidth = canvas.width;
	var canvasHeight = canvas.height;
	var circles = [];

	var Circle = function(center, radius){
		this.center = center;
		this.radius = radius;
		this.incrementX = true;
		this.incrementY = false;
		this.interval;
	}

	Circle.prototype.drawCircle = function(){
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
		context.arc(this.center.x, this.center.y, this.radius+1, 0, 2 * Math.PI, false);
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
		var that = this;
		this.interval = setInterval(function(){
			that.removeCircle();
			that.detectCollision();
			that.calculateNewCenter()
			that.drawCircle();
			that.circleIntersection();
		}, 15);
	};

	Circle.prototype.circleIntersection = function(){
		var currentCircleContext = this;
		circles.forEach( function(element, index) {
			if( element != currentCircleContext){
				// check if the circle touch any other circle
				var distance = Math.pow((currentCircleContext.radius + element.radius), 2);
				var calculatedDistance = Math.pow((element.center.x - currentCircleContext.center.x), 2) 
				+ Math.pow((element.center.y - currentCircleContext.center.y), 2);
				if(calculatedDistance <= distance){
					currentCircleContext.removeCircle();
					element.removeCircle();
					circles.splice(circles.indexOf(currentCircleContext), 1);
					circles.splice(circles.indexOf(element), 1);
					clearInterval(currentCircleContext.interval);
					clearInterval(element.interval);
				}
			}
		});
	}

	Circle.prototype.start = function(){
		this.drawCircle();
		this.moveCircle();
		circles.push(this);
	};

	function randomCenter(){
		return {
			x: Math.floor(Math.random()*canvasWidth),
			y: Math.floor(Math.random()*canvasHeight)
		}
	}

	radius = 15;
	c = []
	for (var i = 0; i < 5; i++) {
		c[i] = new Circle(randomCenter(), radius);
		c[i].start();
	}
	