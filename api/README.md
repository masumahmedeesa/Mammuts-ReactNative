### INDEX of RicordiController [for user only]
url: https://api.mammuts.it/ricordo?page=1


### legmai
url : http://127.0.0.1:8000/legami/f74cac7fe848ef08411414801e1a78dc
body: [
    {
        "id": 39,
        "nome": "Gianfranco",
        "cognome": "Lanzetta",
        "email": "gianfranco.lanzetta@gmail.com",
        "password": "93c19a90156260aacf8bef0a45079c52",
        "sesso": "M",
        "attivo": 1,
        "cf": "LNZGFR78L02ITAC",
        "cf_key": "b32dccdbe698fabdd8621dfb7213a58e",
        "catasto": "ITA",
        "data_nascita": "1978-07-02",
        "data_dipartita": null,
        "image_cover": null,
        "image_profile": null,
        "creato_da": null,
        "deceduto": 0,
        "notifiche": 0,
        "id_notifiche": "116aa886-9cb4-4200-b6f6-49d4ac381f4f"
    }
]

### Ricordi of first (showing latest post of course, only 11 of them)
url: http://127.0.0.1:8000/ricordiShowing/6
body: as below

### Stories of person showing (11 every page)
// pagination eikhane apatoto lagbe na
url: https://api.mammuts.it/ricordo/6?page=1
body: {
    "current_page": 1,
    "data": [
        {
            "id": 603,
            "id_utente": 6,
            "testo": "Fiona...Prima volta sul terrazzo ",
            "immagine": [
                "../upload/ricordo/ielN5nywHYRW.jpg"
            ],
            "id_legame": 6,
            "data_inserimento": "2021-02-01 00:01:28",
            "privato": 0,
            "audio": "",
            "luogo": "",
            "key_post": "d86ea612dec96096c5e0fcc8dd42ab6d",
            "browser": "Mozilla/5.0 (Linux; Android 5.1.1; SM-J320FN Build/LMY47V) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.91 Mobile Safari/537.36"
        },
    ],
    "first_page_url": "http://127.0.0.1:8000/ricordiShowing/6?page=1",
    "from": 1,
    "last_page": 40,
    "last_page_url": "http://127.0.0.1:8000/ricordiShowing/6?page=40",
    "links": [
        {
            "url": null,
            "label": "&laquo; Previous",
            "active": false
        },
        {
            "url": "http://127.0.0.1:8000/ricordiShowing/6?page=1",
            "label": 1,
            "active": true
        },
        {
            "url": "http://127.0.0.1:8000/ricordiShowing/6?page=2",
            "label": 2,
            "active": false
        },
        {
            "url": "http://127.0.0.1:8000/ricordiShowing/6?page=3",
            "label": 3,
            "active": false
        },
        {
            "url": "http://127.0.0.1:8000/ricordiShowing/6?page=4",
            "label": 4,
            "active": false
        },
        {
            "url": "http://127.0.0.1:8000/ricordiShowing/6?page=5",
            "label": 5,
            "active": false
        },
        {
            "url": "http://127.0.0.1:8000/ricordiShowing/6?page=6",
            "label": 6,
            "active": false
        },
        {
            "url": "http://127.0.0.1:8000/ricordiShowing/6?page=7",
            "label": 7,
            "active": false
        },
        {
            "url": "http://127.0.0.1:8000/ricordiShowing/6?page=8",
            "label": 8,
            "active": false
        },
        {
            "url": "http://127.0.0.1:8000/ricordiShowing/6?page=9",
            "label": 9,
            "active": false
        },
        {
            "url": "http://127.0.0.1:8000/ricordiShowing/6?page=10",
            "label": 10,
            "active": false
        },
        {
            "url": null,
            "label": "...",
            "active": false
        },
        {
            "url": "http://127.0.0.1:8000/ricordiShowing/6?page=39",
            "label": 39,
            "active": false
        },
        {
            "url": "http://127.0.0.1:8000/ricordiShowing/6?page=40",
            "label": 40,
            "active": false
        },
        {
            "url": "http://127.0.0.1:8000/ricordiShowing/6?page=2",
            "label": "Next &raquo;",
            "active": false
        }
    ],
    "next_page_url": "http://127.0.0.1:8000/ricordiShowing/6?page=2",
    "path": "http://127.0.0.1:8000/ricordiShowing/6",
    "per_page": 11,
    "prev_page_url": null,
    "to": 11,
    "total": 435
}

