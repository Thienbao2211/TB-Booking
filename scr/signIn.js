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

            // Lấy dữ liệu từ Firebase

            firebase.firestore().collection("users").doc(user.uid).get()
                .then((doc) => {

                    if (doc.exists) {

                        let data = doc.data();
                        console.log(data.role_id);

                        // Tạo session

                        const userSession = {
                            user: user.uid,
                            email: user.email,
                            role_id: data.role_id,
                            expiry: new Date().getTime() + 2 * 60 * 60 * 1000
                        };
                        localStorage.setItem("user_session", JSON.stringify(userSession))

                        // Kiểm tra xem đó là Admin: 1, Bên thứ nhất(Supplier): 2, Client: 3 bằng role_id

                        if (data.role_id == 1) {
                            window.location.href = "../view/adminProduct.html";
                        } else if (data.role_id == 2) {
                            window.location.href = "../view/supplierProduct.html";
                        } else if (data.role_id == 3) {
                            window.location.href = "../view/clientMain.html";
                        } else {
                            alert("Không thể di chuyển sang trang khác! 🤷‍♂️");
                        }

                    } else {
                        alert("User không tồn tại? 😱");
                    }

                })
                .catch((error) => {
                    console.error("Lỗi Firebase: ", error);
                })

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

            // window.location.href = "../view/clientMain.html";

        })
        .catch((error) => {
            let errorMessage = error.message;
            alert(`Lỗi: ${errorMessage}`);
            console.error(errorMessage);
        })

}

// Khi nút Sign In được nhấn

signInBtn.addEventListener("click", handleSignIn);