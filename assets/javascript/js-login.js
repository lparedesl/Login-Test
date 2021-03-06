$(document).ready(function($) {
	var config = {
		apiKey: "AIzaSyAD3GCPbQlu4xeI5snnMEU5TMcA_22Wsos",
		authDomain: "project-1-2329f.firebaseapp.com",
		databaseURL: "https://project-1-2329f.firebaseio.com",
		projectId: "project-1-2329f",
		storageBucket: "project-1-2329f.appspot.com",
		messagingSenderId: "554989098289"
	};
	firebase.initializeApp(config);

	var database = firebase.database();

	$("#btn-login").click(function(event) {
		$("#login-window").removeClass("hidden");
	});

	$("#login").click(function(event) {
		event.preventDefault();
		var email = $("#input-username").val().trim();
		var pass = $("#input-password").val().trim();
		var auth = firebase.auth();
		auth.signInWithEmailAndPassword(email, pass)
		.catch(function(error) {
			console.log(error.message);
			var wrongPass = "The password is invalid or the user does not have a password.";
			var noUser = "There is no user record corresponding to this identifier. The user may have been deleted.";
			var badEmail = "The email address is badly formatted.";

			$("#login-window").css({
				height: "52vh",
			});
			if (error.message === wrongPass) {
				$("#user-nonexistent").addClass("hidden");
				$("#bad-email").addClass("hidden");
				$("#password-incorrect").removeClass("hidden");
			} else if (error.message === noUser) {
				$("#password-incorrect").addClass("hidden");
				$("#bad-email").addClass("hidden");
				$("#user-nonexistent").removeClass("hidden");
			} else if (error.message === badEmail) {
				$("#password-incorrect").addClass("hidden");
				$("#user-nonexistent").addClass("hidden");
				$("#bad-email").removeClass("hidden");
			}
		});
		$("#input-username").val("");
		$("#input-password").val("");
	});

	$("#signup").click(function(event) {
		event.preventDefault();
		$("#login-window").css({
			height: "46vh",
		});
		$("#signup-window").removeClass("hidden");
		$("#user-nonexistent").addClass("hidden");
		$("#password-incorrect").addClass("hidden");
	});

	$("#register-user").click(function(event) {
		event.preventDefault();
		if ($("#password-new").val().trim() !== $("#confirm-password-new").val().trim() || $("#password-new").val().trim() === "" || $("#confirm-password-new").val().trim() === "") {
			$("#signup-window").css({
				height: "55vh",
			});
			$("#pass-min-length").addClass("hidden");
			$("#email-exists").addClass("hidden");
			$("#invalid-email").addClass("hidden");
			$("#password-mismatch").removeClass("hidden");
		} else {
			var email = $("#email-new").val().trim();
			var pass = $("#password-new").val().trim();
			var auth = firebase.auth();
			auth.createUserWithEmailAndPassword(email, pass)
			.catch(function(error) {
				console.log(error.message);
				var passLength = "Password should be at least 6 characters";
				var userExists = "The email address is already in use by another account.";
				var badEmail = "The email address is badly formatted.";

				$("#signup-window").css({
					height: "55vh",
				});
				$("#password-mismatch").addClass("hidden");
				if (error.message === badEmail) {
					$("#pass-min-length").addClass("hidden");
					$("#email-exists").addClass("hidden");
					$("#invalid-email").removeClass("hidden");
				} else if (error.message === userExists) {
					$("#pass-min-length").addClass("hidden");
					$("#invalid-email").addClass("hidden");
					$("#email-exists").removeClass("hidden");
				} else if (error.message === passLength) {
					$("#pass-min-length").removeClass("hidden");
					$("#email-exists").addClass("hidden");
					$("#invalid-email").addClass("hidden");
				}
			});
		}
	});

	$("#close-signup-window").click(function(event) {
		event.preventDefault();
		$("#signup-window").css({
			height: "50vh",
		});
		$("#signup-window").addClass("hidden");
		$("#password-mismatch").addClass("hidden");
		$("#email-exists").addClass("hidden");
		$("#pass-min-length").addClass("hidden");
		$("#invalid-email").addClass("hidden");
		var inputs = [$("#first-name-new"), $("#last-name-new"), $("#email-new"), $("#username-new"), $("#password-new"), $("#confirm-password-new")];
		for (var j = 0; j < inputs.length; j++) {
			inputs[j].val("");
		}
	});

	$("#btn-logout").click(function(event) {
		firebase.auth().signOut();
	});

	firebase.auth().onAuthStateChanged(function(firebaseUser) {
		if (firebaseUser) {
			$("#login-window").addClass("hidden");
			$("#btn-login").addClass("hidden");
			$("#password-incorrect").addClass("hidden");
			$("#user-nonexistent").addClass("hidden");
			$("#bad-email").addClass("hidden");
			$("#login-window").css({
				height: "46vh",
			});
			$("#signup-window").addClass("hidden");
			$("#password-mismatch").addClass("hidden");
			$("#email-exists").addClass("hidden");
			$("#pass-min-length").addClass("hidden");
			$("#invalid-email").addClass("hidden");
			$("#user").text(firebaseUser.email + " ");
			$("#userMenu").removeClass("hidden");
		} else {
			$("#btn-login").removeClass("hidden");
			$("#userMenu").addClass("hidden");
		}
	});


	// Google Login
	var provider = new firebase.auth.GoogleAuthProvider();
	provider.addScope('https://www.googleapis.com/auth/plus.login');
	provider.setCustomParameters({
	  'login_hint': 'user@example.com'
	});

	$("#btn-google").click(function() {
	// console.log("provider", provider);
	// 	firebase.auth().signInWithPopup(provider).then(function(result) {
	// 		console.log("result", result);
	// 		// This gives you a Google Access Token. You can use it to access the Google API.
	// 		var token = result.credential.accessToken;
	// 		// The signed-in user info.
	// 		var user = result.user;
	// 		console.log("user", user);
	// 		// ...
	// 	}).catch(function(error) {
	// 		// Handle Errors here.
	// 		var errorCode = error.code;
	// 		var errorMessage = error.message;
	// 		// The email of the user's account used.
	// 		var email = error.email;
	// 		// The firebase.auth.AuthCredential type that was used.
	// 		var credential = error.credential;
	// 		// ...
	// 	});
		firebase.auth().signInWithRedirect(provider);
	});
});