Anonymous quiz

To register anonymous quizzes, a trainer designed a client-server system.
The server emits web socket notifications (ws://localhost:3000) related to
questions, each notification containing a question in JSON with the following props
  id - integer,
  text - string.
The server also allows clients to POST answers to questions.
Develop a mobile application (client) as follows.

1. When the app is launched, it waits to receive a question, and displays to the user
'Waiting next question' [1p].

2. When a new question is received:
(a) if the user was waiting, the app will show the question, allowing the user
    to give an answer [1p]
(b) if the user was answering to a question, this new question will be ignored,
    and the user will be informed that a question was ignored [1p]

3. When the user answers to a question
(a) he/she enters a text into an input field then presses enter or clicks
    a button to submit the response [1p]
(b) the app sends the answer to the server via POST /answer, including in the request body
    { questionId, text }. The server will return { id, questionId, text, isCorrect } [1p]

4. If the POST operation succeeds:
(a) the answer will be added to a list, an entry of this list
    showing: question.text, answer.text, answer.isCorrect [1p]
    The content of this list will be persisted, so when the app is restarted,
    the list will present the persisted values [1p]
(b) the app enters the state 'Waiting next question' [1p]

5. Whenever the app performs HTTP operations, it shows a progress indicator [0.5p].
Any IO errors will be reported to the user [0.5p].
