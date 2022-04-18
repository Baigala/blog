import { User } from "./model.js";
import { Article } from "./model.js";

export function registerUser(obj){
    let data;
    const users = getData(data);
    const {username , email , number , password} = obj;
    const user = new User(username , email , number , password);
    user.register(users);
    localStorage.setItem('users' , JSON.stringify(users))
    console.log(JSON.parse(localStorage.users));
}

export function login(user){
    const {email , password} = user;
    let data;
    let users = getData(data);
    const currentUser = users.find(usr => usr.email === email);
    if(!currentUser) {
        swal('Имэйл эсвэл нууц үг буруу байна.')
    } else {
        if(currentUser.password === password){
            localStorage.setItem('currentUser' , JSON.stringify(currentUser));
            location.href = './account.html';
        } else {
            swal('Имэйл эсвэл нууц үг буруу байна.')
        }
    }
}

export function logOut(){   
    localStorage.removeItem("currentUser");
    location.href = './login.html';
}

function getData(users){
    if(localStorage['users']){
        users = JSON.parse(localStorage['users'])
    } else {
        users = [];
    }
    return users;
}

class ArticleController {
    articleList = [];
    constructor(){
        if(localStorage['posts']){
            this.articleList = JSON.parse(localStorage['posts'])
        } else {
            this.articleList = [];
        }
    }
    
    save(obj){
        const article = new Article(obj.title , obj.content, obj.userId);
        this.articleList.push(article);
        localStorage.setItem('posts' , JSON.stringify(this.articleList))
        console.log(JSON.parse(localStorage.posts));
    };

    delete(id){
        const index = this.articleList.findIndex(el => el.id === id);
        this.articleList.splice(index, 1);
        localStorage.setItem('posts' , JSON.stringify(this.articleList));
        console.log(JSON.parse(localStorage.posts));
    }
}

export const aController = new ArticleController;
