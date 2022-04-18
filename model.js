export class User {
    constructor(username , email , number , password){
        this.username = username;
        this.email = email;
        this.number = number;
        this.password = password;
        this.id = sha256(uuidv4());
    }

    register(users){
        users.push(this);
    }
}

export class Article {
    constructor(title , content, userId){
        this.title = title;
        this.content = content;
        this.userId = userId;
        this.id = sha256(uuidv4());
    }
};