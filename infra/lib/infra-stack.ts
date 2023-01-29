import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as s3Deployment from '@aws-cdk/aws-s3-deployment';
import { CloudFrontWebDistribution, OriginAccessIdentity } from '@aws-cdk/aws-cloudfront';

export class InfraStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const envContext = this.node.tryGetContext(props?.stackName!);

    //creates the bucket
    const sourceBucket = new s3.Bucket(this, `bucket-${props?.stackName}`, {
      bucketName: envContext.bucketName,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });

    //creates the OAI (Origin Access Identity) to lock S3 bucket to be access only via CDN (Cloudfront)
    const originAccessIdentity = new OriginAccessIdentity(this, `origin-access-${props?.stackName}`, {
      comment: `Connects ${envContext.bucketName} to ${props?.stackName} CloudFront`
    });
    sourceBucket.grantRead(originAccessIdentity);

    //creates the cloudfront distribution
    const distribution = new CloudFrontWebDistribution(this, `cloudfront-distribution-${props?.stackName}`, {
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: sourceBucket,
            originAccessIdentity: originAccessIdentity
          },
          behaviors: [
            { isDefaultBehavior: true }
          ]
        }
      ],
      // viewerCertificate: {
      //   aliases: envContext.frontendDomains,
      //   props: {
      //     acmCertificateArn: envContext.frontendCertificateArn,
      //     sslSupportMethod: 'sni-only',
      //     minimumProtocolVersion: 'TLSv1.1_2016'
      //   }
      // },
      errorConfigurations: [
        {
          errorCode: 403,
          responseCode: 200,
          responsePagePath: '/index.html',
          errorCachingMinTtl: 10
        },
        {
          errorCode: 404,
          responseCode: 200,
          responsePagePath: '/index.html',
          errorCachingMinTtl: 10
        }
      ]
    });

    //assigns on CloudFormation output our CloudFront distribution
    new cdk.CfnOutput(this, `distribution-id-${props?.stackName}`, {
      value: distribution.distributionId
    });

    //deploys the bucket
    new s3Deployment.BucketDeployment(this, `bucket-deployment-${props?.stackName}`, {
      sources: [s3Deployment.Source.asset('../build')],
      destinationBucket: sourceBucket,
      distribution: distribution,
      distributionPaths: ['/*']
    });
  }
}
