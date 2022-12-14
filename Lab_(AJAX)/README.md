<div class="description user_content "><h1 id="toc_0">CS-546 Lab 11</h1>
<h2 id="toc_1">AJAX</h2>
<p>For this lab, you will be using HTML, JQuery and Client-side JavaScript on the user's browser to make a simple application that makes AJAX requests for the data needed and then inject the elements and data onto the page.&nbsp;</p>
<h2 id="toc_2">TV Maze API</h2>
<p>For this lab, you will be using three endpoints of the TV Maze API for your AJAX calls. &nbsp;The list of shows: &nbsp;<a class="external" href="http://api.tvmaze.com/shows" target="_blank"><span>http://api.tvmaze.com/shows</span><span class="screenreader-only">&nbsp;(Links to an external site.)</span></a>&nbsp;and then you'll get an individual show using the endpoint <a class="external" href="http://api.tvmaze.com/shows/:id" target="_blank"><span>http://api.tvmaze.com/shows/:id</span><span class="screenreader-only">&nbsp;(Links to an external site.)</span></a>&nbsp;where <code>:id</code>&nbsp;is the ID of the show you are looking up. You will also use <a href="http://api.tvmaze.com/search/shows?q=search_term">http://api.tvmaze.com/search/shows?q=search_term </a>to search the API&nbsp;</p>
<h2 id="toc_2">The Server</h2>
<p><strong>Your server this week should not do any of the processing or&nbsp;calculations. &nbsp;Your server only exists to allow someone to get to the HTML Page and download the associated assets to run the application.</strong></p>
<h3 id="toc_3"><code>/</code> The Whole Application</h3>
<p>This route will respond with a static HTML file and all of the functionality will be done in a client-side JS file. &nbsp;You will make client-side AJAX requests to the API and use jQuery to target and create elements on the page.&nbsp;</p>
<p>Your page should have a few basic user interface elements:</p>
<ul>
<li>A header tag, with an h1 naming your site, with a title for your page</li>
<li>A footer with your name, student ID, and any other info about yourself you wish to include</li>
<li>An empty unordered list with an id of <code>showList</code>&nbsp;that is initially hidden. &nbsp;</li>
<li>A div with an id of <code>show</code>&nbsp;that is initially hidden.</li>
<li>A form with an id of <code>searchForm.</code></li>
<li>A text input&nbsp;with an id of <code>search_term.</code></li>
<li>A label with a <code>for</code> attribute referencing your input</li>
<li>A button to submit the form</li>
<li>A link that links back to the "/" route with the text "Back to All Shows" and that has an id of <code>homeLink</code>&nbsp;This link will initially be hidden. It will ONLY be displayed when the <code>show</code>&nbsp;element is being displayed or ONLY when a search is performed and search results are being displayed. &nbsp;You should NOT show this link on the initial show list. &nbsp;This link will simply trigger a reload of the page, which then will display the initial list of shows</li>
</ul>
<h2 id="toc_4">AJAX Requests</h2>
<p><strong>Remember, you will be ONLY using client-side JavaScript!</strong></p>
<p>1. <strong>Page load</strong>: When the page loads, you will query the TV Maze API to get the list of shows using an AJAX request. &nbsp;Once the AJAX request returns the data, you will then create list items of links for each show that is returned using jQuery. The link text will be the name of the show, and the <code>href</code>&nbsp;attribute will be set to the url for that show from the TV Maze API (the url we need for the link is in the data, in the <code>_links.self.href</code>&nbsp;field.) &nbsp;For the link, you will need to call a function on the click event of the link (do not forget to preventDefault() for the default behavior for the link. &nbsp;You will then&nbsp;append each list item to the <code>showList</code>&nbsp;UL element and then show the <code>showList</code>&nbsp;element (make sure you&nbsp;hide the <code>show</code>&nbsp;element). &nbsp;</p>
<p>Endpoint to be used: <a class="external" href="http://api.tvmaze.com/shows" target="_blank"><span>http://api.tvmaze.com/shows</span></a></p>
<p>2. <strong>Search Form Submission: </strong>If there is no value for the <code>search_term </code>input when the form is submitted, you should not continue and instead should inform them of an error somehow. (don't forget to take into account if they just submit the form with a bunch of spaces as the value!) &nbsp;If there is a value, you will first empty the list item elements in the <code>showList</code>&nbsp;element (because there will be elements from the initial showList still there, they are just hidden),&nbsp;&nbsp;then query the API for that <code>search_term </code>using an AJAX request. Once the AJAX request returns the data, you will then create list items of links for each show that is returned using jQuery. The link text will be the name of the show, and the <code>href</code>&nbsp;will link to the url for that show. &nbsp;(the url we need is in the data in the <code>_links.self.href</code>&nbsp;field. You will then&nbsp;append each list item to the <code>showList</code>&nbsp;UL element and then show the <code>showList</code>&nbsp;element (make sure you&nbsp;hide the <code>show</code>&nbsp;element).</p>
<p>Endpoint to be used: <a class="external" href="http://api.tvmaze.com/shows" target="_blank"><span>http://api.tvmaze.com/search/shows?q=search_term_here</span></a></p>
<p>3. &nbsp;<strong>Link Clicked</strong>: For the link, you will need to call a function on the click event of the link and not the default link behavior (do not forget to use preventDefault()). &nbsp;&nbsp; When the link to a show is clicked, it will hide the <code>showList</code>&nbsp;element, it will then empty the <code>show</code>&nbsp; element (just in case there was show data previously loaded into the <code>show</code>&nbsp;element). It will then make an AJAX request to the URL and fetch the data for that show (that was the href in your link). &nbsp;You will parse through the show data returned from the AJAX request. You will create the following elements using jQuery:&nbsp;<span>&nbsp;an </span><code>h1</code><span>&nbsp;with the show </span><code>name</code><span>, &nbsp;an </span><code>img</code><span> which the </span><code>src</code><span>&nbsp;is set to the value read from </span><code>image.medium</code><span> in the data which is a URL to an image for the show, &nbsp;and a&nbsp;</span><code>dl</code><span>&nbsp;(definition list) of the following properties of the matching show: </span><code>language</code><span>, </span><code>genres</code><span>(the entire array in an </span><code>ul</code><span>), </span><code>rating.average</code><span>, </span><code>network.name</code><span>, and </span><code>summary.&nbsp; </code>You will then show the <code>show</code>&nbsp; element. &nbsp;</p>
<p><strong>NOTE: Not all shows have ALL data displayed on the <code>show</code>&nbsp; element, which will cause your application to not work correctly when a show link is clicked if it doesn't have all the needed data needed for the <code>show</code>&nbsp;element. &nbsp;You will be required to check each field needed for the <code>show</code>&nbsp;element. &nbsp;If there is no value for a field, you will show "N/A" instead of that field's value on the show detail element. &nbsp;For the image, if there is no image, you can load a generic "no image" image that is served from your public directory. &nbsp;You can save this one (right click and save the image):</strong></p>

![image](https://user-images.githubusercontent.com/45781587/192121255-2f2f02a9-5f19-449d-907c-e32f9b6ed3be.png)


<p>&nbsp;</p>
<p><strong>For example: &nbsp;The show "Hemlock Grove" is missing the network, "Anna und die Haustiere" is missing the image and the Average Rating, "Under Arrest" is missing the Language, the Average Rating and the Network. You would display them similar to shown below.</strong></p>
<p>&nbsp;</p>
  
![image](https://user-images.githubusercontent.com/45781587/192121269-539ac430-5ac2-4f92-a318-61e088e75862.png)
![image](https://user-images.githubusercontent.com/45781587/192121278-281f8945-b635-4046-b70b-cbe6d573fece.png)
![image](https://user-images.githubusercontent.com/45781587/192121285-8ee40a7c-d882-4b75-bb02-5ef0565e2608.png)
 
<p>Endpoint to be used: <a class="external" href="http://api.tvmaze.com/shows" target="_blank"><span>http://api.tvmaze.com/shows/:id</span></a>&nbsp;(this is read from the href attribute of the link)</p>
<h2 id="toc_6">Style:</h2>
<p>You are NOT required to use CSS for this lab (but you can if you want to).&nbsp;</p>
<h2 id="toc_6">Requirements</h2>
<ol>
<li>All previous requirements still apply.</li>
<li>You <strong>must remember</strong> to update your package.json file to set <code>app.js</code> as your starting script!</li>
<li><a class="external" href="https://validator.w3.org/#validate_by_input" target="_blank"><span>Your HTML must be valid</span><span class="screenreader-only">&nbsp;(Links to an external site.)</span></a> or you will lose points on the assignment.</li>
<li>Your HTML must make semantical sense; usage of tags for the purpose of simply changing the style of elements (such as <code>i</code>, <code>b</code>, <code>font</code>, <code>center</code>, etc) will result in points being deducted; think in terms of content first.&nbsp;</li>
<li><strong>You can be as creative as you'd like to fulfill front-end requirements</strong>; if an implementation is not explicitly stated, however you go about it is fine (provided the HTML is valid and semantical). Design is not a factor in this course.</li>
<li><strong>Your client side JavaScript must be in its own file and referenced from the HTML accordingly</strong>.</li>
<li>All inputs must be properly labeled!</li>
</ol></div>
