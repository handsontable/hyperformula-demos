find . -maxdepth 2 -name package.json -print0 | xargs -0 sed -E -i 's/(^\s*"hyperformula": ")(.*?)(")/\1'"$1"'\3/'