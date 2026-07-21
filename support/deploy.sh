
tag=$(git tag --points-at HEAD)
if [ -z "$tag" ]; then
    echo "Must tag HEAD"
    exit 1
fi
if [ -n "$(git status -s -u)" ]; then
    echo "Repo state dirty"
    exit 1
fi
fname="support/enough-ai-on-hn-$tag.zip"
rm -f "$fname"
zip -r -FS "$fname" * --exclude '*.git*' 'support/*'
