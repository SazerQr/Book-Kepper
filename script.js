const modal = document.getElementById("modal");
const showModalEl = document.getElementById("show-modal");
const closeModalEl = document.getElementById("close-modal");
const bookmarkForm = document.getElementById("bookmark-form");
const websiteName = document.getElementById("website-name");
const websiteUrl = document.getElementById("website-url");
const bookmarkContainer = document.getElementById("bookmarks-container");

let bookmarks = [];
let num = 0;
function showModal(){
    modal.classList.add("show-modal");
    websiteName.focus();
}

function closeModal(){
    modal.classList.remove("show-modal");
}

function validationForm(nameWebsite, nameUrl){
    const  expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    const regex = new RegExp(expression);
    if(!nameWebsite || !nameUrl){
        alert("something missed Try again please!");
    }
    if(nameUrl.match(regex)){
        console.log("match");
    }
    if(!nameUrl.match(regex)){
        alert("Please provide a valide web adress");
        return false;
    }
    return true;
}

function storeBookmark(){
    for(let i = num; i < bookmarks.length; i++){
        const {name, url} = bookmarks[i];
        const item = document.createElement("div");
        item.classList.add("item");
        const close = document.createElement("i");
        close.classList.add("fa-solid", "fa-xmark");
        close.setAttribute("title", "Delete Bookmark");
        close.setAttribute("onclick", `deleteBookmark('${url}')`);
        const linkInfo = document.createElement("div");
        linkInfo.classList.add("name");
        const imageIcon = document.createElement("img");
        imageIcon.setAttribute("src", `https://s2.googleusercontent.com/s2/favicons?domain=${url}`);
        imageIcon.setAttribute("alt", "Favicon");
        const link = document.createElement("a");
        link.setAttribute("href", `${url}`);
        link.setAttribute("target", "_blank");
        link.textContent = name;


        linkInfo.append(imageIcon, link);
        item.append(close, linkInfo);
        bookmarkContainer.append(item);
    }
    num = bookmarks.length;
}

function fetchBookmark(){
    if(localStorage.getItem("bookmarksItems")){
        bookmarks = JSON.parse(localStorage.getItem("bookmarksItems"));
    }else{
        bookmarks = [{
            name: "google",
            url: "google.com"
        }];
        localStorage.setItem("bookmarksItems", JSON.stringify(bookmarks));
    }
    storeBookmark();
}

function deleteBookmark(url){
    bookmarks.forEach((bookmark, i) => {
        if(bookmark.url===url){
            bookmarks.splice(i, 1);
        }
    });
    localStorage.setItem("bookmarksItems", JSON.stringify(bookmarks));
    fetchBookmark();
    window.location.reload();
}  

function formBookmark(e){
    e.preventDefault();
    const nameWebsite = websiteName.value;
    let nameUrl = websiteUrl.value;
    if(!nameUrl.includes("http://", "https://")){
        nameUrl = `https://${nameUrl}`;
    }
    if(!validationForm(nameWebsite, nameUrl)){
        return false
    }
    const bookmark = {
        name: nameWebsite,
        url: nameUrl
    };
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarksItems", JSON.stringify(bookmarks));
    fetchBookmark();
    bookmarkForm.reset();
}  

showModalEl.addEventListener("click", showModal);
closeModalEl.addEventListener("click", closeModal);
window.addEventListener("click", (e) => (e.target===modal ? modal.classList.remove("show-modal") : false));

bookmarkForm.addEventListener("submit", formBookmark);
fetchBookmark();