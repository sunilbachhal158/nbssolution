/* NBS Solution - shared header and footer loader
   Header/footer are fetched before main.js so menu and sticky-header events initialize correctly. */
(async function () {
    "use strict";

    async function loadComponent(elementId, url) {
        const target = document.getElementById(elementId);
        if (!target) return;

        const response = await fetch(url, { cache: "no-cache" });
        if (!response.ok) {
            throw new Error("Could not load " + url + " (" + response.status + ")");
        }
        target.innerHTML = await response.text();
    }

    try {
        await Promise.all([
            loadComponent(
                "common-header",
                document.body.dataset.header || "/includes/header.html"
            ),
            loadComponent("common-footer", "/includes/footer.html")
        ]);

        // Load the original theme JS only after the shared header exists.
        const mainScript = document.createElement("script");
        mainScript.src = "/assets/js/main.js";
        mainScript.onload = function () {
            document.dispatchEvent(new CustomEvent("commonLayoutLoaded"));
        };
        mainScript.onerror = function () {
            console.error("Unable to load /assets/js/main.js");
        };
        document.body.appendChild(mainScript);
    } catch (error) {
        console.error("Shared layout loading failed:", error);
    }
})();
