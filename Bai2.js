// Khởi tạo class Student
class Student {
    constructor(name, scores) {
        this.name = name;
        this.scores = scores;
    }

    // Tính điểm trung bình của học sinh
    averageScore() {
        const subjects = Object.keys(this.scores);
        const totalScore = subjects.reduce((sum, subject) => sum + this.scores[subject], 0);
        return totalScore / subjects.length;
    }
}

// Tạo mảng với dữ liệu ngẫu nhiên
const students = [
    new Student("Nguyen Van A", { math: 8, physics: 7, chemistry: 9 }),
    new Student("Tran Thi B", { math: 7, physics: 6, chemistry: 9 }),
    new Student("Le Van C", { math: 9, physics: 8, chemistry: 8 }),
    new Student("Pham Thi D", { math: 7, physics: 7, chemistry: 8 }),
    new Student("Hoang Van E", { math: 8, physics: 9, chemistry: 7 })
];

// Sắp xếp mảng mà không dùng sort(), chúng ta có thể sử dụng bubble sort hoặc selection sort.
// Dùng bubble sort để sắp xếp theo điểm trung bình giảm dần, nếu bằng nhau thì sắp xếp theo tên alphabet.

function customSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - 1 - i; j++) {
            const avgScore1 = arr[j].averageScore();
            const avgScore2 = arr[j + 1].averageScore();
            
            // So sánh điểm trung bình, nếu cần hoán đổi
            if (avgScore1 < avgScore2) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            } 
            // Nếu điểm trung bình bằng nhau, so sánh theo tên
            else if (avgScore1 === avgScore2 && arr[j].name > arr[j + 1].name) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
}

customSort(students);

// In ra danh sách đã sắp xếp
console.log("Danh sách sau khi sắp xếp:");
students.forEach(student => {
    console.log(`${student.name}: Điểm trung bình = ${student.averageScore()}`);
});

// Tìm object có điểm trung bình bằng 8 nhanh nhất có thể
function findStudentByAverageScore(arr, targetScore) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].averageScore() === targetScore) {
            return arr[i];
        }
    }
    return null;
}

const targetStudent = findStudentByAverageScore(students, 8);
console.log("Học sinh có điểm trung bình bằng 8:");
if (targetStudent) {
    console.log(`${targetStudent.name} - Điểm trung bình: ${targetStudent.averageScore()}`);
} else {
    console.log("Không tìm thấy học sinh nào có điểm trung bình bằng 8.");
}