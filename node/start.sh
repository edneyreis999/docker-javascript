#!/bin/bash

# Aguarda a disponibilidade do banco de dados
wait-for db:3306 -t 40 

npm install

npm start