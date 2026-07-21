if [ -z "$1" ]; then
    "usage: tag.sh N"
    exit 1
fi
if [ -n "$(git status -s -u)" ]; then
    echo "Repo state dirty"
    exit 1
fi

sed -i -e 's/"version": "[[:digit:]]*.0",/"version": "'$1'.0",/' manifest.json

git commit -a -m"release v$1"

git tag v$1
