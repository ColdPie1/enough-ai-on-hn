/*
 * this script searches submission titles on Hacker News for AI-related words
 * and then clicks the Hide link in order to get rid of them.
 */

function dbg(s) {
    // debug print with prefix
    console.log("Enough-AI-On-HN: " + s);
}

function searchHideLink(list, term) {
    // search hide links for href containing term
    for (var i = 0, len = list.length; i < len; i++) {
        hide_link = list[i];
        href = hide_link.getAttribute("href");
        if(href.includes(term)){
            dbg(`Found hide link with href: ${href}.`);
            return hide_link;
        }
    }
    return null;
}

function enoughAIRun() {
    dbg("Running.");

    // build regex
    terms = [
        "Agentic",
        "Agents?",
        "AI",
        "Anthropic",
        "ChatGPT\\d*",
        "Claude",
        "Codex\\d*",
        "Fable\\d*",
        "Gemini\\d*",
        "Gen\\s*AI",
        "GPT\\d*",
        "Grok\\d*",
        "Inference",
        "Kimi\\d*",
        "\\w*LLMs?",
        "MCPs?",
        "Models?",
        "Mythos",
        "Ollama\\d*",
        "OpenAI",
        "Opus\\d*",
        "Qwen\\d*",
        "SpaceXAI",
        "Tokens?",
        "xAI",
    ];
    regex = `\\b(${terms.join("|")})\\b`;
    dbg(`Built regex: "${regex}".`);
    re = RegExp(regex, "i");

    // gather hide links for later
    hide_links = document.querySelectorAll("a.hider");

    // iterate over submission rows
    n_stories = 0;
    titlerows = document.querySelectorAll("tr.submission");
    titlerows.forEach((titlerow) => {
        titlespan = titlerow.querySelector("span.titleline");
        title = titlespan.querySelector("a").innerHTML;
        dbg(`Inspecting: "${title}".`);
        if(re.test(title)){
            // title matches, hide it
            dbg("Should nuke!");
            sub_id = titlerow.getAttribute("id");
            hide_link = searchHideLink(hide_links, sub_id);
            if (hide_link != null) {
                dbg("Found hide link, clicking it.");
                hide_link.click();
                n_stories++;
            }
        }
    });

    return n_stories;
}

(function () {
    if (window.hasRun) {
        return;
    }

    window.hasRun = true;

    dbg("Loading.");

    // inject button into page header
    /*
    main_table = document.querySelectorAll("span.pagetop")[1];
    btn = document.createElement("button");
    btn.innerHTML = "Hide AI stories";
    btn.onclick = enoughAIRun;
    main_table.appendChild(btn);
    */

    /*
    n_stories = enoughAIRun();
    if (n_stories > 0){
        // inject hidden stories count into header
        main_table = document.querySelectorAll("span.pagetop")[1];
        if (n_stories > 1){
            s = `${n_stories} AI stories hidden! | `;
        }else{
            s = `1 AI story hidden! | `;
        }
        hidden_text = document.createTextNode(s);
        main_table.insertBefore(hidden_text, main_table.firstChild);
    }
    */

    enoughAIRun();
})();
