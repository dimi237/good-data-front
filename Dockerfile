FROM nginx:1.23.2-alpine

# Override nginx conf
RUN mkdir /etc/nginx/sites-available \
    && mkdir /etc/nginx/sites-enabled 
COPY nginx.default.conf /etc/nginx/sites-available/default

RUN ln -s /etc/nginx/sites-available/default /etc/nginx/sites-enabled/

COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html

# Clenaup nginx default html page
RUN rm index*.html


COPY ./dist/sakai-ng .


EXPOSE 80