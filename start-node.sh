#!/bin/bash
echo "🚀 Starting LumiZenithVerse & Nexorae Node..."

DATA_DIR=$HOME/.lznx_node
CONFIG_FILE=config.toml
GENESIS_FILE=genesis.json
BOOTSTRAP="bootstrap.lumizenithverse.net:26656"

mkdir -p $DATA_DIR

tendermint node \
  --home $DATA_DIR \
  --p2p.persistent_peers $BOOTSTRAP \
  --rpc.laddr tcp://0.0.0.0:26657 \
  --consensus.create_empty_blocks=false \
  --log_level="info"

echo "🌍 Node Online | LUMI & NXE synced with global network"
