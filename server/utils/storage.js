const AWS = require('aws-sdk');
const keys = require('../config/keys');

exports.s3Upload = async image => {
  let imageUrl = '';
  let imageKey = '';

  if (image) {
    const s3bucket = new AWS.S3({
      accessKeyId: keys.aws.accessKeyId,
      secretAccessKey: keys.aws.secretAccessKey,
      region: keys.aws.region
    });

    const params = {
      Bucket: keys.aws.bucketName,
      Key: image.originalname,
      Body: image.buffer,
      ContentType: image.mimetype
    };

    const policy = {
      Version: "2012-10-17",
      Statement: [
        {
          Effect: "Allow",
          Principal: "*",
          Action: "s3:PutObject",
          Resource: `arn:aws:s3:::${keys.aws.bucketName}/*`
        }
      ]
    };

    params.Policy = JSON.stringify(policy);

    const s3Upload = await s3bucket.upload(params).promise();

    imageUrl = s3Upload.Location;
    imageKey = s3Upload.key;
  }

  return { imageUrl, imageKey };
};
