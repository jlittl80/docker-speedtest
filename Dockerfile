FROM node:latest

RUN mkdir /app

# expose volume
VOLUME /data

# setup external volume for script
RUN apt-get update ;\
    apt-get install python
RUN wget -O /app/speedtest-cli https://raw.githubusercontent.com/sivel/speedtest-cli/master/speedtest.py ;\
    chmod +x /app/speedtest-cli ;\
    touch /data/speeds.csv

# set the working dear to the app
WORKDIR /app
# install node packages / copy all source files
COPY package.json /app/package.json
COPY src/ /app/
RUN cd /app && npm install

# setup script
# RUN python /app/measure.py

# expose port for server
EXPOSE 80
# start the server as entry point
ENTRYPOINT ["/bin/bash", "start.sh"]
#ENTRYPOINT ["python", "measure.py"]
