import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import { SqsEventSource } from 'aws-cdk-lib/aws-lambda-event-sources'
import * as lambda from 'aws-cdk-lib/aws-lambda'

export class CdkSqsLambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lambdaFn = new lambda.Function(this, 'SqsFn', {
      environment: {
        // Add the environment variables here
      },
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'fn.handler',
      code: lambda.Code.fromAsset('src'),
    })

    const sqsQueue = new sqs.Queue(this, 'Queue', {
      queueName: `history-queue`,
    })

    // sqs lambda 연결
    lambdaFn.addEventSource(new SqsEventSource(sqsQueue))
  }
}
