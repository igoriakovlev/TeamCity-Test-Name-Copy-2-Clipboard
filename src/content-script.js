setInterval(function () {
  setCopy()
}, 2000);

function setCopy() {
  tryCreateBranchLink()
  tryCreateBranchDropdownLink()
  trySetCopyImpl(document.getElementsByClassName("BuildTestItemPreview__leftPart--xf"))
  trySetCopyImpl(document.getElementsByClassName("BuildTestItemAdvanced__testCol--_p"))
}

function createCopyLink(textToCopy, copyLinkClass, attachBeforeElement) {

  const attachTo = attachBeforeElement.parentNode

  const copyText = "|Copy|"
  const copiedText = "|Copied|"

  const link = document.createElement("a")
  link.setAttribute("class", copyLinkClass)
  link.setAttribute("style", "margin-right: 5px;")
  const textNode = document.createTextNode(copyText)
  link.appendChild(textNode)

  link.addEventListener('click', function (event) {
    event.stopPropagation();
    textNode.textContent = copiedText
    const interval = setInterval(function () {
      clearInterval(interval)
      textNode.textContent = copyText
    }, 2000);
    navigator.clipboard.writeText(textToCopy)
  })

  attachTo.insertBefore(link, attachBeforeElement)
}

function tryCreateBranchLink() {
  const branchList = document.getElementsByClassName("OverviewBuildHeader__subHeader--Mg")
  if (!branchList || branchList.length !== 1) return
  const branchLink = branchList[0]

  const anchorElement = branchLink.querySelector(`.BuildBranch__build-branch--Tg`)
  if (!anchorElement) return

  const copyLinkClass = "TeamCity__branchLink__copy"
  if (branchLink.parentNode.querySelector(`.${copyLinkClass}`)) return

  const textElement = branchLink.querySelector(".MiddleEllipsis__searchable--Tv")
  if (!textElement) return

  const textToCopy = textElement.textContent
  createCopyLink(textToCopy, copyLinkClass, anchorElement)
}

function tryCreateBranchDropdownLink() {
  const dropDownList = document.getElementsByClassName("OverviewBuildTypeHeader__branchFilter--xm")
  if (!dropDownList || dropDownList.length !== 1) return
  const dropDown = dropDownList[0]

  const copyLinkClass = "TeamCity__BranchDropdown__copy"
  if (dropDown.parentNode.querySelector(`.${copyLinkClass}`)) return

  const dropDownTextElement = dropDown.querySelector(".BranchSelect__newLabel--yt")
  if (!dropDownTextElement) return false

  const rawTextContent = dropDownTextElement.textContent
  const defaultBranchPrefix = "Default branch ("
  const textToCopy = rawTextContent.startsWith(defaultBranchPrefix)
    ? rawTextContent.slice(defaultBranchPrefix.length).slice(0, -1)
    : rawTextContent

  createCopyLink(textToCopy, copyLinkClass, dropDown)
}

function trySetCopyImpl(rows) {
  if (!rows || rows.length === 0) return
  const copyLinkClass = "TeamCity__TestName__copy"

  for (let currentRow of rows) {
    if (currentRow.querySelector(`.${copyLinkClass}`)) return

    const className = currentRow.querySelector(".BuildTestName__class--hB")
    if (!className) return
    const methodName = currentRow.querySelector(".BuildTestName__name--Tr")
    if (!methodName) return

    const attachBeforeElement = currentRow.querySelector(".BuildTestItemAdvanced__name--sD") ?? className

    const rawFqn = `${className.textContent}.${methodName.textContent}`
    const textToCopy = rawFqn.replace("$", ".")

    createCopyLink(textToCopy, copyLinkClass, attachBeforeElement)
  }
}
