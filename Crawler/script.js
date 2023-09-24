const listOfTags = ["html", "html", "head", "/head", "body", "a", "abbr", "acronym", "address", "applet", "area", "article", "aside", "audio", "b", "base", "basefont", "bdi", "bdo"
    , "bgsound", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "command", "content", "data", "datalist"
    , "dd", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "font", "footer", "form", "frame", "frameset", "h1"
    , "h2", "h3", "h4", "h5", "h6", "header", "hr", "html", "i", "iframe", "img", "input", "ins", "isindex", "kbd", "keygen", "label", "legend", "li", "link", "listing", "main"
    , "map", "mark", "marquee", "menu", "meta", "meter", "nav", "nobr", "noembed", "noframes", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param" , "picture"
    , "plaintext", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "shadow", "small", "source", "span", "strike", "strong" , "style" , "sub"
    , "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "tt", "u", "ul", "var", "video", "wbr", "xmp"
];

let divCount = 0;

function addDiv() {
    divCount++;
    let newMainDiv = document.createElement("div");
    newMainDiv.id = "main";
    let newDiv = document.createElement("div");
    newDiv.innerHTML = '<input type="text" id="urlInput' + divCount + '" placeholder="Enter website URL" oninput="checkURL(' + divCount + ')">' +
        '<input type="text" id="tagInput' + divCount + '" placeholder="Enter tag to search" oninput="checkTag(' + divCount + ')">' +
        '<button onclick="loadDoc(' + divCount + ')">Load</button>' +
        '<button class="remove" onclick="removeDiv(event)">Remove</button>' +
        '<div class="contents" id="Content' + divCount + '"></div>';
    newMainDiv.appendChild(newDiv);
    document.body.appendChild(newMainDiv);
}

function removeDiv(event) {
    let divToRemove = event.target.parentElement.parentElement;
    divToRemove.remove();
}

function checkURL(divNum) {
    const url = document.getElementById('urlInput' + divNum).value;
    if (isValidURL(url)) {

        document.getElementById('urlInput' + divNum).style.borderColor = '#3bd343';
    } else {
        document.getElementById('urlInput' + divNum).style.borderColor = 'red';
    }
}

function checkTag(divNum) {
    const tag = document.getElementById('tagInput' + divNum).value.toLowerCase();
    if (listOfTags.includes(tag)) {
        document.getElementById('tagInput' + divNum).style.borderColor = '#3bd343';
    } else {
        document.getElementById('tagInput' + divNum).style.borderColor = 'red';
    }
}

function isValidURL(url) {
    if (!/^https?:\/\//i.test(url)) {
        return false;
    }

    // const domain = url.match(/^https?:\/\/(?:www\.)?([^/]+)/i)[1];
    // const subdomains = domain.split('.');
    // if (subdomains.length > 2) {
    //     return false;
    // }

    return true;
}

function loadDoc(divNum) {
    const url = document.getElementById('urlInput' + divNum).value;
    const tagToSearch = document.getElementById('tagInput' + divNum).value;

    if (!isValidURL(url)) {
        alert("Please enter a valid URL.");
        const listContainer1 = document.getElementById('Content' + divNum);
        listContainer1.innerHTML = "";
        return;
    }

    const listContainer = document.getElementById('Content' + divNum);
    listContainer.innerHTML = "";

    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        if (this.status === 200) {
            let content = document.createElement("div");
            content.innerHTML = this.responseText;

            let tags = content.querySelectorAll(tagToSearch);

            if (tags.length === 0) {
                alert("No matching tags found.");
                return;
            }

            tags.forEach(tag => {
                let codeElement = document.createElement("code");
                codeElement.innerText = tag.outerHTML;
                let tagDiv = document.createElement("div");
                tagDiv.appendChild(codeElement);
                listContainer.appendChild(tagDiv);
            });
        } else {
            alert("Error loading the website.");
        }
    };
    xhttp.onerror = function () {
        alert("An error occurred while loading the website.");
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}