### Register: 
url: `your_url/auth/register`

method:POST

headers: {
    'Content-Type' => 'Application/Json'
}    

body: {
    'nome' => 'required|string|between:2,100',
    'cognome' => 'required|string|between:2,100',
    'email' => 'required|email|unique:users',
    'password' => 'required|confirmed|min:6',
    'password_confirmation' => 'required|confirmed|min:6',
    'sesso' => 'required|string|max:1',
    'attivo' => 'required',
    'cf' => 'required',
    'cf_key' => 'required',
    'catasto' => 'required',
    'data_nascita' => 'required',
    'deceduto' => 'required',
    'notifiche' => 'required',   
}


### Register Demo:

url: http://127.0.0.1:8000/auth/register
headers: {
    'Content-Type' => 'Application/Json'
}    
body: {
    "nome": "Utente",
    "cognome": "Prova",
    "email": "innovex@gmail.com",
    "password": "password",
    "password_confirmation": "password",
    "sesso": "M",
    "attivo": 1,
    "cf": "PRVTNT66M18ITAN",
    "cf_key": "167d7dbd53aa733376abc7cb05e867f7",
    "catasto": "ITA",
    "data_nascita": "1966-08-18",
    "image_profile": "upload/profile/BOuJwu82sJKY.jpg",
    "deceduto": 0,
    "notifiche": 0
    
}
### RESPONSE:
{
    "message": "User created successfully",
    "user": {
        "nome": "Utente",
        "cognome": "Prova",
        "email": "innovex@gmail.com",
        "password": "696d29e0940a4957748fe3fc9efd22a3",
        "sesso": "M",
        "attivo": 1,
        "cf": "PRVTNT66M18ITAN",
        "cf_key": "167d7dbd53aa733376abc7cb05e867f7",
        "catasto": "ITA",
        "data_nascita": "1966-08-18",
        "deceduto": 0,
        "notifiche": 0,
        "id": 42
    },
    "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYjYyZWU4ZWFjNzIxM2NkNzg4MDU5ZjQ3MjE0Y2IwN2ZlYmVlMzM5ZWI4MDE2YWU0YWM3MWYwOGQ0NjY3ODI3ZDQxYmZhYjc2Mjk3NzRlYzciLCJpYXQiOiIxNjA5NTY5NDk3LjI0NzYzNSIsIm5iZiI6IjE2MDk1Njk0OTcuMjQ3NjYzIiwiZXhwIjoiMTY0MTEwNTQ5Ny4wNTIxNTEiLCJzdWIiOiI0MiIsInNjb3BlcyI6W119.PeoNH8K2H2Cq7uXrPv3z8FnEHhDK9ybJetExe98cFUyCvQ7vNY2hf89Dk5T8brGjc4n_xIqkVZVqpQQZEc7Tq9uDRjNoEfJcnNX1PFthbhVLHLNMUU8iXOnJIiJwoLPcc_Aflyu7tQpiup9xGGFYcGahckBDTOnal91On8KrOadV4XsqvRZEWrLy4m0NpI2velfsdfpxSMHqN2K8ogs6aSM9tdlqd7PYa3RfGTM0bmSFFT-er6Fb8eaMQzxjwIQ9cPgWDumw4TgUpicN2_v6tvCjRtE-uMzgVnPnd2oq5Zn82qx3FrpicSHEXrDHwmEzoEJLhvQG7WRympu_0DnU-gwX5uj23wigBMgIWZtE58TvsJFnIAr6b1Vipmlz-D3Log8S5TWGjdYxprfUFAqUNjPIcVXG7HtdWmhkx3XO4LDusAQPkOQTzyPqsv1MmO1-cRnAVaHop9eenN1QIfvqir5GWYxccizTW-urMAq7-s38KhQjrzIMIAhfJbQMFMQB_CDWvRRqa0UErZXnY-ocGuyub-unzDKxQRWc9F6z5kAiMkc92OmvgKgUXbwWLltSTYoVG-wk42JtCgByWpHR5j5kPJQutBKns2pN2QQlJgcsSOK22mlNBrYPFxSFnk4_KMNdF4hg1YivBuGzjWpBsdnpRoPVmHUfyj59ry-tJQ0",
    "token_type": "Bearer"
}

