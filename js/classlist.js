function classList() {
	this.a = new Array();
	this.b = new Array();

	this.a = [];
	this.b = [];


	this.appendToA = function(classtoadd) {
		this.a[this.a.length] = classtoadd;
	}

	this.appendToB = function(classtoadd) {
		this.b[this.b.length] = classtoadd;
	}
}

function singleClass(theclass, starttime, endtime) {
	this.class = theclass;
	this.startTime = starttime;
	this.endTime = endtime
}