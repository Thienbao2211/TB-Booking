// Lấy Input và Element

let usernameInput = document.querySelector(".usernameInput");
let emailInput = document.querySelector(".emailInput");
let passwordInput = document.querySelector(".passwordInput");
let confirmPasswordInput = document.querySelector(".confirmPasswordInput");
let singUpBtn = document.querySelector(".signUpBtn");

// Hàm để gọi khi nhấn nút continue

let handleSignUp = (e) => {

    // Tránh trường hợp load lại trang (mất hết thông tin người dùng nhập vào)

    e.preventDefault();

    // Lấy value của các input

    let username = usernameInput.value;
    let email = emailInput.value;
    let password = passwordInput.value;
    let confirmPassword = confirmPasswordInput.value;

    // Validation các ô input

    if (!username || !email || !password || !confirmPassword) {
        alert("Vui lòng nhập đầy đủ thông tin để đăng ký thành công !!! 😊");
        return;
    };

    if (password !== confirmPassword) {
        alert("Vui lòng nhập khớp mật khẩu!!! 😱");
    }

    // Tạo tài khoản với Firebase Auth

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {

            let user = userCredential.user;

            // Thông tin đăng ký của người dùng

            let userData = {
                username,
                email,
                password,
                role_id: "user",
            }

            // Thêm thông tin user vào Firebsae Firestore

            db.collection("users").add(userData)
                .then((docRef) => {
                    alert("Đăng ký thành công!!! 😃");
                    window.location.href = "../view/signIn.html";
                    // console.log("Document written with ID: ", docRef.id);
                })
                .catch((error) => {
                    alert("Đăng ký thất bại!!! 🤷‍♂️");
                    console.error("Lỗi thêm thông tin người dùng: ", error);
                })

        })
        .catch((error) => {
            // Khi đăng ký lỗi

            // let errorCode = error.code;
            let errorMessage = error.message;
            alert("Lỗi: ", errorMessage);
            console.error(errorMessage);
        })

}

singUpBtn.addEventListener("click", handleSignUp);