### Login Demo: 
url: `your_url/auth/login`

method: POST

headers: {
    'Content-Type' => 'Application/Json'
}   

body:{
    "email": "innovex@gmail.com",
    "password": "password",  
}
### RESPONSE: 
{
    "user": {
        "id": 42,
        "nome": "Utente",
        "cognome": "Prova",
        "email": "innovex@gmail.com",
        "password": "696d29e0940a4957748fe3fc9efd22a3",
        "sesso": "M",
        "attivo": 1,
        "cf": "PRVTNT66M18ITAN",
        "cf_key": "167d7dbd53aa733376abc7cb05e867f7",
        "catasto": "ITA",
        "data_nascita": "1966-08-18",
        "data_dipartita": null,
        "image_cover": null,
        "image_profile": null,
        "creato_da": null,
        "deceduto": 0,
        "notifiche": 0,
        "id_notifiche": null
    },
    "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNGJhMzBmMzViNzdjY2NlODg3OTZjZDA0OTAxNjMyNGQ2YzEwOTFmMjA3ODA3M2E3MTRjNzc2Yzc3MmQyYmU4OWM4ZDk3Njg1MDU5YjFmOGYiLCJpYXQiOiIxNjA5NTY5NzAyLjI0MTg3NCIsIm5iZiI6IjE2MDk1Njk3MDIuMjQxODgwIiwiZXhwIjoiMTY0MTEwNTcwMi4xNjM2NzUiLCJzdWIiOiI0MiIsInNjb3BlcyI6W119.At67TfrBPGlvzgmi4C3QLZZIh2fZS9xh2KMY599ydxYqJk-oeh6Cox4SoivKBhRY4B6IvGl16GBCNKm2l2wiVbekpr-fW8A_DTLM26-LBflcBZp6vYnNpk2Qu7O0AFLmFMLZCk16cgfE7ZyD4dRzA1aQXWx68mysHy-DvWel_xAzk5fyNbfrfJm0EICzFZuQrTJVGD7zOltb-ozRktikWG8DTkb0At3HjHUjr_uGf1ZQNaQZq5ot7adcKRHARr-3bYY1s1Ji1Bg3jmjB6wjxqbLSroXK43dH74u0LthtdOAAYlpWzL6aAOOWte47efPYjanPg_leN7kcBTPxm1VGHrdmMpcyMvdxrYgvnycHBmOd3rI7HBsRVBf-C8Wdi11psodzwb3lmSjAlKiNpjLDcUVF6cHEyQjxR7JbzHSMpoOu5Dj0yWUmHl_-mclUd5Lzyps__g7hzGycxRiHo9h3E6C7UnGimwCdzDLCzVt-aQ4u6c7E5eEAtnLEfxoRTeTLMmgrgT27IQ4xAfKwus76Am3fLT1b97ai5WOYcY8LKTqKC6Dz9zx-uLDkYZ7yw9fCpDWw4aTyJ3WekiyAQcEe32fjySGOX28yc3wuEdrP_utJWmWm7bHHGn8lsCD7OLIvvIA6RosFiwCU0Gkb5kGO1W2GUiIt5qOHrwGJp1XSRSM",
    "token_type": "Bearer"
}

### Logout Demo: 
url: `your_url/auth/logout`

method: POST

headers: {
    'Content-Type' => 'Application/Json'
    'Authorization' => 'Bearer $token'
}  

###RESPONSE: 
{
    "message": "Successfully logged out"
}

### Profile Demo: 
url: `your_url/auth/profile`

method: GET

headers: {
    'Content-Type' => 'Application/Json'
    'Authorization' => 'Bearer $token'
}  

