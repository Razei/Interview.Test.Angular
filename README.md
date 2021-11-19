A junior developer has just accomplished a task suspicously fast...and went for lunch.
There are now unit tests breaking on the build server and only you have the skills to fix it.

You should 

  - Fix the broken unit test
  - Make sure there is adequate test coverage.
  - Make sure all code is clean and follows best practices 


### Complete the following - to the best of your ability 
- [x] src\app\app.component.html -  how could we organize the html better?
  - Implemented *ngFor instead of hard coded array indexing

- [x] src\app\app.component.scss - how can we make this more re-usable? 
  - Originally I implemented variables as `$border-width`, `$border-style` etc to make the values re-usable, but then I realized they could be refactored since `.diploma` and `.student` seemed to have the same base styling. Any differences in colour for example, were done in a separate definition.

- [x] src\app\app.component.ts - what would happen if hasGraduated ran more then once? Is there a way to centralize this method?
  - The `hasGraduated` function was being called in the HTML template. This could cause potentially unwanted function calls when Angular's change detection is triggered elsewhere on the page. 
  - I added a pipe to solve this, however, if the design is meant to display the credits, boolean and average in separate places, this approach wouldn't work.
  - One idea I had was to calculate if each student listed has graduated in the onInit lifecycle hook and add them directly to the student object as properties.

- [x] src\app\app.component.ts - there is a code smell here, could we improve the readability of hasGraduated? Which SOLID principle could we apply here? Give it a try and implement
  - Moved logic to pipe 
    - Getting average logic moved into a new function for Single Responsibility Principle
    - Refactored return logic to eliminate need for extra decision
    - Create separate repository classes for Single Responsibility Principle
    - Validate average to prevent NaN being returned for averages with value 0

- [x] src\app\app.component.spec.ts - `it('should have credits` unit test should have at least 1 graduate, can you fix the code to make the test pass? 
  - Fixed, and added more coverage for switch case.

All joking aside, there is no need to finish this in the span of a lunch hour. 

The test is so you can show us what clean code looks like. Clean it up as best you can!

You will be joining a team that believes in SOLID Design principles. We favour declarative over imperative programming.

Submissions that follow these principles will be favored since you will fit right in with the current team. If there is a part of the test that blocks you from completing it, then put some comments explaining why it was blocking, and what you would have done if the obstacle was removed.

Good Luck!
