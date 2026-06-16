function createSlug(name){

    return name.toLowerCase().replaceAll(" ", "_");
}


module.exports = createSlug;