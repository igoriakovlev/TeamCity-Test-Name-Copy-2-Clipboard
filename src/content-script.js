setInterval(function () {
  setCopy()
}, 2000);

function setCopy() {
  trySetCopyImpl(document.getElementsByClassName("BuildTestItemPreview__leftPart--xf"))
  trySetCopyImpl(document.getElementsByClassName("BuildTestItemAdvanced__testCol--_p"))
}

function trySetCopyImpl(rows) {
  if (rows == null || rows.lenght == 0) return

  for (let currentRow of rows) {

    let copyLinkClass = "TeamCity__copy"
    let copySpan = currentRow.querySelector(`.${copyLinkClass}`)
    if (copySpan != null) {
      continue
    }

    let copyText = "|Copy|"

    let span = document.createElement("a")
    span.setAttribute("class", copyLinkClass)
    span.setAttribute("style", "margin-right: 5px;")
    let nodeA = document.createTextNode(copyText)
    span.appendChild(nodeA)

    let className = currentRow.querySelector(".BuildTestName__class--hB")
    let methodName = currentRow.querySelector(".BuildTestName__name--Tr")
    let rawFqn = `${className.textContent}.${methodName.textContent}`
    let fqn = rawFqn.replace("$", ".")
    let classLink = currentRow.querySelector(".BuildTestItemAdvanced__name--sD")

    let anchor = classLink == null ? className : classLink
    anchor.parentNode.insertBefore(span, anchor)

    span.addEventListener('click', function (event) {
      event.stopPropagation();
      span.textContent = "|Copied|"
      let interval = setInterval(function () {
        clearInterval(interval)
        span.textContent = copyText
      }, 2000);
      navigator.clipboard.writeText(fqn)
    })
  }
}
