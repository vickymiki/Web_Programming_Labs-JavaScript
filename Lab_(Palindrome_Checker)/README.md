 <div class="description user_content "><h1 id="toc_0">CS-546 Lab 9</h1>
<h2 id="toc_1">Palindromes</h2>
<p>For this lab, you will be using HTML, CSS, and JavaScript on the user's browser to make a simple palindrome checker!</p>
<p>A palindrome is a phrase that is spelled the same way, backwards and forwards (ignoring spacing and punctuation). For example, the following phrases are palindromes:</p>
<ul>
<li>Madam</li>
<li>Was it a cat I saw?</li>
<li>He did, eh?</li>
<li>Go hang a salami, I’m a lasagna hog.</li>
<li>Poor Dan is in a droop</li>
</ul>
<p>You will create an express server with a single page at the location <code>/</code> that will provide the user with a web page to allow them to check if a phrase is a palindrome. <strong>The entire checking operation will be done using client-side JavaScript</strong>.</p>
<h2 id="toc_2">The Server</h2>
<p><strong>Your server this week should not check for palindromes! Your server only exists to allow someone to get to the HTML Page and download the associated assets to run the palindrome checking page.</strong></p>
<h3 id="toc_3"><code>/</code> The Whole Palindrome Checker</h3>
<p>Your page should have a few basic user interface elements:</p>
<ul>
<li>A header tag, with an h1 naming your site, with a title for your page</li>
<li>A footer with your name, student ID, and any other info about yourself you wish to include</li>
<li>A single ordered list with an id of <code>attempts</code>. All attempted to strings with all the terms you have checked so far (until you refresh the page) will appear in this list as list items. Phrases that are palindromes will be colored in <em>blue</em>, while phrases that are not will be colored in <em>red</em>. You must use the CSS classes below to color these phrases.</li>
</ul>
<p>Your page will have a form with the following:</p>
<ul>
<li>A textarea with a <code>name</code> of <code>phrase</code></li>
<li>A buttom to submit the form</li>
</ul>
<p>Using JavaScript in your browser only, you will listen for the form's <code>submit</code> event; when the form is submitted, you will:</p>
<ul>
<li>Get the value of the textarea</li>
<li>Lowercase the text</li>
<li>Strip all non alphanumeric text; this includes spaces. For example, <code>Hello, 2 the world!</code> becomes <code>hello, 2 the world!</code> when lowercased and then <code>hello2theworld</code> when stripped of all non alphanumeric text</li>
<li>Determine whether or not the text is a palindrome</li>
<li>Add a list item to the <code>#attempts</code> list of terms you have checked. This list item should have a class of <code>is-palindrome</code> if it is a palindrome, or <code>not-palindrome</code>if it is not.</li>
</ul>
<p>If the user does not have a value for the textarea when they submit, you should not continue the palindrome checking and instead should inform them of an error somehow.</p>
<h2 id="toc_4">The style</h2>
<p>You will style your page using at least 10 CSS selectors for general CSS styling. You will place the CSS in its own file.</p>
<p>You <em>must</em> style the <code>is-palindrome</code> class to make text have a <code>color</code> of <code>#0000FF</code> and <code>not-palindrome</code> class to make text have a color of <code>#FF0000</code>.</p>
<h2 id="toc_5">References and Packages</h2>
<p>Basic CSS info can easily be referenced in the <a class="external" href="https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Getting_started" target="_blank"><span>MDN CSS tutorial</span><span class="screenreader-only">&nbsp;(Links to an external site.)</span></a>.</p>
<h2 id="toc_6">Requirements</h2>
<ol>
<li>Al previous requirements still apply.</li>
<li>You <strong>must remember</strong> to update your package.json file to set <code>app.js</code> as your starting script!</li>
<li><a class="external" href="https://validator.w3.org/#validate_by_input" target="_blank"><span>Your HTML must be valid</span><span class="screenreader-only">&nbsp;(Links to an external site.)</span></a> or you will lose points on the assignment.</li>
<li>Your HTML must make semantical sense; usage of tags for the purpose of simply changing the style of elements (such as <code>i</code>, <code>b</code>, <code>font</code>, <code>center</code>, etc) will result in points being deducted; think in terms of content first, then style with your CSS.</li>
<li><strong>You can be as creative as you'd like to fulfill front-end requirements</strong>; if an implementation is not explicitly stated, however you go about it is fine (provided the HTML is valid and semantical). Design is not a factor in this course.</li>
<li><strong>Your client side JavaScript must be in its own file and referenced from the HTML accordingly</strong>.</li>
<li>All inputs must be properly labeled!</li>
</ol></div>
