<div class="description user_content "><h1 id="cs-546-lab-10">CS-546 Lab 10</h1>
<h2 id="authentication-and-middleware">Authentication and Middleware</h2>
<p>For this lab, we will be creating a basic server with a user sign-up and user login. &nbsp;You will be storing a usernames and hashed password. In addition, we will be creating a very basic logging middleware.</p>
<p>We will be using two new npm packages for this lab:</p>
<ul>
<li><a href="https://www.npmjs.com/package/bcrypt">bcrypt</a>: a password hasing library. If you have problems installing that modules (since it uses C++ bindings), you can also try <a href="https://www.npmjs.com/package/bcryptjs">bcrypt.js</a>, which has the same API but is written in 100% JS.</li>
<li><a href="https://www.npmjs.com/package/express-session">express-session</a>: a simple session middleware for Express.</li>
</ul>
<h2 id="database-structure">Database Structure</h2>
<p>You will use a database with the following structure:</p>
<ul>
<li>The database will be called <strong>FirstName_LastName_lab10</strong></li>
<li>The collection you use will be called <code>users</code></li>
</ul>
<p>A sample of the user schema as it will be stored in the database:</p>
<pre><code><span>[</span></code><br><code><span>  { <br>    _id: ObjectId("615f5211445eac188610ecbe"), &nbsp;<br></span><span>    username</span><span>:</span> <span>'graffixnyc'</span><span>, <br></span><span>    password</span><span>:</span> <span>'$2b$16$Vm/Xqc.2eyi3y3IqewuhjOTXeoxt4SaN1dcAfPwEPUrzA5Kgm1HFW'<br></span><span>  },</span></code><br><code><span>  { <br>    _id: ObjectId("615f5211445eac188610ecc0"), <br></span><span>    username</span><span>:</span> <span>'phill'</span><span>, <br></span><span>    password</span><span>:</span> <span>'$2b$16$SHQUG43PoIHoTHvkeDBczewvurYf3l.XKMRhrRomB.iVMcvldsq8m'<br></span><span>  }</span></code><br><code><span>];</span></code></pre>
<p>You will have one data module in your data folder named: <code>users.js</code>&nbsp;that will only export two functions:</p>
<h3>createUser(username, password)</h3>
<p>You must do full input checking and error handling for the inputs in this function. &nbsp;</p>
<ol>
<li>Both <code>username</code> and <code>password</code> must be supplied or you will throw an error</li>
<li>For <code>username</code>, it should be a valid string (no empty spaces, no spaces in the username and only alphanumeric characters) and should be at least 4 characters long. If it fails any of those conditions, you will throw an error. &nbsp;</li>
<li>The <code>username</code> should be case-insensitive. So "PHILL", "phill", "Phill" should be treated as the same username.&nbsp;</li>
<li>YOU MUST NOT allow duplicate usernames in the system. If the username is already in the database you will throw an error stating there is already a user with that username</li>
<li>For the password, it must be a valid string (no empty spaces and no spaces but can be any other character including special characters) and should be at least 6 characters long. If it fails any of those conditions, you will throw an error.&nbsp;</li>
</ol>
<p>In this function you will hash the password using bcrypt. &nbsp;You will then insert the username and <strong>hashed</strong> password into the database.</p>
<p>If the insert was successful, your function will return: <code>{userInserted: true}</code>.&nbsp;</p>
<h3>checkUser(username, password)</h3>
<p>You must do full input checking and error handling for the inputs in this function. &nbsp;</p>
<ol>
<li>Both <code>username</code> and <code>password</code> must be supplied or you will throw an error</li>
<li>For <code>username</code>, it should be a valid string (no empty spaces, no spaces in the username and only alphanumeric characters) and should be at least 4 characters long. If it fails any of those conditions, you will throw an error. &nbsp;</li>
<li>The username should be case-insensitive. So "PHILL", "phill", "Phill" should be treated as the same username.&nbsp;</li>
<li>For the <code>password</code>, it must be a valid string (no empty spaces and no spaces but can be any other character including special characters) and should be at least 6 characters long. If it fails any of those conditions, you will throw an error.&nbsp;</li>
</ol>
<p>In this function, after you validate the inputs you will:</p>
<ol>
<li>Query the db for the <code>username</code> supplied, if it is not found, throw an error stating "Either the username or password is invalid".</li>
<li>If the <code>username</code> supplied is found in the DB, you will then use bcrypt to compare the hashed password in the database with the&nbsp;<code>password</code>&nbsp;input parameter.</li>
<li>If the passwords match your function will return <code>{authenticated: true}</code></li>
<li>If the passwords do not match, you will throw an error stating "Either the username or password is invalid"</li>
</ol>
<h2 id="routes">Routes</h2>
<h3 id="get">GET <code>/</code></h3>
<p>The root route of the application will do one of two things:</p>
<ol style="list-style-type: decimal;">
<li>If the user is authenticated, it will redirect to <code>/private</code>.</li>
<li>If the user is not authenticaed, it will render a view with a login form. The form will contain two inputs, one for username and one for password. The form will be used to submit a POST request to the <code>/login</code> route on the server and&nbsp;<strong>must</strong> have an <code>id</code> of <code>login-form</code>. The input for the username must have a <code>name</code>/<code>id</code> of <code>username</code>; the input for the password must have <code>name</code>/<code>id</code> of <code>password</code>&nbsp;and should be an input type of password.</li>
</ol>
<p>You will also have a link on this page that links to <code>/signup</code> and has the text "Need to register? Click here to sign-up"</p>
<p>Do not forget to use labels for your inputs!</p>
<p><strong>An authenticated user should not ever see the login screen.</strong></p>
<h3 id="post-login">GET&nbsp;<code>/signup</code></h3>
<ol style="list-style-type: decimal;">
<li>If the user is authenticated, it will redirect to <code>/private</code>.</li>
<li><span style="color: var(--ic-brand-font-color-dark); font-family: inherit; font-size: 1rem;">If the user is not authenticated, this route will render a view with a sign-up form. The form will contain two inputs, one for the username and one for password.&nbsp;</span></li>
<li><span style="color: var(--ic-brand-font-color-dark); font-family: inherit; font-size: 1rem;"><span>The form will be used to submit the POST request to the <code>/signup</code> route on the server and&nbsp;</span><strong>must</strong><span> have an </span><code>id</code><span> of </span><code>signup-form</code><span>.&nbsp;</span></span><span style="color: var(--ic-brand-font-color-dark); font-family: inherit; font-size: 1rem;">The input for the username must have a </span><code style="color: var(--ic-brand-font-color-dark);">name</code><span style="color: var(--ic-brand-font-color-dark); font-family: inherit; font-size: 1rem;">/</span><code style="color: var(--ic-brand-font-color-dark);">id</code><span style="color: var(--ic-brand-font-color-dark); font-family: inherit; font-size: 1rem;"> of </span><code style="color: var(--ic-brand-font-color-dark);">username</code><span style="color: var(--ic-brand-font-color-dark); font-family: inherit; font-size: 1rem;">; the input for the password must have </span><code style="color: var(--ic-brand-font-color-dark);">name</code><span style="color: var(--ic-brand-font-color-dark); font-family: inherit; font-size: 1rem;">/</span><code style="color: var(--ic-brand-font-color-dark);">id</code><span style="color: var(--ic-brand-font-color-dark); font-family: inherit; font-size: 1rem;"> of </span><code style="color: var(--ic-brand-font-color-dark);">password</code><span style="color: var(--ic-brand-font-color-dark); font-family: inherit; font-size: 1rem;"> and should be an input type of password.</span></li>
</ol>
<p><span style="color: var(--ic-brand-font-color-dark); font-family: inherit; font-size: 1rem;">Do not forget to use labels for your inputs!</span></p>
<p>You will also have a link on this page that links to <code>/</code> and has the text "Already have an account? Click here to log-in"</p>
<p><strong>An authenticated user should not ever see the sign-up screen.</strong></p>
<h3 id="post-login">POST <code>/signup</code></h3>
<p>You must do full input checking and error handling for the inputs in the routes. &nbsp;</p>
<ol>
<li>You must make sure that <code>username</code> and <code>password</code> are supplied in the req.body</li>
<li>For username, it should be a valid string (no empty spaces, no spaces in the username and only alphanumeric characters) and should be at least 4 characters long and should be case-insensitive.</li>
<li>For the password, it must be a valid string (no spaces, no empty spaces but can be any other character including special characters) and should be at least 6 characters long.&nbsp;</li>
</ol>
<p>If it fails the error checks, or your DB function throws an error, &nbsp;you will render the sign-up screen once again, and this time showing an error message (along with an HTTP 400 status code) to the user explaining what they had entered incorrectly.</p>
<p>Making a POST request to this route you will call your createUser db function passing in the&nbsp;&nbsp;<code>username</code>&nbsp;and <code>password</code> from the <code>request.body</code>.</p>
<p>If your database function returns <code>{userInserted: true}</code>&nbsp;you will then redirect the user to the <code>/</code> page so they can log in. If your DB function does not return this but also did not throw an error (perhaps the DB server was down when you tried to insert) you will respond with a status code of 500 and error message saying "Internal Server Error"</p>
<h3 id="post-login">POST <code>/login</code></h3>
<p>You must do full input checking and error handling for the inputs in the routes. &nbsp;</p>
<ol>
<li>You must make sure that <code>username</code> and <code>password</code> are supplied in the req.body</li>
<li>For <code>username</code>, it should be a valid string (no empty spaces, no spaces in the username and only alphanumeric characters) and should be at least 4 characters long and should be case-insensitive.</li>
<li>For the <code>password</code>, it must be a valid string (no spaces, no empty spaces but can be any other character including special characters) and should be at least 6 characters long.&nbsp;</li>
</ol>
<p>If it fails the error checks <span>or your DB function throws an error</span>, you will render the login screen once again, and this time showing an error message (along with an HTTP 400 status code) to the user explaining what they had entered incorrectly.</p>
<p>This route is simple: making a POST to this route will attempt to log a user in with the credentials they provide in the login form.</p>
<p>You will call your checkUser db function passing in the&nbsp;&nbsp;<code>username</code>&nbsp;and <code>password</code> from the <code>request.body</code>. If your DB function returns <code>{authenticated: true}</code>, &nbsp;You will have a cookie named&nbsp;<code>AuthCookie</code>(this is the name of the session in app.js). This cookie must be named <code>AuthCookie</code> or your assignment will receive a major point deduction. &nbsp;You will also store the username of the user in the session so you can display the value in the <code>/private</code> route. After logging in, you will redirect the user to the <code>/private</code> route.</p>
<p>If the user does <strong>not</strong> provide a valid login, you will render the login screen once again, and this time show an error message (along with an HTTP 400 status code) to the user explaining that they did not provide a valid username and/or password.</p>
<h3 id="get-private">GET <code>/private</code></h3>
<p>This route will be simple, as well. This route will be protected your own authentication middleware to only allow valid, logged in users to see this page.</p>
<p>If the user is logged in, you will make a simple view that displays the username (which you stored in the session when they logged in) for the currently logged in user.</p>
<p>Also, you will need to have a hyperlink at the bottom of the page to <code>/logout</code>.</p>
<h3 id="get-logout">GET <code>/logout</code></h3>
<p>This route will expire/delete the <code>AuthCookie</code> and inform the user that they have been logged out. It will provide a URL hyperlink to the <code>/</code> route.</p>
<h2 id="using-express-session">Using <code>express-session</code></h2>
<p>This middleware package does one (fairly simple) thing. It creates a cookie for the browser that will be used to track the current session of the user, after we verify their login. We will expand on the <code>req.session</code> field to store information about the currently logged in user. You can see an example using <code>req.session</code> <a href="https://github.com/expressjs/session#reqsession">here</a>.</p>
<p>To initialize the middleware, you must do the following:</p>
<pre class="js"><code>// Your app.js file

