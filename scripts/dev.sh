#!/bin/bash

export TZ="Asia/Tokyo"
export NODE_ENV=development

# wait for sonarqube server.
sonarqubeLink="http://sonarqube:9000"
until curl $sonarqubeLink > /dev/null 2>&1;
do
  >&2 echo "Scanning is not possible until sonarqube starts. - sleeping"
  sleep 1
done
sleep 20

echo sonar.host.url=http://localhost:9000 >> sonar-project.properties
npm run scan

# start dev server
npm run dev
