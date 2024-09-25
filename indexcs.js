// Xây dựng URL để gửi yêu cầu POST 
const url = 'https://script.google.com/macros/s/AKfycbxQDLN5O8iYe-W5X3J1YgYYRugiiS0hoUoeGgR22ysyZ1HOVHTXv-6gKy6b-A3Hh1fpfA/exec';

window.addEventListener('load', (event) => {
    setTimeout(getDataFromGoogleSheet, 0);
    // getDataFromGoogleSheet();
    // Lấy giá trị của tham số "name" từ URL
    let nameValueUrl = new URLSearchParams(window.location.search).get('name');
    let displayName = ''
    if (nameValueUrl !== null && nameValueUrl.trim() !== '') {
        displayName = nameValueUrl
    }else{
        displayName = 'Bạn'
    }
        const h2Element = document.querySelector('.section-title-h2');
        if(h2Element !== null){
            h2Element.innerText = 'Kính mời: ' + displayName
            let vaitro = getStartName(displayName);
            let text = '<i style="color: rebeccapurple;">Tới dự hôn lễ của ' + vaitro + '</i>.</br> Sự hiện diện của ' + displayName + ' là lời chúc phúc tuyệt vời nhất dành cho vợ chồng ' + vaitro;
            const h2LoiMoiElement = document.querySelector('.section-title-loi-moi');
            h2LoiMoiElement.innerHTML = text;
        }
        if(displayName !== 'Bạn'){
            document.getElementById('name-input').value = displayName; 
        }   
});


document.addEventListener('touchstart', function() {

});

document.addEventListener('scroll', function() {

});




    function getStartName(nameValue) {
        nameValue = nameValue.toUpperCase(); 
        console.log(nameValue)
        if (nameValue.startsWith('BẠN')) {
            return 'Chúng mình';
        } else if (nameValue.startsWith('ANH') || nameValue.startsWith('CHỊ')) {
            return 'Chúng em';
        } else if (nameValue.startsWith('CHÚ') || nameValue.startsWith('CÔ') || nameValue.startsWith('BÁC') || nameValue.startsWith('DÌ')) {
            return 'Chúng cháu';
        } else if (nameValue.startsWith('EM')) {
            return 'Anh/Chị';
        } else if (nameValue.startsWith('CHÁU')) {
            return 'Cô/Chú';
        } else if (nameValue.startsWith('MẸ')) {
            return 'Chúng con';
        } else {
            return 'Chúng tôi';
        }
    }


    async function getDataFromGoogleSheet() {
    try {
        const res = await fetch('https://script.google.com/macros/s/AKfycbySK00-BsTEIz-8Lk-MkRJpynUynSYzrcWaNNe3_rvhymZikscGd0PjQHDq510_bklxAg/exec');
        const data = await res.json();
        const rows = data.content;
        const jsonArray = [];

        rows.forEach((row, index) => {
            if (index > 0) {
                const id = index;
                const name = row[0];
                const comment = row[1];

                const jsonItem = {
                    "id": id,
                    "name": name,
                    "comment": comment
                };
                jsonArray.push(jsonItem);
            }
        });

        console.log(jsonArray); // Log the JSON array
        readCommentsFromFile(jsonArray);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}





function readCommentsFromFile(comments) {
    const wishBox = document.querySelector('.wish-box');
    comments.forEach(comment => {
        let commentHTML = '';
        if (comment.id % 2 === 0) {
            commentHTML = '<div class="wish-box-item bg"><strong>' + comment.name + '</strong><p>' + comment.comment + '</p></div>';
        } else {
            commentHTML = '<div class="wish-box-item"><strong>' + comment.name + '</strong><p>' + comment.comment + '</p></div>';
        }
        wishBox.insertAdjacentHTML('afterbegin', commentHTML);
    });
};


const scrollableContent = document.getElementById('site-footer-v-1');
        const maxScrollTop = 1; // Đặt giới hạn cuộn ở đây

        scrollableContent.addEventListener('scroll', function() {
            if (scrollableContent.scrollTop > maxScrollTop) {
                scrollableContent.scrollTop = maxScrollTop;
            }
        });

// https://script.google.com/macros/s/AKfycbxQDLN5O8iYe-W5X3J1YgYYRugiiS0hoUoeGgR22ysyZ1HOVHTXv-6gKy6b-A3Hh1fpfA/exec


document.addEventListener('DOMContentLoaded', function () {
    const wishForm = document.getElementById('wish-form-add-comment');
    if (wishForm) {
        wishForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Ngăn chặn hành động mặc định của submit form

            // Lấy thông tin từ các trường input trong form
            const name = document.getElementById('name-input').value;
            const content = document.getElementById('content-input').value;
            if (name === null || name === '' || content === null || content === '') {
                // Lấy thẻ div theo id
                const errorDiv = document.getElementById('error');
                errorDiv.innerText = 'Họ tên & lời chúc vui lòng không để trống'
                // Hiển thị thẻ
                errorDiv.style.display = 'block';

                // Sau 3 giây, ẩn thẻ
                setTimeout(function () {
                    errorDiv.style.display = 'none';
                }, 3000);
            }else{
                // Sử dụng hàm để thêm comment mới
            addCommentToGoogleSheet(name, content);

            // Optional: reset form sau khi submit
            wishForm.reset();
            }
        });
    }
});

function addCommentToGoogleSheet(name, content) {
    // Dữ liệu mới cần thêm vào
    const newData = [name, content];


    // Tạo yêu cầu XMLHttpRequest
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const commentCurrentArr = document.querySelectorAll('.wish-box-item');
            let numberSize = commentCurrentArr.length
            const wishBox = document.querySelector('.wish-box');
            let commentHTML = ''
            if (numberSize % 2 !== 0) {
                commentHTML = '<div class="wish-box-item bg"><strong>' + name + '</strong><p>' + content + '</p></div>';
            } else {
                commentHTML = '<div class="wish-box-item"><strong>' + name + '</strong><p>' + content + '</p></div>';
            }
            wishBox.insertAdjacentHTML('afterbegin', commentHTML);
        } else {
            console.error('Failed to add comment:', xhr.responseText);
        }
    };

    // Chuẩn bị dữ liệu để gửi
    const params = 'name=' + encodeURIComponent(newData[0]) +
        '&content=' + encodeURIComponent(newData[1]);
    try {
        // Gửi yêu cầu POST với dữ liệu
        xhr.send(params);
        // Lấy thẻ div theo id
        const successDiv = document.getElementById('success');

        // Hiển thị thẻ
        successDiv.style.display = 'block';

        // Sau 3 giây, ẩn thẻ
        setTimeout(function () {
            successDiv.style.display = 'none';
        }, 3000);
    } catch (error) {
        // Lấy thẻ div theo id
        const errorDiv = document.getElementById('error');
        errorDiv.innerText = 'Gửi lời chúc thất bại, vui lòng thử lại sau giây lát!'
        // Hiển thị thẻ
        errorDiv.style.display = 'block';

        // Sau 3 giây, ẩn thẻ
        setTimeout(function () {
            errorDiv.style.display = 'none';
        }, 3000);
    }

}






