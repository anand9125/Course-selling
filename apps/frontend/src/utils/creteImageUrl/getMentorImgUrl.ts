
function getImgUrl({name}:{name:string}){
    return new URL(`../assets/books/${name}`,import.meta.url)

}
export {getImgUrl}

//This function, getImgUrl, is designed to generate a URL for an image file located in the
// ../assets/books/ directory relative to the module in which this function is defined.