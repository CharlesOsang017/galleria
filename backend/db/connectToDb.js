import mongoose from 'mongoose'

const connectToDb = async(res, req) => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('database connected successfully!')
    } catch (error) {
        console.log('error in the db connection', error.message)
        process.exit(1)
    }    

}
export default connectToDb