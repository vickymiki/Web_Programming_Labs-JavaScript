 <div class="description user_content "><h1 id="cs-546-lab-8">CS-546 Lab 8</h1>
<h2 id="template-time">Template Time</h2>
<p>For this lab, you will be using HTML, CSS, and Handlebars to make your first simple templated web application! You will be building a form that allows you to search through characters in the &nbsp;Marvel API.</p>
<p><strong>You will not need to use a database for this lab.&nbsp;</strong></p>
<p>You <strong>must</strong> use the <code>async/await</code> keywords (not Promises). You will also be using <a class="external" href="https://github.com/axios/axios" target="_blank"><span><code>axios</code></span><span class="screenreader-only">&nbsp;(Links to an external site.)</span></a>, which is a HTTP client for Node.js; you can install it with <code>npm i axios</code>.&nbsp;</p>
<h2 id="toc_2">Marvel API</h2>
<p style="margin: 15px 0px; color: #000000; font-family: Helvetica, arial, sans-serif; font-size: 14px; font-style: normal; text-align: start; text-indent: 0px; white-space: normal; background-color: #ffffff;">You will be using the <a style="color: #4183c4;" href="https://developer.marvel.com">Marvel API</a>. &nbsp;You will need to register and sign up for an API key. &nbsp;You will not be able to make requests to the API without signing up and getting an <a href="https://developer.marvel.com/account">API key</a>. &nbsp;You will use the <a href="https://gateway.marvel.com/v1/public/characters?ts=1592417963445&amp;apikey=a8f9ccf932bf29fd379ef00e11668673&amp;hash=f061194023791a1593a0ea861a27da67">Characters</a>&nbsp;listings &nbsp;Please look at the data returned so you know the schema of the data and the objects it returns (the links to Characters above work but using my API key. &nbsp;DO NOT use my API key. Please register for your own. &nbsp;You will need to compose the URL with your API key, a ts (time stamp) and a hash. &nbsp;</p>
<p style="margin: 15px 0px; color: #000000; font-family: Helvetica, arial, sans-serif; font-size: 14px; font-style: normal; text-align: start; text-indent: 0px; white-space: normal; background-color: #ffffff;">You can use the following code to construct the URL. You can read more about AUTHORIZING AND SIGNING REQUESTS from the link below</p>
<p style="margin: 15px 0px; color: #000000; font-family: Helvetica, arial, sans-serif; font-size: 14px; font-style: normal; text-align: start; text-indent: 0px; white-space: normal; background-color: #ffffff;"><a href="https://developer.marvel.com/documentation/authorization">https://developer.marvel.com/documentation/authorization</a>&nbsp;</p>
<div>
<pre><code>const&nbsp;md5 = require('blueimp-md5');
</code><code>const publickey = 'your_public_key(API KEY) from Marvel dev portal';
</code><code>const privatekey = 'your private key from Marvel dev portal';
</code><code>const ts = new Date().getTime();
</code><code>const stringToHash = ts + privatekey + publickey;
</code><code>const hash = md5(stringToHash);
</code><code>const&nbsp;baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';
</code><code>const url = baseUrl + '?ts=' + ts + '&amp;apikey=' + publickey + '&amp;hash=' + hash;</code></pre>
</div>
<p>You will be using two endpoints of the Marvel API which is an API about Marvel &nbsp;for your Axios calls. &nbsp;The search character endpoint where you pass the search term as a query string parameter: <code>https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=SEARCH_TERM_HERE&nbsp;</code>&nbsp;and then you'll get an individual character using the endpoint</p>
<pre>https://gateway.marvel.com:443/v1/public/characters/:id</pre>
<p><code>:id</code>&nbsp;where <code>:id</code>&nbsp;is the ID of the character you are looking up.</p>
<p>You will use these two endpoints to make your axios.get calls depending on which route is called.&nbsp;</p>
<p>You will be making three routes/pages in your application:</p>
<ul>
<li><code>http://localhost:3000/</code> the main page of this application will provide a search form to start a search of characters for a keyword.&nbsp;</li>
<li><code>http://localhost:3000/search</code> this page will make the axios call to the search endpoint&nbsp;and return up to 20 matching results that&nbsp;contain the provided request form param, <code>searchTerm</code></li>
<li><code>http://localhost:3000/characters/{id}</code> this page will show all the details of the character with the id matching the provided URL param, <code>id</code></li>
</ul>
<p><strong>All other URLS should return a 404</strong></p>
<pre><code>## `GET http://localhost:3000/`</code></pre>
<p>This page will respond with a valid HTML document. The title of the document should be "<em>Character Finder</em>". You should have the title set as the <code>&lt;title&gt;</code> element of the HTML document and as an <code>h1</code> in your document.</p>
<p>Your page should reference a CSS file, <code>/public/site.css</code>; this file should have <em>at least 5 rulesets</em> that apply to this page; these 5 rules can also apply to elements across all of your pages, or be unique to this page.</p>
<p>You should have a <code>main</code> element, and inside of the <code>main</code> element have a <code>p</code> element with a brief (2-3 sentence description) of what your website does.</p>
<p>Also inside the <code>main</code> element, you will have a <code>form</code>; this <code>form</code> will <code>POST</code> to <code>/search</code>. This <code>form</code> will have an <code>input</code> and a <code>label</code>; the <code>label</code> should properly reference the same <code>id</code> as the <code>input</code>. You should also have a <code>input</code> with a type of <code>submit</code> that submits the form. The <code>input</code> in your <code>form</code>&nbsp; where the user types the search term should have a <code>name</code> of <code>searchTerm</code>.<br><br></p>
<h2 id="post-httplocalhost3000search"><code>POST http://localhost:3000/search</code></h2>
<p>This route will read the <code>searchTerm</code> parameter and then make an axios call to the Marvel API endpoint searching for that keyword. For example, if the user typed <code>spider</code> in the input field, you would make the axios call to: https://gateway.marvel.com/v1/public/characters?nameStartsWith=SEARCH_TERM_HERE&amp;ts=TIME_STAMP_HERE&amp;apikey=API_KEY_HERE&amp;hash=HASH_HERE</p>
<p>This route will respond with a valid HTML document with the results returned from the API. The title of the document should be "<em>Characters Found</em>". You should have the title set as the <code>&lt;title&gt;</code> element of the HTML document and as an <code>h1</code> in your document. In an <code>h2</code> element, you will print the supplied <code>searchTerm</code>.</p>
<p>Your page should reference a CSS file, <code>/public/site.css</code>; this file should have <em>at least 5 rulesets</em> that apply to this page; these 5 rules can also apply to elements on <code>/</code>, or be unique to this page.</p>
<p>You should have a <code>main</code> element, and inside of the <code>main</code> element have a <code>ul</code> tag that has a list of up to 20 characters matching the <code>searchTerm</code> found in the request body in the following format (after searching <code>under</code>).<strong> DO NOT SHOW MORE THAN 20 Characters.</strong></p>
<pre class="sourceCode html"><code class="sourceCode html"><span class="kw">&lt;ul&gt;</span>
    <span class="kw">&lt;li&gt;</span>
        <span class="kw">&lt;a</span><span class="ot"> href=</span><span class="st">"/characters/1010727"</span><span class="kw">&gt;Spider-dok</span><span class="kw">&lt;/a&gt;</span>
    <span class="kw">&lt;/li&gt;</span>
    <span class="kw">&lt;li&gt;</span>
        <span class="kw">&lt;a</span><span class="ot"> href=</span><span class="st">"/characters/1009157"</span><span class="kw">&gt;Spider-Girl (Anya Corazon)</span><span class="kw">&lt;/a&gt;</span>
    <span class="kw">&lt;/li&gt;</span>
    <span class="kw">&lt;li&gt;</span>
        <span class="kw">&lt;a</span><span class="ot"> href=</span><span class="st">"/Characters/1009609"</span><span class="kw">&gt;Spider-Girl (May Parker)</span><span class="kw">&lt;/a&gt;</span>
    <span class="kw">&lt;/li&gt;</span>
<span class="kw">&lt;/ul&gt;</span></code></pre>
<p>You must also provide an <code>a</code> tag that links back to your <code>/</code> route with the text <code>Make another search</code>.</p>
<p>If no matches are found, you will print the following HTML paragraph:</p>
<pre class="sourceCode html"><code class="sourceCode html"><span class="kw">&lt;p</span><span class="ot"> class=</span><span class="st">"not-found"</span><span class="kw">&gt;</span>We're sorry, but no results were found for {searchTerm}.<span class="kw">&lt;/p&gt;</span></code></pre>
<p><strong>If the user does not input text into their form or enters just spaces into the input field, make sure to give a response status code of 400 on the page, and render an HTML page with a paragraph class called <code>error</code>; this paragraph should describe the error.</strong></p>
<h2 id="get-httplocalhost3000detailsid"><code>GET http://localhost:3000/characters/{id}</code></h2>
<p>This route will query the Marvel API using the the <code>id</code>&nbsp;parameter in the URL (for example: &nbsp;https://gateway.marvel.com/v1/public/characters/1009609?ts=TS_HERE&amp;apikey=API_KEY_HERE&amp;hash=HASH_HERE) and will &nbsp;respond with a valid HTML document with some of the character details. The title of the document should be the <code>name</code> of the character. You should have the title set as the <code>&lt;title&gt;</code> element of the HTML document. &nbsp;</p>
<p>Your page should reference a CSS file, <code>/public/site.css</code>; this file should have <em>at least 5 rulesets</em> that apply to this page; these 5 rules can also apply to elements on <code>/</code>, or be unique to this page.</p>
<p>You should have a <code>main</code> element, and inside of the <code>main</code> element, you will have a <code>div</code> tag that has an <code>h1</code>&nbsp;with the character&nbsp;<code>name</code>, &nbsp;an <code>img</code> which the <code>src</code>&nbsp;is set to the value read from <code>thumbnail.path</code> in the data which is a URL to an image for the character, you will have a <code>p</code>&nbsp;element that contains the character &nbsp;<code>description</code>, a <code>h2</code>&nbsp;that's content says "Comics" &nbsp; and a&nbsp;<code>ul</code>&nbsp; for the list of comics. You only need to display the comic <code>name</code>&nbsp; as the list items</p>
<p>Matching Character Data Returned from API (We will not be using all the fields, just the ones noted above):</p>
<pre id="jsonpeep-ext-pre">{
  <span class="key">"code":</span> <span class="number">200</span>,
  <span class="key">"status":</span> <span class="string">"Ok"</span>,
  <span class="key">"copyright":</span> <span class="string">"© 2021 MARVEL"</span>,
  <span class="key">"attributionText":</span> <span class="string">"Data provided by Marvel. © 2021 MARVEL"</span>,
  <span class="key">"attributionHTML":</span> <span class="string">"&amp;lt;a href=\"<a class="jsonpeep-ext-a" href="http://marvel.com/%22">http://marvel.com\"</a>;&amp;gt;Data provided by Marvel. © 2021 MARVEL&amp;lt;/a&amp;gt;"</span>,
  <span class="key">"etag":</span> <span class="string">"284b3f7635608d1e18add4ff80c10902ef5959b4"</span>,
  <span class="key">"data":</span> {
    <span class="key">"offset":</span> <span class="number">0</span>,
    <span class="key">"limit":</span> <span class="number">20</span>,
    <span class="key">"total":</span> <span class="number">1</span>,
    <span class="key">"count":</span> <span class="number">1</span>,
    <span class="key">"results":</span> [
      {
        <span class="key">"id":</span> <span class="number">1009609</span>,
        <span class="key">"name":</span> <span class="string">"Spider-Girl (May Parker)"</span>,
        <span class="key">"description":</span> <span class="string">"May \"Mayday\" Parker is the daughter of Spider-Man and Mary Jane Watson-Parker. Born with all her fatherï¿½s powers-and the same silly sense of humor-sheï¿½s grown up to become one of Earthï¿½s most trusted heroes and a fitting tribute to her proud papa."</span>,
        <span class="key">"modified":</span> <span class="string">"2016-03-02T11:04:46-0500"</span>,
        <span class="key">"thumbnail":</span> {
          <span class="key">"path":</span> <span class="string">"<a class="jsonpeep-ext-a" href="http://i.annihil.us/u/prod/marvel/i/mg/1/70/4c003adccbe4f">http://i.annihil.us/u/prod/marvel/i/mg/1/70/4c003adccbe4f</a>"</span>,
          <span class="key">"extension":</span> <span class="string">"jpg"</span>
        },
        <span class="key">"resourceURI":</span> <span class="string">"<a class="jsonpeep-ext-a" href="http://gateway.marvel.com/v1/public/characters/1009609">http://gateway.marvel.com/v1/public/characters/1009609</a>"</span>,
        <span class="key">"comics":</span> {
          <span class="key">"available":</span> <span class="number">196</span>,
          <span class="key">"collectionURI":</span> <span class="string">"<a class="jsonpeep-ext-a" href="http://gateway.marvel.com/v1/public/characters/1009609/comics">http://gateway.marvel.com/v1/public/characters/1009609/comics</a>"</span>,
          <span class="key">"items":</span> [
            {
              <span class="key">"resourceURI":</span> <span class="string">"<a class="jsonpeep-ext-a" href="http://gateway.marvel.com/v1/public/comics/5286">http://gateway.marvel.com/v1/public/comics/5286</a>"</span>,
              <span class="key">"name":</span> <span class="string">"Amazing Spider-Girl (2006)"</span>
            },
            {
              <span class="key">"resourceURI":</span> <span class="string">"<a class="jsonpeep-ext-a" href="http://gateway.marvel.com/v1/public/comics/5281">http://gateway.marvel.com/v1/public/comics/5281</a>"</span>,
              <span class="key">"name":</span> <span class="string">"Amazing Spider-Girl (2006) #1"</span>
            },
            {
              <span class="key">"resourceURI":</span> <span class="string">"<a class="jsonpeep-ext-a" href="http://gateway.marvel.com/v1/public/comics/5591">http://gateway.marvel.com/v1/public/comics/5591</a>"</span>,
              <span class="key">"name":</span> <span class="string">"Amazing Spider-Girl (2006) #2"</span>
            },
            {
              <span class="key">"resourceURI":</span> <span class="string">"<a class="jsonpeep-ext-a" href="http://gateway.marvel.com/v1/public/comics/5701">http://gateway.marvel.com/v1/public/comics/5701</a>"</span>,
              <span class="key">"name":</span> <span class="string">"Amazing Spider-Girl (2006) #3"</span>
            },
            {
              <span class="key">"resourceURI":</span> <span class="string">"<a class="jsonpeep-ext-a" href="http://gateway.marvel.com/v1/public/comics/5843">http://gateway.marvel.com/v1/public/comics/5843</a>"</span>,
              <span class="key">"name":</span> <span class="string">"Amazing Spider-Girl (2006) #4"</span>
            },
            {
              <span class="key">"resourceURI":</span> <span class="string">"<a class="jsonpeep-ext-a" href="http://gateway.marvel.com/v1/public/comics/5997">http://gateway.marvel.com/v1/public/comics/5997</a>"</span>,
              <span class="key">"name":</span> <span class="string">"Amazing Spider-Girl (2006) #5"</span>
            },
            {
              <span class="key">"resourceURI":</span> <span class="string">"<a class="jsonpeep-ext-a" href="http://gateway.marvel.com/v1/public/comics/6130">http://gateway.marvel.com/v1/public/comics/6130</a>"</span>,
              <span class="key">"name":</span> <span class="string">"Amazing Spider-Girl (2006) #6"</span>
            },
            {
              <span class="key">"resourceURI":</span> <span class="string">"<a class="jsonpeep-ext-a" href="http://gateway.marvel.com/v1/public/comics/6270">http://gateway.marvel.com/v1/public/comics/6270</a>"</span>,
              <span class="key">"name":</span> <span class="string">"Amazing Spider-Girl (2006) #7"</span>
            },
            {
              <span class="key">"resourceURI":</span> <span class="string">"<a class="jsonpeep-ext-a" href="http://gateway.marvel.com/v1/public/comics/13478">http://gateway.marvel.com/v1/public/comics/13478</a>"</span>,
              <span class="key">"name":</span> <span class="string">"Amazing Spider-Girl (2006) #8"</span>
            },
            {
              <span class="key">"resourceURI":</span> <span class="string">"<a class="jsonpeep-ext-a" href="http://gateway.marvel.com/v1/public/comics/15856">http://gateway.marvel.com/v1/public/comics/15856</a>"</span>,
              <span class="key">"name":</span> <span class="string">"Amazing Spider-Girl (2006) #9"</span>
            },
            {
              <span class="key">"resourceURI":</span> <span class="string">"<a class="jsonpeep-ext-a" href="http://gateway.marvel.com/v1/public/comics/15966">http://gateway.marvel.com/v1/public/comics/15966</a>"</span>,
              <span class="key">"name":</span> <span class="string">"Amazing Spider-Girl (2006) #10"</span>
            },
            {
              <span class="key">"resourceURI":</span> <span class="string">"<a class="jsonpeep-ext-a" href="http://gateway.marvel.com/v1/public/comics/16151">http://gateway.marvel.com/v1/public/comics/16151</a>"</span>,
              <span class="key">"name":</span> <span class="string">"Amazing Spider-Girl (2006) #11"</span>
            },
            {
              <span class="key">"resourceURI":</span> <span class="string">"<a class="jsonpeep-ext-a" href="http://gateway.marvel.com/v1/public/comics/16522">http://gateway.marvel.com/v1/public/comics/16522</a>"</span>,
              <span class="key">"name":</span> <span class="string">"Amazing Spider-Girl (2006) #12"</span>
            },
            {
              <span class="key">"resourceURI":</span> <span class="string">"<a class="jsonpeep-ext-a" href="http://gateway.marvel.com/v1/public/comics/16523">http://gateway.marvel.com/v1/public/comics/16523</a>"</span>,
              <span class="key">"name":</span> <span class="string">"Amazing Spider-Girl (2006) #13"</span>
            },
            {
              <span class="key">"resourceURI":</span> <span class="string">"<a class="jsonpeep-ext-a" href="http://gateway.marvel.com/v1/public/comics/17249">http://gateway.marvel.com/v1/public/comics/17249</a>"</span>,
              <span class="key">"name":</span> <span class="string">"Amazing Spider-Girl (2006) #14"</span>
            },
            {
              <span class="key">"resourceURI":</span> <span class="string">"<a class="jsonpeep-ext-a" href="http://gateway.marvel.com/v1/public/comics/17385">http://gateway.marvel.com/v1/public/comics/17385</a>"</span>,
              <span class="key">"name":</span> <span class="string">"Amazing Spider-Girl (2006) #15"</span>
            },
            {
              <span class="key">"resourceURI":</span> <span class="string">"<a class="jsonpeep-ext-a" href="http://gateway.marvel.com/v1/public/comics/17629">http://gateway.marvel.com/v1/public/comics/17629</a>"</span>,
              <span class="key">"name":</span> <span class="string">"Amazing Spider-Girl (2006) #16"</span>
            },
            {
              <span class="key">"resourceURI":</span> <span class="string">"<a class="jsonpeep-ext-a" href="http://gateway.marvel.com/v1/public/comics/70668">http://gateway.marvel.com/v1/public/comics/70668</a>"</span>,
              <span class="key">"name":</span> <span class="string">"Amazing Spider-Girl (2006) #17"</span>
            },
            {
              <span class="key">"resourceURI":</span> <span class="string">"<a class="jsonpeep-ext-a" href="http://gateway.marvel.com/v1/public/comics/20868">http://gateway.marvel.com/v1/public/comics/20868</a>"</span>,
              <span class="key">"name":</span> <span class="string">"Amazing Spider-Girl (2006) #18"</span>
            },
            {
              <span class="key">"resourceURI":</span> <span class="string">"<a class="jsonpeep-ext-a" href="http://gateway.marvel.com/v1/public/comics/21003">http://gateway.marvel.com/v1/public/comics/21003</a>"</span>,
              <span class="key">"name":</span> <span class="string">"Amazing Spider-Girl (2006) #19"</span>
            }
          ],
          <span class="key">"returned":</span> <span class="number">20</span>
        },
        <span class="key">"series":</span> {
          <span class="key">"available":</span> <span class="number">37</span>,
          <span class="key">"collectionURI":</span> <span class="string">"<a class="jsonpeep-ext-a" href="http://gateway.marvel.com/v1/public/characters/1009609/series">http://gateway.marvel.com/v1/public/characters/1009609/series</a>"</span>,
          <span class="key">"items":</span> [
            {
              <span class="key">"resourceURI":</span> <span class="string">"<a class="jsonpeep-ext-a" href="http://gateway.marvel.com/v1/public/series/1126">http://gateway.marvel.com/v1/public/series/1126</a>"</span>,
              <span class="key">"name":</span> <span class="string">"Amazing Spider-Girl (2006 - 2009)"</span>
            },
            {
              <span class="key">"resourceURI":</span> <span class="string">"<a class="jsonpeep-ext-a" href="http://gateway.marvel.com/v1/public/series/2234">http://gateway.marvel.com/v1/public/series/2234</a>"</span>,
              <span class="key">"name":</span> <span class="string">"AMAZING SPIDER-GIRL VOL. 1: WHATEVER HAPPENED TO THE DAUGHTER OF SPIDER-MAN TPB (2007)"</span>
            },
            {
              <span class="key">"resourceURI":</span> <span class="string">"<a class="jsonpeep-ext-a" href="http://gateway.marvel.com/v1/public/series/3101">http://gateway.marvel.com/v1/public/series/3101</a>"</span>,
              <span class="key">"name":</span> <span class="string">"AMAZING SPIDER-GIRL VOL. 2: COMES THE CARNAGE! TPB (2007)"</span>
            },
            {
              <span class="key">"resourceURI":</span> <span class="string">"<a class="jsonpeep-ext-a" href="http://gateway.marvel.com/v1/public/series/5376">http://gateway.marvel.com/v1/public/series/5376</a>"</span>,
              <span class="key">"name":</span> <span class="string">"Amazing Spider-Man Family (2008 - 2009)"</span>
            },
            {
              <span class="key">"resourceURI":</span> <span class="string">"<a class="jsonpeep-ext-a" href="http://gateway.marvel.com/v1/public/series/1143">http://gateway.marvel.com/v1/public/series/1143</a>"</span>,
              <span class="key">"name":</span> <span class="string">"Avengers Next (2006 - 2007)"</span>
            },
            {
              <span class="key">"resourceURI":</span> <span class="string">"<a class="jsonpeep-ext-a" href="http://gateway.marvel.com/v1/public/series/1995">http://gateway.marvel.com/v1/public/series/1995</a>"</span>,
              <span class="key">"name":</span> <span class="string">"Cable (1993 - 2002)"</span>
            },
            {
              <span class="key">"resourceURI":</span> <span class="string">"<a class="jsonpeep-ext-a" href="http://gateway.marvel.com/v1/public/series/5260">http://gateway.marvel.com/v1/public/series/5260</a>"</span>,
              <span class="key">"name":</span> <span class="string">"Counter X Vol. 1 (2008)"</span>
            },
            {
              <span class="key">"resourceURI":</span> <span class="string">"<a class="jsonpeep-ext-a" href="http://gateway.marvel.com/v1/public/series/19">http://gateway.marvel.com/v1/public/series/19</a>"</span>,
              <span class="key">"name":</span> <span class="string">"Daredevil Vol. II: Parts of a Hole (1999)"</span>
            },
            {
              <span class="key">"resourceURI":</span> <span class="string">"<a class="jsonpeep-ext-a" href="http://gateway.marvel.com/v1/public/series/2119">http://gateway.marvel.com/v1/public/series/2119</a>"</span>,
              <span class="key">"name":</span> <span class="string">"Fantastic Five (1999 - 2000)"</span>
            },
            {
              <span class="key">"resourceURI":</span> <span class="string">"<a class="jsonpeep-ext-a" href="http://gateway.marvel.com/v1/public/series/3281">http://gateway.marvel.com/v1/public/series/3281</a>"</span>,
              <span class="key">"name":</span> <span class="string">"Fantastic Five: The Final Doom (2007)"</span>
            },
            {
              <span class="key">"resourceURI":</span> <span class="string">"<a class="jsonpeep-ext-a" href="http://gateway.marvel.com/v1/public/series/13881">http://gateway.marvel.com/v1/public/series/13881</a>"</span>,
              <span class="key">"name":</span> <span class="string">"Fear Itself: The Home Front (2010)"</span>
            },
            {
              <span class="key">"resourceURI":</span> <span class="string">"<a class="jsonpeep-ext-a" href="http://gateway.marvel.com/v1/public/series/2572">http://gateway.marvel.com/v1/public/series/2572</a>"</span>,
              <span class="key">"name":</span> <span class="string">"Iron Man (1998 - 2004)"</span>
            },
            {
              <span class="key">"resourceURI":</span> <span class="string">"<a class="jsonpeep-ext-a" href="http://gateway.marvel.com/v1/public/series/2031">http://gateway.marvel.com/v1/public/series/2031</a>"</span>,
              <span class="key">"name":</span> <span class="string">"J2 (1998 - 1999)"</span>
            },
            {
              <span class="key">"resourceURI":</span> <span class="string">"<a class="jsonpeep-ext-a" href="http://gateway.marvel.com/v1/public/series/923">http://gateway.marvel.com/v1/public/series/923</a>"</span>,
              <span class="key">"name":</span> <span class="string">"Last Hero Standing (2005)"</span>
            },
            {
              <span class="key">"resourceURI":</span> <span class="string">"<a class="jsonpeep-ext-a" href="http://gateway.marvel.com/v1/public/series/991">http://gateway.marvel.com/v1/public/series/991</a>"</span>,
              <span class="key">"name":</span> <span class="string">"Last Planet Standing (2006)"</span>
            },
            {
              <span class="key">"resourceURI":</span> <span class="string">"<a class="jsonpeep-ext-a" href="http://gateway.marvel.com/v1/public/series/322">http://gateway.marvel.com/v1/public/series/322</a>"</span>,
              <span class="key">"name":</span> <span class="string">"MARVEL AGE: SPIDER-GIRL VOL. 1: LEGACY DIGEST (2004)"</span>
            },
            {
              <span class="key">"resourceURI":</span> <span class="string">"<a class="jsonpeep-ext-a" href="http://gateway.marvel.com/v1/public/series/26878">http://gateway.marvel.com/v1/public/series/26878</a>"</span>,
              <span class="key">"name":</span> <span class="string">"Marvel's Greatest Creators: What If? - Spider-Girl (2019)"</span>
            },
            {
              <span class="key">"resourceURI":</span> <span class="string">"<a class="jsonpeep-ext-a" href="http://gateway.marvel.com/v1/public/series/2059">http://gateway.marvel.com/v1/public/series/2059</a>"</span>,
              <span class="key">"name":</span> <span class="string">"Paradise X (2002 - 2003)"</span>
            },
            {
              <span class="key">"resourceURI":</span> <span class="string">"<a class="jsonpeep-ext-a" href="http://gateway.marvel.com/v1/public/series/2431">http://gateway.marvel.com/v1/public/series/2431</a>"</span>,
              <span class="key">"name":</span> <span class="string">"Paradise X Vol. 1 (2007)"</span>
            },
            {
              <span class="key">"resourceURI":</span> <span class="string">"<a class="jsonpeep-ext-a" href="http://gateway.marvel.com/v1/public/series/2702">http://gateway.marvel.com/v1/public/series/2702</a>"</span>,
              <span class="key">"name":</span> <span class="string">"PARADISE X VOL. 2 TPB [NEW PRINTING] (2007)"</span>
            }
          ],
          <span class="key">"returned":</span> <span class="number">20</span>
        },
        <span class="key">"stories":</span> {
          <span class="key">"available":</span> <span class="number">309</span>,
          <span class="key">"collectionURI":</span> <span class="string">"<a class="jsonpeep-ext-a" href="http://gateway.marvel.com/v1/public/characters/1009609/stories">http://gateway.marvel.com/v1/public/characters/1009609/stories</a>"</span>,
          <span class="key">"items":</span> [
            {
              <span class="key">"resourceURI":</span> <span class="string">"<a class="jsonpeep-ext-a" href="http://gateway.marvel.com/v1/public/stories/791">http://gateway.marvel.com/v1/public/stories/791</a>"</span>,
              <span class="key">"name":</span> <span class="string">"Cover #791"</span>,
              <span class="key">"type":</span> <span class="string">"cover"</span>
            },
            {
              <span class="key">"resourceURI":</span> <span class="string">"<a class="jsonpeep-ext-a" href="http://gateway.marvel.com/v1/public/stories/792">http://gateway.marvel.com/v1/public/stories/792</a>"</span>,
              <span class="key">"name":</span> <span class="string">"Interior #792"</span>,
              <span class="key">"type":</span> <span class="string">"interiorStory"</span>
            },
            {
              <span class="key">"resourceURI":</span> <span class="string">"<a class="jsonpeep-ext-a" href="http://gateway.marvel.com/v1/public/stories/806">http://gateway.marvel.com/v1/public/stories/806</a>"</span>,
              <span class="key">"name":</span> <span class="string">"Cover #806"</span>,
              <span class="key">"type":</span> <span class="string">"cover"</span>
            },
            {
              <span class="key">"resourceURI":</span> <span class="string">"<a class="jsonpeep-ext-a" href="http://gateway.marvel.com/v1/public/stories/807">http://gateway.marvel.com/v1/public/stories/807</a>"</span>,
              <span class="key">"name":</span> <span class="string">"Interior #807"</span>,
              <span class="key">"type":</span> <span class="string">"interiorStory"</span>
            },
            {
              <span class="key">"resourceURI":</span> <span class="string">"<a class="jsonpeep-ext-a" href="http://gateway.marvel.com/v1/public/stories/808">http://gateway.marvel.com/v1/public/stories/808</a>"</span>,
              <span class="key">"name":</span> <span class="string">"Cover #808"</span>,
              <span class="key">"type":</span> <span class="string">"cover"</span>
            },
            {
              <span class="key">"resourceURI":</span> <span class="string">"<a class="jsonpeep-ext-a" href="http://gateway.marvel.com/v1/public/stories/809">http://gateway.marvel.com/v1/public/stories/809</a>"</span>,
              <span class="key">"name":</span> <span class="string">"Interior #809"</span>,
              <span class="key">"type":</span> <span class="string">"interiorStory"</span>
            },
            {
              <span class="key">"resourceURI":</span> <span class="string">"<a class="jsonpeep-ext-a" href="http://gateway.marvel.com/v1/public/stories/810">http://gateway.marvel.com/v1/public/stories/810</a>"</span>,
              <span class="key">"name":</span> <span class="string">"Cover #810"</span>,
              <span class="key">"type":</span> <span class="string">"cover"</span>
            },
            {
              <span class="key">"resourceURI":</span> <span class="string">"<a class="jsonpeep-ext-a" href="http://gateway.marvel.com/v1/public/stories/811">http://gateway.marvel.com/v1/public/stories/811</a>"</span>,
              <span class="key">"name":</span> <span class="string">"Interior #811"</span>,
              <span class="key">"type":</span> <span class="string">"interiorStory"</span>
            },
            {
              <span class="key">"resourceURI":</span> <span class="string">"<a class="jsonpeep-ext-a" href="http://gateway.marvel.com/v1/public/stories/812">http://gateway.marvel.com/v1/public/stories/812</a>"</span>,
              <span class="key">"name":</span> <span class="string">"Cover #812"</span>,
              <span class="key">"type":</span> <span class="string">"cover"</span>
            },
            {
              <span class="key">"resourceURI":</span> <span class="string">"<a class="jsonpeep-ext-a" href="http://gateway.marvel.com/v1/public/stories/813">http://gateway.marvel.com/v1/public/stories/813</a>"</span>,
              <span class="key">"name":</span> <span class="string">"Interior #813"</span>,
              <span class="key">"type":</span> <span class="string">"interiorStory"</span>
            },
            {
              <span class="key">"resourceURI":</span> <span class="string">"<a class="jsonpeep-ext-a" href="http://gateway.marvel.com/v1/public/stories/814">http://gateway.marvel.com/v1/public/stories/814</a>"</span>,
              <span class="key">"name":</span> <span class="string">"Cover #814"</span>,
              <span class="key">"type":</span> <span class="string">"cover"</span>
            },
            {
              <span class="key">"resourceURI":</span> <span class="string">"<a class="jsonpeep-ext-a" href="http://gateway.marvel.com/v1/public/stories/815">http://gateway.marvel.com/v1/public/stories/815</a>"</span>,
              <span class="key">"name":</span> <span class="string">"Interior #815"</span>,
              <span class="key">"type":</span> <span class="string">"interiorStory"</span>
            },
            {
              <span class="key">"resourceURI":</span> <span class="string">"<a class="jsonpeep-ext-a" href="http://gateway.marvel.com/v1/public/stories/816">http://gateway.marvel.com/v1/public/stories/816</a>"</span>,
              <span class="key">"name":</span> <span class="string">"Cover #816"</span>,
              <span class="key">"type":</span> <span class="string">"cover"</span>
            },
            {
              <span class="key">"resourceURI":</span> <span class="string">"<a class="jsonpeep-ext-a" href="http://gateway.marvel.com/v1/public/stories/817">http://gateway.marvel.com/v1/public/stories/817</a>"</span>,
              <span class="key">"name":</span> <span class="string">"Interior #817"</span>,
              <span class="key">"type":</span> <span class="string">"interiorStory"</span>
            },
            {
              <span class="key">"resourceURI":</span> <span class="string">"<a class="jsonpeep-ext-a" href="http://gateway.marvel.com/v1/public/stories/818">http://gateway.marvel.com/v1/public/stories/818</a>"</span>,
              <span class="key">"name":</span> <span class="string">"Cover #818"</span>,
              <span class="key">"type":</span> <span class="string">"cover"</span>
            },
            {
              <span class="key">"resourceURI":</span> <span class="string">"<a class="jsonpeep-ext-a" href="http://gateway.marvel.com/v1/public/stories/819">http://gateway.marvel.com/v1/public/stories/819</a>"</span>,
              <span class="key">"name":</span> <span class="string">"Interior #819"</span>,
              <span class="key">"type":</span> <span class="string">"interiorStory"</span>
            },
            {
              <span class="key">"resourceURI":</span> <span class="string">"<a class="jsonpeep-ext-a" href="http://gateway.marvel.com/v1/public/stories/820">http://gateway.marvel.com/v1/public/stories/820</a>"</span>,
              <span class="key">"name":</span> <span class="string">"\"THE PEOPLE PLAYED BY GAMES!\" Torn between her loyalties to Kaine and the Black Tarantula, Spider-Girl finally confronts Lady Oc"</span>,
              <span class="key">"type":</span> <span class="string">"cover"</span>
            },
            {
              <span class="key">"resourceURI":</span> <span class="string">"<a class="jsonpeep-ext-a" href="http://gateway.marvel.com/v1/public/stories/821">http://gateway.marvel.com/v1/public/stories/821</a>"</span>,
              <span class="key">"name":</span> <span class="string">"\"THE PEOPLE PLAYED BY GAMES!\" Torn between her loyalties to Kaine and the Black Tarantula, Spider-Girl finally confronts Lady Oc"</span>,
              <span class="key">"type":</span> <span class="string">"interiorStory"</span>
            },
            {
              <span class="key">"resourceURI":</span> <span class="string">"<a class="jsonpeep-ext-a" href="http://gateway.marvel.com/v1/public/stories/822">http://gateway.marvel.com/v1/public/stories/822</a>"</span>,
              <span class="key">"name":</span> <span class="string">"\"IF THIS BE MY DESTINY—!\" Spider-Girl learns the fate Norman Osborn planned for his grandson when she finally uncovers the secre"</span>,
              <span class="key">"type":</span> <span class="string">"cover"</span>
            },
            {
              <span class="key">"resourceURI":</span> <span class="string">"<a class="jsonpeep-ext-a" href="http://gateway.marvel.com/v1/public/stories/823">http://gateway.marvel.com/v1/public/stories/823</a>"</span>,
              <span class="key">"name":</span> <span class="string">"\"IF THIS BE MY DESTINY—!\" Spider-Girl learns the fate Norman Osborn planned for his grandson when she finally uncovers the secre"</span>,
              <span class="key">"type":</span> <span class="string">"interiorStory"</span>
            }
          ],
          <span class="key">"returned":</span> <span class="number">20</span>
        },
        <span class="key">"events":</span> {
          <span class="key">"available":</span> <span class="number">1</span>,
          <span class="key">"collectionURI":</span> <span class="string">"<a class="jsonpeep-ext-a" href="http://gateway.marvel.com/v1/public/characters/1009609/events">http://gateway.marvel.com/v1/public/characters/1009609/events</a>"</span>,
          <span class="key">"items":</span> [
            {
              <span class="key">"resourceURI":</span> <span class="string">"<a class="jsonpeep-ext-a" href="http://gateway.marvel.com/v1/public/events/302">http://gateway.marvel.com/v1/public/events/302</a>"</span>,
              <span class="key">"name":</span> <span class="string">"Fear Itself"</span>
            }
          ],
          <span class="key">"returned":</span> <span class="number">1</span>
        },
        <span class="key">"urls":</span> [
          {
            <span class="key">"type":</span> <span class="string">"detail"</span>,
            <span class="key">"url":</span> <span class="string">"<a class="jsonpeep-ext-a" href="http://marvel.com/characters/2171/spider-girl?utm_campaign=apiRef&amp;">http://marvel.com/characters/2171/spider-girl?utm_campaign=apiRef&amp;</a>;amp;utm_source=a8f9ccf932bf29fd379ef00e11668673"</span>
          },
          {
            <span class="key">"type":</span> <span class="string">"wiki"</span>,
            <span class="key">"url":</span> <span class="string">"<a class="jsonpeep-ext-a" href="http://marvel.com/universe/Spider-Girl_(MC2)?utm_campaign=apiRef&amp;">http://marvel.com/universe/Spider-Girl_(MC2)?utm_campaign=apiRef&amp;</a>;amp;utm_source=a8f9ccf932bf29fd379ef00e11668673"</span>
          },
          {
            <span class="key">"type":</span> <span class="string">"comiclink"</span>,
            <span class="key">"url":</span> <span class="string">"<a class="jsonpeep-ext-a" href="http://marvel.com/comics/characters/1009609/spider-girl_may_parker?utm_campaign=apiRef&amp;">http://marvel.com/comics/characters/1009609/spider-girl_may_parker?utm_campaign=apiRef&amp;</a>;amp;utm_source=a8f9ccf932bf29fd379ef00e11668673"</span>
          }
        ]
      }
    ]
  }
}</pre>
<p>HTML Format Printed for the character. &nbsp;This will go into your <code>main</code>&nbsp;element:</p>
<pre><code class="sourceCode html">&lt;div&gt; </code><br><code class="sourceCode html">  &lt;h1&gt;Spider-Girl (May Parker)&lt;/h1&gt; </code><br><code class="sourceCode html">  &lt;img alt= "Spider-Girl (May Parker)"src="<a href="http://i.annihil.us/u/prod/marvel/i/mg/1/70/4c003adccbe4f">http://i.annihil.us/u/prod/marvel/i/mg/1/70/4c003adccbe4f</a>"/&gt; </code><br><code class="sourceCode html">  &lt;p&gt;May \"Mayday\" Parker is the daughter of Spider-Man and Mary Jane Watson-Parker. Born with all her fatherï¿½s powers-and the same silly sense of humor-sheï¿½s grown up to become one of Earthï¿½s most trusted heroes and a fitting tribute to her proud papa.&lt;/p&gt; <br> &nbsp;&lt;h2&gt;Comics&lt;/h2&gt;<br>  &lt;ul&gt;<br>    &lt;li&gt;Amazing Spider-Girl (2006)&lt;/li&gt;<br>    &lt;li&gt;Amazing Spider-Girl (2006) #1&lt;/li&gt;<br>    &lt;li&gt;Amazing Spider-Girl (2006) #2&lt;/li&gt;<br>    &lt;li&gt;Amazing Spider-Girl (2006) #3&lt;/li&gt;<br>    &lt;li&gt;Amazing Spider-Girl (2006) #4&lt;/li&gt;<br>    &lt;li&gt;Amazing Spider-Girl (2006) #5&lt;/li&gt;<br>    &lt;li&gt;Amazing Spider-Girl (2006) #6&lt;/li&gt;<br>    &lt;li&gt;Amazing Spider-Girl (2006) #7&lt;/li&gt;<br>    &lt;li&gt;Amazing Spider-Girl (2006) #8&lt;/li&gt;<br>    &lt;li&gt;Amazing Spider-Girl (2006) #9&lt;/li&gt;<br>    &lt;li&gt;Amazing Spider-Girl (2006) #10&lt;/li&gt;<br>    &lt;li&gt;Amazing Spider-Girl (2006) #11&lt;/li&gt;<br>    &lt;li&gt;Amazing Spider-Girl (2006) #12&lt;/li&gt;<br>    &lt;li&gt;Amazing Spider-Girl (2006) #13&lt;/li&gt;<br>    &lt;li&gt;Amazing Spider-Girl (2006) #14&lt;/li&gt;<br>    &lt;li&gt;Amazing Spider-Girl (2006) #15&lt;/li&gt;<br>    &lt;li&gt;Amazing Spider-Girl (2006) #16&lt;/li&gt;<br>    &lt;li&gt;Amazing Spider-Girl (2006) #17&lt;/li&gt;<br>    &lt;li&gt;Amazing Spider-Girl (2006) #18&lt;/li&gt;<br>    &lt;li&gt;Amazing Spider-Girl (2006) #19&lt;/li&gt;<br>  &lt;/ul&gt;<br>&lt;/div&gt; </code></pre>
<p><strong>If there is no character found for the given ID, make sure to give a response status code of 404 on the page, and render an HTML page with a paragraph class called <code>error</code>; this paragraph should describe the error.&nbsp;</strong></p>
<h2 id="httplocalhost3000publicsite.css"><code>http://localhost:3000/public/site.css</code></h2>
<p>This file should have 5 rulesets that apply to the <code>/</code> route, and 5 rulesets that apply to all of your pages. Rulesets may be shared across both pages; for example, if you styled a <code>p</code> tag, it would count as 1 of the 5 for both pages.</p>
<p>You may include more than 5 rulesets if you so desire.</p>
<h2 id="references-and-packages">References and Packages</h2>
<p>Basic CSS info can easily be referenced in the <a class="external" href="https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Getting_started" target="_blank"><span>MDN CSS tutorial</span><span class="screenreader-only">&nbsp;(Links to an external site.)</span></a>.</p>
<h2 id="hints">Hints</h2>
<p>You can use variables in your handlebars layout, that you pass to res.render. For example, in your layout you could have:</p>
<pre class="sourceCode html"><code class="sourceCode html"><span class="kw">&lt;meta</span><span class="ot"> name=</span><span class="st">"keywords"</span><span class="ot"> content=</span><span class="st">"{{keywords}}"</span> <span class="kw">/&gt;</span></code></pre>
<p>And in your route:</p>
<pre class="sourceCode javascript"><code class="sourceCode javascript"><span class="ot">res</span>.<span class="fu">render</span>(<span class="st">"someView"</span>, {<span class="dt">keywords</span>: <span class="st">"dogs coffee keto"</span>});</code></pre>
<p>Which will render as:</p>
<pre class="sourceCode html"><code class="sourceCode html"><span class="kw">&lt;meta</span><span class="ot"> name=</span><span class="st">"keywords"</span><span class="ot"> content=</span><span class="st">"dogs coffee keto"</span> <span class="kw">/&gt;</span></code></pre>
<p>Or, perhaps, the title tag.</p>
<h2 id="requirements">Requirements</h2>
<ol>
<li>You <strong>must not submit</strong> your node_modules folder</li>
<li>You <strong>must remember</strong> to save your dependencies to your package.json folder</li>
<li>You must do basic error checking in each function</li>
<li>Check for arguments existing and of proper type.</li>
<li>Throw if anything is out of bounds (ie, trying to perform an incalculable math operation or accessing data that does not exist)</li>
<li>You <strong>MUST</strong> use <code>async/await</code> for all asynchronous operations.</li>
<li>You <strong>must remember</strong> to update your package.json file to set <code>app.js</code> as your starting script!</li>
<li><a class="external" href="https://validator.w3.org/#validate_by_input" target="_blank"><span>Your HTML must be valid</span><span class="screenreader-only">&nbsp;(Links to an external site.)</span></a> or you will lose points on the assignment.</li>
<li>Your HTML must make semantical sense; usage of tags for the purpose of simply changing the style of elements (such as <code>i</code>, <code>b</code>, <code>font</code>, <code>center</code>, etc) will result in points being deducted; think in terms of content first, then style with your CSS.</li>
<li><strong>You can be as creative as you'd like to fulfill front-end requirements</strong>; if an implementation is not explicitly stated, however you go about it is fine (provided the HTML is valid and semantical). Design is not a factor in this course.</li>
<li>All inputs must be properly labeled!</li>
<li>All previous requirements about the <code>package.json</code> author, start task, dependenices, etc. still apply</li>
</ol></div>