### RESPONSE:
{
    "id": 42,
    "nome": "Utente",
    "cognome": "Prova",
    "email": "innovex@gmail.com",
    "password": "696d29e0940a4957748fe3fc9efd22a3",
    "sesso": "M",
    "attivo": 1,
    "cf": "PRVTNT66M18ITAN",
    "cf_key": "167d7dbd53aa733376abc7cb05e867f7",
    "catasto": "ITA",
    "data_nascita": "1966-08-18",
    "data_dipartita": null,
    "image_cover": null,
    "image_profile": null,
    "creato_da": null,
    "deceduto": 0,
    "notifiche": 0,
    "id_notifiche": null
}


### Ricordo Get All Demo: 
url: `your_url/ricordo`

method: GET

headers: {
    'Content-Type' => 'Application/Json'
    'Authorization' => 'Bearer $token'
}  

// audio 
https://mammuts.it/vocal/audio/postvocale_lcamw2cv8.wav
- audio/postvocale_lcamw2cv8.wav'

// images
https://mammuts.it/upload/ricordo/FU97taarcK1K.jpg
- upload/ricordo/FU97taarcK1K.jpg

### RESPONSE:
[{
    "id": 39,
    "id_utente": 6,
    "testo": "Ciao Nonno, come vedi dopo tanti anni dalla tua scomparsa, vi ricordo sempre. ",
    "immagine": null,
    "id_legame": 18,
    "data_inserimento": "2020-07-21 16:16:47",
    "privato": 0,
    "audio": "",
    "luogo": "",
    "key_post": "d67d8ab4f4c10bf22aa353e27879133c",
    "browser": ""
},]



### Ricordo  Create: 
url: `your_url/ricordo`

method: POST

headers: {
    'Content-Type' => 'Application/Json'
    'Authorization' => 'Bearer $token'
}  

body: {
    "id_utente": 6,
    "testo": "Ciao Nonno, come vedi dopo tanti anni dalla tua scomparsa, vi ricordo sempre. ",
    "immagine": null,
    "id_legame": 18,
    "data_inserimento": "2020-07-21 16:16:47",
    "privato": 0,
    "audio": "",
    "luogo": "",
    "key_post": "d67d8ab4f4c10bf22aa353e27879133c",
    "browser": ""
}

### RESPONSE:
{
    "id": 39,
    "id_utente": 6,
    "testo": "Ciao Nonno, come vedi dopo tanti anni dalla tua scomparsa, vi ricordo sempre. ",
    "immagine": null,
    "id_legame": 18,
    "data_inserimento": "2020-07-21 16:16:47",
    "privato": 0,
    "audio": "",
    "luogo": "",
    "key_post": "d67d8ab4f4c10bf22aa353e27879133c",
    "browser": ""
}

(Each person should be given with ricordos, legamis)


## DON'T NEED BELOW
### Ricordo Get By Id Demo: 
url: `your_url/ricordo/39`

method: GET

headers: {
    'Content-Type' => 'Application/Json'
    'Authorization' => 'Bearer $token'
}  

### RESPONSE:
[{
    "id": 39,
    "id_utente": 6,
    "testo": "Ciao Nonno, come vedi dopo tanti anni dalla tua scomparsa, vi ricordo sempre. ",
    "immagine": null,
    "id_legame": 18,
    "data_inserimento": "2020-07-21 16:16:47",
    "privato": 0,
    "audio": "",
    "luogo": "",
    "key_post": "d67d8ab4f4c10bf22aa353e27879133c",
    "browser": ""
},]

### Ricordo Update Demo: 
url: `your_url/ricordo/39`

method: PUT

headers: {
    'Content-Type' => 'Application/Json'
    'Authorization' => 'Bearer $token'
}
body: {
    "testo": "Updated ",
}

### RESPONSE: {
    "id_utente": 6,
    "testo": "Updated ",
    "immagine": null,
    "id_legame": 18,
    "data_inserimento": "2020-07-21 16:16:47",
    "privato": 0,
    "audio": "",
    "luogo": "",
    "key_post": "d67d8ab4f4c10bf22aa353e27879133c",
    "browser": ""
}


### Ricordo DELETE Demo: 
url: `your_url/ricordo/39`

method: DELETE

headers: {
    'Content-Type' => 'Application/Json'
    'Authorization' => 'Bearer $token'
}

### RESPONSE:
{
    "message": "Record deleted"
}


