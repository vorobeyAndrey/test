
	/************************************************
	* Please don`t change the code bellow this line *
    ************************************************/
    console.log('123123123')
    function Parallel(options) {
        this.counter = 0
        this.jobs = []
        this.results = []
        this.options = options
        
        function getResults (data) {
            return data
        }

        function addResults (self, list) {
            for (var i =0; i < list.length; i++) {
                // self.results.push(list[i]())
                console.log(list[i]())
            }
            
        }

        this.job = function (stepFun) {
            var i = this.counter%this.options.parallelJobs
                if (this.jobs[i]) {
                    this.jobs[i].push(function() {
                        var t = stepFun(getResults)
                        return t
                    })
                } else {
                    this.jobs[i] = []
                    this.jobs[i].push( function() {
                        var t = stepFun(getResults)
                        return t
                    })
                }

            this.counter++
            return this
        }
        this.done = function (onDone) {    
            console.log(this.jobs)  
            var results = []
            for (var i =0; i < this.jobs.length; i++ ) {
              addResults(this, this.jobs[i])  
            }
            console.log(this.results)
            // for (var i =0; i<this.jobs.length; i++){
            //     this.jobs[i].then(function (data) {
            //         console.log(data, '!!!')
            //     })
            // }
        }
    }

    Parallel.prototype.job = function(stepFun) {

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