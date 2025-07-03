# Define build arguments
ARG CHISEL_VERSION=v1.1.0
ARG TARGETARCH=amd64

ARG UBUNTU_VERSION=24.04
ARG NODE_VERSION=20
ARG USER_UID=1000
ARG USER_GID=1000
ARG USER_NAME=http
ARG USER_HOME=/app

# Base builder stage
FROM ubuntu:${UBUNTU_VERSION} AS builder
ARG UBUNTU_VERSION
ARG NODE_VERSION
ARG CHISEL_VERSION
ARG TARGETARCH
ARG USER_UID
ARG USER_GID
ARG USER_NAME
ARG USER_HOME
#
#SHELL ["/bin/bash", "-oeux", "pipefail", "-c"]

# System setup and package installation
RUN apt-get update \
    && apt-get upgrade -y \
    && DEBIAN_FRONTEND=noninteractive apt-get install --no-install-recommends -y \
        ca-certificates \
        curl

## Install Chisel
#ADD https://github.com/canonical/chisel/releases/download/${CHISEL_VERSION}/chisel_${CHISEL_VERSION}_linux_${TARGETARCH}.tar.gz /tmp/chisel.tar.gz
#RUN tar -xvf /tmp/chisel.tar.gz -C /usr/bin/ \
#    && rm /tmp/chisel.tar.gz

# Install Node.js and Yarn
RUN curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION%%.*}.x | bash - \
    && apt-get install -y nodejs \
    && npm install --global npm@latest

# Application setup
WORKDIR /app
# Install dependencies

# Copy only package files first for layer caching
COPY ../node/package*.json ./

# Copy the rest of the application code
COPY ../node .

# Build the app if needed (for TypeScript or other build steps)
RUN npm install

# Build the app if needed (for TypeScript or other build steps)
RUN npm run build

# Expose application port (update if needed)
EXPOSE 3000

# Set environment variable (optional)
ENV NODE_ENV=production

# Run the app
CMD [ "node", "dist/index.js" ]