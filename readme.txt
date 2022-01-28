Tests

To evaluate the participants in a course, a teacher designed a client-server system.
The server provides a list of questions, each question having the following props
  id - integer,
  text - string,
  options - a list of possible answers/options.
Develop a mobile application (client) as follows.

1. When the app starts the very first time, it fetches the question ids via GET /question, the server
returning an array of identifiers [1p]. The questions ids will be persisted locally, so when the app
is restarted it will not re-fetch the question ids [1p].

2. After completing step 1, the app will allow the participant to answer the questions, one by one.
(a) The current question is fetched from the server via GET /question/id [1p].
(a) For a given question, its text is shown and a list of options [1p].
(b) In order to answer to the current question, the participant selects an option
    (the application will highlight the selection made) and triggers a 'Next' button [1p].

3. The app will persist the index of the current question and the options selected for the previous questions.
When the app is restarted/refreshed it will show directly the first question the user hasn't answered yet [1p].

4. When the user clicks the 'Next' button in the context of the last question:
(a) all selected options will be sent to the server via POST /answer, including in the request body an array
of objects { questionId, option }, e.g. [{"questionId": 10, "option": 1}, etc] [1p]
(b) the app will show the number of correct answers returned by the post operation [1p].

5. Whenever the app performs HTTP operations, it shows a progress indicator [0.5p].
Any IO errors will be reported to the user [0.5p].
