# Changelogs:

## Modified:
- viewDetails
- navigationBar
- MeetingForm

## `Bugs`:
- icon in contact does not work, don't know why, somebody please fix
- logo in my page does not work `navBar`    


# INSTRUCTION FOR AUTH0:
https://docs.google.com/document/d/1LAGecNNdEr2tOjjm9eEe6AdkPSyLVQckuLSNnFtcTkQ/edit?usp=sharing

## Note:
- in `components` folder, please put the same directory of components existing in `pages` in to the same name folder. More specficially, If multiple pages share the same components, put it inside `components` directory but outside `folder that have the same name with pages`.
For example:
```
components
|
|-- footer.js
|-- navbar.js
|---- homepage
|------- AdsBanner.js
|------- Location.js
|------- Contact.js
|---- rental
|---- viewDetails
```
This apply the same for `img` folder

Feel free to add bootstrap page structures as long as they have the same white background and same button blue theme

### `Task done`:
- Modified Home page using Bootstrap


### `TODO`:
- download this bootstrap: https://bootstrapmade.com/flexstart-bootstrap-startup-template/
- `viewDetails` take a look at details and follow the same style, the slider(`ads`) can be used again in this page
- `rental` feel free to add a bootstrap on it but take a look at AirBnB page: https://www.airbnb.com/s/homes?search_mode=flex_destinations_search&date_picker_type=flexible_dates&flex_destinations_session_id=fe80344f-5248-47e1-b6f7-ae1789f3b23d



