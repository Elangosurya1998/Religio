

export function YYYYMMDDTODDMMYYYY(date = '2000-09-22'){
    let arr = date?.split('-');
    return arr[2] + '-' + arr[1] + '-' + arr[0]
}


