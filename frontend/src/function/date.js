

export function YYYYMMDDTODDMMYYYY(date = '2000-09-22'){
    let arr = date?.split('-');
    return arr[2] + '-' + arr[1] + '-' + arr[0]
}

export function dates(date= '2000-09-22'){
    let arra=  date?.split('-');
    return arra[1] + '-' +arra['0'] + '-' + arra[2]
}


