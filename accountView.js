import { aController } from './controller.js'
import { resetForm } from './views.js';
import { logOut } from './controller.js'
class ArticleView {
    postName = document.querySelector(".postName");
    postContainer = document.querySelector(".posts");
    name = document.querySelector(".userName");
    logOut = document.getElementById("logOut");
    title = document.querySelector("#title");
    content = document.querySelector("#content");
    btn = document.querySelector("#btn");
    deleteBtns = document.getElementsByClassName("delete");
    constructor(){
        this.init();
        this.eventListener();
    }

    async updateUI(data) {
        this.postContainer.innerHTML = "";
        
        data.forEach((post) => {
          for(var i = 0; i < JSON.parse(localStorage.users).length; i++){
              if(post.userId == JSON.parse(localStorage.users)[i].id){
                  var whoPostName = JSON.parse(localStorage.users)[i].username;
              }
          }
          this.postContainer.insertAdjacentHTML(
            "beforeend", `
            <div class="post" data-itemid=${post.id} userId=${post.userId}>
                    <div class="postName">
                        <a href="./posts.html?userId=${post.userId}&name=${whoPostName}">
                        <span>${whoPostName}</span>
                        </a>
                    </div>
                    <button class="edit">edit</button>
                    <button class="delete">X</button>
                    <p class="content" id="postTitle">Title: ${post.title}</p>
                    <p class="content" id="postContent">Content: ${post.content}</p>
            </div>
            `
          );
       
        });
      }
      delete = id => {
          const item = document.querySelector(`[data-itemid="${id}"]`) 
          item.parentElement.removeChild(item)
      }
    newArticle(){
        if (this.title.value.trim() !== "" && this.content.value.trim() !== ""){
            const formData = {
                title: this.title.value,
                content: this.content.value,
                userId: JSON.parse(localStorage.currentUser).id,
            }   
            aController.save(formData);
            swal('Амжилттай постлогдлоо.' , {
                icon: 'success'
            } )
            this.updateUI(JSON.parse(localStorage.posts))
            resetForm(this.title, this.content)
        } else {
            swal("Гарчиг эсвэл контент хэсэг хоосон байна.", {
                icon: "warning"
            })
        }
    }

    eventListener(){
        this.btn.addEventListener('click' , this.newArticle.bind(this));
        this.logOut.addEventListener('click', logOut);
        this.postContainer.addEventListener('click', e => {
            for(var i = 0; i < this.deleteBtns.length; i++){
                if(e.target == this.deleteBtns[i]) {
                    const id = e.target.closest(".post").dataset.itemid;
                    aController.delete(id);
                    this.delete(id);
                }
            }
        }
        )
    }

    init() {
        let currentUser;
        if (localStorage.currentUser) {
        currentUser = JSON.parse(localStorage.currentUser);
        console.log(currentUser);
        } else {
        location.href = "./login.html";
        }
        this.name.innerHTML = `Hello<span> ${currentUser.username}</span>`;
        if(localStorage.posts){
            this.updateUI(JSON.parse(localStorage.posts))
        }
    }
}

new ArticleView();