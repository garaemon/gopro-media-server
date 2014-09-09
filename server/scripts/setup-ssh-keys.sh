#!/bin/bash
# require curl

user=
curl https://github.com/${user}.keys >> ~/.ssh/authorized_keys
