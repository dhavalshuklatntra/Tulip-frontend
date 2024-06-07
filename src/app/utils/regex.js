/* eslint-disable */
export const regex = {
  name: /^[a-zA-Z]{3,50}$/,
  mobile: /^[1-9]{1}[0-9]{9}$/,
  password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&])(?=.*[a-zA-Z]).{8,}$/,
  websiteUrl:
    /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm,
  gurukulaId: /^[gG]{1}[a-zA-Z]{2}[0-9]{6}[a-zA-Z]$/,
  email: /^([a-zA-Z0-9_\.\-])+@([a-zA-Z0-9\-])+\.([a-zA-Z0-9]{2,4})$/,
  number: /^[0-9]*$/,
  url: /^(https?|ftp):\/\/(([a-z\d]([a-z\d-]*[a-z\d])?\.)+[a-z]{2,}|localhost)(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i,
  twitter: /(https:\/\/twitter.com\/(?![a-zA-Z0-9_]+\/)([a-zA-Z0-9_]+))/,
  linkedin: /^https:\/\/[a-z]{2,3}\.linkedin\.com\/.*$/,
  skypeRegex: /^[a-zA-Z][a-zA-Z0-9.,-_]{5,31}/,
}
