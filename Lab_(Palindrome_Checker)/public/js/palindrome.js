let flag;

let pali_form = document.getElementById("pali-form");
const pali_textarea = document.getElementById("pali-textarea");
let errorDiv = document.getElementById("error-id");
let myOl = document.getElementById("attempts");
let formLabel = document.getElementById("formLabel");

if (pali_form) {
    pali_form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (pali_textarea.value.trim()) {
            palindrome_check(
                pali_textarea.value
                    .trim()
                    .toLowerCase()
                    .replace(/[\W_]+/g, "")
            );

            pali_textarea.classList.remove("inputClass");
            formLabel.classList.remove("error");
            errorDiv.hidden = true;

            let li = document.createElement("li");
            li.innerHTML = pali_textarea.value;

            if (flag) {
                li.className = "is-palindrome";
            } else {
                li.className = "not-palindrome";
            }

            myOl.appendChild(li);
            pali_form.reset();
            pali_textarea.focus();
        } else {
            pali_textarea.value = "";
            errorDiv.hidden = false;
            errorDiv.innerHTML = "You must enter a value";
            formLabel.className = "error";
            pali_textarea.focus();
            pali_textarea.className = "inputClass";
        }
    });
}

function string_reverse(string) {
    // Function to reverse the given string
    let rev_string = "";
    for (let i = string.length - 1; i >= 0; i--) {
        rev_string += string[i];
    }
    // Storing and returning reversed string using rev_string variable
    return rev_string;
}

function palindrome_check(string) {
    rev_string = string_reverse(string);
    // Check if the original string and reversed string are same
    // And then setting the flag
    if (rev_string === string) {
        flag = true;
    } else {
        flag = false;
    }
}
