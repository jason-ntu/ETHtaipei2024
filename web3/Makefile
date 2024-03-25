#!/bin/zsh
NPX = npx
HARDHAT = hardhat
DEPLOY_FILE = scripts/deploy.js
NET_SS = --network scrollSepolia
NET_LOCAL = --network localhost
HEX = 0x
ADDRESS = $(HEX)
WAIT_TIME = 30

.PHONY: all compile test clean

all: compile test deploy

compile:
	@echo "Start compiling..."
	@$(NPX) $(HARDHAT) compile

test: compile
	@$(NPX) $(HARDHAT) test

node:
	@echo "Start a local node..."
	@$(NPX) $(HARDHAT) node

deploy_locally: compile clean
	@echo "Start local deployment..."
	@$(NPX) $(HARDHAT) run $(DEPLOY_FILE) $(NET_LOCAL)

# deploy_and_verify: clean
# 	@echo "Start deployment..."; \
# 	addr="$(shell $(NPX) $(HARDHAT) run $(DEPLOY_FILE) $(NET_GOERLI) | grep -o "$(HEX).*")"; \
# 	echo "Contract deployed to address: $$addr"; \
# 	echo "Start verification... (end in 30s)"; \
# 	sleep $(WAIT_TIME); \
# 	$(NPX) $(HARDHAT) verify $(NET_GOERLI) $$addr

deploy: compile clean
	@echo "Start deployment..."
	@$(NPX) $(HARDHAT) run $(DEPLOY_FILE) $(NET_SS)

# manually verify if the verification in deploy fails
verify:
	@if [ "$(ADDRESS)" == "$(HEX)" ]; then \
        echo "Error: ADDRESS is not set"; \
        exit 1; \
    fi
	@echo "Start verification..."
	@$(NPX) $(HARDHAT) verify $(NET_ARG) $(ADDRESS)

clean:
	@$(NPX) $(HARDHAT) clean