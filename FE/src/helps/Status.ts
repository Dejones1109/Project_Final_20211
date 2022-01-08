 function status (status :number ) : string{
    switch (status) {
        case 201:
            return "Active"
        case 202:
            return "Inactive"
        case 203:
            return "Khóa tạm thời"
        case 204:
            return "Khóa vĩnh viễn"
        case 301:
            return "Đang chờ xử lý"
        case 302:
            return "Đang giao hàng"
        case 303:
            return "Hoàn tất"
        case 304:
            return "Đã hủy"
        case 305:
            return "Chưa thanh toán"
        case 306:
            return "Đã thanh toán"
        default:
            return "Loading";
    }
}

export {status};
