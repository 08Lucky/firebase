// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA_K0BjhXC4sU8mSFhU3QqkQXbKAOdnlJw",
    authDomain: "fir-8df92.firebaseapp.com",
    projectId: "fir-8df92",
    storageBucket: "fir-8df92.appspot.com",
    messagingSenderId: "43497896607",
    appId: "1:43497896607:web:1c646b71b8228c8fca40aa"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//auth and data base
const auth = firebase.auth();
const database = firebase.database();

//function

function sign(){
    email = document.getElementById("email").value
    password = document.getElementById("password").value 

    //validate input fields
    if(validateEmail(email)==false || validatePassword(password)==false){
        alert("enter a valid email id or password")
        //we are using this return to stop the execution
        return
    }

    auth.signInWithEmailAndPassword(email, password)
    .then(function(){
        alert("login successful")
    })

    .catch(function(error){
        var errorMsg = error.message
        alert(errorMsg)
    })
}

function register(){
    fullname = document.getElementById("fullname").value 
    email = document.getElementById("email").value
    username = document.getElementById("username").value 
    password = document.getElementById("password").value 

    //validate input fields
    if(validateEmail(email)==false || validatePassword(password)==false){
        alert("enter a valid email id or password")
        //we are using this return to stop the execution
        return
    }

    auth.createUserWithEmailAndPassword(email,password)
    .then(function(){
        var currentUser = auth.currentUser
        var dataBaseRef = database.ref()
        var userData = {
            fullname : fullname,
            email : email,
        }

        dataBaseRef.child('user/'+currentUser.uid).set(userData)

        alert("user registered sucessfully")
    })
    .catch(function(error){
        var errorMsg = error.message
        alert(errorMsg)
    })
}

//validation
function validateEmail(email){
    expression =  /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    if(expression.test(email)==true){
        return true;
    } else{
        return false;
    }
}

function validateUsername(username){
    expression = /^[a-zA-Z0-9]+$/
    if(expression.test(username)==true){
        return true;
    } else{
        return false;
    }
}

function validateFullname(fullname){
    if(fullname.length<3){
        return false;
    } else{
        return true;
    }
}

function validatePassword(password){
    if(password.length<6){
        return false;
    } else{
        return true;
    }
}