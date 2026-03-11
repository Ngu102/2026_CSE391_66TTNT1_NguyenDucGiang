let listStudent = [];
let filteredStudents = [];
let currentSortOrder = "none";

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

    document.getElementById("hoten").value = "";
    document.getElementById("diem").value = "";
    document.getElementById("hoten").focus();
    
    applyFilters();
}

function toggleSort() {
    let thDiem = document.getElementById("thDiem");
    
    if (currentSortOrder === "none" || currentSortOrder === "desc") {
        currentSortOrder = "asc";
        thDiem.innerHTML = "Điểm ▲";
    } else {
        currentSortOrder = "desc";
        thDiem.innerHTML = "Điểm ▼";
    }
    
    applyFilters();
}

function applyFilters() {
    let keyword = document.getElementById("oTimKiem").value.toLowerCase().trim();
    let selectedRank = document.getElementById("oXepLoai").value;

    filteredStudents = listStudent.filter(function(sv) {
        let khopTen = sv.hoten.toLowerCase().includes(keyword);
        let khopXepLoai = (selectedRank === "All" || sv.loai === selectedRank);
        return khopTen && khopXepLoai;
    });

    if (currentSortOrder === "asc") {
        filteredStudents.sort((a, b) => a.diem - b.diem);
    } else if (currentSortOrder === "desc") {
        filteredStudents.sort((a, b) => b.diem - a.diem);
    }

    renderTable();
}

function renderTable() {
    let addStudent = document.getElementById("addStudent");
    let htmlContent = "";

    for (let i = 0; i < filteredStudents.length; i++) {
        let sv = filteredStudents[i];
        
        let kieuToMau = sv.diem < 5 ? 'style="background-color: yellow;"' : '';
        
        htmlContent += `<tr ${kieuToMau}>
            <td>${i + 1}</td>
            <td>${sv.hoten}</td>
            <td>${sv.diem.toFixed(1)}</td>
            <td>${sv.loai}</td>
            <td><button onclick="deleteStudent(${i})">Xóa</button></td>
        </tr>`;
    }

    if (htmlContent === "") {
        htmlContent = `<tr><td colspan="5" style="text-align: center;">Không có kết quả</td></tr>`;
    }
    
    addStudent.innerHTML = htmlContent;

    document.getElementById("totalStudents").textContent = filteredStudents.length;
    let totalPoints = filteredStudents.reduce((sum, sv) => sum + sv.diem, 0);
    let averagePoints = filteredStudents.length > 0 ? (totalPoints / filteredStudents.length).toFixed(1) : 0;
    
    let avgP = document.getElementById("totalPoints"); 
    if (avgP) avgP.textContent = averagePoints; 
}

function deleteStudent(indexGiaoDien) {
    let svCanXoa = filteredStudents[indexGiaoDien];
    let indexGoc = listStudent.indexOf(svCanXoa);
    
    if (indexGoc !== -1) {
        listStudent.splice(indexGoc, 1);
    }
    
    applyFilters();
}