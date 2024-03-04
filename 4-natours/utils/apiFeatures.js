class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filter() {
        let queryObj = { ...this.queryString.filter };
        // const excludedFields = ['page', 'sort', 'limit', 'fields', 'start'];
        // excludedFields.forEach(el => delete queryObj[el]);
        // console.log(queryObj)
        // let queryStr = JSON.stringify(queryObj);
        // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        // console.log(queryStr)
        // console.log(JSON.parse(queryStr))
        queryObj = JSON.parse(JSON.stringify(queryObj).replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`));
        this.query = this.query.find(queryObj);
        return this;
    }

    sort() {
        if (this.queryString.sort) {
            const sortBy = Object.assign({}, ...this.queryString.sort);
            this.query = this.query.sort(sortBy);

        } else {
            this.query = this.query.sort('-createdAt');
        }

        return this;
    }

    limit() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.join(' ');
            this.query = this.query.select(fields);
        } else {
            this.query = this.query.select('-__v');
        }

        return this;
    }

    paginate() {
        const page = this.queryString.start;
        const limit = this.queryString.limit * 1 || 100;
        const skip = page;

        this.query = this.query.skip(skip).limit(limit);

        return this;
    }
}

module.exports = APIFeatures;