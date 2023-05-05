const { S3Client, PutObjectCommand, ListObjectsCommand, GetObjectCommand } = require('@aws-sdk/client-s3')
const {getSignedUrl} = require('@aws-sdk/s3-request-presigner')
const fs = require('fs')

const client = new S3Client({
    region:  process.env.AWS_BUCKET_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
})

async function uploadFile(file, name){
    const stream  = fs.createReadStream(file.tempFilePath)
    const tempname = name
    const uploadParams = {
        Bucket:  process.env.AWS_BUCKET_NAME,
        Key: tempname,
        Body: stream
    }
    const command = new PutObjectCommand(uploadParams)
    const result =  await client.send(command)
    return result
}

async function getFileURL(filename){
    const command = new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: filename
    })

    return await getSignedUrl(client, command, {expiresIn: 3600})
}

module.exports = {
    uploadFile,
    getFileURL
}