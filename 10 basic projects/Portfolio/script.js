window.onload = function () { // sự kiện sảy ra khi toàn bộ trang (html+css) đã tải xong
    alert("Mệnh lệnh của tôi là tuyệt đối!"); // hiện thị thông báo
};

const menuLinks = document.querySelectorAll("nav ul li a"); // chọn tất cả các thẻ a trong menu
menuLinks.forEach(link => { // forEach: duyệt qua từng link
    link.addEventListener("click", function () { // gắn sự kiện click cho từng link
        alert("Bạn vừa chọn mục: " + this.textContent); //this.textContent: lấy nội dung chữ của từng link

    });
});