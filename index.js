var path = require('path'),
    async = require('async'), //https://www.npmjs.com/package/async
    newman = require('newman'),

    parametersForTestRun = {
        collection: path.join(__dirname, 'postman_collection.json'), // your collection
        environment: path.join(__dirname, 'integ.postman_environment.json'), //your env
        reporters: 'cli'
    };

parallelCollectionRun = function (done) {
    newman.run(parametersForTestRun, done);
};

let commands = []
for (let index = 0; index < 5; index++) {
    commands.push(parallelCollectionRun);
}

// Runs the Postman sample collection thrice, in parallel.
async.parallel(
    commands,
    (err, results) => {
        err && console.error(err);

        results.forEach(function (result) {
            var failures = result.run.failures;
            console.info(failures.length ? JSON.stringify(failures.failures, null, 2) :
                `${result.collection.name} ran successfully.`);
        });
    });
