import helloworld from "./helloworld";

test("test name!", () => {
	if (!helloworld()){
		throw new Error("test not implemented yet. Edit helloworld.test.ts")
	}
});
