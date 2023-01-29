#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { InfraStack } from '../lib/infra-stack';

const app = new cdk.App();

['dev'].forEach(stage => {
  new InfraStack(app, 'InfraStack', {
    description: `${stage.toUpperCase()} environment infrastructure stack`,
    env: {
      account: process.env.CDK_DEFAULT_ACCOUNT, 
      region: process.env.CDK_DEFAULT_REGION
    },
    stackName: `${stage}`
  })
});