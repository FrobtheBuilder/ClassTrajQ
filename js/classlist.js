function classList() {
	this.a = new Array();
	this.b = new Array();

	this.a = [];
	this.b = [];
	//These arrays are supposed to contain singleClass()es

	this.appendToA = function(classtoadd) {
		this.a[this.a.length] = classtoadd;
	}

	this.appendToB = function(classtoadd) {
		this.b[this.b.length] = classtoadd;
	}

	//Note that, while appending takes in a singleClass(), removing takes only an index.
	this.removeFromA = function(index) {
		this.a.splice(index, 1);
	}

	this.removeFromB = function(index) {
		this.b.splice(index, 1);
	}
}

function singleClass(theclass, starttime, endtime) {
	this.class = theclass;
	this.startTime = starttime;
	this.endTime = endtime
}