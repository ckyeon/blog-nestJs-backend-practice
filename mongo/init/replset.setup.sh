#init/setup.sh
# shellcheck disable=SC2216
sleep 5 | echo "Waiting for the servers to start..."
mongo mongodb://mongoReplica:27017 /mongo/init/replset.setup.js