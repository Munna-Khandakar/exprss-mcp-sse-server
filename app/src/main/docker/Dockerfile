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

SHELL ["/bin/bash", "-oeux", "pipefail", "-c"]

# System setup and package installation
RUN apt-get update \
    && apt-get upgrade -y \
    && DEBIAN_FRONTEND=noninteractive apt-get install --no-install-recommends -y \
        ca-certificates \
        curl

# Install Chisel
ADD https://github.com/canonical/chisel/releases/download/${CHISEL_VERSION}/chisel_${CHISEL_VERSION}_linux_${TARGETARCH}.tar.gz /tmp/chisel.tar.gz
RUN tar -xvf /tmp/chisel.tar.gz -C /usr/bin/ \
    && rm /tmp/chisel.tar.gz

# Install Node.js and Yarn
RUN curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION%%.*}.x | bash - \
    && apt-get install -y nodejs \
    && npm install --global npm@latest