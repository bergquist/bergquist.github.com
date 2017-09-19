---
title: Monitor on the wall
author: Carl Bergquist
date: 2017-06-20
section: blog
draft: true
---

# Make sure you grab the latest version
curl -OL https://github.com/google/protobuf/releases/download/v3.4.0/protoc-3.4.0-linux-x86_64.zip

# Unzip
unzip protoc-3.4.0-linux-x86_64.zip -d protoc3

# Move protoc to /usr/local/bin/
sudo mv protoc3/bin/* /usr/local/bin/

# Move protoc3/include to /usr/local/include/
sudo mv protoc3/include/* /usr/local/include/

# Optional: change owner
sudo chown [user] /usr/local/bin/protoc
sudo chown -R [user] /usr/local/include/google