const session = require('express-session')

...

app.use(session({
  name: 'AuthCookie',
  secret: 'some secret string!',
  resave: false,
  saveUninitialized: true
}))</code></pre>
<p>You can read more about session's different configuration options <a href="https://github.com/expressjs/session#options">here</a>. For the sake of this lab, the above configuration is all you will need.</p>
<h2 id="authentication-middleware">Authentication Middleware</h2>
<p>This middleware will <code>only</code> be used for the GET <code>/private</code> route and will do one of the following:</p>
<ol style="list-style-type: decimal;">
<li>If a user is not logged in, you will return an HTML page saying that the user is not logged in, and the page must issue an HTTP status code of <code>403</code>.</li>
<li>If the user is logged in, the middleware will "fall through" to the next route calling the <code>next()</code> callback.</li>
</ol>
<p>See <a href="https://expressjs.com/en/guide/writing-middleware.html">this reference</a> in the express documentation to read more about middleware.</p>
<h2 id="logging-middleware">Logging Middleware</h2>
<p>This middleware will log to your console for every request made to the server, with the following information:</p>
<ul>
<li>Current Timestamp: <code>new Date().toUTCString()</code></li>
<li>Request Method: <code>req.method</code></li>
<li>Request Route: <code>req.originalUrl</code></li>
<li>Some string/boolean stating if a user is authenticated</li>
</ul>
<p>There is no precise format you must follow for this. The only requirement is that it logs the data stated above.</p>
<p>An example would be:</p>
<pre><code>[Sun, 14 Apr 2019 23:56:06 GMT]: GET / (Non-Authenticated User)
[Sun, 14 Apr 2019 23:56:14 GMT]: POST /login (Non-Authenticated User)
[Sun, 14 Apr 2019 23:56:19 GMT]: GET /private (Authenticated User)
[Sun, 14 Apr 2019 23:56:44 GMT]: GET / (Authenticated User)</code></pre>
<h2 id="requirements">Requirements</h2>
<ol style="list-style-type: decimal;">
<li>All previous lab requirements still apply.</li>
<li>You must remember to update your package.json file to set app.js as your starting script!</li>
<li><a href="https://validator.w3.org/#validate_by_input">Your HTML must be valid</a> or you will lose points on the assignment.</li>
<li>Your HTML must make semantical sense; usage of tags for the purpose of simply changing the style of elements (such as i, b, font, center, etc) will result in points being deducted; think in terms of content first, then style with your CSS.</li>
<li>You can be as creative as you'd like to fulfill front-end requirements; if an implementation is not explicitly stated, however you go about it is fine (provided the HTML is valid and semantical). Design is not a factor in this course.</li>
<li>All inputs must be properly labeled!</li>
</ol></div>
