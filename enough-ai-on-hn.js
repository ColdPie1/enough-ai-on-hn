/*
 * this script searches submission titles on Hacker News for AI-related words
 * and then clicks the Hide link in order to get rid of them.
 */

function dbg(s) {
    // debug print with prefix
    console.error("Enough-AI-On-HN: " + s);
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
        "Agent",
        "Anthropic",
        "AI",
        "ChatGPT",
        "Claude",
        "Fable",
        "Gemini",
        "GPT",
        "Grok",
        "Kimi",
        "LLM",
        "OpenAI",
        "Opus",
    ];
    regex = `\\b(${terms.join("|")})\\b`;
    dbg(`Built regex: "${regex}".`);
    re = RegExp(regex, "i");

    // gather hide links for later
    hide_links = document.querySelectorAll("a.hider");

    // iterate over submission rows
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
            }
        }
    });
}

(function () {
    if (window.hasRun) {
        return;
    }

    window.hasRun = true;

    dbg("Loading.");

    // inject button into page header
    main_table = document.querySelectorAll("span.pagetop")[1];
    btn = document.createElement("button");
    btn.innerHTML = "Hide AI stories";
    btn.onclick = enoughAIRun;
    main_table.appendChild(btn);
})();
