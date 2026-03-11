let listStudent = [];
function check(event) {
    event.preventDefault();
    let ten = document.getElementById("hoten").value.trim(); 
    let diemso = document.getElementById("diem").value.trim();
    if (ten === "") {
        alert("Họ tên không được để trống!");
        return;
    }
    let Diemtp = parseFloat(diemso); 
    if (isNaN(Diemtp) || Diemtp < 0 || Diemtp > 10) {
        alert("Lỗi: Vui lòng nhập lại(0-10)!");
        return;
    }
    let rank = "";
    if (Diemtp >= 8.5) rank = "Giỏi";
    else if (Diemtp >= 7) rank = "Khá";
    else if (Diemtp >= 5) rank = "Trung bình";
    else rank = "Yếu";

    let newStudent = { 
        hoten: ten,
        diem: Diemtp,
        loai: rank,
    };

    listStudent.push(newStudent);
    renderTable();

    document.getElementById("hoten").value = "";
    document.getElementById("diem").value = "";
    document.getElementById("hoten").focus();
}
function renderTable() { 
    let addStudent = document.getElementById("addStudent");
    addStudent.innerHTML = "";
    for (let i = 0; i < listStudent.length; i++) {
        let sv = listStudent[i];
        let kieuToMau = sv.diem < 5 ? 'style="background-color: yellow;"' : '';
        let row = `<tr ${kieuToMau}>
            <td>${i + 1}</td>
            <td>${sv.hoten}</td>
            <td>${sv.diem.toFixed(1)}</td>
            <td>${sv.loai}</td>
            <td><button onclick="deleteStudent(${i})">Xóa</button></td>
        </tr>`;
        addStudent.innerHTML += row;  
    }
    document.getElementById("totalStudents").textContent = listStudent.length;
    let totalPoints = listStudent.reduce((sum, sv) => sum + sv.diem, 0);
    let averagePoints = listStudent.length > 0 ? (totalPoints / listStudent.length).toFixed(1) : 0;
    document.getElementById("totalPoints").textContent = averagePoints;
}
function deleteStudent(index) {
    listStudent.splice(index, 1);
    renderTable();
}


