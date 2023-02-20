cd infra
echo "Infrastructure bootstraping... \n"
cdk bootstrap
echo "Infrastructure bootstraping DONE :) \n"
echo "Infrastructure diff..."
cdk diff InfraStack -c env=dev
echo "Infrastructure diff DONE :) \n"
echo "Infrastructure deployment... \n"
cdk deploy InfraStack -c env=dev
echo "Infrastructure deployment DONE :) \n"