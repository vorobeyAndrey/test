
/************************************************
 * Please don`t change the code bellow this line *
 ************************************************/
function Parallel(options) {
	this.steps = []
	this.options = options
}

Parallel.prototype.job = function (stepFun) {
	this.steps.push({value: stepFun, result: null})
	return this
}

Parallel.prototype.done = function (onDone) {
	var self = this
	var promises = []
	var commonCount = Math.ceil(this.steps.length / this.options.parallelJobs)

	for(var i = 0; i< self.options.parallelJobs; i++) {
		var startPoint = i * commonCount
		var steps = self.steps.slice(startPoint, startPoint + commonCount)
		promises.push(runThread(steps, 0))
	}

	Promise.all(promises).then(function(res) {
		var results = self.steps.map(function(step){return step.result})
		onDone(results)
	})

	function runThread (jobs, length) {
		if (jobs.length === length) return

		return new Promise(function (resolve, reject) {
			jobs[length].value(resolve)
		}).then(function (data) {
				jobs[length].result = data
				return runThread(jobs, length + 1)
			})
	}
}

var runner = new Parallel({
	parallelJobs: 2
});

runner.job(step1)
	.job(step2)
	.job(step3)
	.job(step4)
	.done(onDone);

function step1(done) {
	console.log('step1');
	setTimeout(done, 1000, 'hello world');
}

function step2(done) {
	console.log('step2');
	setTimeout(done, 1200, 'Job succeded');
}

function step3(done) {
	console.log('step3');
	setTimeout(done, 1500, 'step3');
}

function step4(done) {
	console.log('step4');
	setTimeout(done, 100, 'step4');
}

var isPassed = false;
function onDone(results) {
	console.log('onDone', results);
	console.assert(Array.isArray(results), 'expect result to be array');
	console.assert(results[0] === 'hello world', 'Wrong answer 1');
	console.assert(results[1] === 'Job succeded', 'Wrong answer 2');
	console.assert(results[2] === 'step3', 'Wrong answer 3');
	console.assert(results[3] === 'step4', 'Wrong answer 4');
	console.log('Thanks, all works fine');
	isPassed = true;
}

setTimeout(function(){
	if(isPassed) return;
	console.error('Test is not done.');
}, 10000);
