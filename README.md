# NX Benchmark

This is a [TodoMVC](http://todomvc.com/) benchmark for NX, React, Angular, Vue and Polymer.
If you would like to know more about NX, please visit the [home page](http://nx-framework.com/).

## About the benchmark

The actual benchmark is located in the `benchmark.js` file.
It runs the same series of steps and measures the reaction time for each framework.
Steps are deferred by `requestAnimationFrame()` to ensure a DOM update and render after each step.
This makes the benchmark more of a user experience measurement, than a raw performance test.
Frameworks are only 'punished' if a reaction is slower than the time between two frames.  

## Trying the benchmark

You can try out the benchmark on the NX [home page](http://nx-framework.com/).
