/**
 * @param value giá trị chuỗi cần kiểm tra
 * @param  minLength Chiều dài tối thiểu của chuỗi cần kiểm tra
 * @param  maxLength Chiều dài tối đa của chuỗi (nếu maxLength = undefined và minLength = 1 => kiểm tra rỗng)
 * @param selector selector của thẻ cần hiển thị looix
 * @param messErr Lỗi cần hiển thị lên UI nếu `value` không thỏa mãn điều kiện
 * 
 */

function kiemTraChuoi(value, minLength, maxLength, selector, messErr){
if (value.trim().length < minLength || value.trim().length > Number(maxLength)) {
    getElement(selector).innerHTML = messErr
    getElement(selector).style.display = 'block';
    return false
}
 // Nếu như kiểm tra true
getElement(selector).innerHTML = ''
return true

} 

/**
 *
 * @param value chuỗi cần kiểm tra
 * @param selector Thẻ hiển thị lỗi
 * @param pattern chuỗi pattern để kiểm tra chuỗi
 * @param messErr Mess err cần hiển thị
 */

function kiemTraSo(value, selector, pattern, messErr) {

    // Nếu chuỗi ko thỏa mãn pattern
    if (!pattern.test(value)) {
        getElement(selector).innerHTML = messErr
        getElement(selector).style.display = 'block';
        return false
    }

    // Nếu chuỗi đúng
    getElement(selector).innerHTML = ''
    return true
}

function kiemTraLuaChon(value, span, messErr) {
    if (value === 'Apple') {
        getElement(span).style.display = "none"
        return true
    } else if (value === 'SamSung') {
        getElement(span).style.display = "none"
        return true
    } else {
        getElement(span).style.display = "block"
        getElement(span).innerHTML = messErr
        return false
    }
}