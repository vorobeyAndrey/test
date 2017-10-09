
	/************************************************
	* Please don`t change the code bellow this line *
    ************************************************/
   function Parallel(options) {
        this.counter = 0
        this.jobs = []
        this.options = options
    }

    Parallel.prototype.job = function (stepFun) {
        var i = this.counter % this.options.parallelJobs
        if (this.jobs[i]) {
            this.jobs[i].push(stepFun)
        } else {
            this.jobs[i] = []
            this.jobs[i].push(stepFun)
        }

        this.counter++
        return this
    }

  Parallel.prototype.done = function (onDone) {
      var results = []
      var self = this
      var parallelJobsLength = this.jobs[0].length

      for (var i =0; i < parallelJobsLength; i++) {
          for (var n =0; n < self.jobs.length; n++) {
              if (this.jobs[n][i]) {
                  var promise = new Promise(function (resolve, reject) {
                      self.jobs[n][i](resolve)
                  })
                  results.push(promise)
              }
          }
      }
      Promise.all(results).then(function(data) {
          onDone(data)
      })
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
