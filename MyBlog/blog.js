class BlogUser{
    constructor(username){
        let currentDate = new Date();
        let cDay = currentDate.getDate();
        let cMonth = currentDate.getMonth() + 1;
        let cYear = currentDate.getFullYear();
    
        let user = {
            username: username,
            joinDate: cDay + "/" + cMonth + "/" + cYear,
            comments: [],
            posts: []
        };

        this.user = user
    }

    AddCommentToProfile(text, author){
        let currentDate = new Date();
        let cDay = currentDate.getDate();
        let cMonth = currentDate.getMonth() + 1;
        let cYear = currentDate.getFullYear();

        let parsedDate = cDay + "/" + cMonth + "/" + cYear

        let comment = {
            username: author,
            text: text,
            date: parsedDate
        };

        this.user.comments.push(comment);
    }
    AddCommentToPost(text, author, postValue){ //Adds comments to the users own posts
        let currentDate = new Date();
        let cDay = currentDate.getDate();
        let cMonth = currentDate.getMonth() + 1;
        let cYear = currentDate.getFullYear();

        let parsedDate = cDay + "/" + cMonth + "/" + cYear

        let comment = {
            username: author,
            text: text,
            date: parsedDate
        };

        this.user.posts[postValue].comments.push(comment);
    }
    AddPost(title, author, description){
        let currentDate = new Date();
        let cDay = currentDate.getDate();
        let cMonth = currentDate.getMonth() + 1;
        let cYear = currentDate.getFullYear();

        let parsedDate = cDay + "/" + cMonth + "/" + cYear

        let post = {
            title: title,
            description: description,
            author: author,
            date: parsedDate,
            comments: []
        };

        this.user.posts.push(post);
    }
}


//Creating Users
userList = [
    userA = new BlogUser("Joseph"),
    userB = new BlogUser("Abby"),
    userC = new BlogUser("Mike")
];
randomCount = 0;


//Generating UserData
function genBlogStuff (myuser) {
    myuser.AddPost("New Post " + randomCount, myuser.user.username, "this is a post description by: " + myuser.user.username);
    myuser.AddCommentToProfile("Hey, my name is " + myuser.user.username, myuser.user.username);
    myuser.AddCommentToPost("Hi, whats up? my name is" + myuser.user.username, myuser.user.username, 0);
    randomCount++;
}
userList.forEach(user => {
    genBlogStuff(user)
    console.log(user.user)
});


// Check browser support -- This saves data accrossed the pages
if (typeof(Storage) !== "undefined") {
    // Store
    localStorage.setItem("programming", "Python");
}

//This Determines the page you are on
if(document.title == "Home")
    Home();
else{
    User();
}

//TODO: you need to implement all the data to the screen, pass it on to the next page, then fix small miskates if theres time.
function FindUser(username)
{
    let n;
    userList.forEach(user => {
        if(username == user.user.username)
            n = user
    });
    return n
}
function Home(){
    
    userList.forEach(user => {
        AddTopPost(user);
    });
    let postCotainer = document.getElementsByClassName("posts")[0];
    let temp = document.getElementsByClassName("post")[0];
    postCotainer.removeChild(temp);
}
function AddTopPost(user){
    let postCotainer = document.getElementsByClassName("posts")[0];
    let temp = document.getElementsByClassName("post")[0];
    let postClone = temp.cloneNode(true);

    let postTitle = postClone.getElementsByTagName("h4")[0];
    let postAuthor = postClone.getElementsByTagName("a")[0];
    let postDescription = postClone.getElementsByTagName("p")[0];

    postTitle.innerHTML = user.user.posts[0].title;
    postAuthor.innerHTML = user.user.posts[0].author;
    postAuthor.onclick = function() {SendUsername(user.user.username)};
    postDescription.innerHTML = user.user.posts[0].description;

    postCotainer.appendChild(postClone);
}

// Passes Data from this page to the author page
function SendUsername(username){
    localStorage.setItem("username", username);
}

function User(){
    user = FindUser(localStorage["username"]);
    comments = user.user.comments;
    let username = document.getElementById("profile-title");
    let lastpost = document.getElementById("profile-lastpost");
    let firstjoined = document.getElementById("profile-firstjoined");
    let description = document.getElementById("profile-description");

    username.innerHTML = user.user.username;
    postLength = user.user.posts.length;
    lastpost.innerHTML += user.user.posts[postLength - 1].title + " - " + user.user.posts[postLength - 1].date;
    firstjoined.innerHTML += user.user.joinDate;

    comments.forEach(comment => {
        AddComment(comment);
    });
    let postCotainer = document.getElementsByClassName("comment-section")[0];
    let temp = document.getElementsByClassName("post")[0];
    postCotainer.removeChild(temp)
}
function AddComment(comment){


    let postCotainer = document.getElementsByClassName("comment-section")[0];
    let temp = document.getElementsByClassName("post")[0];
    let postClone = temp.cloneNode(true);

    let username = postClone.getElementsByTagName("h4")[0];
    let commentText = postClone.getElementsByTagName("p")[0];

    username.innerHTML = comment.username;
    commentText.innerHTML = comment.text;

    postCotainer.appendChild(postClone);

}



