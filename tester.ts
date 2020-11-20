type Test = {
	name: string
	fn: () => void
}

type Reporter = {
	log(message?: any, ...optionalParams: any[]): void
	error(message?: any, ...optionalParams: any[]): void
}

// `tests` is a singleton variable that will contain all our tests
var tests: Test[] = []

// The test function accepts a name and a function
function test(name: string, fn: () => void) {
	// it pushes the name and function as an object to
	// the `tests` array
	tests.push({ name, fn })
}

function run(ts: Test[], reporter: Reporter) {
	// `run` runs all the tests in the `tests` array
	ts.forEach(t => {
		// For each test, we try to execute the
		// provided function. 
		try {
			t.fn()
			// If there is no exception
			// that means it ran correctly
			reporter.log('✅', t.name)
		} catch (e) {
			// Exceptions, if any, are caught
			// and the test is considered failed
			reporter.error('❌', t.name)
			// log the stack of the error
			reporter.error(e.stack)
		}
	})
}

// Get the list of files from the command line
// arguments
const files = process.argv.slice(2)

// expose the test function as a global variable
global.test = test
global.run = run
global.tests = tests

// Load each file using `require`
files.forEach(file => {
	// Once a file is loaded, it's tests are
	// added to the `tests` singleton variable
	require(file)
})

// Now that all the tests from all the files are
// added, run them one after the other
run(tests, console) 
