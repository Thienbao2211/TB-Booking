// Lấy input và element

let emailInput = document.querySelector(".emailInput");
let passwordInput = document.querySelector(".passwordInput");
let signInBtn = document.querySelector(".signInBtn");

// Hàm để gọi khi nhấn nút Sign In

let handleSignIn = (e) => {

    // Tránh trường hợp load lại trang (mất hết thông tin người dùng nhập vào)

    e.preventDefault();

    // Lấy giá trị của các ô input

    let email = emailInput.value;
    let password = passwordInput.value;

    // Validation các ô input

    if (!email || !password) {
        alert("Vui lòng nhập đầy đủ thông tin để có thể đăng nhập!!! 🤷‍♂️");
        return;
    }

    // Đăng nhập với Firebase Auth

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {

            let user = userCredential.user;

            // Hiện thông báo ra là người dùng đăng nhập thành công
            alert("Đăng nhập thành công")

            // Thiết lập phiên đăng nhập (hết hạn sau 2 giờ)

            // const userSession = {
            //     user: {
            //         uid: user.uid,
            //         email: user.email,
            //     },
            //     expiry: new Date().getTime() + 2 * 60 * 60 * 1000
            // };

            // Lưu vào Local Storage

            // localStorage.setItem("user_session", JSON.stringify(userSession));

            // Chuyển tới trang chủ

            window.location.href = "../view/main.html";

        })
        .catch((error) => {
            let errorMessage = error.message;
            alert(`Lỗi: ${errorMessage}`);
            console.error(errorMessage);
        })

}

// Khi nút Sign In được nhấn

signInBtn.addEventListener("click", handleSignIn);