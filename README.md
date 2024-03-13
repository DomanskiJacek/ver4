# 👋 Hello developer!

This project serves as an example of what can be achieved. It is not a fully functional product. Feel free to use the source code and ideas as a starting point for your own projects.

This is one of the many templates available from W3Schools. Check our [tutorials for frontend development](https://www.w3schools.com/where_to_start.asp) to learn the basics of [HTML](https://www.w3schools.com/html), [CSS](https://www.w3schools.com/css) and [JavaScript](https://www.w3schools.com/js). 🦄
Also check [Python](https://www.w3schools.com/python/) and [Django](https://www.w3schools.com/django/) tutorials to grasp the backend of this template.
## Key value store template

This is a key/value store template. It is made as an example of what you can do with a tool like this. Customize it to your needs whether you need it as a frontend database or purely backend with no UI, we will explain some simple things you can do. 

## Recommended knowledge:

To be able to fully understand and modify this template to your needs, there are several things you should know (or learn):

- [HTML](https://www.w3schools.com/html)
- [CSS](https://www.w3schools.com/css)
- [JavaScript](https://www.w3schools.com/js)
- [SQLite](https://www.sqlite.org/docs.html)
- [Django](https://www.w3schools.com/django)
- [Python](https://www.w3schools.com/python)

## Warning - environment variables

Do not change DATABASE_URL and SECRET_KEY, as these are generated. If they are changed the space may not behave as predicted.
**Remember to switch DEBUG to false when going to production**

## Code to implement into your template.

### *`settings.py`*

Add these under `INSTALLED_APPS`. **You only need `'key_value_store'` if you already have `'django_bootstrap_icons'`.**

```.py
  'key_value_store',
  'django_bootstrap_icons'
```

### *`urls.py`*

In the top level `urls.py` that includes the application's URLs, change the path to something that suits your application, so it doesn't interfere with your main webpage.

```.py
path('items', include('key_value_store.urls'))
```

## Content
- RESTful API routes for you to use linked with vanilla Django database models.
- Page counter example that register every page load. Transport it into your main base.html to automatically register all hits on your different pages.

## 🔨 What's next?

Customize this template to make it your own.  
Remember to make your layout responsive - if you want your site to look good on smaller screens like mobile.  
Implement more functionalities like updating an existing data inside the database, or show even more information on the screen.

⚡️ **Tip:** [Set up Google Analytics](https://www.w3schools.com/howto/howto_google_analytics.asp) to get valuable insights about your space and visitors. 

## 🎨 Where to find everything

Below are explanations about where to find specific code.

### HTML

HTML files are stored in a folder called `templates`. Path: `your_project/key_value_store/templates/`.
Inside `templates/base.html` you can add your external links and scripts, or change other general code like a top bar or footer that will be used on every page.

### CSS, images and JavaScript

CSS, images and JavaScript files can be found in `static` in the root folder. Path: `your_project/static`

### API

You can find the backend code that renders each template in `views.py`. Path: `your_project/key_value_store/views.py`. This is the code that will run when you make a request to a URL. You can set the internal URLs in urls.py inside `your_app`.

## Database

Dynamic spaces can use [SQLite](https://www.sqlite.org/docs.html) database.  
The database file is called `database.db`. It is placed inside the `w3s-dynamic-storage` folder.  
SQLite connection path to the database is `sqlite:///w3s-dynamic-storage/database.db` which you can use to connect to the SQLite database programmatically.   
For this template, the database connection path can also be found in the environment.  
You can modify the tables in `models.py` inside `key_value_store`. Remember to run the commands for `makemigrations` and `migrate` when you change the models. 

---  
**Do not change the `w3s-dynamic-storage` folder name or `database.db` file name!**  
**By changing the `w3s-dynamic-storage` folder name or `database.db` file name, you risk the space not working properly.**

## What is needed if you want to integrate this template into another project

  - Bring everything under `key_value_store/` into your base directory and add "key_value_store" to your `INSTALLED_APPS` in `settings.py`.
  - Check for migrations by running both `python3 manage.py makemigrations` and `python3 manage.py migrate`
  - In your global `urls.py` (in the project settings folder) add the path to the key_value_store app. The first argument will determine what all the local app URLs for the form will be under. Make sure it doesn't crash with your other URLs. Example: `path('items', include('key_value_store.urls'))`

## Misc: 
  - `python3 manage.py makemigrations`
    - If you change the models you have to run this command and then migrate to commit the changes.
  - `python3 manage.py migrate`
    - Migrate is needed to put the model changes into effect after making migrations. This will create new tables which means you may have conflicts to already stored data. In that case Django will ask in the terminal what you would like to do. This is the message:
      `It is impossible to add a non-nullable field <name> to <model> without specifying a default.` This is because the database needs something to populate existing rows.
      Please select a fix:
      1) Provide a one-off default now (will be set on all existing rows with a null value for this column)
      2) Quit and manually define a default value in models.py.
      Select an option: `
    You avoid this by setting a default when you add the field to the model. E.g. `title = models.CharField(("title"), max_length=250)`

## 🔨 Please note
For now files created/uploaded or edited from within the terminal view will not be backed up or synced. 

## ⛑ Need support?
[Join our Discord community](https://discord.gg/6Z7UaRbUQM) and ask questions in the **#spaces-general** channel to get your space on the next level.  
[Send us a ticket](https://support.w3schools.com/hc/en-gb) if you have any technical issues with Spaces.

Happy learning!