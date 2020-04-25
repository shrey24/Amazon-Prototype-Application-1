const countDocumentsByQuery = async (modelObject, query, options) => {
    try {
        return await modelObject.find(query,  options).lean().count();
    } catch (error) {
        console.log("Error while fetching data:" + error)
        return new Error(error);
    }
}


const findDocumentsByQueryFilter = async (modelObject, query, projection, filter, options) => {
    console.log("in filter query")

    try {
        console.log("in filter query")
        if (!projection) {
            projection = {}
        }
        if (!filter) {
            filter = {}
        }
        console.log(query)
        console.log(projection)
        console.log(filter)

        
        return await modelObject.find(query, projection, options).lean().sort(filter.sort).skip(filter.skip).limit(filter.limit);
    } catch (error) {
        console.log("Error while fetching data:" + error)
        return new Error(error);
    }
}



const findDocumentsByQuery = async (modelObject, query, options) => {
    try {
        return await modelObject.find(query, options).lean();
    } catch (error) {
        console.log("Error while fetching data:" + error)
        return new Error(error);
    }
}

const updateField = async (modelObject, filters, update) => {
    try {
        return await modelObject.findOneAndUpdate(filters, update, { useFindAndModify: false, new: true });        
    } catch (error) {
        console.log("Error while fetching data:" + error)
        return new Error(error);
    }
}

exports.findDocumentsByQuery = findDocumentsByQuery;
exports.findDocumentsByQueryFilter = findDocumentsByQueryFilter;
exports.countDocumentsByQuery = countDocumentsByQuery;
exports.updateField = updateField;

