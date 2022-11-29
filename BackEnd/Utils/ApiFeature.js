class ApiFeatures{
    constructor(query,queryStr){
        this.query=query;
        this.queryStr=queryStr
    }

    // Serach features
    search(){
        const keyword = this.queryStr.keyword?{
            name:{
                $regex:this.queryStr.keyword,
                $options:"i" 
            }
        }:{}
        // console.log(keyword);
        this.query=this.query.find({...keyword})
        return this 
    }

    //filter Features

    filter(){
        const queryCopy= {...this.queryStr}
        //remove fields
        const removeField= ["keyword","page","limit"]
        removeField.forEach((cur)=>delete queryCopy[cur])

        //filter minmax price
        // console.log(queryCopy);

        let queryString= JSON.stringify(queryCopy)
        
        queryString = queryString.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
        this.query= this.query.find(JSON.parse(queryString))
        // console.log(queryString);
        return this
    }


    pagination(resultPerPage){
        const currPage = Number(this.queryStr.page) || 1

        const skip = resultPerPage * (currPage-1)

        this.query= this.query.limit(resultPerPage).skip(skip)
        return this
    }
}

module.exports=ApiFeatures;