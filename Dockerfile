FROM php:7.4-apache

RUN apt-get update
RUN apt-get upgrade -y 
COPY ./apache/html ./ 
RUN a2enmod rewrite
RUN /etc/init.d/apache2 restart
EXPOSE 80
