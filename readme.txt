Parking spaces

To manage parking spaces, a firm designed a client-server system.
The server provides a list of parking spaces, each space having the following props
  id - integer,
  number - string,
  status - string with values 'free' or 'taken',
  takenBy - string
Develop a mobile application (client) as follows.

1. When the app is started, a (first) screen allows the user to enter
a username and to trigger a 'Next' button in order to navigate to the second screen [1p].
When the user restarts the app and previously he/she pressed the 'Next' button,
automatically the app navigates to the second screen [1p].

2. In the context of the second screen, the app fetches the parking spaces via GET /space [1p].
A list shows the parking spaces [0.5p], for each space showing its number and status [0.5p].

3. When the user clicks on an entry of this list, if that entry represents:
(a) a free space, the entry will be expanded and it will also show a 'Take' button [0.75p].
(b) a taken space taken by the current user (takenBy = username), the entry will be
expanded and it will also show a 'Release' button [0.75p]

4. When the user clicks on 'Take' & 'Release' buttons the app will update the space
using PUT /space/:id, including in the request body the space with updated status
('taken', respectively 'free') and takenBy (username, respectively '') [1.5p].
If the PUT operation succeeds, the list will be updated [0.5p].
If the PUT operation fails, the entire list will be re-fetched and updated [0.5p].

5. Whenever the app performs HTTP operations, it shows a progress indicator [0.5p].
Any IO errors will be reported to the user [0.5p].
