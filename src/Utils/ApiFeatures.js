

export default class ApiFeatures {
    constructor(mongosseQuery, queryString) {
        this.queryString = queryString
        this.mongosseQuery = mongosseQuery
    }

    pagination() {
        let page = this.queryString.page * 1 || 1
        if (this.queryString.page <= 0) page = 1
        let skip = (page - 1) * 4

        let limit = this.queryString.limit * 1 || 4
        this.page = page
        this.limit = limit
        if(limit > 30) limit = 25
        this.mongosseQuery.skip(skip).limit(limit)
        return this

    }

    filter() {
        //2-filters
        let filterObj = { ...this.queryString }
        let excute = ['page', 'sort', 'fields', 'keyword', 'limit']
        excute.forEach((e) => {
            delete filterObj[e]
        })
        filterObj = JSON.stringify(filterObj)
        filterObj = filterObj.replace(/\bgt|gte|lt|lte\b/g, match => `$${match}`)
        filterObj = JSON.parse(filterObj)

        this.mongosseQuery.find(filterObj)
        return this
    }

    sort() {
        if (this.queryString.sort) {
            let sortBy = this.queryString.sort.split(",").join(" ")
            this.mongosseQuery.sort(sortBy)
        }
        return this
    }

    search() {
        if (this.queryString.keyword) {
            this.mongosseQuery.find({
                $or: [{ title: { $regex: this.queryString.keyword, $options: "i" } }, { Description: { $regex: this.queryString.keyword, $options: "i" } }]
            })
        }
        return this
    }

    fields() {
        if (this.queryString.fields) {
            let fields = this.queryString.fields.split(",").join(" ")
            this.mongosseQuery.select(fields)
        }
        return this
    }

}